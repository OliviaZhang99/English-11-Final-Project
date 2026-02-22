export const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export const fmtMoney = (n) => {
  const sign = n < 0 ? "-" : "";
  const v = Math.abs(Math.round(n));
  return `${sign}$${v.toLocaleString("en-CA")}`;
};

export const educationFromAge = (age) => {
  if (age <= 5) return "Child";
  if (age <= 12) return "Elementary";
  if (age <= 17) return "High School";
  if (age <= 22) return "Post-Secondary";
  return "Adult";
};

export const defaultState = () => ({
  selectedIdentityId: null,
  selectedHobbyId: null,
  pendingHobbyId: null,
  inGame: false,

  age: 0,
  year: 0,
  background: "—",
  education: "Child",
  money: 0,
  hobby: "—",
  health: 50,
  hope: 50,
  trust: 50,
  connections: 15,

  usedEventIds: [] // NEW: track events already seen this life
});

export const applyDelta = (state, delta) => {
  if (!delta) return;

  if (typeof delta.money === "number") state.money += delta.money;
  if (typeof delta.health === "number") state.health += delta.health;
  if (typeof delta.hope === "number") state.hope += delta.hope;
  if (typeof delta.trust === "number") state.trust += delta.trust;
  if (typeof delta.connections === "number") state.connections += delta.connections;

  state.health = clamp(state.health, 0, 100);
  state.hope = clamp(state.hope, 0, 100);
  state.trust = clamp(state.trust, 0, 100);
  state.connections = clamp(state.connections, 0, 100);
};