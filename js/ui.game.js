import { fmtMoney, clamp } from "./state.js";

export function showScreen(E, which) {
  const isStart = which === "start";
  E.screenStart.classList.toggle("screen-active", isStart);
  E.screenGame.classList.toggle("screen-active", !isStart);
}

export function setBars(state, E) {
  const h = clamp(state.health, 0, 100);
  const ho = clamp(state.hope, 0, 100);
  const t = clamp(state.trust, 0, 100);
  const c = clamp(state.connections, 0, 100);

  E.barHealth.style.width = `${h}%`;
  E.barHope.style.width = `${ho}%`;
  E.barTrust.style.width = `${t}%`;
  E.barConn.style.width = `${c}%`;

  E.barHealthVal.textContent = String(h);
  E.barHopeVal.textContent = String(ho);
  E.barTrustVal.textContent = String(t);
  E.barConnVal.textContent = String(c);
}

export function renderSidebar(state, E) {
  E.sidebarIdentity.textContent = `${state.background} • ${state.education}`;
  E.statAge.textContent = String(state.age);
  E.statBackground.textContent = state.background;
  E.statEducation.textContent = state.education;
  E.statMoney.textContent = fmtMoney(state.money);
  E.statHobby.textContent = state.hobby || "—";

  if (E.yearChip) E.yearChip.hidden = true;

  setBars(state, E);
}

export function logLine(E, text) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const p = document.createElement("div");
  p.textContent = `[${time}] ${text}`;
  E.lifeLog.prepend(p);
}
