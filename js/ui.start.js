import { identities } from "./data.identities.js";

export function renderClassChoices(state, E, updateStartReady) {
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
      renderClassChoices(state, E, updateStartReady);
      updateStartReady();
    });
    E.identityGrid.appendChild(btn);
  });

  if (!state.selectedIdentityId) E.identityPicked.textContent = "Not selected";
  else {
    const chosen = identities.find(x => x.id === state.selectedIdentityId);
    E.identityPicked.textContent = chosen ? chosen.title : "Selected";
  }
}

export function updateStartReady(state, E) {
  const nameOk = state.name.trim().length >= 1;
  const genderOk = Boolean(state.gender);
  const classOk = Boolean(state.selectedIdentityId);

  const ok = nameOk && genderOk && classOk;
  E.btnStartLife.disabled = !ok;

  if (!nameOk) E.startStatus.textContent = "Enter a name.";
  else if (!genderOk) E.startStatus.textContent = "Select a gender.";
  else if (!classOk) E.startStatus.textContent = "Select a class.";
  else E.startStatus.textContent = "Ready. Start your life when you’re ready.";
}