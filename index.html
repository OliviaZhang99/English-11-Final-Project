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
  { id: "vancouver_ca", city: "Vancouver", country: "Canada", moneyMult: 1.00, lawStrictness: 55 },
  { id: "toronto_ca", city: "Toronto", country: "Canada", moneyMult: 1.05, lawStrictness: 60 },
  { id: "newyork_us", city: "New York", country: "United States", moneyMult: 1.20, lawStrictness: 62 },
  { id: "losangeles_us", city: "Los Angeles", country: "United States", moneyMult: 1.12, lawStrictness: 58 },
  { id: "london_uk", city: "London", country: "United Kingdom", moneyMult: 1.10, lawStrictness: 60 },
  { id: "tokyo_jp", city: "Tokyo", country: "Japan", moneyMult: 1.12, lawStrictness: 70 },
  { id: "seoul_kr", city: "Seoul", country: "South Korea", moneyMult: 1.08, lawStrictness: 72 },
  { id: "singapore_sg", city: "Singapore", country: "Singapore", moneyMult: 1.15, lawStrictness: 82 }
];

const hobbies = [
  { id: "music", title: "Music", boost: { hope: +7, connections: +4 } },
  { id: "sports", title: "Sports", boost: { health: +7, trust: +4 } },
  { id: "art", title: "Art", boost: { hope: +5, trust: +5 } },
  { id: "coding", title: "Coding", boost: { connections: +5, money: +800 } },
  { id: "debate", title: "Debate", boost: { trust: +6, connections: +4 } },
  { id: "volunteer", title: "Volunteer Work", boost: { trust: +7, hope: +3 } },
  { id: "writing", title: "Writing", boost: { hope: +4, trust: +3 } },
  { id: "dance", title: "Dance", boost: { health: +4, hope: +4 } },
  { id: "photography", title: "Photography", boost: { hope: +3, connections: +3 } },
  { id: "gaming", title: "Gaming", boost: { hope: +3, connections: +2 } }
];

const majors = [
  { id: "cs", title: "Computer Science", salary: 76000 },
  { id: "business", title: "Business", salary: 62000 },
  { id: "engineering", title: "Engineering", salary: 82000 },
  { id: "psych", title: "Psychology", salary: 54000 },
  { id: "bio", title: "Biology", salary: 56000 },
  { id: "arts", title: "Arts", salary: 47000 },
  { id: "nursing", title: "Nursing", salary: 78000 },
  { id: "law", title: "Pre-Law", salary: 69000 },
  { id: "econ", title: "Economics", salary: 68000 },
  { id: "education", title: "Education", salary: 53000 }
];

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
    country: "—",
    background: "—",
    education: "Child",
    moneyMult: 1,
    lawStrictness: 50,
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
    career: "—",
    salary: 0,
    company: "None",
    companyValue: 0,
    relationship: "Single",
    kids: 0,
    illness: "None",
    awaitingChoice: false,
    usedEvents: new Set(),
    typeToken: 0
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

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sampleUnused(pool, count = 1) {
  const unused = pool.filter(ev => !state.usedEvents.has(ev.id));
  if (unused.length === 0) return [];
  const copy = [...unused];
  const chosen = [];
  while (copy.length && chosen.length < count) {
    const i = randInt(0, copy.length - 1);
    chosen.push(copy.splice(i, 1)[0]);
  }
  return chosen;
}

function showScreen(which) {
  E.screenStart.classList.remove("active");
  E.screenGame.classList.remove("active");
  if (which === "start") E.screenStart.classList.add("active");
  else E.screenGame.classList.add("active");
}

function applyDelta(delta = {}) {
  for (const key in delta) {
    if (typeof delta[key] === "number") {
      state[key] = (state[key] || 0) + delta[key];
    }
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

  let caption = state.name || "—";
  if (state.hobby !== "—") caption += ` • ${state.hobby}`;
  if (state.illness !== "None") caption += ` • ${state.illness}`;
  E.avatarCaption.textContent = caption;

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

function typeText(text) {
  state.typeToken += 1;
  const token = state.typeToken;
  E.eventBody.textContent = "";
  let i = 0;

  function tick() {
    if (token !== state.typeToken) return;
    if (i < text.length) {
      E.eventBody.textContent += text[i];
      i++;
      setTimeout(tick, 10);
    }
  }

  tick();
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

function renderLocationChoices() {
  E.selectLocation.innerHTML = `<option value="">Select</option>`;
  locations.forEach((loc) => {
    const opt = document.createElement("option");
    opt.value = loc.id;
    opt.textContent = `${loc.city}, ${loc.country}`;
    E.selectLocation.appendChild(opt);
  });
}

function renderClassChoices() {
  E.identityGrid.innerHTML = "";
  identities.forEach((it) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice" + (state.selectedIdentityId === it.id ? " active" : "");
    btn.innerHTML = `
      <div><strong>${it.title}</strong></div>
      <div class="muted small">${it.desc}</div>
    `;
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

function setAwaitingChoice(on) {
  state.awaitingChoice = on;
  E.btnNextYear.disabled = on;
  E.lockNote.hidden = !on;
}

function checkDeath() {
  if (state.hope <= 0) {
    endLife("Hope ran out.");
    return true;
  }
  if (state.health <= 0) {
    endLife("Your health failed.");
    return true;
  }
  return false;
}

function endLife(reason) {
  E.eventTitle.textContent = `Age ${state.age} — The end`;
  E.eventBody.textContent =
    `${reason}\n\nFinal summary:\n` +
    `Money: ${fmtMoney(state.money)}\n` +
    `Reputation: ${Math.round(state.reputation)}\n` +
    `Trust: ${Math.round(state.trust)}\n` +
    `Connections: ${Math.round(state.connections)}\n` +
    `School: ${state.schoolType}\n` +
    `Major: ${state.major}\n` +
    `Degree: ${state.degreeLevel}\n` +
    `Career: ${state.career}\n` +
    `Relationship: ${state.relationship}\n` +
    `Record: ${state.record}`;
  E.choiceRow.innerHTML = "";
  setAwaitingChoice(true);
  E.btnNextYear.disabled = true;
  logLine(`Life ended. Reason: ${reason}`);
}

function renderEvent(ev) {
  if (!ev) return;

  state.usedEvents.add(ev.id);

  E.eventTitle.textContent = `Age ${state.age} — ${ev.title}`;
  typeText(ev.body);
  E.choiceRow.innerHTML = "";
  setAwaitingChoice(true);

  ev.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn ghost";
    btn.textContent = choice.text;

    btn.addEventListener("click", () => {
      if (choice.apply) choice.apply();
      applyDelta(choice.delta || {});
      if (choice.log) logLine(choice.log);
      renderSidebar();

      if (!checkDeath()) {
        E.choiceRow.innerHTML = "";
        setAwaitingChoice(false);
      }
    });

    E.choiceRow.appendChild(btn);
  });
}

function chooseMajorEvent() {
  return {
    id: `major_pick_${state.age}`,
    title: "Choose a major",
    body: "You pick a direction. It will shape your opportunities, your salary, and how people imagine your future.",
    choices: majors.map((m) => ({
      text: m.title,
      apply() {
        state.major = m.title;
        state.salary = m.salary;
        logLine(`You choose ${m.title}.`);
      },
      delta: { hope: +1 }
    }))
  };
}

function buildStageEvent(id, title, body, choices) {
  return { id, title, body, choices };
}

const childEvents = [
  buildStageEvent("child_1", "A new kid", "A new kid sits alone at lunch. You notice before anyone else does.", [
    { text: "Sit with them", delta: { connections: +3, trust: +2 }, log: "You make space for them." },
    { text: "Wave but stay with your group", delta: { connections: +1 }, log: "You try, halfway." },
    { text: "Ignore it", delta: { hope: -1 }, log: "You tell yourself it is not your job." }
  ]),
  buildStageEvent("child_2", "Something breaks", "You knock something over. It shatters. Footsteps are coming.", [
    { text: "Tell the truth", delta: { trust: +3, reputation: +1 }, log: "You own it." },
    { text: "Hide it", delta: { trust: -1, hope: +1 }, log: "You learn damage control." },
    { text: "Blame someone else", delta: { trust: -3, reputation: -2 }, log: "You protect yourself. It costs." }
  ]),
  buildStageEvent("child_3", "A school prize", "Your teacher says your work is the best in class. Other kids notice too.", [
    { text: "Feel proud", delta: { hope: +2, reputation: +2 }, log: "Recognition feels good." },
    { text: "Stay humble", delta: { trust: +2, reputation: +1 }, log: "You do not gloat." },
    { text: "Downplay it", delta: { hope: -1 }, log: "You shrink to keep peace." }
  ]),
  buildStageEvent("child_4", "Group project", "One person in your group does almost nothing. The deadline is tomorrow.", [
    { text: "Do extra and save it", delta: { grade: +2, hope: -1 }, log: "You carry the weight." },
    { text: "Tell the teacher", delta: { trust: +1, reputation: +1 }, log: "You ask for fairness." },
    { text: "Let it fail", delta: { grade: -2, hope: +1 }, log: "You stop rescuing everyone." }
  ]),
  buildStageEvent("child_5", "Field trip money", "A trip is coming up. Not everyone can go easily.", [
    { text: "Go if you can", delta: { hope: +2, connections: +2 }, log: "You make a memory." },
    { text: "Stay back quietly", delta: { hope: -1, trust: +1 }, log: "You tell yourself it is fine." },
    { text: "Ask for help", delta: { trust: +2, hope: +1 }, log: "You let someone support you." }
  ]),
  buildStageEvent("child_6", "A rumor", "You hear something embarrassing about another kid. It spreads fast.", [
    { text: "Stop it", delta: { trust: +3, connections: -1 }, log: "You refuse easy cruelty." },
    { text: "Repeat it", delta: { reputation: -2, connections: +1 }, log: "It buys attention. Briefly." },
    { text: "Say nothing", delta: { hope: -1 }, log: "Silence still has a shape." }
  ]),
  buildStageEvent("child_7", "Practice vs play", "You could practice and get better, or play and feel free.", [
    { text: "Practice", delta: { grade: +2, hope: -1 }, log: "Discipline starts early." },
    { text: "Play", delta: { hope: +2 }, log: "Joy matters too." },
    { text: "Do a little of both", delta: { hope: +1, grade: +1 }, log: "Balance is imperfect but real." }
  ]),
  buildStageEvent("child_8", "Lunch trade", "Someone wants your lunch because theirs is not enough.", [
    { text: "Share it", delta: { trust: +3, hope: +1 }, log: "Care becomes practical." },
    { text: "Say no kindly", delta: { trust: +1 }, log: "You set a boundary." },
    { text: "Mock them", delta: { trust: -4, reputation: -2 }, log: "It lands badly." }
  ]),
  buildStageEvent("child_9", "The library corner", "A teacher notices what you keep choosing to read.", [
    { text: "Lean into it", delta: { grade: +2, hope: +1 }, log: "A quiet talent starts to show." },
    { text: "Pretend you do not care", delta: { hope: -1 }, log: "You hide what you love." },
    { text: "Ask for more books", delta: { trust: +2, grade: +1 }, log: "Curiosity gets fed." }
  ]),
  buildStageEvent("child_10", "A little lie", "A small lie would make things easier right now.", [
    { text: "Tell it", delta: { trust: -2, hope: +1 }, log: "It works. For now." },
    { text: "Tell the truth", delta: { trust: +2, reputation: +1 }, log: "It costs less in the long run." },
    { text: "Say nothing", delta: { trust: -1 }, log: "Avoidance becomes a habit." }
  ]),
  buildStageEvent("child_11", "A birthday party", "You were not invited. You only find out because everyone else is talking about it.", [
    { text: "Act like it does not matter", delta: { hope: -1, trust: -1 }, log: "It matters anyway." },
    { text: "Ask about it", delta: { trust: +1 }, log: "You choose directness." },
    { text: "Make other plans", delta: { hope: +2 }, log: "You keep moving." }
  ]),
  buildStageEvent("child_12", "A teacher checks in", "Someone older notices you are quieter than usual.", [
    { text: "Open up", delta: { trust: +3, hope: +2 }, log: "Being seen helps." },
    { text: "Say you are fine", delta: { hope: -1 }, log: "You hold it alone." },
    { text: "Change the subject", delta: { trust: -1 }, log: "Distance protects you." }
  ]),
  buildStageEvent("child_13", "Sports tryout", "A spot opens on a team. It scares you exactly enough to matter.", [
    { text: "Try out", delta: { health: +2, hope: +2, trust: +1 }, log: "You risk being seen." },
    { text: "Skip it", delta: { hope: -1 }, log: "The chance closes quietly." },
    { text: "Practice first, then decide", delta: { health: +1, hope: +1 }, log: "You prepare before leaping." }
  ]),
  buildStageEvent("child_14", "A lost item", "You find something that clearly belongs to someone else.", [
    { text: "Return it", delta: { trust: +3, reputation: +1 }, log: "You do the right thing." },
    { text: "Keep it", delta: { trust: -3, hope: +1 }, log: "It feels smaller later." },
    { text: "Leave it there", delta: { trust: -1 }, log: "You decide it is not your problem." }
  ]),
  buildStageEvent("child_15", "Rainy day inside", "The room feels loud and restless. Everyone wants something different.", [
    { text: "Organize a game", delta: { connections: +2, reputation: +1 }, log: "You create order." },
    { text: "Stay by yourself", delta: { hope: +1 }, log: "Solitude becomes familiar." },
    { text: "Go along with the loudest group", delta: { connections: +1, trust: -1 }, log: "You blend in." }
  ]),
  buildStageEvent("child_16", "Homework forgotten", "You forgot something important and class is about to start.", [
    { text: "Admit it", delta: { trust: +2, grade: -1 }, log: "Honesty softens the hit." },
    { text: "Make an excuse", delta: { trust: -2, hope: +1 }, log: "You buy time." },
    { text: "Copy quickly", delta: { grade: +1, trust: -3 }, log: "You save the moment, not the habit." }
  ]),
  buildStageEvent("child_17", "A class pet", "The class needs someone responsible this week.", [
    { text: "Volunteer", delta: { trust: +3, reputation: +1 }, log: "You become dependable." },
    { text: "Avoid it", delta: { hope: +1 }, log: "You keep your week lighter." },
    { text: "Volunteer with a friend", delta: { trust: +1, connections: +2 }, log: "Responsibility feels easier together." }
  ]),
  buildStageEvent("child_18", "The art wall", "Your work gets pinned up where everyone can see it.", [
    { text: "Enjoy it", delta: { hope: +2, reputation: +1 }, log: "You let yourself shine." },
    { text: "Pretend not to care", delta: { hope: -1 }, log: "You hide your pride." },
    { text: "Encourage someone else too", delta: { trust: +2, connections: +1 }, log: "You widen the spotlight." }
  ]),
  buildStageEvent("child_19", "A teammate cries", "Someone on your team makes a mistake and starts crying.", [
    { text: "Comfort them", delta: { trust: +3, connections: +1 }, log: "Kindness changes the room." },
    { text: "Tell them to toughen up", delta: { trust: -3, reputation: -1 }, log: "The room gets colder." },
    { text: "Look away", delta: { hope: -1 }, log: "You make yourself small." }
  ]),
  buildStageEvent("child_20", "The long walk home", "You have too much time to think after a hard day.", [
    { text: "Talk to someone", delta: { trust: +2, hope: +2 }, log: "You let the day leave your body." },
    { text: "Hold it in", delta: { hope: -1 }, log: "It stays longer than it should." },
    { text: "Write or draw it out", delta: { hope: +2 }, log: "You turn feeling into shape." }
  ])
];

const teenEvents = [
  buildStageEvent("teen_1", "A harder class", "You signed up for something difficult. Now it is asking if you meant it.", [
    { text: "Push through", delta: { grade: +3, hope: -2, reputation: +1 }, log: "You choose growth over comfort." },
    { text: "Drop it", delta: { hope: +1, reputation: -1 }, log: "Relief comes first." },
    { text: "Ask for help", delta: { grade: +2, trust: +2 }, log: "Support changes outcomes." }
  ]),
  buildStageEvent("teen_2", "A friend drifts", "You realize a friendship has been thinning for months.", [
    { text: "Reach out", delta: { trust: +2, connections: +1 }, log: "You try to repair it." },
    { text: "Let it fade", delta: { hope: -1 }, log: "Not every ending is loud." },
    { text: "Start fresh elsewhere", delta: { connections: +2, hope: +1 }, log: "You move toward new people." }
  ]),
  buildStageEvent("teen_3", "Cheating opportunity", "The answers are suddenly easy to get. No one may ever know.", [
    { text: "Take them", delta: { grade: +2, trust: -4, reputation: -2 }, log: "You win the moment and lose something else." },
    { text: "Refuse", delta: { trust: +3, reputation: +2 }, log: "You keep your name clean." },
    { text: "Warn the others", delta: { trust: +2, connections: -1 }, log: "You choose the rule over the crowd." }
  ]),
  buildStageEvent("teen_4", "A teacher notices", "Someone older says you could become excellent if you keep going.", [
    { text: "Take it seriously", delta: { grade: +2, hope: +2, reputation: +1 }, log: "Potential turns into pressure and fuel." },
    { text: "Smile and move on", delta: { hope: +1 }, log: "You leave the door half open." },
    { text: "Reject the pressure", delta: { hope: -1, trust: -1 }, log: "Praise can feel like weight too." }
  ]),
  buildStageEvent("teen_5", "A late-night call", "Someone you know is not okay and wants you right now.", [
    { text: "Show up", delta: { trust: +3, hope: -1 }, log: "You become someone they can count on." },
    { text: "Text instead", delta: { trust: +1 }, log: "You help, but from a distance." },
    { text: "Ignore it", delta: { trust: -4, hope: -1 }, log: "You carry the silence later." }
  ]),
  buildStageEvent("teen_6", "A leadership role", "There is a spot open, and people think you should take it.", [
    { text: "Take it", delta: { reputation: +3, connections: +2, hope: -1 }, log: "Responsibility changes how you are seen." },
    { text: "Stay in the background", delta: { hope: +1 }, log: "Less pressure, less visibility." },
    { text: "Share the role", delta: { trust: +2, connections: +2 }, log: "You build with someone else." }
  ]),
  buildStageEvent("teen_7", "A terrible grade", "The result is worse than you expected and harder to explain.", [
    { text: "Recover fast", delta: { grade: +2, hope: -1 }, log: "You let shame become fuel." },
    { text: "Spiral for a while", delta: { hope: -3 }, log: "The number gets inside your head." },
    { text: "Ask what went wrong", delta: { grade: +1, trust: +2 }, log: "Feedback hurts less than guessing." }
  ]),
  buildStageEvent("teen_8", "Your first paycheck", "It is not a lot, but it is yours.", [
    { text: "Save it", delta: { money: +900, trust: +1 }, log: "You like what stability feels like." },
    { text: "Spend some, save some", delta: { money: +500, hope: +1 }, log: "You balance future and now." },
    { text: "Spend it fast", delta: { money: +100, hope: +2 }, log: "The thrill fades quickly." }
  ]),
  buildStageEvent("teen_9", "A risky crowd", "The people around you keep treating recklessness like confidence.", [
    { text: "Leave", delta: { trust: +2, hope: +1 }, log: "Distance is a skill." },
    { text: "Stay close", delta: { connections: +2, reputation: -2 }, log: "Belonging can be expensive." },
    { text: "Try to influence them", delta: { trust: +1, hope: -1 }, log: "You learn not everyone wants saving." }
  ]),
  buildStageEvent("teen_10", "A competition", "There is a real chance to prove yourself in public.", [
    { text: "Enter it", delta: { reputation: +3, hope: +2, connections: +1 }, log: "You let yourself be measured." },
    { text: "Skip it", delta: { hope: -1 }, log: "You stay comfortable and unseen." },
    { text: "Prepare first", delta: { grade: +1, hope: +1 }, log: "Patience becomes part of the plan." }
  ]),
  buildStageEvent("teen_11", "Family finances", "You overhear enough to know things are tighter than usual.", [
    { text: "Help where you can", delta: { trust: +3, hope: -1 }, log: "You grow up a little faster." },
    { text: "Pretend not to notice", delta: { hope: -1 }, log: "Avoidance is not peace." },
    { text: "Ask directly", delta: { trust: +2, hope: +1 }, log: "Truth feels steadier than guessing." }
  ]),
  buildStageEvent("teen_12", "A date", "Someone asks if you want to go out, and your heart answers before your brain does.", [
    { text: "Say yes", delta: { hope: +3, trust: +1 }, apply() { state.relationship = "Dating"; }, log: "You let life get interesting." },
    { text: "Say no kindly", delta: { trust: +1 }, log: "You keep the door gentle, not cruel." },
    { text: "Avoid answering", delta: { trust: -2 }, log: "Ambiguity hurts too." }
  ]),
  buildStageEvent("teen_13", "Volunteer requirement", "You need hours, but the experience could become more than a checkbox.", [
    { text: "Commit seriously", delta: { trust: +3, reputation: +2, hope: +1 }, log: "Purpose sneaks up on you." },
    { text: "Do the minimum", delta: { reputation: -1 }, log: "You clear the requirement, not much more." },
    { text: "Skip it and panic later", delta: { hope: -2, reputation: -2 }, log: "Future-you hates this." }
  ]),
  buildStageEvent("teen_14", "A public mistake", "You say something wrong in front of people whose opinions matter to you.", [
    { text: "Own it immediately", delta: { trust: +2, reputation: +1 }, log: "Humility saves more than pride." },
    { text: "Double down", delta: { trust: -3, reputation: -3 }, log: "Ego makes it bigger." },
    { text: "Disappear for a while", delta: { hope: -1 }, log: "Embarrassment becomes isolation." }
  ]),
  buildStageEvent("teen_15", "A scholarship tip", "Someone quietly tells you there is money out there if you actually apply.", [
    { text: "Apply", delta: { reputation: +2, hope: +2, money: +1500 }, log: "You ask the future for help." },
    { text: "Put it off", delta: { hope: -1 }, log: "The deadline does not care." },
    { text: "Ask someone to review it", delta: { trust: +2, reputation: +1 }, log: "Support sharpens your chances." }
  ]),
  buildStageEvent("teen_16", "Practice or sleep", "There are not enough hours for all the versions of you.", [
    { text: "Practice more", delta: { grade: +2, health: -2, hope: -1 }, log: "Output rises. So does the cost." },
    { text: "Sleep", delta: { health: +2, hope: +1 }, log: "Your body gets a vote too." },
    { text: "Split the difference", delta: { grade: +1, health: +1 }, log: "Not perfect. Still wise." }
  ]),
  buildStageEvent("teen_17", "Peer pressure online", "A post is blowing up and people want you to join in.", [
    { text: "Pile on", delta: { connections: +1, trust: -3, reputation: -2 }, log: "Cruelty scales fast online." },
    { text: "Stay out of it", delta: { trust: +1 }, log: "You do not feed the fire." },
    { text: "Defend the target", delta: { trust: +3, connections: -1, hope: +1 }, log: "Courage is rarely convenient." }
  ]),
  buildStageEvent("teen_18", "A summer program", "An opportunity appears that could change how you see yourself.", [
    { text: "Apply", delta: { hope: +2, reputation: +2, connections: +1 }, log: "You step toward the bigger room." },
    { text: "Talk yourself out of it", delta: { hope: -2 }, log: "Fear sounds rational when it wants to win." },
    { text: "Ask someone to push you", delta: { trust: +2, hope: +1 }, log: "Borrowed confidence still counts." }
  ]),
  buildStageEvent("teen_19", "Burnout signs", "Nothing feels dramatic enough to explain why you feel empty.", [
    { text: "Rest", delta: { health: +4, hope: +2, grade: -1 }, log: "Stopping early saves more than crashing later." },
    { text: "Power through", delta: { grade: +1, health: -4, hope: -3 }, log: "You keep moving. Not for free." },
    { text: "Tell someone", delta: { trust: +3, hope: +2 }, log: "Naming it changes it." }
  ]),
  buildStageEvent("teen_20", "A friendship line", "You realize someone wants more from your friendship than friendship.", [
    { text: "Be honest", delta: { trust: +2, hope: +1 }, log: "Clarity hurts less than confusion." },
    { text: "Lead them on", delta: { trust: -4, connections: +1 }, log: "Attention is not affection." },
    { text: "Back away quietly", delta: { trust: -1 }, log: "Avoidance writes its own message." }
  ]),
  buildStageEvent("teen_21", "A part-time job conflict", "Work wants your time. School already owns most of it.", [
    { text: "Keep the job", delta: { money: +1200, grade: -2, hope: -1 }, log: "You trade time for security." },
    { text: "Quit and focus", delta: { grade: +2, money: -400 }, log: "You buy back attention." },
    { text: "Reduce hours", delta: { money: +500, grade: +1 }, log: "You renegotiate your life." }
  ]),
  buildStageEvent("teen_22", "A secret", "A friend tells you something they are not ready for others to know.", [
    { text: "Keep it", delta: { trust: +3, connections: +1 }, log: "People learn you are safe." },
    { text: "Tell one person", delta: { trust: -5, reputation: -2 }, log: "The story moves faster than you thought." },
    { text: "Encourage them to get help", delta: { trust: +2, hope: +1 }, log: "Care does not always mean silence." }
  ]),
  buildStageEvent("teen_23", "A school election", "You could actually win. That is part of what makes it scary.", [
    { text: "Run", delta: { reputation: +3, connections: +2, hope: +1 }, log: "Visibility changes things." },
    { text: "Support someone else", delta: { trust: +2, connections: +1 }, log: "Influence does not always need your name on it." },
    { text: "Avoid the whole thing", delta: { hope: -1 }, log: "Safety can look like invisibility." }
  ]),
  buildStageEvent("teen_24", "A hard boundary", "Someone keeps crossing a line because they think you will keep taking it.", [
    { text: "Set the boundary clearly", delta: { trust: +3, hope: +2 }, log: "Your voice gets steadier." },
    { text: "Explode", delta: { trust: -2, hope: -1 }, log: "Truth arrives badly when delayed too long." },
    { text: "Say nothing", delta: { hope: -2, trust: -1 }, log: "Silence becomes permission." }
  ])
];

const youngAdultEvents = [
  buildStageEvent("young_1", "Dorm conflict", "Living near people is not the same as living well with them.", [
    { text: "Talk it through", delta: { trust: +2, hope: +1 }, log: "Directness saves resentment." },
    { text: "Move if you can", delta: { money: -700, hope: +1 }, log: "Peace costs money sometimes." },
    { text: "Bottle it up", delta: { hope: -2 }, log: "Small irritation turns structural." }
  ]),
  buildStageEvent("young_2", "Internship opening", "A real opening appears. It could launch you or reject you clearly.", [
    { text: "Apply seriously", delta: { reputation: +3, connections: +2, hope: +1 }, log: "You put yourself in the arena." },
    { text: "Skip it", delta: { hope: -1 }, log: "Comfort protects and limits you." },
    { text: "Ask for a referral", delta: { trust: +1, connections: +3 }, log: "People matter more than brochures admit." }
  ]),
  buildStageEvent("young_3", "Tuition pressure", "The bill arrives with no interest in your stress level.", [
    { text: "Work more", delta: { money: +2200, health: -2, grade: -1 }, log: "You trade energy for staying enrolled." },
    { text: "Borrow more", delta: { money: +3500, hope: -1 }, log: "Future-you takes the hit." },
    { text: "Ask for aid", delta: { money: +1500, trust: +2 }, log: "Help exists if you ask at the right time." }
  ]),
  buildStageEvent("young_4", "A professor's offer", "Someone serious offers to mentor you if you show up properly.", [
    { text: "Commit", delta: { reputation: +3, connections: +3, hope: +2 }, log: "A door opens because you walk toward it." },
    { text: "Keep it casual", delta: { connections: +1 }, log: "You leave the door half-open." },
    { text: "Avoid the pressure", delta: { hope: -1 }, log: "Potential can feel like surveillance." }
  ]),
  buildStageEvent("young_5", "Change your major?", "The path you chose no longer feels simple.", [
    { text: "Stay", delta: { trust: +1, hope: -1 }, log: "You commit to the original bet." },
    { text: "Switch", delta: { hope: +1, reputation: -1 }, apply() { renderEvent(chooseMajorEvent()); }, log: "You change direction." },
    { text: "Delay deciding", delta: { hope: -1 }, log: "Indecision has a cost too." }
  ]),
  buildStageEvent("young_6", "A cheap apartment", "It is cheap for a reason, but rent is rent.", [
    { text: "Take it", delta: { money: +500, health: -1 }, log: "You buy breathing room with comfort." },
    { text: "Keep searching", delta: { money: -300, hope: +1 }, log: "You gamble on something better." },
    { text: "Get roommates", delta: { money: +800, connections: +1, trust: -1 }, log: "Cost drops. Friction rises." }
  ]),
  buildStageEvent("young_7", "A serious relationship", "This is no longer casual. Someone is asking where this is going.", [
    { text: "Commit", delta: { hope: +3, trust: +2 }, apply() { state.relationship = "Committed"; }, log: "You let the future include someone else." },
    { text: "Keep it undefined", delta: { trust: -3, hope: +1 }, log: "Ambiguity protects you and hurts them." },
    { text: "End it", delta: { hope: -1 }, apply() { state.relationship = "Single"; }, log: "Clarity can still hurt." }
  ]),
  buildStageEvent("young_8", "An unpaid opportunity", "They say it will be good for exposure. Exposure does not pay rent.", [
    { text: "Do it anyway", delta: { reputation: +3, money: -700, hope: +1 }, log: "You bet on long-term upside." },
    { text: "Refuse unpaid labor", delta: { trust: +2, hope: +1 }, log: "You name your value." },
    { text: "Negotiate something", delta: { money: +300, trust: +1 }, log: "You refuse the first version of the offer." }
  ]),
  buildStageEvent("young_9", "Night classes", "You could add more school, more debt, more leverage.", [
    { text: "Do it", delta: { money: -1500, reputation: +2, hope: -1 }, log: "You keep building." },
    { text: "Not now", delta: { hope: +1 }, log: "You protect capacity." },
    { text: "Only if funded", delta: { trust: +1 }, log: "You wait for a better structure." }
  ]),
  buildStageEvent("young_10", "Your first real rejection", "This one matters enough to echo.", [
    { text: "Recover quickly", delta: { hope: +1, reputation: +1 }, log: "You keep moving." },
    { text: "Take it personally", delta: { hope: -3 }, log: "It gets into your self-story." },
    { text: "Ask what to improve", delta: { trust: +1, reputation: +2 }, log: "You turn pain into data." }
  ]),
  buildStageEvent("young_11", "A side hustle idea", "You keep seeing a problem that might actually be money.", [
    { text: "Build it", delta: { money: -2000, hope: +3, connections: +2 }, apply() { state.company = "Started"; state.companyValue = randInt(6000, 22000); state.career = "Founder"; }, log: "You start before you feel ready." },
    { text: "Research first", delta: { reputation: +1, hope: +1 }, log: "You move carefully." },
    { text: "Ignore it", delta: { hope: -1 }, log: "The idea fades." }
  ]),
  buildStageEvent("young_12", "A friend's success", "Someone near you gets what you wanted first.", [
    { text: "Celebrate them sincerely", delta: { trust: +2, connections: +1 }, log: "Generosity protects your character." },
    { text: "Compare yourself all week", delta: { hope: -2 }, log: "Their win turns into your wound." },
    { text: "Use it as fuel", delta: { reputation: +1, hope: +1 }, log: "Envy gets redirected into motion." }
  ]),
  buildStageEvent("young_13", "A lonely city", "You moved for the opportunity, not for belonging. It shows.", [
    { text: "Build community slowly", delta: { connections: +3, hope: +2 }, log: "Belonging is made, not found whole." },
    { text: "Focus only on work", delta: { reputation: +2, hope: -2 }, log: "You become efficient and hollow." },
    { text: "Go back home more often", delta: { trust: +2, money: -300 }, log: "Roots still matter." }
  ]),
  buildStageEvent("young_14", "Burnout again", "Achievement keeps arriving attached to exhaustion.", [
    { text: "Rest on purpose", delta: { health: +5, hope: +2, reputation: -1 }, log: "You choose survival over constant output." },
    { text: "Keep grinding", delta: { reputation: +2, health: -5, hope: -3 }, log: "Momentum keeps moving, but so does damage." },
    { text: "Tell someone", delta: { trust: +2, hope: +2 }, log: "Support interrupts isolation." }
  ]),
  buildStageEvent("young_15", "A roommate emergency", "Someone else’s mess becomes your problem at the worst possible time.", [
    { text: "Help them", delta: { trust: +2, hope: -1 }, log: "Care takes time." },
    { text: "Refuse the responsibility", delta: { trust: -1, hope: +1 }, log: "Boundaries matter too." },
    { text: "Help once, set limits later", delta: { trust: +1 }, log: "You protect both compassion and yourself." }
  ]),
  buildStageEvent("young_16", "An almost-job", "You get close enough to taste it, then lose it.", [
    { text: "Keep applying", delta: { hope: +1, reputation: +1 }, log: "Resilience looks boring from the outside." },
    { text: "Lower your standards", delta: { money: +700, hope: -1 }, log: "Security wins this round." },
    { text: "Pivot completely", delta: { hope: +2, reputation: -1 }, log: "Sometimes reinvention is the shortest route." }
  ]),
  buildStageEvent("young_17", "Networking event", "The room feels artificial. The opportunities do not.", [
    { text: "Work the room", delta: { connections: +4, reputation: +1 }, log: "You make visibility a skill." },
    { text: "Stay by one safe person", delta: { connections: +1 }, log: "You survive it, mostly." },
    { text: "Leave early", delta: { hope: +1, connections: -1 }, log: "Peace over optics." }
  ]),
  buildStageEvent("young_18", "An old friend returns", "Someone from your past reaches out like time did not happen.", [
    { text: "Reconnect", delta: { trust: +2, connections: +2 }, log: "History softens into possibility." },
    { text: "Leave it there", delta: { hope: +1 }, log: "Not everything needs reopening." },
    { text: "Reconnect carefully", delta: { trust: +1 }, log: "You open the door, not the whole house." }
  ]),
  buildStageEvent("young_19", "A bad month", "Expenses stack at the exact moment your energy is weakest.", [
    { text: "Cut hard", delta: { money: +600, hope: -2 }, log: "You survive by narrowing your life." },
    { text: "Borrow", delta: { money: +1500, hope: -1 }, log: "Future pressure becomes present relief." },
    { text: "Ask for help", delta: { trust: +2, money: +800 }, log: "Pride is expensive too." }
  ]),
  buildStageEvent("young_20", "A city you could leave", "Nothing is forcing you to stay except momentum and narrative.", [
    { text: "Stay and fight for it", delta: { reputation: +2, hope: +1 }, log: "You decide place is part of identity." },
    { text: "Move somewhere cheaper", delta: { money: +1200, hope: +1 }, apply() { state.locationLabel = "A cheaper city"; }, log: "Practicality wins." },
    { text: "Go home", delta: { trust: +2, hope: +2 }, apply() { state.locationLabel = "Back home"; }, log: "Roots become strategy." }
  ])
];

const adultEvents = [
  buildStageEvent("adult_1", "Promotion window", "Someone senior notices your output. This year could move you up or keep you exactly where you are.", [
    { text: "Push for it", delta: { reputation: +3, money: +2500, hope: -1 }, log: "You argue for your value." },
    { text: "Wait patiently", delta: { trust: +1, hope: +1 }, log: "You let timing decide." },
    { text: "Look elsewhere", delta: { connections: +2, money: -300, hope: +1 }, log: "Loyalty is not the only strategy." }
  ]),
  buildStageEvent("adult_2", "Budget cuts", "The company starts cutting people. Your team is not exempt.", [
    { text: "Fight to stay", delta: { trust: -1, connections: +2, hope: -1 }, log: "You protect your position." },
    { text: "Start looking now", delta: { reputation: +1, hope: +1 }, log: "You move before the floor shifts." },
    { text: "Wait it out", delta: { hope: -2 }, log: "Uncertainty becomes the whole atmosphere." }
  ]),
  buildStageEvent("adult_3", "A health warning", "Your body starts sending messages you cannot keep treating as background noise.", [
    { text: "Rest and recover", delta: { health: +8, money: -500, hope: +1 }, apply() { state.illness = "Recovering"; }, log: "You choose longevity over short-term wins." },
    { text: "Ignore it", delta: { health: -10, money: +300, hope: -1 }, apply() { if (state.health < 40) state.illness = "Chronic Stress"; }, log: "Your body keeps score." },
    { text: "Get checked early", delta: { health: +4, money: -800, trust: +1 }, apply() { state.illness = "Managed"; }, log: "Prevention is unglamorous and powerful." }
  ]),
  buildStageEvent("adult_4", "Serious relationship strain", "Love is no longer asking to be felt. It is asking to be maintained.", [
    { text: "Do the hard conversation", delta: { trust: +3, hope: +1 }, apply() { state.relationship = "Committed"; }, log: "Honesty saves what performance cannot." },
    { text: "Avoid it", delta: { trust: -3, hope: -1 }, log: "Distance writes its own ending." },
    { text: "End it cleanly", delta: { hope: -1 }, apply() { state.relationship = "Single"; }, log: "Clarity can still hurt." }
  ]),
  buildStageEvent("adult_5", "The company is fragile", "Users like the idea. Revenue is less certain.", [
    { text: "Raise money", delta: { connections: +4, reputation: +2, money: +12000, trust: -1 }, apply() { if (state.company === "Started") state.companyValue += randInt(25000, 90000); }, log: "You buy time with someone else's belief." },
    { text: "Stay lean", delta: { hope: -1, trust: +1, money: +3000 }, apply() { if (state.company === "Started") state.companyValue += randInt(5000, 25000); }, log: "Slow growth is still growth." },
    { text: "Shut it down", delta: { hope: -2, money: +2000 }, apply() { state.company = "Closed"; state.companyValue = 0; }, log: "Not every ending is failure. It still feels like one." }
  ]),
  buildStageEvent("adult_6", "A parenting question", "Someone small starts depending on your answer before they understand the question.", [
    { text: "Say yes to parenthood", delta: { hope: +2, money: -2000, trust: +2 }, apply() { state.kids += 1; }, log: "Your life becomes less singular." },
    { text: "Not now", delta: { hope: +1, trust: +1 }, log: "Timing matters." },
    { text: "Avoid deciding", delta: { trust: -2 }, log: "Unmade choices still affect people." }
  ]),
  buildStageEvent("adult_7", "Debt catches up", "Bills, interest, and bad timing start moving together.", [
    { text: "Cut hard", delta: { money: +1000, hope: -2 }, log: "You narrow your life to stabilize it." },
    { text: "Borrow again", delta: { money: +3000, hope: -2 }, log: "The present gets easier. The future does not." },
    { text: "Sell something important", delta: { money: +2500, hope: -3 }, log: "Survival sometimes sounds like loss." }
  ]),
  buildStageEvent("adult_8", "An old dream returns", "Something you buried for practicality keeps resurfacing.", [
    { text: "Try it anyway", delta: { hope: +4, money: -1500 }, log: "Desire refuses burial." },
    { text: "Keep it a hobby", delta: { hope: +2, trust: +1 }, log: "Not everything needs to become income." },
    { text: "Dismiss it again", delta: { hope: -2 }, log: "You become efficient and slightly emptier." }
  ]),
  buildStageEvent("adult_9", "A legal scare", "One shortcut, one bad crowd, one impulsive choice. Now your name is attached to risk.", [
    { text: "Deal with it properly", delta: { money: -3000, reputation: -3 }, apply() { if (state.record === "Clean") state.record = "Minor Record"; }, log: "You minimize the damage." },
    { text: "Run from it", delta: { reputation: -6, trust: -4, hope: -3 }, apply() { state.record = "Criminal Record"; }, log: "Avoidance makes it worse." },
    { text: "Ask for help immediately", delta: { trust: +1, money: -2000, hope: +1 }, apply() { if (state.record === "Clean") state.record = "Minor Record"; }, log: "Panic is smaller when shared early." }
  ]),
  buildStageEvent("adult_10", "A move for work", "A better offer comes with a harder city and fewer guarantees.", [
    { text: "Take it", delta: { money: +2500, reputation: +2, hope: +1 }, apply() { state.locationLabel = "A new city"; }, log: "Reinvention arrives with boxes." },
    { text: "Stay where you are", delta: { trust: +1, hope: +1 }, log: "Stability is a decision too." },
    { text: "Negotiate remote", delta: { connections: +1, money: +1200 }, log: "You try to change the shape of the offer." }
  ]),
  buildStageEvent("adult_11", "Caregiving", "Someone older in your life starts needing more than occasional help.", [
    { text: "Show up consistently", delta: { trust: +3, money: -800, hope: -1 }, log: "Love becomes logistics." },
    { text: "Share the burden", delta: { trust: +2 }, log: "You ask others to carry some of it." },
    { text: "Distance yourself", delta: { hope: -1, trust: -3 }, log: "Relief and guilt arrive together." }
  ]),
  buildStageEvent("adult_12", "A quiet success", "No one claps, but you realize your life is more stable than it used to be.", [
    { text: "Let yourself feel proud", delta: { hope: +3 }, log: "You stop moving the goalposts for a minute." },
    { text: "Immediately want more", delta: { reputation: +1, hope: -1 }, log: "Ambition rarely rests." },
    { text: "Use it to help someone else", delta: { trust: +2, connections: +1 }, log: "Security becomes generosity." }
  ]),
  buildStageEvent("adult_13", "Your child needs you", "A younger person in your care asks a question that deserves your full attention.", [
    { text: "Put everything down and listen", delta: { trust: +3, hope: +2 }, log: "Presence becomes memory." },
    { text: "Answer while distracted", delta: { trust: -1 }, log: "Half-attention leaves a mark." },
    { text: "Say later and mean it", delta: { trust: +1 }, log: "Delay is not neglect when it is honest." }
  ]),
  buildStageEvent("adult_14", "A former boss calls", "An old contact has an offer that could reset your trajectory.", [
    { text: "Take the meeting", delta: { connections: +3, reputation: +2 }, log: "History turns into leverage." },
    { text: "Ignore it", delta: { hope: -1 }, log: "Not every door should stay closed, but this one does." },
    { text: "Ask what they really want", delta: { trust: +1 }, log: "Curiosity protects you." }
  ]),
  buildStageEvent("adult_15", "A bad year for markets", "Even stable people can become fragile in the wrong economy.", [
    { text: "Pull back", delta: { money: -2000, hope: -1 }, log: "You lose less by moving early." },
    { text: "Hold steady", delta: { money: -4000, trust: +1 }, log: "You choose conviction over panic." },
    { text: "Take a risky bet", delta: { money: randInt(-8000, 9000), hope: +1 }, log: "Risk changes shape fast." }
  ]),
  buildStageEvent("adult_16", "Resentment at work", "You are doing more than someone paid more than you.", [
    { text: "Confront it", delta: { reputation: +2, trust: -1, money: +1200 }, log: "You name the imbalance." },
    { text: "Say nothing", delta: { hope: -2 }, log: "Silence becomes corrosion." },
    { text: "Use it to leave", delta: { connections: +2, hope: +1 }, log: "You turn frustration into motion." }
  ]),
  buildStageEvent("adult_17", "A medical bill", "The number is insulting to the body it belongs to.", [
    { text: "Pay it and recover", delta: { money: -2500, health: +2 }, log: "The damage becomes financial instead of physical." },
    { text: "Delay it", delta: { money: +500, hope: -2 }, log: "Delay is rarely free." },
    { text: "Fight the charge", delta: { trust: +1, money: -600, hope: +1 }, log: "Bureaucracy becomes the second illness." }
  ]),
  buildStageEvent("adult_18", "A friend's divorce", "Someone close is falling apart in front of you.", [
    { text: "Show up fully", delta: { trust: +3, hope: -1 }, log: "You become a safe place." },
    { text: "Offer practical help", delta: { trust: +2 }, log: "Care becomes tasks." },
    { text: "Keep your distance", delta: { trust: -2 }, log: "Other people's pain scares you." }
  ]),
  buildStageEvent("adult_19", "A tempting affair", "Attention arrives exactly where your life feels thinnest.", [
    { text: "Walk away", delta: { trust: +3, hope: -1 }, log: "Discipline protects more than reputation." },
    { text: "Cross the line", delta: { trust: -6, hope: +1, reputation: -3 }, log: "Desire takes the wheel. Consequences wait." },
    { text: "Fix what is broken first", delta: { trust: +2, hope: +1 }, log: "You address the real fracture." }
  ]),
  buildStageEvent("adult_20", "The company almost works", "For one moment it looks like the gamble might justify itself.", [
    { text: "Scale fast", delta: { money: -6000, hope: +3 }, apply() { if (state.company === "Started") state.companyValue += randInt(30000, 120000); }, log: "Growth becomes its own risk." },
    { text: "Grow carefully", delta: { money: +2000, trust: +1 }, apply() { if (state.company === "Started") state.companyValue += randInt(8000, 35000); }, log: "You stay alive on purpose." },
    { text: "Sell it", delta: { money: +randInt(12000, 60000), hope: +1 }, apply() { state.company = "Sold"; state.companyValue = 0; }, log: "You exit before the story turns." }
  ]),
  buildStageEvent("adult_21", "A midlife question", "You realize you have become efficient at a life you did not fully choose.", [
    { text: "Rebuild it", delta: { hope: +4, money: -1200 }, log: "Change becomes worth the mess." },
    { text: "Keep going", delta: { reputation: +1, hope: -2 }, log: "Momentum impersonates meaning." },
    { text: "Talk to someone honest", delta: { trust: +2, hope: +2 }, log: "Reflection becomes a tool." }
  ]),
  buildStageEvent("adult_22", "A public accusation", "Someone misreads your actions or wants a villain. Either way, your name is involved.", [
    { text: "Respond clearly", delta: { trust: +1, reputation: -1 }, log: "Calm protects what panic cannot." },
    { text: "Fight publicly", delta: { reputation: -3, hope: -2 }, log: "Truth gets lost in heat." },
    { text: "Handle it privately", delta: { trust: +1 }, log: "Quiet repair is slower and often better." }
  ]),
  buildStageEvent("adult_23", "A child leaves home", "The house changes shape before you are ready for it.", [
    { text: "Support them fully", delta: { trust: +3, hope: -1 }, log: "Love learns distance." },
    { text: "Hold on too tightly", delta: { trust: -2, hope: -1 }, log: "Care turns controlling when afraid." },
    { text: "Rediscover yourself too", delta: { hope: +3 }, log: "Loss becomes space." }
  ]),
  buildStageEvent("adult_24", "A long friendship fades", "Nothing dramatic happened. That can hurt in its own way.", [
    { text: "Reach out one more time", delta: { trust: +1, hope: +1 }, log: "You honor what it was." },
    { text: "Let it go", delta: { hope: -1 }, log: "Some endings deserve gentleness, not rescue." },
    { text: "Replace the connection quickly", delta: { connections: +1, trust: -1 }, log: "Speed does not always equal healing." }
  ])
];

function getStagePool() {
  if (state.age <= 12) return childEvents;
  if (state.age <= 20) return teenEvents;
  if (state.age <= 30) return youngAdultEvents;
  return adultEvents;
}

function getSpecialEvent() {
  if (state.age === 1 && !state.usedEvents.has("special_age1")) {
    return {
      id: "special_age1",
      title: "Three toys",
      body: "A red car. A tiny piano. A box of blocks. Which one do you reach for?",
      choices: [
        { text: "The red car", delta: { connections: +2, trust: +1 }, log: "You like motion." },
        { text: "The piano", delta: { hope: +3, connections: +1 }, log: "You like expression." },
        { text: "The blocks", delta: { grade: +2, hope: +1 }, log: "You like building." }
      ]
    };
  }

  if (state.age === 6 && state.hobby === "—" && !state.usedEvents.has("special_hobby")) {
    return {
      id: "special_hobby",
      title: "After-school sign-up day",
      body: "A brochure lands on the table. Pick something. You might become it before you realize it.",
      choices: hobbies.map((h) => ({
        text: h.title,
        delta: h.boost,
        apply() { state.hobby = h.title; },
        log: `You start ${h.title.toLowerCase()}.`
      }))
    };
  }

  if (state.age === 17 && state.degreeLevel === "—" && !state.usedEvents.has("special_apps")) {
    return {
      id: "special_apps",
      title: "Applications season",
      body: "You pick where to apply. Grades matter. Reputation matters. Trust and connections matter more than people admit.",
      choices: [
        {
          text: "Apply to university",
          delta: { hope: +1, reputation: +2 },
          apply() {
            state.schoolType = "University";
            state.degreeLevel = "Bachelor";
            setTimeout(() => renderEvent(chooseMajorEvent()), 80);
          },
          log: "You take the leap."
        },
        {
          text: "Choose community college",
          delta: { hope: +1 },
          apply() {
            state.schoolType = "Community College";
            state.degreeLevel = "Associate";
            setTimeout(() => renderEvent(chooseMajorEvent()), 80);
          },
          log: "You choose the practical route."
        },
        {
          text: "Work first",
          delta: { money: +1200, hope: +1 },
          apply() {
            state.schoolType = "—";
            state.degreeLevel = "—";
            state.career = "Entry-Level Work";
            state.salary = 32000;
          },
          log: "You buy time and breathing room."
        }
      ]
    };
  }

  if (state.age >= 23 && state.career === "—" && state.degreeLevel !== "—" && !state.usedEvents.has("special_first_job")) {
    return {
      id: "special_first_job",
      title: "First real job",
      body: "The degree becomes a question: can it turn into a life?",
      choices: [
        {
          text: "Take the best offer",
          delta: { money: 3000, reputation: +2, hope: +2 },
          apply() {
            state.career = `${state.major || "General"} Professional`;
            if (!state.salary) {
              const found = majors.find(m => m.title === state.major);
              state.salary = found ? found.salary : 48000;
            }
          },
          log: "You step into working life."
        },
        {
          text: "Keep searching",
          delta: { money: -800, hope: -1, trust: +1 },
          apply() {
            state.career = "Searching";
          },
          log: "You refuse the wrong fit."
        }
      ]
    };
  }

  return null;
}

function maybeRandomSystemEvent() {
  const extra = [];

  if (state.age >= 18 && state.age <= 45 && Math.random() < 0.12 && !state.usedEvents.has(`illness_${state.age}`)) {
    extra.push({
      id: `illness_${state.age}`,
      title: "A health warning",
      body: "Your body starts sending messages you cannot keep treating as background noise.",
      choices: [
        { text: "Rest and recover", delta: { health: +8, money: -500, hope: +1 }, apply() { state.illness = "Recovering"; }, log: "You choose longevity over short-term wins." },
        { text: "Ignore it", delta: { health: -10, money: +300, hope: -1 }, apply() { if (state.health < 40) state.illness = "Chronic Stress"; }, log: "Your body keeps score." },
        { text: "Get checked early", delta: { health: +4, money: -800, trust: +1 }, apply() { state.illness = "Managed"; }, log: "Prevention matters." }
      ]
    });
  }

  if (state.age >= 16 && state.age <= 40 && Math.random() < 0.12 && !state.usedEvents.has(`love_${state.age}`)) {
    extra.push({
      id: `love_${state.age}`,
      title: "A relationship crossroads",
      body: "Someone makes your life feel larger. The timing is awkward. That rarely stops anything.",
      choices: [
        { text: "Try", delta: { hope: +3, trust: +2 }, apply() { state.relationship = "Dating"; }, log: "You let someone in." },
        { text: "Stay focused", delta: { reputation: +1, hope: -1 }, log: "You choose momentum over intimacy." },
        { text: "Be honest about your limits", delta: { trust: +2, hope: +1 }, log: "Clarity is kinder than confusion." }
      ]
    });
  }

  if (state.age >= 24 && state.company === "None" && state.money >= 8000 && Math.random() < 0.10 && !state.usedEvents.has(`startup_${state.age}`)) {
    extra.push({
      id: `startup_${state.age}`,
      title: "A startup idea",
      body: "Something you keep noticing might actually be a business. It is risky. That is part of why it matters.",
      choices: [
        {
          text: "Build it",
          delta: { money: -5000, hope: +4, connections: +3, reputation: +2 },
          apply() {
            state.company = "Started";
            state.companyValue = randInt(8000, 30000);
            state.career = "Founder";
          },
          log: "You start anyway."
        },
        { text: "Research first", delta: { reputation: +1, hope: +1 }, log: "You move carefully." },
        { text: "Leave it alone", delta: { hope: -1 }, log: "The idea stays in your head." }
      ]
    });
  }

  if (state.money < -2000 && Math.random() < 0.28 && !state.usedEvents.has(`debt_${state.age}`)) {
    extra.push({
      id: `debt_${state.age}`,
      title: "Debt catches up",
      body: "Bills, interest, and bad timing start moving together.",
      choices: [
        { text: "Cut hard", delta: { money: +1000, hope: -2 }, log: "You narrow your life to stabilize it." },
        { text: "Borrow again", delta: { money: +3000, hope: -2 }, log: "The present gets easier. The future does not." },
        { text: "Sell something important", delta: { money: +2500, hope: -3 }, log: "Survival sometimes sounds like loss." }
      ]
    });
  }

  if (state.age >= 18 && Math.random() < 0.05 && state.record === "Clean" && !state.usedEvents.has(`legal_${state.age}`)) {
    extra.push({
      id: `legal_${state.age}`,
      title: "A legal scare",
      body: "One shortcut, one bad crowd, one impulsive choice. Now your name is attached to risk.",
      choices: [
        {
          text: "Deal with it properly",
          delta: { money: -3000, reputation: -3 },
          apply() { state.record = "Minor Record"; },
          log: "You minimize the damage."
        },
        {
          text: "Run from it",
          delta: { reputation: -6, trust: -4, hope: -3 },
          apply() { state.record = "Criminal Record"; },
          log: "Avoidance makes it worse."
        },
        {
          text: "Ask for help immediately",
          delta: { trust: +1, money: -2000, hope: +1 },
          apply() { state.record = "Minor Record"; },
          log: "Panic is smaller when shared early."
        }
      ]
    });
  }

  return extra.length ? pick(extra) : null;
}

function applyYearlyEconomy() {
  if (state.age >= 18) {
    if (state.salary > 0) {
      state.money += Math.round((state.salary / 12) * 1.8 * state.moneyMult);
    } else {
      state.money += Math.round(600 * state.moneyMult);
    }

    if (state.relationship === "Committed") state.money -= 500;
    if (state.kids > 0) state.money -= 1200 * state.kids;

    if (state.company === "Started") {
      state.money += Math.round(state.companyValue * 0.015);
      state.companyValue += randInt(-4000, 12000);
      state.companyValue = Math.max(0, state.companyValue);
    }

    if (state.age > 40 && Math.random() < 0.15) {
      state.health -= randInt(1, 4);
    }

    if (state.age > 55 && Math.random() < 0.20) {
      state.hope -= randInt(1, 3);
    }
  }
}

function nextLifeEvent() {
  const special = getSpecialEvent();
  if (special) return special;

  const randomSystem = maybeRandomSystemEvent();
  if (randomSystem) return randomSystem;

  const pool = getStagePool();
  const chosen = sampleUnused(pool, 1);
  if (chosen.length) return chosen[0];

  return {
    id: `fallback_${state.age}_${randInt(1, 999999)}`,
    title: "Another year",
    body: "Time passes. Small choices still shape you.",
    choices: [
      { text: "Keep going", delta: { hope: +1 }, log: "The year folds into the next one." }
    ]
  };
}

function advanceYear() {
  if (state.awaitingChoice) return;

  state.age += 1;
  state.year += 1;

  applyYearlyEconomy();
  renderSidebar();
  E.timelineSub.textContent = `Age ${state.age}.`;

  if (checkDeath()) return;

  const ev = nextLifeEvent();
  renderEvent(ev);
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
    country: loc.country,
    moneyMult: loc.moneyMult,
    lawStrictness: loc.lawStrictness,
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
  typeText(`${state.name} opens their eyes in ${state.locationLabel}.\n\nNo manual. No guarantees.\nJust time and what you do with it.`);
  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";
  logLine(`Name: ${state.name}. Gender: ${state.gender}.`);
  logLine(`Location: ${state.locationLabel}.`);
  logLine(`Class: ${ident.title}.`);
  setAwaitingChoice(false);
}

function resetAll() {
  state = defaultState();
  E.inputName.value = "";
  E.selectGender.value = "";
  E.selectLocation.value = "";
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
