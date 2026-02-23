import { els } from "./dom.js";
import { defaultState, applyDelta, educationFromAge, clamp } from "./state.js";
import { identities } from "./data.identities.js";
import { hobbies } from "./data.hobbies.js";
import { events } from "./data.events.js";

import { renderIdentityChoices, updateStartReady as updateStartReadyUI } from "./ui.start.js";
import { showScreen, renderSidebar, logLine } from "./ui.game.js";

let state = defaultState();
const E = els();

/* ------------------------------ */
/* START READY (identity only)    */
/* ------------------------------ */
function updateStartReady() {
  updateStartReadyUI(state, E);
}

/* ------------------------------ */
/* MILESTONE PICKER (no repeats)  */
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
/* AGE 6 HOBBY SELECTION SCENE    */
/* ------------------------------ */
function buildHobbySelectionScene() {
  return {
    id: "choose_hobby_age6",
    title: "A question that stays with you",
    body:
      "One day, an adult asks it casually — but it lands like a door opening:\n\n" +
      "“What do you want to do after school?\n" +
      "Like… what do you want to get good at?”",
    once: true,
    choices: hobbies.map(h => ({
      text: h.title,
      delta: {},
      pickHobbyId: h.id,
      log: `You choose ${h.title}.`
    }))
  };
}

function applyChosenHobby(hobbyId) {
  const hob = hobbies.find(h => h.id === hobbyId);
  if (!hob) return;

  state.hobby = hob.title;
  applyDelta(state, hob.boost);

  logLine(E, `Your hobby becomes ${hob.title}.`);
  logLine(E, hob.desc);
}

/* ------------------------------ */
/* EVENT RENDER                   */
/* ------------------------------ */
function renderEvent(ev, markUsed) {
  if (markUsed && ev.once && !state.usedEventIds.includes(ev.id)) {
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
      if (ch.pickHobbyId) applyChosenHobby(ch.pickHobbyId);

      applyDelta(state, ch.delta);

      state.money = Math.round(state.money);
      state.health = clamp(state.health, 0, 100);
      state.hope = clamp(state.hope, 0, 100);
      state.trust = clamp(state.trust, 0, 100);
      state.connections = clamp(state.connections, 0, 100);

      renderSidebar(state, E);
      if (ch.log) logLine(E, ch.log);

      E.choiceRow.innerHTML = "";
      E.eventBody.textContent = `${ev.body} (Decision made.)`;
    });

    E.choiceRow.appendChild(b);
  });
}

/* ------------------------------ */
/* START LIFE                     */
/* ------------------------------ */
function startLife() {
  const ident = identities.find(i => i.id === state.selectedIdentityId);
  if (!ident) return;

  const base = ident.start;

  state = {
    ...defaultState(),
    selectedIdentityId: ident.id,
    inGame: true,

    background: ident.background,
    education: base.education,
    money: base.money,
    health: base.health,
    hope: base.hope,
    trust: base.trust,
    connections: base.connections,

    hobby: "—",
    usedEventIds: []
  };

  showScreen(E, "game");
  renderSidebar(state, E);

  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";

  E.eventTitle.textContent = "Age 0 — You arrive with a body and a pulse";
  E.eventBody.textContent =
    "You enter this world with a body you did not choose\n\n" +
    "and a soul that does not yet know its own edges.\n\n" +
    "Before language. Before ambition.\n" +
    "Just breath. Just existence.";

  E.timelineSub.textContent = "You begin inside structure.";
  logLine(E, `You began as ${ident.title}.`);

  E.btnNextYear.focus();
}

/* ------------------------------ */
/* ADVANCE YEAR                   */
/* ------------------------------ */
function nextYear() {
  state.year += 1;
  state.age += 1;
  state.education = educationFromAge(state.age);

  renderSidebar(state, E);

  E.timelineSub.textContent =
    state.hobby && state.hobby !== "—"
      ? `You are ${state.age}. You keep returning to ${state.hobby.toLowerCase()}.`
      : `You are ${state.age}. You’re still becoming.`;

  // Age 6 hobby scene takes priority once
  if (state.age === 6 && state.hobby === "—") {
    const scene = buildHobbySelectionScene();
    renderEvent(scene, true);
    return;
  }

  // Milestone events
  const milestone = pickMilestoneForAge();
  if (milestone) {
    renderEvent(milestone, true);
    return;
  }

  // Always something each year (simple but meaningful)
  const fallback = {
    id: `year_${state.age}`,
    title: "A year of small choices",
    body:
      "Not every year is a turning point.\n" +
      "But habits are quiet architects.\n\n" +
      "You either reinforce who you are — or you drift.",
    choices: [
      { text: "Invest in yourself", delta: { hope: +2, health: +1 }, log: "You build slowly. It still counts." },
      { text: "Stay comfortable", delta: { hope: -1, trust: +1 }, log: "You keep things stable — but growth slows." }
    ]
  };

  renderEvent(fallback, false);
}

/* ------------------------------ */
/* RESET / BACK                   */
/* ------------------------------ */
function hardResetToStart() {
  state = defaultState();
  showScreen(E, "start");
  renderIdentityChoices(state, E, updateStartReady);
  updateStartReady();
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
  updateStartReady();
  showScreen(E, "start");

  E.btnStartLife.addEventListener("click", () => {
    if (E.btnStartLife.disabled) return;
    startLife();
  });

  E.btnNextYear.addEventListener("click", nextYear);
  E.btnBackToStart.addEventListener("click", backToStart);
  E.btnReset.addEventListener("click", hardResetToStart);
}

init();
