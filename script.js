const identities = [
  {
    id: "upper",
    title: "Upper Class",
    desc: "More money and connections. Reputation is a currency.",
    background: "Upper",
    start: { money: 42000, health: 55, hope: 55, trust: 45, connections: 30, grade: 78, reputation: 55 }
  },
  {
    id: "middle",
    title: "Middle Class",
    desc: "Balanced start. Consistency matters.",
    background: "Middle",
    start: { money: 12000, health: 55, hope: 50, trust: 50, connections: 15, grade: 75, reputation: 50 }
  },
  {
    id: "working",
    title: "Working Class",
    desc: "Low money, higher pressure. Progress compounds if you survive it.",
    background: "Working",
    start: { money: 2500, health: 50, hope: 45, trust: 55, connections: 10, grade: 72, reputation: 48 }
  }
];

const locations = [
  { id: "vancouver_ca", city: "Vancouver", country: "Canada", moneyMult: 1.00 },
  { id: "toronto_ca", city: "Toronto", country: "Canada", moneyMult: 1.05 },
  { id: "newyork_us", city: "New York", country: "United States", moneyMult: 1.20 },
  { id: "london_uk", city: "London", country: "United Kingdom", moneyMult: 1.10 },
  { id: "tokyo_jp", city: "Tokyo", country: "Japan", moneyMult: 1.12 }
];

const hobbies = [
  { id: "music", title: "Music", boost: { hope: +7, connections: +4 } },
  { id: "sports", title: "Sports", boost: { health: +7, trust: +4 } },
  { id: "art", title: "Art", boost: { hope: +5, trust: +5 } },
  { id: "coding", title: "Coding", boost: { connections: +5, money: +800 } },
  { id: "dance", title: "Dance", boost: { health: +4, hope: +4 } }
];

const eventsByAge = {
  1: [
    {
      title: "Three toys",
      body: "A red car. A tiny piano. A box of blocks.\n\nWhich one do you reach for?",
      choices: [
        { text: "The red car", delta: { connections: +2, trust: +1 }, log: "You like motion." },
        { text: "The piano", delta: { hope: +3, connections: +1 }, log: "You like expression." },
        { text: "The blocks", delta: { grade: +2, hope: +1 }, log: "You like building." }
      ]
    }
  ],
  6: [
    {
      title: "After-school sign-up day",
      body: "A brochure lands on the table.\n\nPick something. You might become it before you realize it.",
      choices: hobbies.map(h => ({
        text: h.title,
        delta: h.boost,
        setHobby: h.title,
        log: `You start ${h.title.toLowerCase()}.`
      }))
    }
  ],
  12: [
    {
      title: "Expectations get louder",
      body: "At home, someone expects you to prioritize stability over what you actually want.",
      choices: [
        { text: "Communicate calmly", delta: { trust: +4, hope: +2 }, log: "You protected your goals without burning bridges." },
        { text: "Argue and shut down", delta: { trust: -5, hope: -2 }, log: "You felt heard for a second, then regret hit." }
      ]
    }
  ],
  15: [
    {
      title: "A party invite",
      body: "You get invited.\n\nYou also have something due tomorrow.",
      choices: [
        { text: "Go anyway", delta: { hope: +3, grade: -3, reputation: +1 }, log: "You live a little. Tomorrow hurts." },
        { text: "Stay and finish the work", delta: { grade: +4, hope: -1 }, log: "You choose future-you." },
        { text: "Go for one hour then leave", delta: { hope: +2, grade: -1, reputation: +1 }, log: "You compromise." }
      ]
    }
  ],
  17: [
    {
      title: "Applications season",
      body: "You pick where to apply.\n\nGrades matter. Reputation matters. Trust and connections matter more than people admit.",
      choices: [
        { text: "Apply to university", delta: { hope: +1, reputation: +2 }, setSchool: "University", setDegree: "Bachelor", log: "You take the leap." },
        { text: "Choose community college", delta: { hope: +1 }, setSchool: "Community College", setDegree: "Associate", log: "You choose the practical route." },
        { text: "Work first", delta: { money: +1200, hope: +1 }, setSchool: "—", log: "You buy time and breathing room." }
      ]
    }
  ]
};

const $ = (sel) => document.querySelector(sel);

const E = {
  screenStart: $("#screenStart"),
  screenGame: $("#screenGame"),
  identityGrid: $("#identityGrid"),
  identityPicked: $("#identityPicked"),
  inputName: $("#inputName"),
  selectGender: $("#selectGender"),
  selectLocation: $("#selectLocation"),
  btnStartLife: $("#btnStartLife"),
  startStatus: $("#startStatus"),
  btnReset: $("#btnReset"),
  btnBackToStart: $("#btnBackToStart"),
  btnNextYear: $("#btnNextYear"),
  lockNote: $("#lockNote"),
  avatarCaption: $("#avatarCaption"),
  sidebarIdentity: $("#sidebarIdentity"),
  statAge: $("#statAge"),
  statLocation: $("#statLocation"),
  statBackground: $("#statBackground"),
  statEducation: $("#statEducation"),
  statMoney: $("#statMoney"),
  statHobby: $("#statHobby"),
  statGrade: $("#statGrade"),
  statReputation: $("#statReputation"),
  statSchool: $("#statSchool"),
  statMajor: $("#statMajor"),
  statDegree: $("#statDegree"),
  statRecord: $("#statRecord"),
  barHealth: $("#barHealth"),
  barHope: $("#barHope"),
  barTrust: $("#barTrust"),
  barConn: $("#barConn"),
  barHealthVal: $("#barHealthVal"),
  barHopeVal: $("#barHopeVal"),
  barTrustVal: $("#barTrustVal"),
  barConnVal: $("#barConnVal"),
  timelineSub: $("#timelineSub"),
  eventTitle: $("#eventTitle"),
  eventBody: $("#eventBody"),
  choiceRow: $("#choiceRow"),
  lifeLog: $("#lifeLog")
};

function defaultState() {
  return {
    selectedIdentityId: null,
    selectedLocationId: null,
    name: "",
    gender: "",
    age: 0,
    year: 0,
    locationLabel: "—",
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
    schoolType: "—",
    major: "—",
    degreeLevel: "—",
    record: "Clean",
    awaitingChoice: false
  };
}

let state = defaultState();

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function fmtMoney(n) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(Math.round(n)).toLocaleString("en-CA")}`;
}

function educationFromAge(age) {
  if (age <= 5) return "Child";
  if (age <= 12) return "Elementary";
  if (age <= 17) return "High School";
  if (age <= 22) return "Post-Secondary";
  return "Adult";
}

function showScreen(which) {
  E.screenStart.classList.remove("active");
  E.screenGame.classList.remove("active");
  if (which === "start") E.screenStart.classList.add("active");
  else E.screenGame.classList.add("active");
}

function applyDelta(delta = {}) {
  for (const key in delta) {
    if (typeof delta[key] === "number") state[key] = (state[key] || 0) + delta[key];
  }
  state.health = clamp(state.health, 0, 100);
  state.hope = clamp(state.hope, 0, 100);
  state.trust = clamp(state.trust, 0, 100);
  state.connections = clamp(state.connections, 0, 100);
  state.grade = clamp(state.grade, 0, 100);
  state.reputation = clamp(state.reputation, 0, 100);
}

function renderSidebar() {
  state.education = educationFromAge(state.age);
  E.sidebarIdentity.textContent = `${state.background} • ${state.education}`;
  E.statAge.textContent = state.age;
  E.statLocation.textContent = state.locationLabel;
  E.statBackground.textContent = state.background;
  E.statEducation.textContent = state.education;
  E.statMoney.textContent = fmtMoney(state.money);
  E.statHobby.textContent = state.hobby;
  E.statGrade.textContent = Math.round(state.grade);
  E.statReputation.textContent = Math.round(state.reputation);
  E.statSchool.textContent = state.schoolType;
  E.statMajor.textContent = state.major;
  E.statDegree.textContent = state.degreeLevel;
  E.statRecord.textContent = state.record;
  E.avatarCaption.textContent = state.name ? `${state.name}${state.hobby !== "—" ? " • " + state.hobby : ""}` : "—";

  E.barHealth.style.width = `${state.health}%`;
  E.barHope.style.width = `${state.hope}%`;
  E.barTrust.style.width = `${state.trust}%`;
  E.barConn.style.width = `${state.connections}%`;

  E.barHealthVal.textContent = state.health;
  E.barHopeVal.textContent = state.hope;
  E.barTrustVal.textContent = state.trust;
  E.barConnVal.textContent = state.connections;
}

function logLine(text) {
  const row = document.createElement("div");
  row.textContent = text;
  E.lifeLog.prepend(row);
}

function renderLocationChoices() {
  E.selectLocation.innerHTML = `<option value="">Select</option>`;
  locations.forEach(loc => {
    const opt = document.createElement("option");
    opt.value = loc.id;
    opt.textContent = `${loc.city}, ${loc.country}`;
    E.selectLocation.appendChild(opt);
  });
}

function renderClassChoices() {
  E.identityGrid.innerHTML = "";
  identities.forEach(it => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice" + (state.selectedIdentityId === it.id ? " active" : "");
    btn.innerHTML = `<div><strong>${it.title}</strong></div><div class="muted small">${it.desc}</div>`;
    btn.addEventListener("click", () => {
      state.selectedIdentityId = it.id;
      renderClassChoices();
      updateStartReady();
    });
    E.identityGrid.appendChild(btn);
  });

  const chosen = identities.find(i => i.id === state.selectedIdentityId);
  E.identityPicked.textContent = chosen ? chosen.title : "Not selected";
}

function updateStartReady() {
  const ok = state.name.trim() && state.gender && state.selectedIdentityId && state.selectedLocationId;
  E.btnStartLife.disabled = !ok;

  if (!state.name.trim()) E.startStatus.textContent = "Enter a name.";
  else if (!state.gender) E.startStatus.textContent = "Select a gender.";
  else if (!state.selectedLocationId) E.startStatus.textContent = "Select a city and country.";
  else if (!state.selectedIdentityId) E.startStatus.textContent = "Select a class.";
  else E.startStatus.textContent = "Ready.";
}

function setAwaitingChoice(on) {
  state.awaitingChoice = on;
  E.btnNextYear.disabled = on;
  E.lockNote.hidden = !on;
}

function renderEvent(ev) {
  E.eventTitle.textContent = `Age ${state.age} — ${ev.title}`;
  E.eventBody.textContent = ev.body;
  E.choiceRow.innerHTML = "";
  setAwaitingChoice(true);

  ev.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn ghost";
    btn.textContent = choice.text;

    btn.addEventListener("click", () => {
      applyDelta(choice.delta);
      if (choice.setHobby) state.hobby = choice.setHobby;
      if (choice.setSchool) state.schoolType = choice.setSchool;
      if (choice.setDegree) state.degreeLevel = choice.setDegree;
      if (choice.log) logLine(choice.log);

      renderSidebar();
      E.choiceRow.innerHTML = "";
      setAwaitingChoice(false);
    });

    E.choiceRow.appendChild(btn);
  });
}

function startLife() {
  const ident = identities.find(i => i.id === state.selectedIdentityId);
  const loc = locations.find(l => l.id === state.selectedLocationId);
  if (!ident || !loc) return;

  const savedName = state.name.trim();
  const savedGender = state.gender;

  state = {
    ...defaultState(),
    selectedIdentityId: ident.id,
    selectedLocationId: loc.id,
    name: savedName,
    gender: savedGender,
    background: ident.background,
    locationLabel: `${loc.city}, ${loc.country}`,
    money: Math.round(ident.start.money * loc.moneyMult),
    health: ident.start.health,
    hope: ident.start.hope,
    trust: ident.start.trust,
    connections: ident.start.connections,
    grade: ident.start.grade,
    reputation: ident.start.reputation
  };

  showScreen("game");
  renderSidebar();
  E.timelineSub.textContent = `Age 0.`;
  E.eventTitle.textContent = `Age 0 — A first breath`;
  E.eventBody.textContent = `${state.name} opens their eyes in ${state.locationLabel}.\n\nNo manual. No guarantees.\nJust time and what you do with it.`;
  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";
  logLine(`Name: ${state.name}. Gender: ${state.gender}.`);
  logLine(`Location: ${state.locationLabel}.`);
  logLine(`Class: ${ident.title}.`);
}

function advanceYear() {
  if (state.awaitingChoice) return;

  state.age += 1;
  state.year += 1;
  state.money += 250;
  state.education = educationFromAge(state.age);

  renderSidebar();
  E.timelineSub.textContent = `Age ${state.age}.`;

  const pool = eventsByAge[state.age];
  if (pool && pool.length) {
    renderEvent(pool[0]);
  } else {
    E.eventTitle.textContent = `Age ${state.age} — Another year`;
    E.eventBody.textContent = "Time passes. Small choices still shape you.";
    E.choiceRow.innerHTML = "";
  }
}

function resetAll() {
  state = defaultState();
  E.inputName.value = "";
  E.selectGender.value = "";
  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";
  E.eventTitle.textContent = "—";
  E.eventBody.textContent = "—";
  renderLocationChoices();
  renderClassChoices();
  updateStartReady();
  showScreen("start");
}

function init() {
  renderLocationChoices();
  renderClassChoices();
  updateStartReady();
  showScreen("start");

  E.inputName.addEventListener("input", () => {
    state.name = E.inputName.value;
    updateStartReady();
  });

  E.selectGender.addEventListener("change", () => {
    state.gender = E.selectGender.value;
    updateStartReady();
  });

  E.selectLocation.addEventListener("change", () => {
    state.selectedLocationId = E.selectLocation.value || null;
    updateStartReady();
  });

  E.btnStartLife.addEventListener("click", startLife);
  E.btnNextYear.addEventListener("click", advanceYear);
  E.btnBackToStart.addEventListener("click", () => showScreen("start"));
  E.btnReset.addEventListener("click", resetAll);
}

init();