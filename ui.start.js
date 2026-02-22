import { identities } from "./data.identities.js";
import { hobbies } from "./data.hobbies.js";

export function renderIdentityChoices(state, E, updateStartReady) {
  E.identityGrid.innerHTML = "";

  identities.forEach((it) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.setAttribute("aria-pressed", String(state.selectedIdentityId === it.id));

    btn.innerHTML = `
      <div class="choice-title">${it.title}</div>
      <div class="choice-desc">${it.desc}</div>
    `;

    btn.addEventListener("click", () => {
      state.selectedIdentityId = it.id;
      renderIdentityChoices(state, E, updateStartReady);
      updateStartReady();
    });

    E.identityGrid.appendChild(btn);
  });

  if (!state.selectedIdentityId) {
    E.identityPicked.textContent = "Not selected";
  } else {
    const chosen = identities.find(x => x.id === state.selectedIdentityId);
    E.identityPicked.textContent = chosen ? chosen.title : "Selected";
  }
}

export function syncHobbyPill(state, E) {
  if (!state.selectedHobbyId) E.hobbyPicked.textContent = "Not selected";
  else {
    const chosen = hobbies.find(h => h.id === state.selectedHobbyId);
    E.hobbyPicked.textContent = chosen ? chosen.title : "Selected";
  }
}

export function updateStartReady(state, E) {
  const ok = Boolean(state.selectedIdentityId && state.selectedHobbyId);
  E.btnStartLife.disabled = !ok;

  if (ok) E.startStatus.textContent = "Ready. Start your life when you’re ready.";
  else if (!state.selectedIdentityId && !state.selectedHobbyId) E.startStatus.textContent = "Select an identity and a starting hobby to begin.";
  else if (!state.selectedIdentityId) E.startStatus.textContent = "Select an identity to begin.";
  else E.startStatus.textContent = "Choose a starting hobby to begin.";
}