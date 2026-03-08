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
  { id: "dance", title: "Dance", boost: { health: +4, hope: +4 } }
];

const swcCourses = [
  { id: "precalc", title: "Pre-Calculus", tags: ["math"], effect: { grade: +2, reputation: +1 } },
  { id: "cs", title: "Computer Science", tags: ["cs"], effect: { grade: +2, connections: +1 } },
  { id: "chem", title: "Chemistry", tags: ["chem"], effect: { grade: +1, reputation: +1 } },
  { id: "phys", title: "Physics", tags: ["physics"], effect: { grade: +1, trust: +1 } },
  { id: "bio", title: "Biology", tags: ["bio"], effect: { grade: +1, hope: +1 } },
  { id: "english", title: "English", tags: ["writing"], effect: { reputation: +2, trust: +1 } },
];

const majors = [
  { id: "cs", title: "Computer Science" },
  { id: "business", title: "Business" },
  { id: "engineering", title: "Engineering" },
  { id: "psych", title: "Psychology" },
  { id: "bio", title: "Biology" },
  { id: "arts", title: "Arts" },
  { id: "nursing", title: "Nursing" },
  { id: "law", title: "Pre-Law" },
  { id: "econ", title: "Economics" },
  { id: "education", title: "Education" }
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
  lifeLog: $("#lifeLog"),
};

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const fmtMoney = (n) => {
  const sign = n < 0 ? "-" : "";
  const v = Math.abs(Math.round(n));
  return `${sign}$${v.toLocaleString("en-CA")}`;
};

function educationFromAge(age) {
  if (age <= 5) return "Child";
  if (age <= 12) return "Elementary";
  if (age <= 17) return "High School";
  if (age <= 22) return "Post-Secondary";
  return "Adult";
}

function defaultState() {
  return {
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

    inSchool: false,
    schoolType: "—",
    major: "—",
    degreeLevel: "—",
    yearsInProgram: 0,
    programLength: 0,
    contestStrength: 0,
    record: "Clean",

    usedEventIds: [],
    flags: {},
    pendingEvents: [],
    awaitingChoice: false,
  };
}

let state = defaultState();
let typewriterToken = 0;

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const has = (id) => state.usedEventIds.includes(id);
const mark = (id) => { if (!has(id)) state.usedEventIds.push(id); };

function applyDelta(delta) {
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
}

function showScreen(which) {
  E.screenStart.classList.remove("screen-active");
  E.screenGame.classList.remove("screen-active");

  if (which === "start") E.screenStart.classList.add("screen-active");
  else E.screenGame.classList.add("screen-active");
}

function setBars() {
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

function renderSidebar() {
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

  setBars();
}

function logLine(text) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const p = document.createElement("div");
  p.textContent = `[${time}] ${text}`;
  E.lifeLog.prepend(p);
}

function showDeltaPopup(delta) {
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

function typeText(element, text, speed = 14) {
  typewriterToken += 1;
  const currentToken = typewriterToken;
  element.textContent = "";
  let i = 0;

  function tick() {
    if (currentToken !== typewriterToken) return;
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(tick, speed);
    }
  }

  tick();
}

function setAwaitingChoice(on) {
  state.awaitingChoice = on;
  E.btnNextYear.disabled = on;
  E.lockNote.hidden = !on;
}

function enqueue(ev) {
  state.pendingEvents.push(ev);
}

function nextPendingEvent() {
  return state.pendingEvents.shift() || null;
}

function selectUnused(pool) {
  const unused = pool.filter(e => !has(e.onceId));
  if (unused.length === 0) return null;
  return pick(unused);
}

function renderEvent(ev) {
  E.eventTitle.textContent = `Age ${state.age} — ${ev.title}`;
  typeText(E.eventBody, ev.body);
  E.choiceRow.innerHTML = "";

  setAwaitingChoice(true);

  ev.choices.forEach((ch) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-ghost";
    b.textContent = ch.text;

    b.addEventListener("click", () => {
      if (ev.onceId) mark(ev.onceId);
      if (typeof ch.apply === "function") ch.apply();

      applyDelta(ch.delta);
      state.money = Math.round(state.money);

      showDeltaPopup(ch.delta || {});
      if (ch.log) logLine(ch.log);

      renderSidebar();

      const nxt = nextPendingEvent();
      if (nxt) return renderEvent(nxt);

      E.choiceRow.innerHTML = "";
      setAwaitingChoice(false);
      E.btnNextYear.focus();
    });

    E.choiceRow.appendChild(b);
  });
}

function setSchoolByAge() {
  state.education = educationFromAge(state.age);

  if (state.age <= 5) {
    state.inSchool = false;
    state.schoolType = "—";
    return;
  }
  if (state.age <= 12) {
    state.inSchool = true;
    state.schoolType = "Elementary";
    return;
  }
  if (state.age <= 17) {
    state.inSchool = true;
    state.schoolType = "High School";
    return;
  }
  if (state.inSchool) state.schoolType = state.schoolType || "Post-Secondary";
}

function admissionScore(base) {
  return base
    + (state.grade - 75) * 1.1
    + (state.reputation - 50) * 0.9
    + (state.trust - 50) * 0.4
    + (state.connections - 15) * 0.6
    + state.contestStrength * 0.7
    + rand(-8, 8);
}

function admit(type) {
  if (type === "Community") return true;
  if (type === "State") return admissionScore(60) >= 60;
  if (type === "Ivy") return admissionScore(70) >= 84;
  if (type === "Masters") return admissionScore(68) >= 78;
  if (type === "PhD") return admissionScore(72) >= 88;
  return false;
}

function startProgram({ schoolType, programLength, degreeLevel }) {
  state.inSchool = true;
  state.schoolType = schoolType;
  state.programLength = programLength;
  state.yearsInProgram = 0;
  state.degreeLevel = degreeLevel;
}

function graduateIfDone() {
  if (!state.inSchool) return;

  state.yearsInProgram += 1;

  if (state.programLength > 0 && state.yearsInProgram >= state.programLength) {
    logLine(`You graduate (${state.degreeLevel}).`);
    state.inSchool = false;
    state.schoolType = "—";
    state.programLength = 0;
    state.yearsInProgram = 0;

    applyDelta({ hope: +3, reputation: +3, trust: +1 });
    showDeltaPopup({ hope: +3, reputation: +3, trust: +1 });
  }
}

function hobbyAtSixEvent() {
  return {
    onceId: "hobby6",
    title: "After-school sign-up day",
    body: "A brochure lands on the table.\n\nPick something. You might become it before you realize it.",
    choices: hobbies.map(h => ({
      text: h.title,
      delta: { ...h.boost },
      apply: () => { state.hobby = h.title; },
      log: `You start ${h.title.toLowerCase()}.`
    }))
  };
}

function childhoodPool() {
  return [
    {
      onceId: "kid_toys",
      title: "Three toys",
      body: "A red car. A tiny piano. A box of blocks.\n\nWhich one do you reach for?",
      choices: [
        { text: "The red car", delta: { connections: +2, trust: +1 }, log: "You like motion." },
        { text: "The piano", delta: { hope: +3, connections: +1 }, log: "You like expression." },
        { text: "The blocks", delta: { grade: +2, hope: +1 }, log: "You like building." },
      ]
    },
    {
      onceId: "kid_broken",
      title: "Something breaks",
      body: "You knock something off the counter.\n\nIt shatters.\n\nFootsteps are coming.",
      choices: [
        { text: "Tell the truth", delta: { trust: +3, reputation: +1 }, log: "You own it." },
        { text: "Hide it", delta: { trust: -1, hope: +1 }, log: "You learn damage control." },
        { text: "Blame something else", delta: { trust: -3, reputation: -2 }, log: "You protect yourself. It costs." },
      ]
    },
    {
      onceId: "kid_friend",
      title: "A new kid",
      body: "A new kid sits alone.\n\nThey keep picking at their lunch like they don’t want anyone to notice them.",
      choices: [
        { text: "Sit with them", delta: { connections: +3, trust: +2 }, log: "You make space for them." },
        { text: "Wave but stay with your group", delta: { connections: +1 }, log: "You try, halfway." },
        { text: "Ignore it", delta: { hope: -1 }, log: "You tell yourself it’s not your job." },
      ]
    },
  ];
}

function lateChildPool() {
  return [
    {
      onceId: "kid_cheat_small",
      title: "You see cheating",
      body: "During a small quiz, you notice someone copying answers.\n\nThey glance at you like: please.",
      choices: [
        { text: "Tell the teacher", delta: { trust: +2, reputation: +2, connections: -1 }, log: "You choose rules over friendship." },
        { text: "Talk to them after class", delta: { trust: +2, connections: +2 }, log: "You warn them quietly." },
        { text: "Ignore it", delta: { hope: +1, reputation: -1 }, log: "You stay out of it." },
      ]
    },
    {
      onceId: "kid_groupchat",
      title: "Group chat drama",
      body: "Someone gets left out of a group chat on purpose.\n\nYou notice. They notice too.",
      choices: [
        { text: "Add them back", delta: { trust: +2, connections: +2 }, log: "You make it right publicly." },
        { text: "Message them privately", delta: { trust: +2 }, log: "You try to soften it quietly." },
        { text: "Stay silent", delta: { hope: -1, reputation: -1 }, log: "Silence chooses a side." },
      ]
    },
    {
      onceId: "kid_teacher",
      title: "Teacher’s attention",
      body: "A teacher praises you in front of everyone.\n\nSome classmates look annoyed.",
      choices: [
        { text: "Stay humble", delta: { reputation: +2, trust: +1 }, log: "You don’t gloat." },
        { text: "Enjoy it", delta: { hope: +2, reputation: -1 }, log: "You let yourself feel proud." },
        { text: "Downplay it", delta: { hope: -1 }, log: "You shrink to keep peace." },
      ]
    },
  ];
}

function highSchoolPool() {
  return [
    {
      onceId: "hs_course_pick",
      title: "Course selection",
      body: "Counselling week.\n\nYou pick what you’ll carry all year.",
      choices: swcCourses.map(c => ({
        text: c.title,
        delta: { ...c.effect },
        apply: () => {
          state.flags.courseTags = state.flags.courseTags || [];
          for (const t of (c.tags || [])) if (!state.flags.courseTags.includes(t)) state.flags.courseTags.push(t);
        },
        log: `You enroll in ${c.title}.`
      }))
    },
    {
      onceId: "hs_party",
      title: "A party invite",
      body: "You get invited.\n\nYou also have something due tomorrow.",
      choices: [
        { text: "Go anyway", delta: { hope: +3, grade: -3, reputation: +1 }, log: "You live a little. Tomorrow hurts." },
        { text: "Stay and finish the work", delta: { grade: +4, hope: -1 }, log: "You choose future-you." },
        { text: "Go for one hour then leave", delta: { hope: +2, grade: -1, reputation: +1 }, log: "You compromise. It’s never perfect." },
      ]
    },
    {
      onceId: "hs_club",
      title: "A club opportunity",
      body: "A teacher tells you about a club that could turn into something bigger.\n\nIf you commit, it’ll show.",
      choices: [
        { text: "Join and commit", delta: { connections: +3, reputation: +3, hope: -1 }, log: "You show up consistently." },
        { text: "Join casually", delta: { connections: +2, reputation: +1 }, log: "You keep it light." },
        { text: "Skip it", delta: { hope: +1 }, log: "You keep your time for yourself." },
      ]
    },
  ];
}

function contestEvent() {
  const contests = [
    { name: "Math Contest", tag: "math" },
    { name: "Computer Science Contest", tag: "cs" },
    { name: "Chemistry Challenge", tag: "chem" },
    { name: "Physics Competition", tag: "physics" },
    { name: "Biology Olympiad", tag: "bio" }
  ];
  const c = pick(contests);

  const hasSupport =
    (state.flags.courseTags || []).includes(c.tag) ||
    state.grade >= 80 ||
    state.connections >= 25;

  const prep = hasSupport ? rand(6, 18) : rand(-8, 8);
  const score = clamp(Math.round(55 + (state.grade - 70) * 0.8 + prep + rand(-12, 12)), 0, 100);

  const tierRoll = score + rand(-8, 8);
  let placement = "Participation";
  if (tierRoll >= 92) placement = "Top 1%";
  else if (tierRoll >= 86) placement = "Top 5%";
  else if (tierRoll >= 78) placement = "Top 10%";
  else if (tierRoll >= 68) placement = "Top 25%";

  const strength =
    placement === "Top 1%" ? 10 :
    placement === "Top 5%" ? 7 :
    placement === "Top 10%" ? 5 :
    placement === "Top 25%" ? 2 : 1;

  const repGain =
    placement === "Top 1%" ? 6 :
    placement === "Top 5%" ? 5 :
    placement === "Top 10%" ? 4 :
    placement === "Top 25%" ? 2 : 1;

  const connGain =
    placement === "Top 1%" ? 3 :
    placement === "Top 5%" ? 2 :
    placement === "Top 10%" ? 2 :
    placement === "Top 25%" ? 1 : 0;

  return {
    onceId: `contest_${state.age}_${c.tag}`,
    title: c.name,
    body: "You can show up and get a real score or stay invisible.\n\nRankings echo later, whether you like it or not.",
    choices: [
      {
        text: "Compete",
        delta: { reputation: +repGain, connections: +connGain, grade: +1, hope: +1 },
        apply: () => { state.contestStrength += strength; },
        log: `Result: ${score}/100 • ${placement}.`
      },
      { text: "Skip it", delta: { hope: +1, reputation: -1 }, log: "You protect comfort. You lose visibility." }
    ]
  };
}

function majorPickEvent(label) {
  return {
    onceId: `major_pick_${label}`,
    title: "Choose a major",
    body: "You pick a direction.\n\nPeople will ask why. You’ll have to answer with more than vibes.",
    choices: majors.map(m => ({
      text: m.title,
      delta: {},
      apply: () => { state.major = m.title; },
      log: `You choose ${m.title}.`
    }))
  };
}

function switchMajorEvent() {
  return {
    onceId: `switch_major_${state.age}`,
    title: "Switch majors",
    body: "You realize the current path doesn’t fit.\n\nSwitching is allowed. It still costs time.",
    choices: majors.map(m => ({
      text: `Switch to ${m.title}`,
      delta: { hope: -1, reputation: -1 },
      apply: () => { state.major = m.title; },
      log: `You switch into ${m.title}.`
    }))
  };
}

function fallbackSchoolEvent() {
  return {
    onceId: "fallback",
    title: "Fallback plan",
    body: "You still have choices.\n\nA detour isn’t a failure. It’s just a different start line.",
    choices: [
      {
        text: "Community College",
        delta: { hope: +1 },
        apply: () => {
          startProgram({ schoolType: "Community College", programLength: 2, degreeLevel: "Associate" });
          enqueue(majorPickEvent("Community"));
        },
        log: "You pick stability."
      },
      {
        text: "Work for a year",
        delta: { money: +1200, hope: +1, reputation: +1 },
        apply: () => { state.inSchool = false; state.schoolType = "—"; },
        log: "You buy time and breathing room."
      }
    ]
  };
}

function uniApplicationEvent() {
  return {
    onceId: "uni_apps",
    title: "Applications season",
    body: "You pick where to apply.\n\nGrades matter. Reputation matters.\nTrust and connections matter more than people admit.",
    choices: [
      {
        text: "Apply: Ivy League",
        delta: {},
        apply: () => {
          const ok = admit("Ivy");
          if (ok) {
            startProgram({ schoolType: "Ivy League", programLength: 4, degreeLevel: "Bachelor" });
            enqueue(majorPickEvent("Ivy"));
            logLine("Accepted. The email feels unreal.");
          } else {
            applyDelta({ hope: -4, reputation: -2, trust: -1 });
            showDeltaPopup({ hope: -4, reputation: -2, trust: -1 });
            logLine("Rejected. You read the sentence twice.");
            enqueue(fallbackSchoolEvent());
          }
        },
        log: "You submit the application."
      },
      {
        text: "Apply: State University",
        delta: {},
        apply: () => {
          const ok = admit("State");
          if (ok) {
            startProgram({ schoolType: "State University", programLength: 4, degreeLevel: "Bachelor" });
            enqueue(majorPickEvent("State"));
            logLine("Accepted. Relief hits first.");
          } else {
            applyDelta({ hope: -3, trust: -1 });
            showDeltaPopup({ hope: -3, trust: -1 });
            logLine("Rejected. You start planning a detour.");
            enqueue(fallbackSchoolEvent());
          }
        },
        log: "You apply."
      },
      {
        text: "Choose: Community College",
        delta: { hope: +1 },
        apply: () => {
          startProgram({ schoolType: "Community College", programLength: 2, degreeLevel: "Associate" });
          enqueue(majorPickEvent("Community"));
          logLine("You choose the practical route.");
        },
        log: "You enroll."
      }
    ]
  };
}

function gradSchoolPrompt() {
  return {
    onceId: `grad_prompt_${state.age}`,
    title: "More school?",
    body: "You could stop here.\n\nOr you could keep going, and let the cost become the point.",
    choices: [
      {
        text: "Apply for a Master’s",
        delta: { money: -1200, hope: -1 },
        apply: () => {
          const ok = admit("Masters");
          if (ok) {
            startProgram({ schoolType: "Graduate School", programLength: 2, degreeLevel: "Master" });
            logLine("Accepted. More time. More debt. More leverage.");
          } else {
            applyDelta({ hope: -2 });
            showDeltaPopup({ hope: -2 });
            logLine("Rejected. Not now.");
          }
        },
        log: "You apply."
      },
      {
        text: "Apply for a PhD",
        delta: { hope: -2 },
        apply: () => {
          const ok = admit("PhD");
          if (ok) {
            startProgram({ schoolType: "PhD Program", programLength: 5, degreeLevel: "PhD" });
            logLine("Accepted. Your life becomes research.");
          } else {
            applyDelta({ hope: -3 });
            showDeltaPopup({ hope: -3 });
            logLine("Rejected. The bar was brutal.");
          }
        },
        log: "You apply."
      },
      { text: "Stop here", delta: { hope: +1 }, log: "You choose to live outside school." }
    ]
  };
}

function adultReturnSchoolEvent() {
  return {
    onceId: `adult_return_${state.age}`,
    title: "Night classes",
    body: "You see a flyer for adult programs.\n\nIt’s not romantic. It’s practical.\nBut it’s a door.",
    choices: [
      {
        text: "Community College",
        delta: { money: -900, hope: +1 },
        apply: () => {
          startProgram({ schoolType: "Community College", programLength: 2, degreeLevel: "Associate" });
          enqueue(majorPickEvent("AdultCommunity"));
        },
        log: "You enroll."
      },
      {
        text: "State University",
        delta: { money: -1600, hope: -1 },
        apply: () => {
          const ok = admit("State");
          if (ok) {
            startProgram({ schoolType: "State University", programLength: 4, degreeLevel: "Bachelor" });
            enqueue(majorPickEvent("AdultState"));
            logLine("Accepted. You do this while working.");
          } else {
            applyDelta({ hope: -2 });
            showDeltaPopup({ hope: -2 });
            logLine("Rejected. You try the practical route.");
            startProgram({ schoolType: "Community College", programLength: 2, degreeLevel: "Associate" });
            enqueue(majorPickEvent("AdultCommunityFallback"));
          }
        },
        log: "You apply."
      },
      { text: "Not now", delta: { hope: +1 }, log: "You postpone it again." }
    ]
  };
}

function buildYearQueue() {
  state.pendingEvents = [];
  setSchoolByAge();

  if (state.age === 6 && state.hobby === "—" && !has("hobby6")) {
    enqueue(hobbyAtSixEvent());
  }

  if (state.age <= 7) {
    const pool = childhoodPool();
    const e1 = selectUnused(pool) || {
      onceId: `kid_fallback_${state.age}`,
      title: "A small day",
      body: "Nothing big happens. You still become someone.",
      choices: [{ text: "Keep going", delta: { hope: +1 }, log: "Time passes." }]
    };
    enqueue(e1);

    const e2 = selectUnused(pool) || {
      onceId: `kid_fallback2_${state.age}`,
      title: "A small decision",
      body: "You pick what feels safest.",
      choices: [{ text: "Choose comfort", delta: { trust: +1 }, log: "You learn your own habits." }]
    };
    if (e2.onceId !== e1.onceId) enqueue(e2);
    return;
  }

  if (state.age <= 12) {
    const pool = lateChildPool();
    const e1 = selectUnused(pool) || {
      onceId: `lc_fallback_${state.age}`,
      title: "A normal day",
      body: "Something small tests you.",
      choices: [{ text: "Handle it", delta: { trust: +1 }, log: "You handle it." }]
    };
    enqueue(e1);

    enqueue({
      onceId: `study_${state.age}`,
      title: "Homework night",
      body: "You have homework. You also have a life.",
      choices: [
        { text: "Do it properly", delta: { grade: +3, hope: -1 }, log: "You finish it." },
        { text: "Rush it", delta: { grade: -1, hope: +1 }, log: "You survive the deadline." },
        { text: "Forget it", delta: { grade: -3, reputation: -1 }, log: "Your teacher notices." },
      ]
    });
    return;
  }

  if (state.age <= 17) {
    const pool = highSchoolPool();
    const pickHS = selectUnused(pool);
    if (pickHS) enqueue(pickHS);

    if (Math.random() < 0.85) enqueue(contestEvent());

    enqueue({
      onceId: `hs_habit_${state.age}`,
      title: "School habits",
      body: "Your habits show up in your results.",
      choices: [
        { text: "Study hard", delta: { grade: +6, hope: -2, reputation: +2 }, log: "You push through." },
        { text: "Skip sometimes", delta: { grade: -5, reputation: -3, hope: +1 }, log: "You trade results for breathing room." },
        { text: "Ask for help early", delta: { grade: +3, reputation: +3, trust: +1 }, log: "Support becomes available." },
      ]
    });

    if (state.age === 17 && !has("uni_apps")) enqueue(uniApplicationEvent());
    return;
  }

  if (state.inSchool) {
    enqueue({
      onceId: `uni_year_${state.age}`,
      title: "A semester that counts",
      body: "Deadlines stack. People compare. You decide how to move.",
      choices: [
        { text: "Grind", delta: { grade: +4, hope: -3, reputation: +2 }, log: "You sacrifice comfort for results." },
        { text: "Balance", delta: { grade: +1, hope: +1, trust: +1 }, log: "You keep yourself alive." },
        { text: "Fall behind", delta: { grade: -4, hope: -2 }, log: "You feel time slipping." },
        {
          text: "Switch major",
          delta: {},
          apply: () => { enqueue(switchMajorEvent()); },
          log: "You consider changing direction."
        }
      ]
    });

    enqueue({
      onceId: `progress_${state.age}`,
      title: "Time moves",
      body: "Another year passes in the program.",
      choices: [
        {
          text: "Continue",
          delta: { money: -600 },
          apply: () => { graduateIfDone(); },
          log: "You keep going."
        }
      ]
    });

    if (state.degreeLevel === "Bachelor" && !has(`grad_prompt_${state.age}`) && Math.random() < 0.55) {
      enqueue(gradSchoolPrompt());
    }
    return;
  }

  enqueue({
    onceId: `adult_work_${state.age}`,
    title: "Work year",
    body: "Work rewards output and relationships.",
    choices: [
      { text: "Work hard", delta: { reputation: +4, hope: -2, money: +500 }, log: "People rely on you." },
      { text: "Network", delta: { connections: +4, money: +250 }, log: "Doors appear through people." },
      { text: "Protect your peace", delta: { hope: +3, reputation: -2 }, log: "You keep balance. You lose momentum." },
    ]
  });

  if (Math.random() < 0.25 && state.money >= 1200 && !has(`adult_return_${state.age}`)) {
    enqueue(adultReturnSchoolEvent());
  } else {
    enqueue({
      onceId: `adult_social_${state.age}`,
      title: "A social moment",
      body: "Someone asks what you want from life. You answer too fast.",
      choices: [
        { text: "Be honest", delta: { trust: +2, connections: +1 }, log: "You let someone see you." },
        { text: "Joke it off", delta: { hope: +1 }, log: "You keep it light." },
        { text: "Change the subject", delta: { trust: -1 }, log: "You protect yourself." },
      ]
    });
  }

  state.money += Math.round(3200 * state.moneyMult);
}

function advanceYear() {
  if (state.awaitingChoice) return;

  state.year += 1;
  state.age += 1;

  renderSidebar();
  E.timelineSub.textContent = `Age ${state.age}.`;

  buildYearQueue();
  const first = nextPendingEvent();
  if (first) renderEvent(first);
}

function renderLocationChoices() {
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

function renderClassChoices() {
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
      renderClassChoices();
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

function updateStartReady() {
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

function startLife() {
  const ident = identities.find(i => i.id === state.selectedIdentityId);
  const loc = locations.find(l => l.id === state.selectedLocationId);
  if (!ident || !loc) return;

  const base = ident.start;
  const savedName = state.name.trim();
  const savedGender = state.gender;

  state = {
    ...defaultState(),
    selectedIdentityId: ident.id,
    selectedLocationId: loc.id,
    name: savedName,
    gender: savedGender,
    inGame: true,

    background: ident.background,

    locationLabel: `${loc.city}, ${loc.country}`,
    country: loc.country,
    moneyMult: loc.moneyMult,
    lawStrictness: loc.lawStrictness,

    money: Math.round(base.money * loc.moneyMult),
    health: base.health,
    hope: base.hope,
    trust: base.trust,
    connections: base.connections,
    grade: base.grade,
    reputation: base.reputation,

    inSchool: false,
    schoolType: "—",
    major: "—",
    degreeLevel: "—",
    yearsInProgram: 0,
    programLength: 0,
    contestStrength: 0,
  };

  showScreen("game");
  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";

  renderSidebar();

  E.eventTitle.textContent = `Age 0 — A first breath`;
  typeText(
    E.eventBody,
    `${state.name} opens their eyes in ${state.locationLabel}.\n\nNo manual. No guarantees.\nJust time and what you do with it.`
  );
  E.timelineSub.textContent = `Age 0.`;

  logLine(`Name: ${state.name}. Gender: ${state.gender}.`);
  logLine(`Location: ${state.locationLabel}.`);
  logLine(`Class: ${ident.title}.`);

  setAwaitingChoice(false);
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

  E.btnStartLife.addEventListener("click", () => {
    if (E.btnStartLife.disabled) return;
    startLife();
  });

  E.btnNextYear.addEventListener("click", advanceYear);

  E.btnBackToStart.addEventListener("click", () => {
    showScreen("start");
    state.inGame = false;
    updateStartReady();
  });

  E.btnReset.addEventListener("click", resetAll);
}

init();
