import { hobbies } from "./data.hobbies.js";

export function openHobbyModal(state, E) {
  state.pendingHobbyId = state.selectedHobbyId || null;
  renderHobbyChoices(state, E);

  E.btnConfirmHobby.disabled = !state.pendingHobbyId;
  E.modalHint.textContent = state.pendingHobbyId ? "Ready to confirm." : "Select a hobby to confirm.";

  E.modalOverlay.hidden = false;
  E.hobbyModal.hidden = false;
  document.body.style.overflow = "hidden";
  E.btnCloseModal.focus();
}

export function closeHobbyModal(E) {
  E.modalOverlay.hidden = true;
  E.hobbyModal.hidden = true;
  document.body.style.overflow = "";
}

export function renderHobbyChoices(state, E) {
  E.hobbyGrid.innerHTML = "";

  hobbies.forEach((h) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.setAttribute("aria-pressed", String(state.pendingHobbyId === h.id));

    btn.innerHTML = `
      <div class="choice-title">${h.title}</div>
      <div class="choice-desc">${h.desc}</div>
    `;

    btn.addEventListener("click", () => {
      state.pendingHobbyId = h.id;
      renderHobbyChoices(state, E);
      E.btnConfirmHobby.disabled = false;
      E.modalHint.textContent = "Ready to confirm.";
    });

    E.hobbyGrid.appendChild(btn);
  });
}
