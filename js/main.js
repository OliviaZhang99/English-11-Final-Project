import { els } from "./dom.js";
import { defaultState, applyDelta, educationFromAge } from "./state.js";
import { identities } from "./data.identities.js";
import { hobbies } from "./data.hobbies.js";
import { events } from "./data.events.js";

import { renderIdentityChoices, syncHobbyPill, updateStartReady as updateStartReadyUI } from "./ui.start.js";
import { openHobbyModal, closeHobbyModal } from "./modal.hobby.js";
import { showScreen, renderSidebar, logLine } from "./ui.game.js";

let state = defaultState();
const E = els();

/* ------------------------------ */
/* EVENT PICKER (NO REPEATS)     */
/* ------------------------------ */

function pickEventForAge() {
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
/* START SCREEN LOGIC            */
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
    usedEventIds: []
  };

  // apply hobby boost
  applyDelta(state, hob.boost);

  showScreen(E, "game");
  renderSidebar(state, E);

  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";

  // Poetic intro
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
/* GAME LOOP                     */
/* ------------------------------ */

function renderEvent(ev) {
  if (ev.once && !state.usedEventIds.includes(ev.id)) {
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
      renderSidebar(state, E);
      logLine(E, ch.log);

      E.choiceRow.innerHTML = "";
      E.eventBody.textContent = `${ev.body} (Decision made.)`;
    });

    E.choiceRow.appendChild(b);
  });
}

function nextYear() {
  state.year += 1;
  state.age += 1;
  state.education = educationFromAge(state.age);

  renderSidebar(state, E);
  E.timelineSub.textContent = `Age ${state.age}. Education: ${state.education}.`;

  const ev = pickEventForAge();

  if (!ev) {
    E.eventTitle.textContent = `Age ${state.age} — A quiet year`;
    E.eventBody.textContent =
      "Nothing dramatic happens this year — but small habits continue shaping who you are.";
    E.choiceRow.innerHTML = "";
    logLine(E, "A quiet year passes.");
    return;
  }

  renderEvent(ev);
}

/* ------------------------------ */
/* RESET + NAVIGATION            */
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
/* INIT                          */
/* ------------------------------ */

function init() {
  renderIdentityChoices(state, E, updateStartReady);
  syncHobbyPill(state, E);
  updateStartReady();
  showScreen(E, "start");

  // hobby modal
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
