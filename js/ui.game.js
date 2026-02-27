import { fmtMoney, clamp } from "./state.js";

export function showScreen(E, which) {
  const isStart = which === "start";
  E.screenStart.classList.toggle("screen-active", isStart);
  E.screenGame.classList.toggle("screen-active", !isStart);
}

function setBars(state, E) {
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
  E.statLocation.textContent = state.locationLabel ?? "—";
  E.statBackground.textContent = state.background;
  E.statEducation.textContent = state.education;
  E.statMoney.textContent = fmtMoney(state.money);
  E.statHobby.textContent = state.hobby || "—";
  E.statGrade.textContent = String(Math.round(state.grade));
  E.statReputation.textContent = String(Math.round(state.reputation));
  E.statSchool.textContent = state.schoolType || "—";
  E.statMajor.textContent = state.major || "—";
  E.statDegree.textContent = state.degreeLevel || "—";
  E.statRecord.textContent = state.record || "Clean";

  const hobby = (state.hobby && state.hobby !== "—") ? ` • ${state.hobby}` : "";
  E.avatarCaption.textContent = `${state.name}${hobby}`;

  setBars(state, E);
}

export function logLine(E, text) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const p = document.createElement("div");
  p.textContent = `[${time}] ${text}`;
  E.lifeLog.prepend(p);
}

export function showDeltaPopup(delta) {
  const keys = Object.keys(delta || {}).filter(k => typeof delta[k] === "number" && delta[k] !== 0);
  if (keys.length === 0) return;

  const nice = (k) => ({
    money: "Money",
    health: "Health",
    hope: "Hope",
    trust: "Trust",
    connections: "Connections",
    grade: "Grade",
    reputation: "Reputation"
  }[k] || k);

  const parts = keys.map(k => {
    const v = delta[k];
    const sign = v > 0 ? "+" : "";
    return `${sign}${Math.round(v)} ${nice(k)}`;
  });

  const box = document.createElement("div");
  box.className = "delta-popup";
  box.textContent = parts.join("  •  ");
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 1350);
}