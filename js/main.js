import { els } from "./dom.js";
import { defaultState, applyDelta, educationFromAge, clamp } from "./state.js";
import { identities } from "./data.identities.js";
import { hobbies } from "./data.hobbies.js";
import { events } from "./data.events.js";

import { renderIdentityChoices, syncHobbyPill, updateStartReady as updateStartReadyUI } from "./ui.start.js";
import { openHobbyModal, closeHobbyModal } from "./modal.hobby.js";
import { showScreen, renderSidebar, logLine } from "./ui.game.js";

let state = defaultState();
const E = els();

/* ------------------------------ */
/* FLAGS (CONSEQUENCES MEMORY)    */
/* ------------------------------ */
function ensureFlags() {
  if (!state.flags) state.flags = {};
}
function setFlag(key, value = true) {
  ensureFlags();
  state.flags[key] = value;
}
function hasFlag(key) {
  ensureFlags();
  return Boolean(state.flags[key]);
}

/* ------------------------------ */
/* EVENT PICKER (NO REPEATS)      */
/* ------------------------------ */
function pickMilestoneForAge() {
  const used = new Set(state.usedEventIds);

  const eligible = events.filter(ev => {
    const inRange = state.age >= ev.minAge && state.age <= ev.maxAge;
    if (!inRange) return false;
    if (ev.once && used.has(ev.id)) return false;
    return true;
  });

  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

/* ------------------------------ */
/* RECURRING YEARLY EVENTS        */
/* ------------------------------ */

function hobbyName() {
  return state.hobby || "your interests";
}

function weightedPick(options) {
  // options: [{w, value}]
  const total = options.reduce((s, o) => s + o.w, 0);
  let r = Math.random() * total;
  for (const o of options) {
    r -= o.w;
    if (r <= 0) return o.value;
  }
  return options[options.length - 1].value;
}

function buildRecurringEvent() {
  // Make the *type* depend on stats/flags so it feels consequential
  const lowMoney = state.money < 1500;
  const lowHealth = state.health < 35;
  const lowHope = state.hope < 30;
  const lowTrust = state.trust < 35;

  const type = weightedPick([
    { w: lowMoney ? 4 : 2, value: "money" },
    { w: lowHealth ? 4 : 2, value: "health" },
    { w: lowHope ? 4 : 2, value: "meaning" },
    { w: lowTrust ? 4 : 2, value: "relationships" },
    { w: 2, value: "hobby" }
  ]);

  // Branching text based on flags
  const supportedHome = hasFlag("supported_home");
  const achievementDriven = hasFlag("achievement_driven");
  const avoidsConflict = hasFlag("avoids_conflict");

  // Create an event object with choices
  if (type === "money") {
    const title = "A pressure you can measure";
    const body =
      state.age < 22
        ? "Money feels abstract until you want something specific: a trip, a course, a better phone, a donation. You learn what it means to trade time for security."
        : "Bills show up whether you feel ready or not. Money becomes a quiet narrator in the background of your decisions.";

    return {
      id: `rec_money_${state.age}_${Math.random().toString(16).slice(2)}`,
      title,
      body,
      choices: [
        {
          text: "Take a practical step toward stability",
          delta: { money: +700, hope: -1 },
          flags: () => setFlag("values_stability", true),
          log: "You choose stability. It costs a little joy, but buys breathing room."
        },
        {
          text: "Spend on something that restores you",
          delta: { money: -400, hope: +3, health: +1 },
          flags: () => setFlag("values_joy", true),
          log: "You spend to feel alive again. The budget tightens, but your spirit loosens."
        }
      ],
      repeatable: true
    };
  }

  if (type === "health") {
    const title = "Your body makes a request";
    const body =
      state.age < 18
        ? "Your energy comes in bursts. You don’t know the word for burnout yet, but you recognize the feeling."
        : "Your body doesn’t negotiate. It asks for sleep, movement, and care — and it keeps asking.";

    return {
      id: `rec_health_${state.age}_${Math.random().toString(16).slice(2)}`,
      title,
      body,
      choices: [
        {
          text: "Commit to recovery (sleep, food, movement)",
          delta: { health: +5, hope: +1, money: -100 },
          flags: () => setFlag("protects_health", true),
          log: "You invest in your body. The payoff is slow, but real."
        },
        {
          text: "Push through anyway",
          delta: { health: -4, connections: +2 },
          flags: () => setFlag("pushes_through", true),
          log: "You keep going. The world rewards output — your body remembers the cost."
        }
      ],
      repeatable: true
    };
  }

  if (type === "relationships") {
    const title = "A moment that defines trust";
    const body = supportedHome
      ? "Because you’ve known support before, you’re more willing to repair conflict instead of escaping it."
      : "You learned early that people can be unpredictable. You’re careful with what you reveal.";

    return {
      id: `rec_rel_${state.age}_${Math.random().toString(16).slice(2)}`,
      title,
      body,
      choices: [
        {
          text: "Speak honestly (even if it’s awkward)",
          delta: { trust: +3, connections: +2, hope: +1 },
          flags: () => setFlag("faces_conflict", true),
          log: "You choose clarity over comfort. It strengthens the right relationships."
        },
        {
          text: avoidsConflict ? "Avoid it and keep things smooth" : "Stay silent and move on",
          delta: { trust: -2, hope: -1 },
          flags: () => setFlag("avoids_conflict", true),
          log: "You avoid the mess. Peace stays — but it’s thinner than it looks."
        }
      ],
      repeatable: true
    };
  }

  if (type === "meaning") {
    const title = "What is this all for?";
    const body = achievementDriven
      ? "You’ve been running on targets for so long that stillness feels illegal. But you can’t outrun emptiness forever."
      : "Sometimes nothing is wrong — and you still feel the question: what am I building, and why?";

    return {
      id: `rec_meaning_${state.age}_${Math.random().toString(16).slice(2)}`,
      title,
      body,
      choices: [
        {
          text: "Recenter (purpose, reflection, service)",
          delta: { hope: +4, trust: +1 },
          flags: () => setFlag("seeks_meaning", true),
          log: "You return to purpose. It doesn’t solve everything — but it steadies you."
        },
        {
          text: "Distract yourself (stay busy, stay moving)",
          delta: { hope: -1, connections: +1 },
          flags: () => setFlag("avoids_stillness", true),
          log: "You keep moving. It works for a while. The question waits."
        }
      ],
      repeatable: true
    };
  }

  // hobby type
  const title = "The thing you keep returning to";
  const body =
    `Some parts of you don’t need permission. ${hobbyName()} shows up again — not as a plan, but as a pattern.`;

  return {
    id: `rec_hobby_${state.age}_${Math.random().toString(16).slice(2)}`,
    title,
    body,
    choices: [
      {
        text: `Go deeper into ${hobbyName().toLowerCase()}`,
        delta: { hope: +2, connections: +1 },
        flags: () => setFlag("hobby_deepens", true),
        log: `You give ${hobbyName().toLowerCase()} more space in your life. It gives something back.`
      },
      {
        text: "Set it aside for something practical",
        delta: { money: +300, hope: -1 },
        flags: () => setFlag("hobby_suppressed", true),
        log: "You choose practicality. It helps, but it leaves a quiet absence."
      }
    ],
    repeatable: true
  };
}

/* ------------------------------ */
/* UI + START                     */
/* ------------------------------ */

function updateStartReady() {
  updateStartReadyUI(state, E);
}

function startLife() {
  const ident = identities.find(i => i.id === state.selectedIdentityId);
  const hob = hobbies.find(h => h.id === state.selectedHobbyId);
  if (!ident || !hob) return;

  const base = ident.start;

  state = {
    ...defaultState(),
    selectedIdentityId: ident.id,
    selectedHobbyId: hob.id,
    inGame: true,

    background: ident.background,
    education: base.education,
    money: base.money,
    health: base.health,
    hope: base.hope,
    trust: base.trust,
    connections: base.connections,

    hobby: hob.title,
    usedEventIds: [],
    flags: {}
  };

  applyDelta(state, hob.boost);

  showScreen(E, "game");
  renderSidebar(state, E);

  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";

  E.eventTitle.textContent = "Age 0 — You arrive with a body and a pulse";
  E.eventBody.innerHTML =
    "You enter this world with a body you did not choose.<br><br>" +
    "And a soul that does not yet know its own edges.<br><br>" +
    "Before language. Before ambition.<br>" +
    "Just breath. Just existence.";

  E.timelineSub.textContent = "Every life begins inside structure.";
  logLine(E, `You began as ${ident.title}.`);
  logLine(E, `Your early identity leans toward ${hob.title}.`);

  E.btnNextYear.focus();
}

/* ------------------------------ */
/* EVENT RENDERING                */
/* ------------------------------ */

function renderEvent(ev, isMilestone) {
  if (isMilestone && ev.once && !state.usedEventIds.includes(ev.id)) {
    state.usedEventIds.push(ev.id);
  }

  E.eventTitle.textContent = `Age ${state.age} — ${ev.title}`;
  E.eventBody.textContent = ev.body;
  E.choiceRow.innerHTML = "";

  ev.choices.forEach((ch) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-ghost";
    b.textContent = ch.text;

    b.addEventListener("click", () => {
      applyDelta(state, ch.delta);

      // apply flags if any
      if (typeof ch.flags === "function") ch.flags();

      // small auto-balance: stop stats from becoming nonsense over time
      state.money = Math.round(state.money);
      state.health = clamp(state.health, 0, 100);
      state.hope = clamp(state.hope, 0, 100);
      state.trust = clamp(state.trust, 0, 100);
      state.connections = clamp(state.connections, 0, 100);

      renderSidebar(state, E);
      logLine(E, ch.log);

      E.choiceRow.innerHTML = "";
      E.eventBody.textContent = `${ev.body} (Decision made.)`;
    });

    E.choiceRow.appendChild(b);
  });
}

/* ------------------------------ */
/* ADVANCE YEAR                   */
/* ------------------------------ */

function nextYear() {
  state.year += 1;
  state.age += 1;
  state.education = educationFromAge(state.age);

  renderSidebar(state, E);
  E.timelineSub.textContent = `Age ${state.age}. Education: ${state.education}.`;

  // 1) Try milestone first
  const milestone = pickMilestoneForAge();
  if (milestone) {
    // Special handling: set flags based on specific milestone IDs
    if (milestone.id === "family_baseline_1") {
      // flag set will happen through choice, but we can pre-tag if wanted
    }
    renderEvent(milestone, true);
    return;
  }

  // 2) Otherwise always generate a recurring event
  const recurring = buildRecurringEvent();
  renderEvent(recurring, false);
}

/* ------------------------------ */
/* RESET + NAV                    */
/* ------------------------------ */

function hardResetToStart() {
  state = defaultState();
  showScreen(E, "start");

  renderIdentityChoices(state, E, updateStartReady);
  syncHobbyPill(state, E);
  updateStartReady();

  closeHobbyModal(E);
}

function backToStart() {
  showScreen(E, "start");
  state.inGame = false;
  updateStartReady();
}

/* ------------------------------ */
/* INIT                           */
/* ------------------------------ */

function init() {
  renderIdentityChoices(state, E, updateStartReady);
  syncHobbyPill(state, E);
  updateStartReady();
  showScreen(E, "start");

  E.btnPickHobby.addEventListener("click", () => openHobbyModal(state, E));
  E.modalOverlay.addEventListener("click", () => closeHobbyModal(E));
  E.btnCloseModal.addEventListener("click", () => closeHobbyModal(E));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !E.hobbyModal.hidden) closeHobbyModal(E);
  });

  E.btnConfirmHobby.addEventListener("click", () => {
    if (!state.pendingHobbyId) return;
    state.selectedHobbyId = state.pendingHobbyId;
    syncHobbyPill(state, E);
    updateStartReady();
    closeHobbyModal(E);
  });

  E.btnStartLife.addEventListener("click", () => {
    if (E.btnStartLife.disabled) return;
    startLife();
  });

  E.btnNextYear.addEventListener("click", nextYear);
  E.btnBackToStart.addEventListener("click", backToStart);
  E.btnReset.addEventListener("click", hardResetToStart);
}

init();
