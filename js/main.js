import { els } from "./dom.js";
import { defaultState, applyDelta, educationFromAge, clamp } from "./state.js";
import { identities } from "./data.identities.js";
import { locations } from "./data.locations.js";
import { hobbies } from "./data.hobbies.js";
import { renderClassChoices, renderLocationChoices, updateStartReady as updateStartReadyUI } from "./ui.start.js";
import { showScreen, renderSidebar, logLine, showDeltaPopup } from "./ui.game.js";

let state = defaultState();
const E = els();

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const has = (id) => state.usedEventIds.includes(id);
const mark = (id) => { if (!has(id)) state.usedEventIds.push(id); };

function setAwaitingChoice(on) {
  state.awaitingChoice = on;
  E.btnNextYear.disabled = on;
  E.lockNote.hidden = !on;
}

function enqueue(ev) { state.pendingEvents.push(ev); }
function nextPendingEvent() { return state.pendingEvents.shift() || null; }

function renderEvent(ev) {
  E.eventTitle.textContent = `Age ${state.age} — ${ev.title}`;
  E.eventBody.textContent = ev.body;
  E.choiceRow.innerHTML = "";

  setAwaitingChoice(true);

  ev.choices.forEach((ch) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-ghost";
    b.textContent = ch.text;

    b.addEventListener("click", () => {
      if (ev.onceId) mark(ev.onceId);

      if (typeof ch.apply === "function") ch.apply();

      applyDelta(state, ch.delta);
      state.money = Math.round(state.money);

      showDeltaPopup(ch.delta);
      if (ch.log) logLine(E, ch.log);

      renderSidebar(state, E);

      const nxt = nextPendingEvent();
      if (nxt) return renderEvent(nxt);

      E.choiceRow.innerHTML = "";
      setAwaitingChoice(false);
      E.btnNextYear.focus();
    });

    E.choiceRow.appendChild(b);
  });
}

/* ---------- event pools (no silent years) ---------- */
function familyToneEvent() {
  const upper = state.background === "Upper";
  const working = state.background === "Working";

  const options = [
    {
      title: "The house you grow into",
      body:
        "You learn the rules before you learn the words.\n" +
        "Some homes teach safety. Some teach performance.",
      choices: [
        { text: "Warm routines", delta: { trust: +4, hope: +2 }, log: "Warmth becomes your baseline." },
        { text: "High expectations", delta: { grade: +3, hope: -1, reputation: +1 }, log: "You learn to be impressive." },
        { text: "Unpredictable moods", delta: { trust: -3, hope: -2 }, log: "You learn to read the room fast." }
      ]
    },
    {
      title: "Adults talking in the next room",
      body:
        "You catch fragments: money, timing, someone’s pride.\n" +
        "It sounds like weather. It still shapes you.",
      choices: [
        { text: "You feel protected", delta: { hope: +2, trust: +2 }, log: "You believe someone will catch you." },
        { text: "You feel pressure", delta: { grade: +2, hope: -2 }, log: "You start measuring yourself early." },
        { text: "You learn to stay quiet", delta: { trust: -1, connections: +1 }, log: "You observe more than you speak." }
      ]
    }
  ];

  // subtle class tilt
  const ev = pick(options);
  if (upper) ev.body += "\n\nComfort exists — and so does reputation.";
  if (working) ev.body += "\n\nMoney feels like a problem you can’t ignore.";

  return ev;
}

function awkwardMomentEvent() {
  const pool = [
    {
      title: "A public stumble",
      body: "You turn too fast and collide with someone. They drop their stuff. People look.",
      choices: [
        { text: "Help immediately", delta: { reputation: +3, trust: +2 }, log: "People remember you as decent." },
        { text: "Freeze", delta: { hope: -1, reputation: -1 }, log: "You recover later — not now." },
        { text: "Act unbothered", delta: { trust: -1, reputation: -2 }, log: "It reads colder than you meant." }
      ]
    },
    {
      title: "A rumor starts",
      body: "Someone twists something you said. It spreads faster than truth.",
      choices: [
        { text: "Address it calmly", delta: { trust: +2, reputation: +2 }, log: "You control the narrative." },
        { text: "Let it burn out", delta: { hope: -1, trust: -1 }, log: "Silence has a price." }
      ]
    },
    {
      title: "Traffic scare",
      body: "A near-miss shakes you. Nothing breaks — but your certainty does.",
      choices: [
        { text: "Slow down from now on", delta: { health: +2, hope: +1 }, log: "You choose safety over speed." },
        { text: "Ignore it", delta: { health: -2, hope: -1 }, log: "You pretend it didn’t matter. It did." }
      ]
    }
  ];
  return pick(pool);
}

function schoolHabitEvent() {
  return {
    title: "School pressure",
    body: "Your habits become your results.",
    choices: [
      { text: "Study hard", delta: { grade: +6, hope: -2, reputation: +2 }, log: "You build momentum." },
      { text: "Skip sometimes", delta: { grade: -5, reputation: -3, hope: +1 }, log: "You breathe easier. Your record doesn’t." },
      { text: "Ask for help early", delta: { grade: +3, reputation: +2, trust: +1 }, log: "Support becomes available." },
      { text: "Clown around", delta: { reputation: -4, trust: -1, hope: +1 }, log: "You get laughs. You lose respect." }
    ]
  };
}

function miniContestEvent() {
  // simple ranking system (Phase 1)
  const contests = ["Math Contest", "Computer Science Contest", "Physics Competition", "Chemistry Challenge", "Biology Olympiad"];
  const name = pick(contests);

  const prep = (state.grade - 70) * 0.8 + (state.connections - 15) * 0.3;
  const score = clamp(Math.round(55 + prep + rand(-15, 15)), 0, 100);
  const tier = score >= 92 ? "Top 1%" : score >= 86 ? "Top 5%" : score >= 78 ? "Top 10%" : score >= 68 ? "Top 25%" : "Participation";

  const repGain = tier === "Top 1%" ? 6 : tier === "Top 5%" ? 5 : tier === "Top 10%" ? 4 : tier === "Top 25%" ? 2 : 1;
  const connGain = tier === "Top 1%" ? 3 : tier === "Top 5%" ? 2 : tier === "Top 10%" ? 2 : tier === "Top 25%" ? 1 : 0;

  return {
    title: name,
    body: "You can show up and get a real score — or stay invisible.",
    choices: [
      {
        text: "Compete",
        delta: { reputation: +repGain, connections: +connGain, hope: +1, grade: +1 },
        apply: () => {
          state.flags.achievements = state.flags.achievements || [];
          state.flags.achievements.push(`${name}: ${score}/100 (${tier})`);
        },
        log: `Result: ${score}/100 • ${tier}.`
      },
      { text: "Skip it", delta: { hope: +1, reputation: -1 }, log: "You protect comfort. You lose visibility." }
    ]
  };
}

function hobbyAtSixEvent() {
  return {
    onceId: "hobby6",
    title: "After school",
    body: "Someone asks what you want to do. You answer without knowing it’ll stick.",
    choices: hobbies.map(h => ({
      text: h.title,
      delta: { ...h.boost },
      apply: () => { state.hobby = h.title; },
      log: `You fall into ${h.title.toLowerCase()} and keep coming back to it.`
    }))
  };
}

/* ---------- build year queue ---------- */
function buildYearQueue() {
  state.pendingEvents = [];

  state.education = educationFromAge(state.age);

  // Always 2–4 events per year (no silent years)
  // Childhood (0–5)
  if (state.age <= 5) {
    enqueue(familyToneEvent());
    enqueue(awkwardMomentEvent());
    // tiny third moment sometimes
    if (Math.random() < 0.45) {
      enqueue({
        title: "Small discovery",
        body: "You notice something that feels like yours.",
        choices: [
          { text: "Hold onto it", delta: { hope: +2 }, log: "You keep a private spark." },
          { text: "Share it", delta: { connections: +2, trust: +1 }, log: "You learn what support feels like." }
        ]
      });
    }
    return;
  }

  // Hobby at 6 (once)
  if (state.age === 6 && state.hobby === "—" && !has("hobby6")) {
    enqueue(hobbyAtSixEvent());
  }

  // School years (6–17)
  if (state.age >= 6 && state.age <= 17) {
    enqueue(awkwardMomentEvent());
    enqueue(schoolHabitEvent());
    if (state.age >= 12 && Math.random() < 0.75) enqueue(miniContestEvent());
    return;
  }

  // Adult years (18+)
  enqueue(awkwardMomentEvent());
  enqueue({
    title: "Work year",
    body: "Work rewards output — and relationships.",
    choices: [
      { text: "Work hard", delta: { reputation: +4, hope: -2, money: +450 }, log: "People rely on you." },
      { text: "Network", delta: { connections: +4, money: +250 }, log: "Doors appear through people." },
      { text: "Protect your peace", delta: { hope: +3, reputation: -2 }, log: "You keep balance. You lose momentum." },
      { text: "Skill up at night", delta: { grade: +2, hope: -1, reputation: +2 }, log: "You invest in your future." }
    ]
  });

  // adult money drift (location economy)
  const baseIncome = 3800; // yearly “life drift”
  state.money += Math.round(baseIncome * state.moneyMult);
}

/* ---------- year advance ---------- */
function advanceYear() {
  if (state.awaitingChoice) return;

  state.year += 1;
  state.age += 1;

  renderSidebar(state, E);
  E.timelineSub.textContent = `Age ${state.age}.`;

  buildYearQueue();
  const first = nextPendingEvent();
  if (first) renderEvent(first);
}

/* ---------- start life ---------- */
function startLife() {
  const ident = identities.find(i => i.id === state.selectedIdentityId);
  const loc = locations.find(l => l.id === state.selectedLocationId);
  if (!ident || !loc) return;

  const base = ident.start;

  state = {
    ...defaultState(),
    selectedIdentityId: ident.id,
    selectedLocationId: loc.id,
    name: state.name.trim(),
    gender: state.gender,
    inGame: true,

    background: ident.background,

    locationLabel: `${loc.city}, ${loc.country}`,
    country: loc.country,
    moneyMult: loc.moneyMult,
    lawStrictness: loc.lawStrictness,

    money: Math.round(base.money * loc.moneyMult),
    health: base.health,
    hope: base.hope,
    trust: base.trust,
    connections: base.connections,
    grade: base.grade,
    reputation: base.reputation,
  };

  showScreen(E, "game");
  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";

  renderSidebar(state, E);

  E.eventTitle.textContent = `Age 0 — A first breath`;
  E.eventBody.textContent =
    `${state.name} opens their eyes in ${state.locationLabel}.\n\n` +
    `No manual. No guarantees.\nJust time — and what you do with it.`;
  E.timelineSub.textContent = `Age 0.`;

  logLine(E, `Name: ${state.name}. Gender: ${state.gender}.`);
  logLine(E, `Location: ${state.locationLabel}.`);
  logLine(E, `Class: ${ident.title}.`);

  setAwaitingChoice(false);
}

/* ---------- init ---------- */
function updateStartReady() { updateStartReadyUI(state, E); }

function init() {
  // Render selectors first (prevents “class choices not loading”)
  renderLocationChoices(state, E, updateStartReady);
  renderClassChoices(state, E, updateStartReady);
  updateStartReady();
  showScreen(E, "start");

  E.inputName.addEventListener("input", () => { state.name = E.inputName.value; updateStartReady(); });
  E.selectGender.addEventListener("change", () => { state.gender = E.selectGender.value; updateStartReady(); });

  E.btnStartLife.addEventListener("click", () => {
    if (E.btnStartLife.disabled) return;
    startLife();
  });

  E.btnNextYear.addEventListener("click", advanceYear);

  E.btnBackToStart.addEventListener("click", () => {
    showScreen(E, "start");
    state.inGame = false;
    updateStartReady();
  });

  E.btnReset.addEventListener("click", () => {
    state = defaultState();
    E.inputName.value = "";
    E.selectGender.value = "";
    E.selectLocation.value = "";
    showScreen(E, "start");
    renderLocationChoices(state, E, updateStartReady);
    renderClassChoices(state, E, updateStartReady);
    updateStartReady();
  });
}

init();