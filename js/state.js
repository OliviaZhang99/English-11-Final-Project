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
  // start
  selectedIdentityId: null,
  selectedLocationId: null,
  name: "",
  gender: "",
  inGame: false,

  // time
  age: 0,
  year: 0,

  // world
  locationLabel: "—",
  country: "—",
  lawStrictness: 50,   // 0–100

  // identity + life
  background: "—",
  education: "Child",
  money: 0,
  hobby: "—",

  // core stats
  health: 50,
  hope: 50,
  trust: 50,
  connections: 15,

  // school/work realism
  grade: 75,        // 0–100
  reputation: 50,   // 0–100

  inSchool: false,
  schoolType: "—",      // Elementary / High School / Community / State / Ivy / Grad
  major: "—",
  degreeLevel: "—",     // — / HS Diploma / Associate / Bachelor / Master / PhD
  yearsInProgram: 0,
  programLength: 0,

  working: false,
  jobTitle: "—",
  salary: 0,

  // record / jail
  record: "Clean",
  inJail: false,
  jailYearsLeft: 0,

  // achievements + contests
  achievements: [],         // strings like "Math Contest: 92 (Top 10%)"
  contestHistory: [],       // { name, score, placement, age }
  contestRep: {             // cumulative “resume strength”
    math: 0,
    cs: 0,
    chem: 0,
    physics: 0,
    bio: 0
  },

  // business
  business: {
    active: false,
    type: "—",
    stage: "—",             // Idea / Early / Growing
    yearsActive: 0,
    cashflow: 0,            // yearly average
    risk: 50,               // 0–100 (higher = more likely to fail)
  },

  // control
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