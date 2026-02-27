import { identities } from "./data.identities.js";
import { locations } from "./data.locations.js";

export function renderLocationChoices(state, E, updateStartReady) {
  E.selectLocation.innerHTML = `<option value="">Select</option>`;
  for (const loc of locations) {
    const opt = document.createElement("option");
    opt.value = loc.id;
    opt.textContent = `${loc.city}, ${loc.country}`;
    E.selectLocation.appendChild(opt);
  }
  E.selectLocation.value = state.selectedLocationId ?? "";

  E.selectLocation.onchange = () => {
    state.selectedLocationId = E.selectLocation.value || null;
    updateStartReady();
  };
}

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

    btn.onclick = () => {
      state.selectedIdentityId = it.id;
      renderClassChoices(state, E, updateStartReady);
      updateStartReady();
    };

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
  const locOk = Boolean(state.selectedLocationId);

  const ok = nameOk && genderOk && classOk && locOk;
  E.btnStartLife.disabled = !ok;

  if (!nameOk) E.startStatus.textContent = "Enter a name.";
  else if (!genderOk) E.startStatus.textContent = "Select a gender.";
  else if (!locOk) E.startStatus.textContent = "Select a city and country.";
  else if (!classOk) E.startStatus.textContent = "Select a class.";
  else E.startStatus.textContent = "Ready.";
}