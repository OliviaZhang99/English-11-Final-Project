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
  selectedLocationId: null,
  name: "",
  gender: "",
  inGame: false,

  age: 0,
  year: 0,

  locationLabel: "—",
  country: "—",
  moneyMult: 1.0,
  lawStrictness: 50,

  background: "—",
  education: "Child",
  money: 0,
  hobby: "—",

  health: 50,
  hope: 50,
  trust: 50,
  connections: 15,

  grade: 75,
  reputation: 50,

  // school/career
  inSchool: false,
  schoolType: "—",
  major: "—",
  degreeLevel: "—",      // — / HS Diploma / Associate / Bachelor / Master / PhD
  yearsInProgram: 0,
  programLength: 0,

  // contest strength (for admissions realism)
  contestStrength: 0, // grows with rankings

  record: "Clean",

  usedEventIds: [],
  flags: {},
  pendingEvents: [],
  awaitingChoice: false,
});

export const applyDelta = (state, delta) => {
  if (!delta) return;

  for (const k of Object.keys(delta)) {
    if (typeof delta[k] === "number") state[k] = (state[k] ?? 0) + delta[k];
  }

  state.health = clamp(state.health, 0, 100);
  state.hope = clamp(state.hope, 0, 100);
  state.trust = clamp(state.trust, 0, 100);
  state.connections = clamp(state.connections, 0, 100);

  state.grade = clamp(state.grade, 0, 100);
  state.reputation = clamp(state.reputation, 0, 100);
  state.lawStrictness = clamp(state.lawStrictness, 0, 100);
};