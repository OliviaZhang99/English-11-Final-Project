import { identities } from "./data.identities.js";

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

export function updateStartReady(state, E) {
  // Only identity required now
  const ok = Boolean(state.selectedIdentityId);
  E.btnStartLife.disabled = !ok;

  E.startStatus.textContent = ok
    ? "Ready. Start your life when you’re ready."
    : "Select an identity to begin.";
}
