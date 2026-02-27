import { els } from "./dom.js";
import { defaultState, applyDelta, educationFromAge, clamp } from "./state.js";
import { identities } from "./data.identities.js";
import { locations } from "./data.locations.js";
import { hobbies } from "./data.hobbies.js";
import { majors } from "./data.majors.js";
import { swcCourses } from "./data.courses.js";
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

function admissionScore(base) {
  const g = state.grade;
  const r = state.reputation;
  const t = state.trust;
  const c = state.connections;

  // contest strength matters (ranking system)
  const cr = state.contestRep;
  const contestStrength = (cr.math + cr.cs + cr.chem + cr.physics + cr.bio) * 0.25;

  const a = state.achievements.length;

  return base
    + (g - 75) * 1.1
    + (r - 50) * 0.9
    + (t - 50) * 0.5
    + (c - 15) * 0.6
    + a * 1.0
    + contestStrength
    + rand(-8, 8);
}
function admit(type) {
  if (type === "Community") return true;
  if (type === "State") return admissionScore(60) >= 60;
  if (type === "Ivy") return admissionScore(70) >= 82;
  if (type === "Masters") return admissionScore(68) >= 78;
  if (type === "PhD") return admissionScore(72) >= 88;
  return false;
}

function startProgram({ schoolType, programLength, degreeLevel }) {
  state.inSchool = true;
  state.working = false;
  state.schoolType = schoolType;
  state.programLength = programLength;
  state.yearsInProgram = 0;
  state.degreeLevel = degreeLevel;
}
function startWorking(jobTitle, salary) {
  state.working = true;
  state.inSchool = false;
  state.schoolType = "—";
  state.programLength = 0;
  state.yearsInProgram = 0;
  state.jobTitle = jobTitle;
  state.salary = salary;
}

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

/* ---------- jail system (safe) ---------- */
function sendToJail(years, reason) {
  state.inJail = true;
  state.jailYearsLeft = Math.max(1, years);
  state.record = "Convicted";
  state.working = false;
  state.inSchool = false;
  state.schoolType = "—";
  state.programLength = 0;
  state.yearsInProgram = 0;

  // business collapses in jail (realistic)
  if (state.business.active) {
    state.business.active = false;
    state.business.type = "—";
    state.business.stage = "—";
    state.business.yearsActive = 0;
    state.business.cashflow = 0;
    state.business.risk = 50;
  }

  logLine(E, `You are sentenced (${years} year${years === 1 ? "" : "s"}). Reason: ${reason}.`);
}
function jailYearEvent() {
  return {
    title: "Inside",
    body: "Time moves differently in here.\nEvery choice still costs something.",
    choices: [
      { text: "Keep your head down", delta: { health: +1, hope: -1, trust: +1 }, log: "You survive by being small." },
      { text: "Work a prison job", delta: { money: +120, hope: -1, reputation: +1 }, log: "You trade time for tiny income." },
      { text: "Take classes (GED / skills)", delta: { grade: +3, reputation: +2, hope: +1 }, log: "You build a future in a place built to stall you." },
      { text: "Be a good cellmate", delta: { trust: +3, connections: +1 }, log: "You learn diplomacy the hard way." }
    ]
  };
}
function handleJail() {
  if (!state.inJail) return;

  state.pendingEvents = [];
  enqueue(jailYearEvent());
  enqueue({
    title: "Time passes",
    body: "Another year is gone.",
    choices: [
      {
        text: "Continue",
        delta: {},
        apply: () => {
          state.jailYearsLeft -= 1;
          if (state.jailYearsLeft <= 0) {
            state.inJail = false;
            state.record = "Convicted";
            applyDelta(state, { hope: -1, trust: -1, connections: -1 });
            showDeltaPopup({ hope: -1, trust: -1, connections: -1 });
            logLine(E, "You are released. Life is smaller for a while.");
          }
        },
        log: "You make it through."
      }
    ]
  });
}

/* ---------- crimes (high-level, realistic) ---------- */
function crimeRisk(baseRisk) {
  const strict = state.lawStrictness; // 0–100
  const rep = state.reputation;
  const conn = state.connections;
  const noise = rand(-6, 6);
  const recordPenalty = (state.record === "Clean") ? 0 : (state.record === "Probation" ? 6 : 12);

  const risk = baseRisk
    + (strict - 50) * 0.35
    + (70 - rep) * 0.20
    + (20 - conn) * 0.15
    + recordPenalty
    + noise;

  return clamp(risk, 5, 95);
}
function illegalOpportunityEvent() {
  return {
    title: "A bad shortcut appears",
    body: "Someone offers a shortcut.\nIt’s tempting because it works—until it doesn’t.",
    choices: [
      { text: "Walk away", delta: { trust: +2, reputation: +1, hope: +1 }, log: "You keep your record clean." },
      {
        text: "Take the shortcut (minor)",
        delta: { money: +350, hope: +1, reputation: -2 },
        apply: () => {
          const caught = Math.random() * 100 < crimeRisk(28);
          if (caught) {
            applyDelta(state, { hope: -3, reputation: -6, trust: -2 });
            showDeltaPopup({ hope: -3, reputation: -6, trust: -2 });
            sendToJail(1, "minor offence");
          } else {
            state.record = (state.record === "Clean") ? "Probation" : state.record;
          }
        },
        log: "You take the money and hope it ends there."
      },
      {
        text: "Take the shortcut (bigger)",
        delta: { money: +900, hope: +2, reputation: -5, trust: -1 },
        apply: () => {
          const caught = Math.random() * 100 < crimeRisk(45);
          if (caught) {
            applyDelta(state, { hope: -5, reputation: -10, trust: -3, connections: -2 });
            showDeltaPopup({ hope: -5, reputation: -10, trust: -3, connections: -2 });
            sendToJail(2, "serious offence");
          } else {
            state.record = (state.record === "Clean") ? "Probation" : state.record;
          }
        },
        log: "You gamble with your future."
      }
    ]
  };
}

/* ---------- interesting accidents / awkward moments ---------- */
function awkwardAccidentEvent() {
  const pool = [
    {
      title: "A public stumble",
      body: "You turn a corner too fast and collide with someone important. They hit the floor. Everyone sees it.",
      choices: [
        { text: "Help immediately and own it", delta: { reputation: +3, trust: +2, hope: -1 }, log: "You act like a decent person. People remember that." },
        { text: "Freeze and apologize too much", delta: { reputation: -1, hope: -1 }, log: "You survive the moment, barely." },
        { text: "Play it cool and move on", delta: { reputation: -2, trust: -1 }, log: "You look unbothered. It reads as cold." }
      ]
    },
    {
      title: "Traffic scare",
      body: "A near-miss leaves your hands shaking. Nothing breaks—except your sense of control.",
      choices: [
        { text: "Slow down and reset your habits", delta: { health: +2, hope: +1 }, log: "You choose safety over speed." },
        { text: "Ignore it and keep going", delta: { health: -2, hope: -1 }, log: "You pretend it didn’t matter. It did." }
      ]
    },
    {
      title: "A rumor starts",
      body: "Someone twists a story about you. It spreads faster than facts.",
      choices: [
        { text: "Address it calmly", delta: { trust: +2, reputation: +2 }, log: "You control the narrative." },
        { text: "Let it burn out", delta: { hope: -1, trust: -1 }, log: "You learn what silence costs." }
      ]
    }
  ];
  return pick(pool);
}

/* ---------- SWC course selection (Vancouver only) ---------- */
function courseSelectionEvent() {
  return {
    onceId: `courses_${state.age}`,
    title: "Course selection",
    body: "You pick what you’ll carry all year.",
    choices: swcCourses.map(c => ({
      text: c.title,
      delta: { ...c.effect },
      apply: () => {
        state.flags.courseTags = state.flags.courseTags || [];
        for (const t of (c.tags || [])) if (!state.flags.courseTags.includes(t)) state.flags.courseTags.push(t);
      },
      log: `You enroll in ${c.title}.`
    }))
  };
}

/* ---------- contest ranking system ---------- */
function contestEvent() {
  const contests = [
    { name: "Math Contest", tag: "math" },
    { name: "Computer Science Contest", tag: "cs" },
    { name: "Chemistry Challenge", tag: "chem" },
    { name: "Physics Competition", tag: "physics" },
    { name: "Biology Olympiad", tag: "bio" }
  ];

  const c = pick(contests);

  const hasSupport =
    (state.flags.courseTags || []).includes(c.tag) ||
    state.grade >= 80 ||
    state.connections >= 25;

  // realistic scoring: depends on grade + prep + randomness
  const prep = hasSupport ? rand(6, 18) : rand(-8, 8);
  const score = clamp(Math.round(55 + (state.grade - 70) * 0.8 + prep + rand(-12, 12)), 0, 100);

  // placement tiers
  const tierRoll = score + rand(-8, 8);
  let placement = "Participation";
  if (tierRoll >= 92) placement = "Top 1%";
  else if (tierRoll >= 86) placement = "Top 5%";
  else if (tierRoll >= 78) placement = "Top 10%";
  else if (tierRoll >= 68) placement = "Top 25%";

  const repGain =
    placement === "Top 1%" ? 6 :
    placement === "Top 5%" ? 5 :
    placement === "Top 10%" ? 4 :
    placement === "Top 25%" ? 2 : 1;

  const connGain =
    placement === "Top 1%" ? 3 :
    placement === "Top 5%" ? 2 :
    placement === "Top 10%" ? 2 :
    placement === "Top 25%" ? 1 : 0;

  const gradeGain =
    placement === "Participation" ? 0 :
    placement === "Top 25%" ? 1 :
    placement === "Top 10%" ? 2 :
    placement === "Top 5%" ? 2 : 3;

  return {
    title: c.name,
    body: "You can show up and get a real score—or stay invisible.\nRankings affect your future.",
    choices: [
      {
        text: "Compete",
        delta: { reputation: +repGain, connections: +connGain, grade: +gradeGain, hope: +1 },
        apply: () => {
          state.contestHistory.push({ name: c.name, score, placement, age: state.age });
          state.achievements.push(`${c.name}: ${score} (${placement})`);
          state.contestRep[c.tag] += (placement === "Top 1%" ? 12 :
                                    placement === "Top 5%" ? 9 :
                                    placement === "Top 10%" ? 6 :
                                    placement === "Top 25%" ? 3 : 1);
        },
        log: `Result: ${score}/100 • ${placement}.`
      },
      {
        text: "Skip it",
        delta: { hope: +1, reputation: -1 },
        log: "You protect comfort. You lose visibility."
      }
    ]
  };
}

/* ---------- majors + admissions ---------- */
function majorPickEvent(label) {
  return {
    onceId: `major_pick_${label}`,
    title: "Choose a major",
    body: "You choose a direction. You’ll be judged by how you back it up.",
    choices: majors.map(m => ({
      text: m.title,
      delta: {},
      apply: () => { state.major = m.title; state.flags.majorId = m.id; },
      log: `You commit to ${m.title}.`
    }))
  };
}

function fallbackSchoolEvent() {
  return {
    title: "Fallback",
    body: "You still have choices. Pick your next move.",
    choices: [
      { text: "Community College", delta: { hope: +1 }, apply: () => { startProgram({ schoolType: "Community", programLength: 2, degreeLevel: "Associate" }); enqueue(majorPickEvent("Community")); }, log: "You reset with something stable." },
      { text: "Work for a year", delta: { money: +600, hope: +1 }, apply: () => startWorking("Part-time job", 26000), log: "You buy time and breathing room." }
    ]
  };
}

function uniApplicationEvent() {
  return {
    onceId: "uni_apps",
    title: "Applications season",
    body: "You pick where to apply.\nAdmission depends on your grades, reputation, trust, connections, and ranked results.",
    choices: [
      {
        text: "Ivy League",
        delta: {},
        apply: () => {
          const ok = admit("Ivy");
          if (ok) { startProgram({ schoolType: "Ivy", programLength: 4, degreeLevel: "Bachelor" }); enqueue(majorPickEvent("Ivy")); logLine(E, "Accepted: Ivy League."); }
          else { applyDelta(state, { hope: -4, reputation: -2, trust: -1 }); showDeltaPopup({ hope: -4, reputation: -2, trust: -1 }); logLine(E, "Rejected: Ivy League."); enqueue(fallbackSchoolEvent()); }
        },
        log: "You submit the application."
      },
      {
        text: "State University",
        delta: {},
        apply: () => {
          const ok = admit("State");
          if (ok) { startProgram({ schoolType: "State", programLength: 4, degreeLevel: "Bachelor" }); enqueue(majorPickEvent("State")); logLine(E, "Accepted: State University."); }
          else { applyDelta(state, { hope: -3, trust: -1 }); showDeltaPopup({ hope: -3, trust: -1 }); logLine(E, "Rejected: State University."); enqueue(fallbackSchoolEvent()); }
        },
        log: "You apply."
      },
      {
        text: "Community College",
        delta: {},
        apply: () => { startProgram({ schoolType: "Community", programLength: 2, degreeLevel: "Associate" }); enqueue(majorPickEvent("Community")); logLine(E, "Accepted: Community College."); },
        log: "You choose the practical route."
      }
    ]
  };
}

/* ---------- business system (realistic, balanced) ---------- */
function businessChance() {
  // balanced startup success chance: depends on trust (reliability), connections, reputation, and money buffer
  const moneyBuffer = clamp(state.money / 20000, 0, 1); // 0..1
  const base = 42; // balanced
  const score =
    base
    + (state.trust - 50) * 0.30
    + (state.connections - 15) * 0.35
    + (state.reputation - 50) * 0.25
    + moneyBuffer * 12
    + rand(-10, 10);

  return clamp(score, 10, 85); // never guaranteed
}

function startBusinessEvent() {
  return {
    onceId: `biz_start_${state.age}`,
    title: "A business idea gets real",
    body:
      "You spot a gap. You can either treat it as a dream—or make it a plan.\n" +
      "Starting early is possible. It’s also risky.",
    choices: [
      {
        text: "Tutoring / Coaching",
        delta: { reputation: +2, trust: +2, money: -200 },
        apply: () => {
          state.business.active = true;
          state.business.type = "Tutoring / Coaching";
          state.business.stage = "Early";
          state.business.yearsActive = 0;
          state.business.cashflow = 400;
          state.business.risk = 35;
        },
        log: "You start small, with real clients."
      },
      {
        text: "Online shop",
        delta: { money: -600, reputation: +1 },
        apply: () => {
          state.business.active = true;
          state.business.type = "Online shop";
          state.business.stage = "Early";
          state.business.yearsActive = 0;
          state.business.cashflow = 650;
          state.business.risk = 45;
        },
        log: "Inventory costs money before it makes money."
      },
      {
        text: "Content / Media",
        delta: { hope: +2, money: -250 },
        apply: () => {
          state.business.active = true;
          state.business.type = "Content / Media";
          state.business.stage = "Early";
          state.business.yearsActive = 0;
          state.business.cashflow = 350;
          state.business.risk = 50;
        },
        log: "Growth is slow—until it isn’t."
      },
      {
        text: "Software / App",
        delta: { grade: -2, reputation: +2, hope: -1 },
        apply: () => {
          state.business.active = true;
          state.business.type = "Software / App";
          state.business.stage = "Early";
          state.business.yearsActive = 0;
          state.business.cashflow = 550;
          state.business.risk = 48;
        },
        log: "You trade free time for something scalable."
      }
    ]
  };
}

function businessYearEvent() {
  const stage = state.business.stage;
  const chance = businessChance();

  const failNow = Math.random() * 100 > chance;

  // realistic: even “successful” years can be mediocre; cashflow depends on stage + randomness
  const stageMult =
    stage === "Growing" ? 1.7 :
    stage === "Early" ? 1.0 : 0.9;

  const cash = Math.round(state.business.cashflow * stageMult * rand(0.75, 1.35));

  return {
    title: `Business year (${state.business.type})`,
    body:
      "You’re running something real. That means pressure, customers, and consequences.\n" +
      "You can prioritize school, or the business, or balance—none are free.",
    choices: [
      {
        text: "Balance school + business",
        delta: { money: +cash, hope: -1, grade: -1, reputation: +2, trust: +1 },
        apply: () => {
          state.business.yearsActive += 1;
          // chance to stabilize
          if (state.business.yearsActive >= 2 && Math.random() < 0.35) {
            state.business.stage = "Growing";
            state.business.risk = Math.max(25, state.business.risk - 8);
            logLine(E, "Your business stabilizes. People start recommending you.");
          }
          // failure check (balanced)
          if (failNow) {
            state.business.active = false;
            state.money -= 800;
            applyDelta(state, { hope: -4, reputation: -3 });
            showDeltaPopup({ money: -800, hope: -4, reputation: -3 });
            logLine(E, "A bad stretch kills the business. You take a loss.");
          }
        },
        log: "You keep both alive, barely."
      },
      {
        text: "Quit school to focus on business",
        delta: { money: +Math.round(cash * 1.25), grade: -10, reputation: +3, hope: -2 },
        apply: () => {
          // realistic: quitting school hurts grades and admissions
          state.inSchool = false;
          state.schoolType = "—";
          state.business.yearsActive += 1;

          if (state.grade < 55) state.grade = 55; // floor after quitting, but harmed

          // failure check is harsher when you bet everything
          const failHard = Math.random() * 100 > clamp(chance - 8, 8, 80);
          if (failHard) {
            state.business.active = false;
            const wipe = Math.min(state.money, 3500);
            state.money -= wipe;
            applyDelta(state, { hope: -7, reputation: -5, trust: -2 });
            showDeltaPopup({ money: -wipe, hope: -7, reputation: -5, trust: -2 });
            logLine(E, "It collapses. Betting everything magnified the fall.");
          } else {
            if (state.business.yearsActive >= 2 && Math.random() < 0.55) state.business.stage = "Growing";
          }
        },
        log: "You stop showing up to school. Life changes fast."
      },
      {
        text: "Shut it down and return to school",
        delta: { hope: +1, grade: +3, reputation: -1 },
        apply: () => {
          state.business.active = false;
          state.business.type = "—";
          state.business.stage = "—";
          state.business.yearsActive = 0;
          state.business.cashflow = 0;
          state.business.risk = 50;

          // return to school if age fits
          if (state.age <= 17) {
            state.inSchool = true;
            state.schoolType = "High School";
          }
          logLine(E, "You walk away before it walks away from you.");
        },
        log: "You choose stability."
      }
    ]
  };
}

/* ---------- build year queue ---------- */
function buildYearQueue() {
  state.pendingEvents = [];

  if (state.inJail) {
    handleJail();
    return;
  }

  state.education = educationFromAge(state.age);

  // school status by age unless quit
  if (state.age >= 6 && state.age <= 12) { if (state.inSchool !== false) { state.inSchool = true; state.schoolType = "Elementary"; } }
  if (state.age >= 13 && state.age <= 17) { if (state.inSchool !== false) { state.inSchool = true; state.schoolType = "High School"; } }
  if (state.age < 6) { state.inSchool = false; state.schoolType = "—"; }

  // hobby at 6
  if (state.age === 6 && state.hobby === "—" && !has("hobby6")) {
    enqueue({
      onceId: "hobby6",
      title: "After school",
      body: "Someone asks what you want to do. You answer without knowing it’ll stick.",
      choices: hobbies.map(h => ({
        text: h.title,
        delta: { ...h.boost },
        apply: () => { state.hobby = h.title; },
        log: `You fall into ${h.title.toLowerCase()} and keep coming back to it.`
      }))
    });
  }

  // course selection (Vancouver)
  if (state.country === "Canada" && state.locationLabel.includes("Vancouver") && state.age >= 13 && state.age <= 17 && state.inSchool) {
    if (!has(`courses_${state.age}`)) enqueue(courseSelectionEvent());
  }

  // business opportunity (realistic: can start in HS, rare)
  if (state.age >= 14 && state.age <= 18 && !state.business.active && Math.random() < 0.22) {
    enqueue(startBusinessEvent());
  }

  // if business active, give business year event every year
  if (state.business.active) {
    enqueue(businessYearEvent());
  }

  // uni apps at 17 (only if still in school / not dropped out)
  if (state.age === 17 && !has("uni_apps") && state.inSchool) enqueue(uniApplicationEvent());

  // always: at least 2–4 events (no silent years)
  enqueue(awkwardAccidentEvent());

  // contests mostly during school years
  if (state.age >= 13 && state.age <= 17 && state.inSchool && Math.random() < 0.85) enqueue(contestEvent());

  // rare illegal shortcut (realistic)
  if (state.age >= 15 && Math.random() < 0.16) enqueue(illegalOpportunityEvent());

  // school habits (only if in school)
  if (state.inSchool) {
    enqueue({
      title: "School pressure",
      body: "Your habits show up in your results.",
      choices: [
        { text: "Study hard", delta: { grade: +6, hope: -2, reputation: +2 }, log: "Your work speaks for you." },
        { text: "Skip sometimes", delta: { grade: -5, reputation: -3, hope: +1 }, log: "You breathe easier. Your record doesn’t." },
        { text: "Annoy a teacher", delta: { reputation: -5, trust: -1 }, log: "Adults decide you’re difficult." },
        { text: "Ask for help early", delta: { grade: +3, reputation: +3, trust: +1 }, log: "Support becomes available." }
      ]
    });
  }

  // adulthood default work if not in school and not jailed and not business-only
  if (!state.inSchool && state.age >= 18 && !state.inJail) {
    if (!state.working && !state.business.active) startWorking("Entry job", 48000);

    if (state.working) state.money += Math.round((state.salary || 48000) * 0.12);

    enqueue({
      title: "Work year",
      body: "Work rewards output and relationships.",
      choices: [
        { text: "Work hard", delta: { reputation: +4, hope: -2, money: +350 }, log: "People rely on you." },
        { text: "Do the minimum", delta: { hope: +2, reputation: -2 }, log: "You keep balance. You lose momentum." },
        { text: "Network", delta: { connections: +4, money: +300 }, log: "Doors appear through people." },
        {
          text: "Go back to school",
          delta: {},
          apply: () => {
            if (state.money < 1500) {
              applyDelta(state, { hope: -1 });
              showDeltaPopup({ hope: -1 });
              logLine(E, "You can’t afford it right now.");
              return;
            }
            enqueue({
              title: "Return to school",
              body: "You choose a path that costs money now to change later.",
              choices: [
                { text: "Community College", delta: { money: -900, hope: +1 }, apply: () => { startProgram({ schoolType: "Community", programLength: 2, degreeLevel: "Associate" }); enqueue(majorPickEvent("Community")); }, log: "You enroll." },
                { text: "State University", delta: { money: -1800 }, apply: () => { const ok = admit("State"); if (ok) { startProgram({ schoolType: "State", programLength: 4, degreeLevel: "Bachelor" }); enqueue(majorPickEvent("State")); logLine(E, "Accepted: State University."); } else { applyDelta(state, { hope: -2 }); showDeltaPopup({ hope: -2 }); logLine(E, "Rejected. Community is open."); startProgram({ schoolType: "Community", programLength: 2, degreeLevel: "Associate" }); enqueue(majorPickEvent("Community")); } }, log: "You apply." }
              ]
            });
          },
          log: "You consider re-entering education."
        }
      ]
    });
  }
}

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

  E.eventTitle.textContent = `Age 0 — You arrive`;
  E.eventBody.textContent =
    `${state.name} arrives in ${state.locationLabel}.\n\n` +
    `A starting position.\nA future that will not ask permission.`;
  E.timelineSub.textContent = `Age 0.`;

  logLine(E, `Name: ${state.name}. Gender: ${state.gender}.`);
  logLine(E, `Location: ${state.locationLabel}.`);
  logLine(E, `Class: ${ident.title}.`);

  setAwaitingChoice(false);
}

/* ---------- init ---------- */
function updateStartReady() { updateStartReadyUI(state, E); }

function init() {
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