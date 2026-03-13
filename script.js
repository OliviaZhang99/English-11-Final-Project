const DATA = {
  backgrounds: [
    { name: "Working Class", note: "Money feels fragile. Practical choices matter early.", money: 10, discipline: 6, hope: 5, trust: 5 },
    { name: "Middle Class", note: "There is some stability, but expectations can weigh on you.", money: 18, discipline: 6, hope: 6, trust: 6 },
    { name: "Upper Class", note: "Resources open doors, but pressure and image can become its own burden.", money: 32, discipline: 5, hope: 6, trust: 5 }
  ],
  identities: [
    { name: "Woman", note: "Your life may involve navigating gendered expectations and underestimation." },
    { name: "Man", note: "Your life may involve pressure around status, control, and emotional restraint." },
    { name: "Non-binary", note: "Your life may ask for self-definition and the search for people who understand you." },
    { name: "Transgender", note: "Your life may ask for courage, self-definition, support, and persistence in different ways." }
  ],
  talents: [
    { name: "Sports", note: "Your body picks up movement and competition easily.", performance: 2, discipline: 1 },
    { name: "Arts", note: "You are drawn to expression, imagination, and creative detail.", hope: 1, purpose: 1 },
    { name: "Academics", note: "Learning and abstraction come naturally to you.", discipline: 2, grades: 4 },
    { name: "Leadership", note: "People often notice your presence and initiative.", trust: 1, performance: 1 },
    { name: "Technology", note: "You like solving systems and understanding how things work.", grades: 2, purpose: 1 }
  ],
  childhoodActivities: ["Story Time", "Drawing", "Soccer", "Dance", "Music", "Swimming"],
  teenActivities: ["Dance Team", "Basketball", "Coding Club", "Debate", "Band", "Drama", "Volunteering", "Part-time Job", "Art Club", "Student Council", "Gym"],
  adultActivities: ["Gym", "Creative Projects", "Volunteering", "Networking", "Family Time", "Reading", "Side Hustle", "Travel", "Therapy", "Community Work"],
  majors: ["Computer Science", "Business", "Engineering", "Arts", "Education", "Medicine", "Social Sciences", "Skilled Trades"],
  worldEvents: [
    { title: "A respiratory virus spreads again", body: "Hospitals fill quickly. Medical systems need more people, and stress rises almost everywhere.", effects: { health: -1 }, field: { Medicine: 1.18 } },
    { title: "A recession tightens the economy", body: "Hiring slows, promotions become harder, and households begin to cut back.", effects: { money: -4, stress: 1 }, firing: 0.1, raises: -0.15 },
    { title: "A technology boom accelerates", body: "Companies rush to hire technical workers, and digital skills are rewarded more aggressively.", field: { "Computer Science": 1.18, Engineering: 1.08, Business: 1.04 } },
    { title: "Infrastructure spending expands", body: "Governments push large public projects. Skilled trades and engineering benefit.", field: { "Skilled Trades": 1.16, Engineering: 1.12 } },
    { title: "Arts funding is reduced", body: "Cultural organizations become more unstable. Creative work gets harder to sustain financially.", field: { Arts: 0.88 } },
    { title: "Teacher shortages grow", body: "Schools urgently need workers. Education becomes more stable than usual.", field: { Education: 1.12 } },
    { title: "Housing costs rise sharply", body: "Rent and mortgages become harder to carry. Even stable people feel squeezed.", effects: { money: -5, stress: 1 } },
    { title: "A public mental-health push expands support", body: "Counselling access improves. Some people finally get help earlier.", effects: { hope: 1, stress: -1 } }
  ],
  companies: [
    { name: "Northline Systems", culture: "fast and demanding", raise: 0.05, stability: 0.85 },
    { name: "Cedar Public Services", culture: "steady and structured", raise: 0.04, stability: 0.92 },
    { name: "Harbour Creative Group", culture: "expressive but unstable", raise: 0.045, stability: 0.78 },
    { name: "Maple Health Network", culture: "mission-driven and intense", raise: 0.055, stability: 0.88 },
    { name: "Prairie BuildWorks", culture: "practical and blunt", raise: 0.05, stability: 0.89 }
  ],
  houseOptions: [
    { label: "Small condo", cost: 280, upkeep: 8 },
    { label: "Townhouse", cost: 430, upkeep: 12 },
    { label: "Detached home", cost: 710, upkeep: 18 }
  ],
  carOptions: [
    { label: "Used car", cost: 22, upkeep: 2 },
    { label: "Reliable sedan", cost: 38, upkeep: 3 },
    { label: "New SUV", cost: 62, upkeep: 5 }
  ],
  jobBoard: {
    "Computer Science": [
      { title: "IT Support Assistant", minEducation: "High School Graduate", salary: 46, description: "Entry technical support and troubleshooting for a small company.", recordPolicy: "Sometimes" },
      { title: "Junior Web Developer", minEducation: "College / Trades", salary: 64, description: "Build and maintain front-end pages, small features, and internal tools." },
      { title: "Software Developer I", minEducation: "University", salary: 79, description: "Write production code, fix bugs, and work with a development team." }
    ],
    "Business": [
      { title: "Sales Associate", minEducation: "High School Graduate", salary: 41, description: "Customer-facing sales and service work with growth potential." },
      { title: "Operations Coordinator", minEducation: "College / Trades", salary: 55, description: "Support scheduling, logistics, reporting, and office operations." },
      { title: "Business Analyst", minEducation: "University", salary: 72, description: "Analyze processes, data, and performance for strategic decisions." }
    ],
    "Engineering": [
      { title: "Drafting Technician", minEducation: "College / Trades", salary: 58, description: "Support design and technical drawings for projects." },
      { title: "Project Engineer", minEducation: "University", salary: 82, description: "Work on engineering planning, testing, and project delivery." },
      { title: "Research Engineer", minEducation: "Graduate School", salary: 95, description: "Handle advanced technical design and specialized development." }
    ],
    "Arts": [
      { title: "Production Assistant", minEducation: "High School Graduate", salary: 38, description: "Help deliver projects, events, shoots, and creative production tasks." },
      { title: "Graphic Designer", minEducation: "College / Trades", salary: 52, description: "Create visual assets for brands, campaigns, and digital products." },
      { title: "Creative Strategist", minEducation: "University", salary: 61, description: "Blend concept development, communication, and campaign planning." }
    ],
    "Education": [
      { title: "After-school Program Worker", minEducation: "High School Graduate", salary: 39, description: "Support children and youth through structured programs.", recordPolicy: "No" },
      { title: "Education Assistant", minEducation: "College / Trades", salary: 48, description: "Assist students in classrooms and learning support settings." },
      { title: "Teacher", minEducation: "University", salary: 68, description: "Teach, assess, plan, and support students in a formal school setting." }
    ],
    "Medicine": [
      { title: "Clinic Receptionist", minEducation: "High School Graduate", salary: 42, description: "Administrative support in a medical office or clinic.", recordPolicy: "Sometimes" },
      { title: "Licensed Practical Nurse", minEducation: "College / Trades", salary: 66, description: "Direct patient care in hospitals, clinics, or long-term care." },
      { title: "Physician", minEducation: "Professional School", salary: 145, description: "Diagnosis, treatment, and long-term medical responsibility." }
    ],
    "Social Sciences": [
      { title: "Community Support Worker", minEducation: "High School Graduate", salary: 41, description: "Front-line support work in community and outreach settings." },
      { title: "Case Coordinator", minEducation: "College / Trades", salary: 53, description: "Coordinate resources, referrals, and client support plans." },
      { title: "Policy Analyst", minEducation: "University", salary: 71, description: "Research social systems and build policy recommendations." }
    ],
    "Skilled Trades": [
      { title: "Apprentice", minEducation: "High School Graduate", salary: 48, description: "Train on the job while building practical trade skills.", recordPolicy: "Yes" },
      { title: "Journeyperson", minEducation: "College / Trades", salary: 74, description: "Independent skilled trade work with recognized training." },
      { title: "Site Supervisor", minEducation: "College / Trades", salary: 88, description: "Lead crews, timelines, and safety on larger projects." }
    ],
    "General": [
      { title: "Retail Associate", minEducation: "High School Graduate", salary: 39, description: "Entry customer service work with flexible hours.", recordPolicy: "Yes" },
      { title: "Housekeeper / Maid", minEducation: "High School Graduate", salary: 34, description: "Cleaning, setup, and guest support work.", recordPolicy: "Yes" },
      { title: "Park Maintenance Worker", minEducation: "High School Graduate", salary: 38, description: "Outdoor maintenance and city upkeep work.", recordPolicy: "Yes" },
      { title: "Park Patrol Assistant", minEducation: "High School Graduate", salary: 41, description: "Public-facing patrol support and reporting.", recordPolicy: "Sometimes" },
      { title: "Administrative Assistant", minEducation: "College / Trades", salary: 49, description: "Office support, scheduling, communication, and coordination.", recordPolicy: "No" },
      { title: "Program Coordinator", minEducation: "University", salary: 61, description: "Coordinate projects, stakeholders, and reporting requirements.", recordPolicy: "No" }
    ]
  }
};

const app = {
  state: null,
  currentScenario: null,
  worldEventTimer: 2,
  rankNames: ["Low", "Fair", "Good", "Very Good", "Excellent"],
  modalActions: {},
  badgeDefs: [
    ["High Achiever", s => s.average >= 92 && s.age >= 24],
    ["Late Bloom", s => s.age >= 35 && s.average >= 84],
    ["Survivor", s => s.health <= 5 && s.age >= 40],
    ["Loving Legacy", s => s.relationships >= 8 && s.age >= 55],
    ["Homeowner", s => !!s.house],
    ["Entrepreneur", s => s.businessOwner],
    ["Rebuilder", s => s.criminalRecord && s.job && s.performance >= 6],
    ["System Marked", s => s.criminalRecord && !s.job && s.age >= 30],
    ["Served Time", s => s.releaseYear !== null],
    ["Second Chance", s => s.releaseYear !== null && s.job],
    ["Graduate Scholar", s => s.educationStage === "Graduate School" || s.educationStage === "Professional School"],
    ["Retired", s => s.retired],
    ["Worldly", s => s.moves >= 2]
  ]
};

const $ = id => document.getElementById(id);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const chance = p => Math.random() < p;
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

function init() {
  populateSetupOptions();
  bindUI();
  showScreen("menuScreen");
}

function populateSetupOptions() {
  fillSelect($("backgroundSelect"), DATA.backgrounds.map(x => x.name));
  fillSelect($("identitySelect"), DATA.identities.map(x => x.name));
  fillSelect($("talentSelect"), DATA.talents.map(x => x.name));
  randomizeSetup();
}

function fillSelect(select, items) {
  select.innerHTML = items.map(v => `<option value="${v}">${v}</option>`).join("");
}

function bindUI() {
  $("randomizeBtn").onclick = randomizeSetup;
  $("startBtn").onclick = startGame;
  $("closeModalBtn").onclick = closeModal;
  $("modal").addEventListener("click", e => {
    if (e.target.id === "modal") closeModal();
  });
  $("homeBtn").onclick = goHome;
}

function randomizeSetup() {
  const names = ["Avery", "Lena", "Jordan", "Mia", "Noah", "Sage", "Olive", "Kai", "Mason", "Emma", "Riley", "Aria"];
  $("nameInput").value = rand(names);
  $("backgroundSelect").value = rand(DATA.backgrounds).name;
  $("identitySelect").value = rand(DATA.identities).name;
  $("talentSelect").value = rand(DATA.talents).name;
}

function defaultState(setup) {
  const bg = DATA.backgrounds.find(b => b.name === setup.background);
  const talent = DATA.talents.find(t => t.name === setup.talent);
  return {
    name: setup.name,
    age: 0,
    alive: true,
    background: setup.background,
    identity: setup.identity,
    talent: setup.talent,
    backgroundNote: bg.note,
    identityNote: DATA.identities.find(x => x.name === setup.identity).note,
    talentNote: talent.note,
    money: 0,
    debt: 0,
    salary: 0,
    rent: 0,
    health: 8,
    hope: bg.hope + (talent.hope || 0),
    trust: bg.trust + (talent.trust || 0),
    stress: 1,
    discipline: bg.discipline + (talent.discipline || 0),
    performance: 5 + (talent.performance || 0),
    purpose: 5 + (talent.purpose || 0),
    relationships: 5,
    average: 72 + (talent.grades || 0),
    schoolStage: "Early Childhood",
    educationStage: "None",
    major: "Undeclared",
    gradTrack: "",
    currentActivity: rand(DATA.childhoodActivities),
    badges: [],
    log: [],
    eventSeen: {},
    pendingSchoolApps: null,
    graduationLetterShown: false,
    company: null,
    workCulture: "",
    performanceTrend: 0,
    job: null,
    field: null,
    jobLevel: 0,
    businessOwner: false,
    retired: false,
    retirementIncome: 0,
    house: null,
    car: null,
    houseUpkeep: 0,
    carUpkeep: 0,
    inSchool: true,
    relationshipStatus: "Single",
    children: 0,
    criminalRecord: false,
    underCharges: false,
    jailYears: 0,
    probationYears: 0,
    communityServiceHours: 0,
    lastCrimeSeverity: "",
    releaseYear: null,
    peakSalary: 0,
    majorLifeScore: 0,
    illness: "",
    healthFlags: [],
    postSecondaryStatus: "",
    workPerformanceLabel: "developing",
    moves: 0,
    loanHistory: [],
    worldModifier: 1,
    currentWorld: null,
    justGraduated: false,
    yearsWorked: 0,
    yearsInPostSecondary: 0,
    certifications: [],
    applicationsThisYear: 0,
    pension: 0,
    healthInsurance: false,
    carInsurance: false,
    homeInsurance: false,
    pendingOffer: null,
    lastInterviewAge: -1,
    city: "Vancouver",
    rentedHome: "",
    bankruptcyUsed: false,
    spouseSupport: 0,
    emergencyFund: 0,
    cachedAge: null,
    cachedScenario: null
  };
}

function startGame() {
  const setup = {
    name: $("nameInput").value.trim() || "Avery",
    background: $("backgroundSelect").value,
    identity: $("identitySelect").value,
    talent: $("talentSelect").value
  };

  app.state = defaultState(setup);
  addLog("A new life begins.");
  showScreen("gameScreen");
  $("homeBtn").classList.remove("hidden");
  render();
  setScenario(introScenario());
}




function goHome() {
  if (confirm("Return to the main menu?")) {
    app.state = null;
    app.currentScenario = null;
    showScreen("menuScreen");
    $("homeBtn").classList.add("hidden");
    }
}

function showScreen(id) {
  ["menuScreen", "gameScreen"].forEach(screenId => {
    $(screenId).classList.toggle("active", screenId === id);
  });
}



function introScenario() {
  const s = app.state;
  return {
    age: s.age,
    title: "Age 0",
    body: "Begin this life?",
    choices: [
      { text: "Begin.", fn: () => advanceYear({ hope: 1, trust: 1 }) }
    ]
  };
}

function setScenario(scenario) {
  app.currentScenario = scenario;
  renderScenario();
}

function render() {
  if (!app.state) return;
  normalizeFinances();
  renderSummary();
  renderBadges();
  renderLog();
  renderActions();
}

function renderScenario() {
  const s = app.state;
  const scene = app.currentScenario;
  $("ageLabel").textContent = `Age ${s.age}`;
  $("sceneTitle").textContent = scene.title;
  if (scene.bodyHtml) {
    $("narrative").innerHTML = scene.bodyHtml;
  } else {
    $("narrative").textContent = scene.body;
  }
  const pills = [
    pill(`Health ${healthLabel(s.health)}`),
    pill(`Hope ${statWord(s.hope)}`),
    pill(`Stress ${statWord(11 - s.stress)}`)
  ];
  if (s.money > 0 || s.salary > 0 || s.debt > 0 || s.age >= 15) pills.push(pill(`Money $${Math.round(s.money)}k`));
  $("statusPills").innerHTML = pills.join("");
  $("choiceArea").innerHTML = "";
  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = choice.fn;
    $("choiceArea").appendChild(btn);
  });
}

function renderSummary() {
  const s = app.state;
  const showAcademics = s.inSchool || ["High School", "Middle School", "Elementary School", "Early Childhood"].includes(s.schoolStage);
  const rows = [
    ["Name", s.name],
    ["Age", s.age],
    ["Background", s.background],
    ["Identity", s.identity],
    ["Talent", s.talent],
    ["City", s.city],
    [showAcademics ? "School Stage" : "Life Stage", s.schoolStage],
    ["Education", s.educationStage],
    ["Main Focus", s.currentActivity || "—"]
  ];

  if (showAcademics) {
    rows.push(["Average Score", `${Math.round(s.average)}%`]);
    if (["University", "College / Trades", "Graduate School", "Professional School"].includes(s.schoolStage)) {
      rows.push(["Major", s.major]);
    }
  }

  if (s.field) rows.push(["Current Field", s.field]);
  if (s.job || s.retired) rows.push(["Job", s.job || "Retired"]);
  if (s.company) rows.push(["Company", s.company]);
  if (s.salary || s.retired) rows.push(["Salary", s.retired ? `$${Math.round(s.retirementIncome)}k pension` : `$${Math.round(s.salary)}k`]);

  rows.push(
    ["Money", `$${Math.round(s.money)}k`],
    ["Debt", `$${Math.round(s.debt)}k`],
    ["Housing", s.house || s.rentedHome || (s.rent ? "Renting" : "—")],
    ["Car", s.car || "—"],
    ["Insurance", [s.healthInsurance ? "Health" : "", s.carInsurance ? "Car" : "", s.homeInsurance ? "Home" : ""].filter(Boolean).join(", ") || "None"],
    ["Relationship", s.relationshipStatus],
    ["Children", s.children],
    ["Health", healthLabel(s.health)]
  );

  if (s.illness) rows.push(["Illness", s.illness]);
  if (s.job) rows.push(["Work Performance", workLabel(s.performance)]);

  rows.push(["Legal Status", legalLabel(s)]);
  if (s.age >= 55 || s.retired) rows.push(["Retirement", s.retired ? "Retired" : "Not retired"]);

  $("summaryArea").innerHTML = rows.map(([k,v]) => `<div class="summary-row"><span>${k}</span><strong>${v}</strong></div>`).join("");
}

function legalLabel(s) {
  if (s.jailYears > 0) return `In custody (${s.jailYears} year${s.jailYears === 1 ? "" : "s"} left)`;
  if (s.underCharges) return "Facing charges";
  if (s.criminalRecord) return "Criminal record";
  return "Clear";
}

function renderBadges() {
  const unlocked = new Set(app.state.badges);
  $("badgesArea").innerHTML = app.badgeDefs.map(([name]) => {
    const cls = unlocked.has(name) ? "badge" : "badge locked";
    return `<span class="${cls}">${name}</span>`;
  }).join("");
}

function renderLog() {
  $("logArea").innerHTML = app.state.log.slice(-12).reverse().map(item => `<div class="log-item">${item}</div>`).join("");
}

function schoolActionLabel(s) {
  if (s.justGraduated || s.schoolStage === "After High School" || s.educationStage === "High School Graduate") return "Apply to schools";
  if (s.inSchool) {
    if (["University", "College / Trades", "Graduate School", "Professional School"].includes(s.schoolStage)) return "School portal";
    if (s.schoolStage === "High School" && s.age >= 18) return "Apply to schools";
    return "Student options";
  }
  if (["University", "College / Trades"].includes(s.educationStage)) return "Grad / school options";
  if (s.schoolStage === "Gap Year") return "Apply to schools";
  return "Go back to school";
}

function renderActions() {
  const s = app.state;
  const container = $("actionButtons");
  const card = $("actionCard");
  container.innerHTML = "";
  if (!s.alive) {
    if (card) card.classList.add("hidden");
    return;
  }
  if (card) card.classList.remove("hidden");

  const actions = [];
  if (s.jailYears > 0) {
    if (s.illness) actions.push(["Handle illness", showIllnessPopup]);
    actions.push(["Continue", () => setScenario(generateYearScenario())]);
    actions.forEach(([label, fn]) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.onclick = fn;
      container.appendChild(btn);
    });
    return;
  }
  if (s.age >= 12 && s.age <= 26) actions.push(["Change activity", chooseActivityAction]);
  if (s.age >= 18 && !s.retired) actions.push([schoolActionLabel(s), goBackToSchoolAction]);
  if (s.age >= 16) actions.push(["Take out a loan", takeLoanAction]);
  if (s.age >= 18 && !s.house) actions.push([s.rent ? "Move / rent" : "Start renting", rentHousingAction]);
  if (s.age >= 18 && !s.house && s.money >= 20) actions.push(["Buy house", buyHouseAction]);
  if (s.house) actions.push(["Manage housing", manageHousingAction]);
  if (s.age >= 16 && !s.car) actions.push(["Buy car", buyCarAction]);
  if (s.car) actions.push(["Manage car", manageCarAction]);
  if (s.illness) actions.push(["Handle illness", showIllnessPopup]);
  if (s.age >= 18) actions.push(["Insurance", insuranceAction]);
  if (s.debt > 0) actions.push(["Pay debt", payDebtAction]);
  if (s.debt >= 140 && !s.bankruptcyUsed) actions.push(["Consider bankruptcy", bankruptcyAction]);
  if (s.age >= 18 && s.job && !s.retired) actions.push(["Ask for a raise", askRaiseAction]);
  if (s.age >= 21 && s.job && !s.retired) actions.push(["Ask for promotion", askPromotionAction]);
  if (s.age >= 18 && s.job && !s.retired) actions.push(["Quit job", quitJobAction]);
  if (s.age >= 18 && !s.job && !s.retired && !s.inSchool && s.jailYears === 0) actions.push([s.criminalRecord ? "Apply for jobs (record check)" : "Apply for jobs", applyJobsAction]);
  if (s.age >= 18 && !s.job && !s.retired && s.schoolStage === "Gap Year") actions.push(["Apply for jobs", applyJobsAction]);
  if (s.age >= 16 && !s.retired) actions.push([s.relationshipStatus === "Single" ? "Dating" : "Relationships", relationshipAction]);
  if (s.age >= 18 && !s.businessOwner && !s.retired && s.money >= 50) actions.push(["Start a business", startBusinessAction]);
  if (s.age >= 16 && !s.retired) actions.push(["Commit crime", crimeAction]);
  if (s.age >= 55 && !s.retired) actions.push(["Consider retirement", retireAction]);

  actions.forEach(([label, fn]) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = fn;
    if (label === "Apply to schools" || label === "Apply for jobs") btn.classList.add("primary-action");
    btn.onclick = fn;
    container.appendChild(btn);
  });
}

function pill(text) { return `<span class="pill">${text}</span>`; }
function rank(v) { return app.rankNames[clamp(Math.ceil(v / 2) - 1, 0, 4)]; }
function healthLabel(v) { return ["critical", "very poor", "poor", "fragile", "fair", "stable", "good", "very good", "strong", "excellent", "excellent"][clamp(Math.round(v), 0, 10)]; }
function workLabel(v) { return ["failing", "poor", "weak", "unsteady", "fair", "steady", "good", "very good", "excellent", "excellent", "excellent"][clamp(Math.round(v), 0, 10)]; }
function statWord(v) { return ["critical", "very low", "low", "shaky", "mixed", "okay", "good", "high", "very high", "excellent", "excellent"][clamp(Math.round(v), 0, 10)]; }

function addLog(text) {
  app.state.log.push(text);
  if (app.state.log.length > 40) app.state.log.shift();
}

function normalizeFinances() {
  const s = app.state;
  if (!s) return;
  if (s.money < 0) {
    s.debt += Math.abs(s.money);
    s.money = 0;
  }
  if (s.debt < 0) s.debt = 0;
}

function advanceYear(delta = {}) {
  const s = app.state;
  s.cachedAge = null;
  s.cachedScenario = null;
  Object.entries(delta).forEach(([k, v]) => {
    if (typeof s[k] === "number") s[k] += v;
  });
  ageUp();
  setScenario(generateYearScenario());
}

function ageUp() {
  const s = app.state;
  s.age += 1;
  yearlyCosts();
  normalizeFinances();
  applyWorldEventMaybe();
  updateEducationProgress();
  updateCareerProgress();
  updateRelationshipProgress();
  updateHealthProgress();
  updateLegalProgress();
  updateBadges();
  clampCoreStats();
  normalizeFinances();
  render();
}

function yearlyCosts() {
  const s = app.state;
  let costs = s.houseUpkeep + s.carUpkeep + s.rent + s.spouseSupport;
  if (s.healthInsurance) costs += 2;
  if (s.carInsurance && s.car) costs += 1.5;
  if (s.homeInsurance && s.house) costs += 1.8;
  if (s.debt > 0) {
    const interest = +(s.debt * 0.055).toFixed(1);
    s.debt += interest;
    costs += Math.min(16, Math.max(4, s.debt * 0.07));
  }
  if (s.retired) s.money += s.retirementIncome;
  if (s.salary && s.jailYears === 0) {
    let workFactor = 1;
    workFactor = Math.max(0.45, workFactor);
    s.money += s.salary * 0.58 * workFactor;
    s.pension += s.salary * 0.04 * workFactor;
  }
  if (s.businessOwner && chance(0.3)) {
    const swing = Math.round((Math.random() * 18) - 6);
    s.money += swing;
    addLog(`${s.name}'s business ${swing >= 0 ? 'earns' : 'loses'} ${Math.abs(swing)}k this year.`);
  }
  s.money -= costs;
  if (s.money < -25) {
    s.stress += 2;
    s.hope -= 1;
  }
  if (s.house && !s.homeInsurance && chance(0.05)) {
    s.money -= 12;
    addLog(`An uninsured home repair hits ${s.name}'s finances.`);
  }
  if (s.car && !s.carInsurance && chance(0.06)) {
    s.money -= 7;
    s.stress += 1;
    addLog(`${s.name} absorbs a car-related expense without insurance.`);
  }
}

function applyWorldEventMaybe() {
  app.worldEventTimer--;
  if (app.worldEventTimer > 0) return;
  app.worldEventTimer = 2 + Math.floor(Math.random() * 3);
  if (chance(0.55)) {
    const e = rand(DATA.worldEvents);
    app.state.currentWorld = e;
    if (e.effects) Object.entries(e.effects).forEach(([k,v]) => app.state[k] += v);
    addLog(`World event: ${e.title}.`);
    if (chance(0.16)) {
      showLetter({
        type: "Public Update",
        title: e.title,
        body: e.body,
        meta: worldMetaText(e)
      });
    }
  } else {
    app.state.currentWorld = null;
  }
}

function worldMetaText(e) {
  const lines = [];
  if (e.field) lines.push(`Fields affected: ${Object.entries(e.field).map(([k,v]) => `${k} ${v > 1 ? "up" : "down"}`).join(", ")}`);
  if (e.raises) lines.push(`Raise climate: ${e.raises > 0 ? "easier" : "harder"}`);
  if (e.firing) lines.push(`Job stability: reduced`);
  return lines.join(" • ") || "This shifts the climate around work, money, and stress.";
}

function updateEducationProgress() {
  const s = app.state;
  const wasHighSchool = s.schoolStage === "High School" || s.educationStage === "High School";

  if (s.age <= 10) {
    s.schoolStage = "Elementary School";
    s.educationStage = "Elementary School";
    s.inSchool = true;
  } else if (s.age <= 13) {
    s.schoolStage = "Middle School";
    s.educationStage = "Middle School";
    s.inSchool = true;
  } else if (s.age <= 17) {
    s.schoolStage = "High School";
    s.educationStage = "High School";
    s.inSchool = true;
  } else if (wasHighSchool && s.age === 18) {
    s.justGraduated = true;
    s.schoolStage = "After High School";
    s.educationStage = "High School Graduate";
    s.inSchool = false;
    s.graduationLetterShown = false;
  } else if (s.inSchool && ["University", "College / Trades", "Graduate School", "Professional School"].includes(s.schoolStage)) {
    s.educationStage = s.schoolStage;
  } else if (s.schoolStage === "Gap Year") {
    s.inSchool = false;
    if (!["University", "College / Trades", "Graduate School", "Professional School"].includes(s.educationStage)) {
      s.educationStage = "High School Graduate";
    }
  } else if (!s.retired) {
    s.schoolStage = "Working Years";
    if (!["University", "College / Trades", "Graduate School", "Professional School"].includes(s.educationStage) && s.age >= 18) {
      s.educationStage = "High School Graduate";
    }
  }

  const allowedActivities = s.age <= 10 ? DATA.childhoodActivities : (s.age <= 17 ? DATA.teenActivities : DATA.adultActivities);
  if (!allowedActivities.includes(s.currentActivity)) {
    s.currentActivity = rand(allowedActivities);
  }

  if (s.age >= 5 && s.inSchool) {
    const base = (s.discipline * 1.8) + (s.hope * 1.3) - (s.stress * 1.5);
    const activityBonus = schoolActivityBonus(s.currentActivity, s.talent);
    const randomShift = Math.floor(Math.random() * 7) - 3;
    s.average = clamp(Math.round(s.average + base / 10 + activityBonus + randomShift), 50, 100);
  }

  if (["University", "College / Trades", "Graduate School", "Professional School"].includes(s.schoolStage)) {
    s.yearsInPostSecondary += 1;
    if ((s.schoolStage === "University" && s.yearsInPostSecondary >= 4) ||
        (s.schoolStage === "College / Trades" && s.yearsInPostSecondary >= 2) ||
        (s.schoolStage === "Graduate School" && s.yearsInPostSecondary >= 2) ||
        (s.schoolStage === "Professional School" && s.yearsInPostSecondary >= 3)) {
      addLog(`${s.name} completes ${s.schoolStage.toLowerCase()}.`);
      s.educationStage = s.schoolStage;
      s.schoolStage = "Working Years";
      s.inSchool = false;
      s.postSecondaryStatus = "Completed";
      if (!s.field && s.major !== "Undeclared") s.field = fieldFromMajor(s.major);
      s.yearsInPostSecondary = 0;
    }
  }
}

function schoolActivityBonus(activity, talent) {
  const map = {
    "Coding Club": 1.5,
    "Debate": 1.2,
    "Volunteering": 0.8,
    "Dance Team": 0.7,
    "Part-time Job": -0.6,
    "Gym": 0.3,
    "Therapy": 0.5,
    "Story Time": 0.4,
    "Reading": 0.9
  };
  let bonus = map[activity] || 0;
  if (talent === "Academics") bonus += 0.8;
  if (talent === "Technology" && activity === "Coding Club") bonus += 1;
  return bonus;
}

function fieldFromMajor(major) {
  if (["Computer Science", "Engineering", "Business", "Arts", "Education", "Medicine", "Social Sciences", "Skilled Trades"].includes(major)) return major;
  return "General";
}

function updateCareerProgress() {
  const s = app.state;
  if (s.jailYears > 0 || s.retired) return;

  if (s.job) {
    s.yearsWorked += 1;
    const worldFactor = getFieldModifier(s.field);
    const perfChange = Math.round((s.discipline + s.hope - s.stress - healthPenalty()) / 6) + (chance(0.35) ? 1 : 0) - (chance(0.3) ? 1 : 0);
    s.performance = clamp(s.performance + perfChange, 1, 10);
    s.salary = Math.max(18, +(s.salary * (1 + (companyRaiseRate() * worldFactor))).toFixed(1));

    if (chance(0.10 + Math.max(0, s.performance - 6) * 0.03) && s.jobLevel < 5) {
      s.jobLevel += 1;
      s.salary += 6 + s.jobLevel * 2;
      s.job = jobTitleForState();
      addLog(`${s.name} earns a promotion and becomes ${s.job}.`);
      if (chance(0.65)) showLetter({ type: "Career Update", title: "Promotion Notice", body: `Your performance, consistency, and timing aligned. ${s.company} is moving you into a new role.

New role: ${s.job}
New salary: $${Math.round(s.salary)}k`, meta: `Company culture: ${s.workCulture}` });
    }

    const firingRisk = 0.015 + Math.max(0, 5 - s.performance) * 0.035 + (app.state.currentWorld?.firing || 0) + (s.criminalRecord ? 0.02 : 0);
    if (chance(firingRisk)) {
      addLog(`${s.name} loses a job at ${s.company}.`);
      if (chance(0.7)) showLetter({ type: "Employment Notice", title: "Termination Letter", body: `The role is ending. Performance, changing conditions, or company pressure all played a part.

Former role: ${s.job}
Final salary: $${Math.round(s.salary)}k`, meta: `This does not end a life. It changes the next decision.` });
      s.job = null; s.salary = 0; s.company = null; s.workCulture = ""; s.jobLevel = 0; s.stress += 2; s.hope -= 1;
    }
  }

  if (!s.job && !s.pendingOffer && !s.inSchool && s.age >= 18 && chance(0.12)) {
    autoOfferJobMaybe();
  }
}

function healthPenalty() {
  return app.state.health < 5 ? 2 : 0;
}

function companyRaiseRate() {
  const c = DATA.companies.find(x => x.name === app.state.company);
  return c ? c.raise : 0.04;
}

function getFieldModifier(field) {
  const e = app.state.currentWorld;
  if (!field || !e || !e.field) return 1;
  return e.field[field] || 1;
}

function jobTitleForState() {
  const field = app.state.field || "General";
  const levels = [
    `Entry-level ${field} role`,
    `Junior ${field} professional`,
    `${field} professional`,
    `Senior ${field} professional`,
    `${field} manager`,
    `${field} director`
  ];
  return levels[clamp(app.state.jobLevel, 0, levels.length - 1)];
}

function autoOfferJobMaybe() {
  const s = app.state;
  const role = s.targetRole;
  const baseField = (role && (s.field || fieldFromMajor(s.major) || "General")) || s.field || fieldFromMajor(s.major);
  s.field = baseField === "General" || !baseField ? rand(["Business", "Arts", "Education", "Skilled Trades"]) : baseField;
  const company = rand(DATA.companies.filter(c => {
    if (s.field === "Medicine") return /Health|Public/.test(c.name) || true;
    return true;
  }));
  const baseSalary = role ? role.salary : ({
    "Computer Science": 76, Engineering: 74, Business: 60, Arts: 42,
    Education: 58, Medicine: 88, "Social Sciences": 51, "Skilled Trades": 63, General: 48
  }[s.field] || 48);
  const title = role ? role.title : `Entry-level ${s.field} role`;
  const level = role && ["High School Graduate","College / Trades","University","Graduate School","Professional School"].includes(role.minEducation)
    ? Math.max(0, educationRank(role.minEducation) - 1)
    : 0;
  s.pendingOffer = {
    company: company.name,
    culture: company.culture,
    field: s.field,
    level,
    title,
    salary: Math.round(baseSalary * getFieldModifier(s.field)),
    description: role ? role.description : `A starting role in ${s.field}.`
  };
  s.targetRole = null;
  addLog(`${s.name} receives interest from ${company.name}.`);
  if (chance(0.55)) showLetter({
    type: "Offer Letter",
    title: "Professional Opportunity",
    body: `${company.name} is prepared to hire you.

Position: ${s.pendingOffer.title}
Starting salary: $${Math.round(s.pendingOffer.salary)}k
Work culture: ${company.culture}`,
    meta: `${s.pendingOffer.description}`
  });
}

function updateRelationshipProgress() {
  const s = app.state;
  if (s.age >= 16 && chance(0.16)) {
    const outcomes = [
      () => { if (s.relationshipStatus === "Single") { s.relationshipStatus = "Dating"; s.relationships += 1; addLog(`${s.name} starts seeing someone.`); } },
      () => { if (s.relationshipStatus === "Dating") { s.relationshipStatus = "Long-term relationship"; s.relationships += 1; addLog(`${s.name}'s relationship becomes more serious.`); } },
      () => { if (["Long-term relationship", "Married"].includes(s.relationshipStatus) && chance(0.5)) { s.children += 1; s.stress += 1; s.relationships += 1; addLog(`${s.name}'s family grows.`); } },
      () => { if (s.relationshipStatus === "Married" && chance(0.18 + Math.max(0, s.stress - 6) * 0.03)) { s.relationshipStatus = "Separated"; s.relationships -= 2; s.stress += 2; s.spouseSupport = s.children ? 4 : 2; addLog(`${s.name}'s marriage hits a serious rupture.`); } },
      () => { if (["Dating", "Long-term relationship", "Separated"].includes(s.relationshipStatus) && chance(0.22)) { s.relationshipStatus = "Single"; s.relationships -= 2; s.stress += 2; if (s.children) s.spouseSupport = 3; addLog(`${s.name} goes through a breakup or split.`); } }
    ];
    rand(outcomes)();
  }
  if (s.age >= 24 && s.relationshipStatus === "Long-term relationship" && chance(0.12)) {
    s.relationshipStatus = "Married";
    s.relationships += 1;
    addLog(`${s.name} gets married.`);
  }
  if (s.relationshipStatus === "Separated" && chance(0.35)) {
    s.relationshipStatus = chance(0.4) ? "Married" : "Divorced";
    if (s.relationshipStatus === "Divorced") addLog(`${s.name} finalizes a divorce.`);
    else addLog(`${s.name} and their partner decide to try again.`);
  }
}

function isLifeThreateningIllness(illness) {
  return ["cancer", "heart disease", "stroke", "organ failure", "a traumatic injury"].includes(illness);
}

function updateHealthProgress() {
  const s = app.state;
  const naturalAgingRisk = s.age < 18 ? 0.001 : s.age < 35 ? 0.002 : s.age < 50 ? 0.005 : s.age < 65 ? 0.013 : s.age < 80 ? 0.04 : 0.11;
  const stressRisk = Math.max(0, s.stress - 6) * 0.01;
  const activityBoost = s.currentActivity === "Gym" ? 0.6 : s.currentActivity === "Therapy" ? 0.35 : 0;
  const baselineDropChance = s.age < 45 ? 0.04 : s.age < 65 ? 0.08 : 0.14;

  if (chance(baselineDropChance)) s.health -= 1;
  s.health = clamp(s.health + activityBoost, 0, 10);

  if (!s.illness) {
    const illnessRoll = naturalAgingRisk + stressRisk + (s.age >= 45 ? 0.015 : 0);
    if (chance(illnessRoll)) {
      const conditions = [];
      if (s.age < 18) conditions.push("a bad flu", "an infection", "a sprain");
      if (s.age >= 18) conditions.push("burnout", "anxiety", "a back injury", "chronic pain", "a traumatic injury");
      if (s.age >= 35) conditions.push("an autoimmune condition", "a heart warning", "serious pneumonia");
      if (s.age >= 48) conditions.push("cancer", "heart disease", "stroke");
      if (s.age >= 60) conditions.push("organ failure");
      s.illness = rand(conditions);
      s.health -= isLifeThreateningIllness(s.illness) ? 2 : 1;
      s.stress += 1;
      addLog(`${s.name} is dealing with ${s.illness}.`);
    }
  }

  if (chance(s.age < 18 ? 0.001 : s.age < 40 ? 0.003 : s.age < 65 ? 0.006 : 0.012)) {
    const crash = rand(["a car crash", "a workplace accident", "a sudden fall", "a medical emergency"]);
    addLog(`${s.name} survives ${crash}.`);
    s.health -= chance(0.15) ? 3 : 2;
    s.stress += 2;
    if (chance(0.05 + Math.max(0, 4 - s.health) * 0.03)) {
      s.illness = "a traumatic injury";
    }
  }

  if (s.illness && !isLifeThreateningIllness(s.illness)) {
    s.health = Math.max(s.health, 1);
  }

  let deathChance = 0;
  if (s.age >= 70) deathChance += (s.age - 69) * 0.006;
  if (s.illness && isLifeThreateningIllness(s.illness)) deathChance += 0.04 + Math.max(0, 4 - s.health) * 0.03;
  if (s.health <= 1 && (s.age >= 75 || (s.illness && isLifeThreateningIllness(s.illness)))) deathChance += 0.08;

  if (chance(deathChance)) {
    s.alive = false;
    const cause = s.illness && isLifeThreateningIllness(s.illness) ? `Complications from ${s.illness} end the story here.` : `Age and accumulated strain finally close the story.`;
    setScenario(endScenario(cause));
  }
}

function updateLegalProgress() {
  const s = app.state;
  if (s.jailYears > 0) {
    s.jailYears -= 1;
    s.hope -= 1;
    s.money -= 3;
    s.relationships -= chance(0.22) ? 1 : 0;
    if (chance(0.28)) {
      addLog(rand([
        `${s.name} keeps their head down and gets through another hard month inside.`,
        `${s.name} joins a program inside and starts imagining life after release.`,
        `${s.name} gets through a tense situation in jail without making it worse.`,
        `${s.name} receives a letter from outside that changes the mood of the year.`
      ]));
    }
    if (s.jailYears <= 0) {
      addLog(`${s.name} is released from jail.`);
      s.criminalRecord = true;
      s.underCharges = false;
      s.releaseYear = s.age;
      s.stress += 2;
      s.hope -= 1;
    }
  }
}

function updateBadges() {
  const s = app.state;
  app.badgeDefs.forEach(([name, rule]) => {
    if (!s.badges.includes(name) && rule(s)) {
      s.badges.push(name);
      addLog(`Badge unlocked: ${name}.`);
    }
  });
}

function clampCoreStats() {
  const s = app.state;
  ["health","hope","trust","stress","discipline","performance","purpose","relationships"].forEach(k => s[k] = clamp(s[k], 0, 10));
  s.average = clamp(s.average, 50, 100);
}

function uniqueScenario(bucket, factoryList) {
  const s = app.state;
  if (!s.eventSeen[bucket]) s.eventSeen[bucket] = [];
  let remaining = factoryList.map((_, i) => i).filter(i => !s.eventSeen[bucket].includes(i));
  if (!remaining.length) {
    s.eventSeen[bucket] = [];
    remaining = factoryList.map((_, i) => i);
  }
  const pick = rand(remaining);
  s.eventSeen[bucket].push(pick);
  return factoryList[pick]();
}


function generateYearScenario() {
  const s = app.state;
  if (!s.alive) return endScenario("This life has ended.");
  if (s.age >= 85 || (s.age >= 68 && chance(0.14 + Math.max(0, 4 - s.health) * 0.03))) {
    s.alive = false;
    return endScenario(finalReflection());
  }

  if (s.pendingOffer) return pendingOfferScenario();
  if (s.schoolStage === "Gap Year") return gapYearScenario();
  if (s.justGraduated) {
    if (!s.graduationLetterShown) {
      s.graduationLetterShown = true;
      showLetter({
        type: "Final Report Card",
        title: "High School Complete",
        body: `${s.name}\n\nFinal average: ${Math.round(s.average)}%`,
        meta: "Now choose university, college or trades, a gap year, or work."
      });
    }
    s.justGraduated = false;
    return postHighSchoolScenario();
  }

  if (s.underCharges || s.jailYears > 0) return legalScenario();
  if (s.age >= 55 && !s.retired && chance(0.18)) return retirementPromptScenario();
  if (s.age >= 18 && s.inSchool && ["University", "College / Trades", "Graduate School", "Professional School"].includes(s.schoolStage) && chance(0.24)) return postSecondaryScenario();
  if (s.age >= 18 && s.job && chance(0.28)) return workScenario();
  if (s.age >= 18 && !s.job && !s.inSchool && chance(0.2)) return adultLifeScenario();

  if (s.cachedAge === s.age && s.cachedScenario) return s.cachedScenario;

  let scene;
  if (s.age <= 4) scene = childScenario();
  else if (s.age <= 10) scene = schoolChildScenario();
  else if (s.age <= 13) scene = middleScenario();
  else if (s.age <= 17) scene = teenScenario();
  else scene = adultLifeScenario();
  s.cachedAge = s.age;
  s.cachedScenario = scene;
  return scene;
}

function gapYearScenario() {
  const s = app.state;
  return scenarioFromPairs(`Age ${s.age}`, "What do you do with your gap year?", [
    ["Work and save money.", { money: 8, purpose: 1 }],
    ["Travel or explore your interests.", { hope: 2, money: -3, purpose: 1 }],
    ["Volunteer and build experience.", { purpose: 1, relationships: 1, money: 1 }],
    ["Use the year to prepare stronger applications.", { average: 2, discipline: 1, hope: 1 }]
  ]);
}


function childScenario() {
  const s = app.state;
  const factories = [
    () => scenarioFromPairs(`Age ${s.age}`, "What do you reach for first?", [
      ["Stay near someone familiar.", { trust: 1, hope: 1 }],
      ["Move toward something interesting.", { purpose: 1, hope: 1 }],
      ["Play with whatever is nearby.", { relationships: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "What do you do when you find something new?", [
      ["Touch it right away.", { purpose: 1, stress: 1 }],
      ["Watch first.", { discipline: 1 }],
      ["Wait for someone else.", { trust: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Another child has a toy you want. What do you do?", [
      ["Try to take it.", { stress: 1, trust: -1 }],
      ["Try to play together.", { relationships: 1, trust: 1 }],
      ["Find something else.", { discipline: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "You see a new place to crawl or run toward. What do you do?", [
      ["Go straight toward it.", { purpose: 1, stress: 1 }],
      ["Stop and look first.", { discipline: 1 }],
      ["Stay where you already feel safe.", { trust: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Someone hands you crayons and paper. What do you do?", [
      ["Draw carefully.", { discipline: 1, purpose: 1 }],
      ["Cover the whole page fast.", { hope: 1 }],
      ["Stop after a minute.", { stress: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A game has simple rules. What do you do?", [
      ["Try to follow them.", { discipline: 1 }],
      ["Change the game halfway through.", { purpose: 1 }],
      ["Copy what another child does.", { trust: 1 }]
    ])
  ];
  return uniqueScenario('child_all', factories);
}


function schoolChildScenario() {
  const s = app.state;
  const factories = [
    () => scenarioFromPairs(`Age ${s.age}`, "What do you focus on most at school this year?", [
      ["Following directions.", { discipline: 1, average: 2 }],
      ["Making friends.", { relationships: 1, trust: 1 }],
      [`Getting better at ${s.currentActivity}.`, { purpose: 1, average: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Something at school feels hard. What do you do?", [
      ["Ask for help.", { average: 2, trust: 1 }],
      ["Keep practicing.", { discipline: 1, average: 2 }],
      ["Avoid it for now.", { stress: 1, average: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "How do you spend most of your time after school?", [
      ["Homework first.", { average: 3, discipline: 1 }],
      ["Play with friends.", { relationships: 2 }],
      [`Put more time into ${s.currentActivity}.`, { purpose: 1, hope: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A class activity needs helpers. What do you do?", [
      ["Volunteer first.", { trust: 1, relationships: 1 }],
      ["Help if someone asks.", { discipline: 1 }],
      ["Stay out of it.", { stress: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "You get free time in class. What do you choose?", [
      ["Read or learn something.", { average: 2, purpose: 1 }],
      ["Talk to classmates.", { relationships: 1 }],
      ["Draw or make something.", { hope: 1, purpose: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "You make a mistake in front of other kids. What do you do?", [
      ["Laugh it off.", { hope: 1 }],
      ["Try again right away.", { discipline: 1, average: 1 }],
      ["Get quiet and pull back.", { stress: 1, trust: -1 }]
    ])
  ];
  return uniqueScenario('school_all', factories);
}


function middleScenario() {
  const s = app.state;
  const factories = [
    () => scenarioFromPairs(`Age ${s.age}`, "What do you care about most this year?", [
      ["Schoolwork.", { average: 3, discipline: 1, stress: 1 }],
      ["Friends.", { relationships: 2, average: -1 }],
      ["Your main activity.", { purpose: 1, average: 1, hope: 1 }],
      ["Having more space to yourself.", { stress: -1, trust: -1, discipline: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A group project gets awkward. What do you do?", [
      ["Take charge.", { trust: 1, discipline: 1 }],
      ["Do your part and keep it simple.", { average: 2 }],
      ["Let others handle it.", { stress: -1, average: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "You have to choose one thing to build up this year. What is it?", [
      ["Grades.", { average: 3, discipline: 1 }],
      ["Confidence.", { hope: 2 }],
      ["Friendships.", { relationships: 2 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Someone pushes your boundaries. What do you do?", [
      ["Speak up.", { trust: 1, stress: 1 }],
      ["Walk away.", { stress: -1, discipline: 1 }],
      ["Stay quiet.", { trust: -1, stress: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Your schedule feels full. What do you cut back on?", [
      ["Free time.", { average: 2, stress: 1 }],
      ["An activity.", { stress: -1, purpose: -1 }],
      ["Sleep and rest.", { average: 1, health: -1, stress: 1 }]
    ])
  ];
  return uniqueScenario('middle_all', factories);
}


function teenScenario() {
  const s = app.state;
  const factories = [
    () => scenarioFromPairs(`Age ${s.age}`, "How do you spend most of your time after school?", [
      ["Studying.", { average: 4, discipline: 1, stress: 1 }],
      ["With friends.", { relationships: 2, average: -1 }],
      [`On ${s.currentActivity}.`, { purpose: 1, average: 1, hope: 1 }],
      ["Working a small job.", { money: 4, average: -1, stress: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A friendship gets complicated. What do you do?", [
      ["Say what you really think.", { trust: 1, relationships: 1 }],
      ["Keep quiet to avoid drama.", { stress: 1, trust: -1 }],
      ["Step back and focus on yourself.", { average: 2, purpose: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "An adult offers you a way to earn money. What do you do?", [
      ["Take the work.", { money: 5, stress: 1 }],
      ["Only do it if it fits school.", { money: 3, average: 1 }],
      ["Say no and protect your time.", { hope: 1, stress: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "What are you trying hardest to build right now?", [
      ["Strong grades.", { average: 3, discipline: 1 }],
      ["A stronger social life.", { relationships: 2 }],
      ["A real skill outside class.", { purpose: 2 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "You can only say yes to one extra thing this year. What is it?", [
      ["A club or team.", { purpose: 1, relationships: 1 }],
      ["More shifts at work.", { money: 6, stress: 1, average: -1 }],
      ["Tutoring or extra study.", { average: 3 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A teacher thinks you could push further. What do you do?", [
      ["Take the challenge.", { average: 3, stress: 1 }],
      ["Keep your current pace.", { average: 1, stress: -1 }],
      ["Put that energy somewhere else.", { purpose: 1, hope: 1 }]
    ])
  ];
  return uniqueScenario('teen_all', factories);
}



function showGraduationDecisionModal() {
  const s = app.state;
  showChoiceModal({
    header: "Graduation certificate",
    title: "High School Complete",
    body: `${s.name}\n\nFinal average: ${Math.round(s.average)}%\n\nWhat do you want to do next?`,
    choices: [
      { text: "Apply to top-tier or highly competitive universities", fn: () => choosePostSecondaryType("University", "high") },
      { text: "Apply to balanced public universities", fn: () => choosePostSecondaryType("University", "mid") },
      { text: "Apply to local or lower-cost universities", fn: () => choosePostSecondaryType("University", "safe") },
      { text: "Apply to college, community college, or trades", fn: () => choosePostSecondaryType("College / Trades", "mid") },
      { text: "Take a gap year", fn: () => { s.schoolStage = "Gap Year"; s.inSchool = false; s.educationStage = "High School Graduate"; s.postSecondaryStatus = "Gap year"; render(); setScenario(gapYearScenario()); } },
      { text: "Start working", fn: () => { s.schoolStage = "Working Years"; s.inSchool = false; s.educationStage = "High School Graduate"; s.field = s.field || "General"; s.postSecondaryStatus = "Working"; render(); setScenario(generateYearScenario()); } }
    ],
    footer: "You can also use the school button in Life actions if you want to apply afterward."
  });
}

function postHighSchoolScenario() {
  const s = app.state;
  const average = Math.round(s.average);
  return {
    title: "High school is over",
    body: `${s.name}'s final average is ${average}%.

Where do you want to apply?`,
    choices: [
      { text: "Open the school portal.", fn: () => showPostHighSchoolPortal() },
      { text: "Take a gap year.", fn: () => { s.schoolStage = "Gap Year"; s.inSchool = false; s.educationStage = "High School Graduate"; s.postSecondaryStatus = "Gap year"; advanceYear({ hope: 1, purpose: 1, money: 2 }); } },
      { text: "Start working right away.", fn: () => { s.schoolStage = "Working Years"; s.inSchool = false; s.educationStage = "High School Graduate"; s.field = "General"; advanceYear({ hope: 1, money: 2 }); } }
    ]
  };
}


function showPostHighSchoolPortal() {
  const s = app.state;
  showChoiceModal({
    header: "School portal",
    title: "After high school",
    body: "What do you want to do after graduation?",
    choices: [
      { text: "Apply to top-tier universities", fn: () => choosePostSecondaryType("University", "high") },
      { text: "Apply to public universities", fn: () => choosePostSecondaryType("University", "mid") },
      { text: "Apply to local or lower-cost universities", fn: () => choosePostSecondaryType("University", "safe") },
      { text: "Apply to college, community college, or trades", fn: () => choosePostSecondaryType("College / Trades", "mid") },
      { text: "Take a gap year", fn: () => { s.schoolStage = "Gap Year"; s.inSchool = false; s.educationStage = "High School Graduate"; s.postSecondaryStatus = "Gap year"; advanceYear({ hope: 1, purpose: 1, money: 2 }); } },
      { text: "Start working", fn: () => { s.schoolStage = "Working Years"; s.inSchool = false; s.educationStage = "High School Graduate"; s.field = s.field || "General"; s.postSecondaryStatus = "Working"; advanceYear({ hope: 1, money: 2 }); } },
      { text: "Go back", fn: () => setScenario(generateYearScenario()) }
    ],
    footer: `Final average: ${Math.round(s.average)}% • Pick a path, then choose a major, then apply.`
  });
}

function choosePostSecondaryType(stage, forcedTier = null) {
  const backFn = () => {
    if (app.state.justGraduated || app.state.educationStage === "High School Graduate" || app.state.schoolStage === "Gap Year") {
      showPostHighSchoolPortal();
    } else {
      goBackToSchoolAction();
    }
  };
  if (forcedTier) {
    chooseMajor(stage, forcedTier);
    return;
  }
  setScenario({
    title: stage === "University" ? "University applications" : "College and trades applications",
    body: stage === "University"
      ? "Choose the kind of university path you want to apply for."
      : "Choose the kind of college, community college, or trades path you want to apply for.",
    choices: (stage === "University"
      ? [
          { text: "Top-tier / highly competitive universities", fn: () => chooseMajor(stage, "high") },
          { text: "Balanced public universities", fn: () => chooseMajor(stage, "mid") },
          { text: "Local and lower-cost universities", fn: () => chooseMajor(stage, "safe") }
        ]
      : [
          { text: "Top applied institutes or selective trades programs", fn: () => chooseMajor(stage, "high") },
          { text: "Strong colleges or practical trades programs", fn: () => chooseMajor(stage, "mid") },
          { text: "Community college or accessible trades path", fn: () => chooseMajor(stage, "safe") }
        ]).concat([{ text: "Go back.", fn: backFn }])
  });
}


function chooseMajor(stage = "University", tier = "mid") {
  setScenario({
    title: stage === "University" ? "Choose a major" : "Choose a program",
    body: stage === "University" ? "What major do you want to pursue?" : "What field or program do you want to pursue?",
    choices: DATA.majors.map(m => ({
      text: m,
      fn: () => chooseSchoolOffer(stage, m, tier)
    })).concat([{ text: "Go back.", fn: () => choosePostSecondaryType(stage) }])
  });
}


function postSecondaryScenario() {
  const s = app.state;
  if ((s.schoolStage === "University" && s.yearsInPostSecondary >= 3) || (s.schoolStage === "College / Trades" && s.yearsInPostSecondary >= 1)) {
    return uniqueScenario("postsecondary_late", [
      () => ({
        title: `Age ${s.age}`,
        body: "What do you do with school this year?",
        choices: [
          { text: "Keep going and finish strong.", fn: () => advanceYear({ average: 3, discipline: 1, stress: 1 }) },
          { text: "Work part-time too.", fn: () => advanceYear({ money: 6, average: -1, stress: 1 }) },
          { text: "Apply for graduate school.", fn: () => applyGraduateSchoolAction("Graduate School") },
          { text: "Apply for professional school.", fn: () => applyGraduateSchoolAction("Professional School") }
        ]
      }),
      () => scenarioFromPairs(`Age ${s.age}`, "A professor offers to support an application. What do you do?", [
        ["Ask for a strong reference.", { purpose: 1, performance: 2, hope: 1 }],
        ["Ask about research or internships.", { purpose: 1, performance: 2, average: 1 }],
        ["Thank them and stay focused on classes.", { average: 2, discipline: 1 }]
      ])
    ]);
  }
  return uniqueScenario("postsecondary_general", [
    () => scenarioFromPairs(`Age ${s.age}`, "What do you focus on most this term?", [
      ["Studying harder.", { average: 4, discipline: 1, stress: 1 }],
      ["Working part-time too.", { money: 6, average: -1, stress: 1 }],
      ["Protecting your health.", { health: 1, stress: -1, average: 1 }],
      ["Applying for labs, placements, or internships.", { performance: 2, purpose: 1, average: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A course becomes harder than expected. What do you do?", [
      ["Go to office hours and get help.", { average: 3, trust: 1 }],
      ["Study with other students.", { average: 2, relationships: 1 }],
      ["Drop it and protect your average.", { stress: -1, average: 1, money: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A professor or instructor notices your work. What do you do?", [
      ["Ask about research, placements, or references.", { purpose: 1, performance: 2 }],
      ["Thank them and keep going.", { average: 2 }],
      ["Stay quiet and just do the work.", { discipline: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Your term feels crowded. What do you cut back on?", [
      ["Social plans.", { average: 2, stress: 1 }],
      ["Work shifts.", { money: -3, stress: -1, average: 1 }],
      ["Sleep.", { average: 1, health: -1, stress: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A placement or internship opens up. What do you do?", [
      ["Apply even if it is competitive.", { performance: 2, hope: 1, stress: 1 }],
      ["Choose a smaller opportunity nearby.", { performance: 1, money: 2 }],
      ["Skip it and focus on classes.", { average: 2, discipline: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Your program is getting expensive. What do you do?", [
      ["Take on more work hours.", { money: 7, stress: 1, average: -1 }],
      ["Apply for bursaries and scholarships.", { money: chance(0.6) ? 6 : 1, hope: 1 }],
      ["Reduce spending and stay enrolled.", { discipline: 1, stress: -1 }]
    ])
  ]);
}

function workScenario() {
  const s = app.state;
  return uniqueScenario("work_general", [
    () => scenarioFromPairs(`Age ${s.age}`, "What do you do at work this year?", [
      ["Work harder and stay visible.", { performance: 1, stress: 1, salary: 2 }],
      ["Set boundaries and protect your health.", { stress: -2, health: 1 }],
      ["Invest time in a side path.", { purpose: 1, money: 3, performance: -1 }],
      ["Handle conflict directly.", { trust: 1, performance: 1, stress: 1 }],
      ["Document your work and plan your next move.", { performance: 1, purpose: 1, hope: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A better role might be opening. What do you do?", [
      ["Apply quietly.", { hope: 1, performance: 1 }],
      ["Stay loyal where you are for now.", { trust: 1, stress: -1 }],
      ["Talk to your manager about growth.", { performance: 1, stress: 1, hope: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A project starts going badly. What do you do?", [
      ["Take control and fix the mess.", { performance: 2, stress: 1 }],
      ["Do your part and protect yourself.", { performance: 1, stress: -1 }],
      ["Step back and let others own it.", { stress: -1, trust: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Your work-life balance slips. What do you do?", [
      ["Cut back and protect your time.", { health: 1, stress: -2 }],
      ["Push through for now.", { performance: 1, stress: 2, salary: 1 }],
      ["Look for a healthier workplace.", { hope: 1, purpose: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A coworker becomes important to your daily life. What do you do?", [
      ["Build a real friendship.", { relationships: 1, trust: 1 }],
      ["Keep it professional.", { performance: 1 }],
      ["Compete with them.", { performance: 1, stress: 1, relationships: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Your manager gives you more responsibility without much warning. What do you do?", [
      ["Take it on and prove you can handle it.", { performance: 2, stress: 1, salary: 1 }],
      ["Ask for clearer expectations first.", { trust: 1, performance: 1 }],
      ["Push back and protect your workload.", { stress: -1, performance: -1, hope: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Your week starts feeling the same every time. What do you do?", [
      ["Learn a new skill after work.", { purpose: 1, performance: 1, stress: 1 }],
      ["Rest more and recover.", { health: 1, stress: -2 }],
      ["Start looking for a different role.", { hope: 1, purpose: 1 }]
    ])
  ]);
}

function adultLifeScenario() {
  const s = app.state;
  return uniqueScenario("adult_general", [
    () => scenarioFromPairs(`Age ${s.age}`, "What do you focus on most this year?", [
      ["Stability.", { money: 4, stress: -1 }],
      ["Taking a bigger risk.", { purpose: 2, stress: 1, money: chance(0.5) ? 5 : -5 }],
      ["People you care about.", { relationships: 2, hope: 1 }],
      ["Your own health.", { health: 1, stress: -1, trust: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Someone close to you tests your patience. What do you do?", [
      ["Communicate directly.", { relationships: 1, trust: 1 }],
      ["Bottle it up.", { stress: 2, relationships: -1 }],
      ["Leave when you reasonably can.", { money: -3, hope: 1, moves: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "What do you do with your money this year?", [
      ["Pay down what you owe.", { money: -4, stress: -1, hope: 1 }],
      ["Keep cash available.", { money: 2, stress: -1 }],
      ["Push for something bigger.", { purpose: 1, stress: 1, money: chance(0.5) ? 6 : -4 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "What do you do about your personal life this year?", [
      ["Make time for people.", { relationships: 2, hope: 1 }],
      ["Stay independent and focus on yourself.", { purpose: 1, stress: -1 }],
      ["Let work take over for now.", { performance: 1, relationships: -1, stress: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "Your living situation stops fitting your life. What do you do?", [
      ["Move somewhere more practical.", { moves: 1, money: -2, hope: 1 }],
      ["Stay and make it work.", { discipline: 1, stress: -1 }],
      ["Spend more for comfort.", { health: 1, money: -4 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "A family responsibility grows heavier. What do you do?", [
      ["Step up even if it costs you.", { relationships: 2, stress: 1, money: -2 }],
      ["Set boundaries and help carefully.", { trust: 1, stress: -1 }],
      ["Pull back and protect your own path.", { purpose: 1, relationships: -1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "You have a rare free stretch of time. What do you do with it?", [
      ["Rest and recover properly.", { health: 1, stress: -2 }],
      ["See people you have been neglecting.", { relationships: 2, hope: 1 }],
      ["Use it to get ahead on something important.", { discipline: 1, purpose: 1, stress: 1 }]
    ]),
    () => scenarioFromPairs(`Age ${s.age}`, "You feel restless about where your life is heading. What do you do?", [
      ["Make a concrete plan for the next year.", { discipline: 1, hope: 1, purpose: 1 }],
      ["Change something immediately.", { purpose: 2, money: chance(0.5) ? 3 : -3, stress: 1 }],
      ["Wait and see if the feeling passes.", { stress: -1, hope: -1 }]
    ])
  ]);
}


function illnessScenario() {
  const s = app.state;
  const options = medicalOptionsFor(s.illness, s.healthInsurance);
  return {
    title: `Age ${s.age}`,
    body: `How do you handle ${s.illness}?`,
    choices: options.map(opt => ({
      text: `${opt.label} — $${opt.display}`,
      fn: () => {
        s.money -= opt.cost;
        s.health = clamp(s.health + opt.health, 0, 10);
        s.stress = clamp(s.stress + opt.stress, 0, 10);
        s.hope = clamp(s.hope + opt.hope, 0, 10);
        addLog(`${s.name} chooses ${opt.shortLabel} for ${s.illness}.`);
        if (opt.clear || chance(opt.recoverChance)) s.illness = "";
        advanceYear({});
      }
    })).concat([
      { text: "Wait and see.", fn: () => advanceYear({ health: -1, stress: 1, hope: -1 }) }
    ])
  };
}



function medicalOptionsFor(illness, insured) {
  const covered = insured ? 0.35 : 1;
  const options = {
    "a bad flu": [
      { label: "Buy cold medicine and rest", shortLabel: "cold medicine", cost: 0.03 * covered, display: Math.round(30 * covered), health: 1, stress: -1, hope: 0, recoverChance: 0.8 },
      { label: "See a walk-in clinic", shortLabel: "a clinic visit", cost: 0.06 * covered, display: Math.round(60 * covered), health: 1, stress: -1, hope: 1, recoverChance: 0.9 }
    ],
    "an infection": [
      { label: "Pay for antibiotics", shortLabel: "antibiotics", cost: 0.025 * covered, display: Math.round(25 * covered), health: 1, stress: -1, hope: 0, recoverChance: 0.88 },
      { label: "Pay for a clinic visit and prescription", shortLabel: "a clinic visit", cost: 0.08 * covered, display: Math.round(80 * covered), health: 2, stress: -1, hope: 0, recoverChance: 0.95 }
    ],
    "a sprain": [
      { label: "Buy a brace and pain medicine", shortLabel: "a brace", cost: 0.045 * covered, display: Math.round(45 * covered), health: 1, stress: 0, hope: 0, recoverChance: 0.72 },
      { label: "Pay for physiotherapy", shortLabel: "physiotherapy", cost: 0.18 * covered, display: Math.round(180 * covered), health: 2, stress: -1, hope: 0, recoverChance: 0.9 }
    ],
    "burnout": [
      { label: "Pay for counselling", shortLabel: "counselling", cost: 0.16 * covered, display: Math.round(160 * covered), health: 1, stress: -2, hope: 1, recoverChance: 0.55 },
      { label: "Take unpaid rest time", shortLabel: "rest", cost: 0.4, display: 400, health: 1, stress: -2, hope: 0, recoverChance: 0.48 }
    ],
    "anxiety": [
      { label: "Pay for therapy", shortLabel: "therapy", cost: 0.18 * covered, display: Math.round(180 * covered), health: 1, stress: -2, hope: 1, recoverChance: 0.52 },
      { label: "Pay for a doctor visit and medication", shortLabel: "medication", cost: 0.09 * covered, display: Math.round(90 * covered), health: 1, stress: -1, hope: 0, recoverChance: 0.45 }
    ],
    "a back injury": [
      { label: "Pay for physiotherapy", shortLabel: "physiotherapy", cost: 0.22 * covered, display: Math.round(220 * covered), health: 2, stress: -1, hope: 0, recoverChance: 0.7 },
      { label: "Pay for imaging and rehab", shortLabel: "rehab", cost: 0.45 * covered, display: Math.round(450 * covered), health: 2, stress: -1, hope: 1, recoverChance: 0.82 }
    ],
    "chronic pain": [
      { label: "Pay for medication", shortLabel: "pain medication", cost: 0.12 * covered, display: Math.round(120 * covered), health: 1, stress: -1, hope: 0, recoverChance: 0.28 },
      { label: "Pay for physio and follow-up care", shortLabel: "follow-up care", cost: 0.32 * covered, display: Math.round(320 * covered), health: 2, stress: -1, hope: 0, recoverChance: 0.4 }
    ],
    "an autoimmune condition": [
      { label: "Pay for specialist visits", shortLabel: "specialist care", cost: 0.4 * covered, display: Math.round(400 * covered), health: 1, stress: -1, hope: 0, recoverChance: 0.2 },
      { label: "Pay for long-term medication", shortLabel: "long-term medication", cost: 0.55 * covered, display: Math.round(550 * covered), health: 1, stress: -1, hope: 0, recoverChance: 0.24 }
    ],
    "a heart warning": [
      { label: "Pay for tests and medication", shortLabel: "tests and medication", cost: 0.38 * covered, display: Math.round(380 * covered), health: 1, stress: -1, hope: 0, recoverChance: 0.35 },
      { label: "Pay for specialist monitoring", shortLabel: "specialist monitoring", cost: 0.6 * covered, display: Math.round(600 * covered), health: 2, stress: -1, hope: 0, recoverChance: 0.45 }
    ],
    "cancer": [
      { label: "Begin treatment right away", shortLabel: "treatment", cost: 0.9 * covered, display: Math.round(900 * covered), health: 2, stress: 1, hope: 1, recoverChance: 0.42 },
      { label: "Pay for more testing first", shortLabel: "more testing", cost: 0.35 * covered, display: Math.round(350 * covered), health: 1, stress: 1, hope: 0, recoverChance: 0.18 }
    ],
    "heart disease": [
      { label: "Begin medication and follow-up care", shortLabel: "follow-up care", cost: 0.42 * covered, display: Math.round(420 * covered), health: 1, stress: 0, hope: 0, recoverChance: 0.26 },
      { label: "Pay for hospital treatment", shortLabel: "hospital treatment", cost: 0.75 * covered, display: Math.round(750 * covered), health: 2, stress: 1, hope: 0, recoverChance: 0.38 }
    ],
    "stroke": [
      { label: "Begin hospital rehab immediately", shortLabel: "hospital rehab", cost: 0.95 * covered, display: Math.round(950 * covered), health: 2, stress: 1, hope: 0, recoverChance: 0.22 },
      { label: "Pay for urgent testing and medication", shortLabel: "urgent treatment", cost: 0.55 * covered, display: Math.round(550 * covered), health: 1, stress: 1, hope: 0, recoverChance: 0.14 }
    ],
    "organ failure": [
      { label: "Begin hospital treatment", shortLabel: "hospital treatment", cost: 1.1 * covered, display: Math.round(1100 * covered), health: 2, stress: 1, hope: 0, recoverChance: 0.16 },
      { label: "Seek specialist care", shortLabel: "specialist care", cost: 0.7 * covered, display: Math.round(700 * covered), health: 1, stress: 1, hope: 0, recoverChance: 0.1 }
    ],
    "a traumatic injury": [
      { label: "Pay for surgery and rehab", shortLabel: "surgery and rehab", cost: 0.85 * covered, display: Math.round(850 * covered), health: 2, stress: 1, hope: 0, recoverChance: 0.28 },
      { label: "Pay for hospital observation", shortLabel: "hospital observation", cost: 0.45 * covered, display: Math.round(450 * covered), health: 1, stress: 0, hope: 0, recoverChance: 0.16 }
    ],
    "serious pneumonia": [
      { label: "Begin aggressive treatment", shortLabel: "aggressive treatment", cost: 0.35 * covered, display: Math.round(350 * covered), health: 2, stress: 0, hope: 0, recoverChance: 0.42 },
      { label: "Pay for hospital monitoring", shortLabel: "hospital monitoring", cost: 0.5 * covered, display: Math.round(500 * covered), health: 2, stress: 1, hope: 0, recoverChance: 0.48 }
    ]
  };
  return options[illness] || [
    { label: "Pay for treatment", shortLabel: "treatment", cost: 0.15 * covered, display: Math.round(150 * covered), health: 1, stress: -1, hope: 0, recoverChance: 0.5 }
  ];
}

function legalScenario() {
  const s = app.state;
  if (s.jailYears > 0) {
    const event = rand([
      "A cellmate tests your boundaries on your second week inside.",
      "A guard tells you there is one spot left in a rehabilitation class.",
      "A fight breaks out nearby and you have seconds to decide what kind of person to be in that moment.",
      "You get a letter from outside that makes release feel possible again.",
      "Kitchen duty gives you structure, routine, and just enough quiet to think."
    ]);
    return {
      title: `Age ${s.age} — Inside`,
      body: event,
      choices: [
        { text: "Keep your head down.", fn: () => advanceYear({ stress: -1, discipline: 1 }) },
        { text: "Join a program.", fn: () => advanceYear({ hope: 1, discipline: 1 }) },
        { text: "Get pulled into trouble.", fn: () => advanceYear({ stress: 1, hope: -1, relationships: -1 }) }
      ]
    };
  }
  return {
    title: `Age ${s.age} — Court date`,
    body: "Justice Eleanor Graves reviews the file. The sentence is simplified for the game, and does not reflect a real legal outcome. What do you do?",
    choices: [
      { text: "Fight it with a lawyer.", fn: () => resolveCharge("lawyer") },
      { text: "Accept responsibility.", fn: () => resolveCharge("cooperate") },
      { text: "Plead guilty early.", fn: () => resolveCharge("guilty") }
    ]
  };
}


function retirementPromptScenario() {
  const s = app.state;
  return {
    title: `Age ${s.age}`,
    body: "What do you do about retirement?",
    choices: [
      { text: "Retire now.", fn: retireNow },
      { text: "Work part-time first.", fn: () => { s.salary *= 0.6; advanceYear({ stress: -1, hope: 1 }); } },
      { text: "Keep working.", fn: () => advanceYear({ money: 4, stress: 1 }) }
    ]
  };
}


function scenarioFromPairs(title, body, pairs) {
  return {
    title, body,
    choices: pairs.map(([text, delta]) => ({ text, fn: () => advanceYear(delta) }))
  };
}

const ENDING_CHARACTERS = {
  "High Achiever": {
    name: "The Achiever",
    icon: "🏔️",
    quote: "You kept choosing height, and the world kept measuring you by it.",
    summary: "Prestige, measurable success, and hard-earned advancement shaped this life."
  },
  "Burnt Out": {
    name: "The Overextended One",
    icon: "🔥",
    quote: "You kept producing even when recovery stopped being optional.",
    summary: "Ambition stayed alive, but so did the cost of carrying too much."
  },
  "Loving Legacy": {
    name: "The Caregiver",
    icon: "💞",
    quote: "People stayed at the center, even when easier things pulled harder.",
    summary: "Care, loyalty, and emotional presence mattered most in the shape of this life."
  },
  "Late Bloom": {
    name: "The Late Bloom",
    icon: "🌱",
    quote: "Direction arrived later, but once it came, it stayed.",
    summary: "This life gathered strength after delay, uncertainty, or reinvention."
  },
  "Survivor": {
    name: "The Survivor",
    icon: "🛡️",
    quote: "You did not get an easy body or an easy road, but you kept going.",
    summary: "Serious hardship stayed present, but it never got the whole ending."
  },
  "Rebuilder": {
    name: "The Rebuilder",
    icon: "🧱",
    quote: "You were changed by consequence, but not erased by it.",
    summary: "After major damage came effort, structure, and the slow work of repair."
  },
  "System Marked": {
    name: "The Marked One",
    icon: "⛓️",
    quote: "The sentence ended before the doors reopened.",
    summary: "A record kept following this life into jobs, rooms, and chances it wanted."
  },
  "Quiet Meaning": {
    name: "The Quiet One",
    icon: "🌙",
    quote: "Not every important life arrives with applause.",
    summary: "This life held meaning in ordinary effort, private choices, and steady presence."
  }
};

function endingScores() {
  const s = app.state;
  const currentSalary = s.salary || 0;
  const peakSalary = Math.max(s.peakSalary || 0, currentSalary);
  return {
    "High Achiever": (s.average >= 90 ? 4 : 0) + (peakSalary >= 100 ? 5 : 0) + (s.performance >= 8 ? 3 : 0) + (s.retired ? 1 : 0),
    "Burnt Out": (s.stress >= 8 ? 6 : 0) + (s.health <= 4 ? 3 : 0) + (peakSalary >= 70 ? 1 : 0),
    "Loving Legacy": (s.relationships >= 8 ? 5 : 0) + (s.children >= 1 ? 2 : 0) + (["Married", "Long-term relationship"].includes(s.relationshipStatus) ? 2 : 0) + (s.stress <= 6 ? 1 : 0),
    "Late Bloom": (s.age >= 35 ? 2 : 0) + (peakSalary >= 60 ? 3 : 0) + (s.average >= 84 ? 2 : 0) + (s.job ? 1 : 0),
    "Survivor": ((s.health <= 3 || isLifeThreateningIllness(s.illness)) ? 6 : 0) + (s.age >= 45 ? 2 : 0) + (s.alive ? 1 : 0),
    "Rebuilder": (s.criminalRecord ? 4 : 0) + (s.releaseYear !== null ? 2 : 0) + (s.job ? 4 : 0) + (s.performance >= 6 ? 2 : 0),
    "System Marked": (s.criminalRecord ? 5 : 0) + (!s.job ? 3 : 0) + (s.releaseYear !== null ? 2 : 0) + (s.age >= 30 ? 1 : 0),
    "Quiet Meaning": 1 + (s.relationships >= 5 ? 1 : 0) + (peakSalary < 100 ? 1 : 0)
  };
}

function determineEnding() {
  const scores = endingScores();
  const priority = ["High Achiever", "Rebuilder", "System Marked", "Burnt Out", "Survivor", "Loving Legacy", "Late Bloom", "Quiet Meaning"];
  let best = "Quiet Meaning";
  let bestScore = -Infinity;
  for (const key of priority) {
    const score = scores[key] ?? -Infinity;
    if (score > bestScore) {
      best = key;
      bestScore = score;
    }
  }
  return best;
}

function endingCharacterData() {
  const label = determineEnding();
  return { label, ...(ENDING_CHARACTERS[label] || ENDING_CHARACTERS["Quiet Meaning"]) };
}

function endingBodyHtml(extraText = "") {
  const s = app.state;
  const ending = endingCharacterData();
  const peakSalary = Math.max(s.peakSalary || 0, s.salary || 0);
  const highlights = [
    s.educationStage && s.educationStage !== "None" ? `Education: ${s.educationStage}` : null,
    s.major && s.major !== "Undeclared" ? `Field: ${s.major}` : null,
    s.retired ? "Career stage: Retired" : (s.job ? `Career: ${s.job}` : null),
    peakSalary > 0 ? `Peak salary: $${Math.round(peakSalary)}k` : null,
    s.relationshipStatus && s.relationshipStatus !== "Single" ? `Relationships: ${s.relationshipStatus}` : null,
    s.children ? `Children: ${s.children}` : null
  ].filter(Boolean).slice(0, 5);
  const explanation = extraText || finalReflection();
  return `
    <div class="ending-card">
      <div class="ending-badge">Final Character</div>
      <div class="ending-icon">${ending.icon}</div>
      <h3>${ending.name}</h3>
      <p class="ending-label">Ending unlocked: ${ending.label}</p>
      <p class="ending-quote">${ending.quote}</p>
      <p class="ending-summary">${ending.summary}</p>
      <div class="ending-highlight-list">${highlights.map(item => `<span class="ending-chip">${item}</span>`).join("")}</div>
      <div class="ending-explanation">${explanation.split("\n").join("<br>")}</div>
    </div>`;
}

function endScenario(text) {
  updateBadges();
  return {
    title: `${app.state.name}'s life ends`,
    body: text || `Ending: ${determineEnding()}`,
    bodyHtml: endingBodyHtml(text || ""),
    choices: [
      { text: "Return to main menu.", fn: goHome }
    ]
  };
}

function endingLabel() {
  return determineEnding();
}

function finalReflection() {
  const s = app.state;
  const ending = determineEnding();
  const notes = [];
  if (s.educationStage && s.educationStage !== "None") notes.push(`Education reached: ${s.educationStage}.`);
  if (s.job || s.retired) notes.push(s.retired ? `Work eventually gave way to retirement.` : `Work remained part of the story through ${s.job || "later adulthood"}.`);
  if (s.children) notes.push(`Family responsibilities shaped later years.`);
  if (s.house) notes.push(`Housing became part of the weight they had to carry.`);
  if (s.criminalRecord) notes.push(`A criminal record changed what was easy and what was not.`);
  if (s.illness) notes.push(`Health kept demanding decisions.`);
  if (ending === "High Achiever") notes.push(`Achievement, reputation, and visible success defined much of this life.`);
  if (ending === "Burnt Out") notes.push(`Too much pressure was carried for too long, and the cost stayed visible.`);
  if (ending === "Loving Legacy") notes.push(`Care, connection, and the people kept close mattered most in the end.`);
  if (ending === "Late Bloom") notes.push(`The strongest years came later, after uncertainty and rebuilding.`);
  if (ending === "Survivor") notes.push(`Endurance mattered as much as ambition.`);
  if (ending === "Rebuilder") notes.push(`Consequence changed the path, but rebuilding changed the ending.`);
  if (ending === "System Marked") notes.push(`The record lasted longer than the sentence, and the world kept asking for proof.`);
  if (ending === "Quiet Meaning") notes.push(`This life was not loud, but it still made a pattern worth reading.`);
  return `${s.name}'s ending: ${ending}.\n\n${notes.join(" ")}`;
}

function chooseActivityAction() {
  const s = app.state;
  const options = s.age <= 10 ? DATA.childhoodActivities : (s.age <= 17 ? DATA.teenActivities : DATA.adultActivities);
  setScenario({
    title: `Age ${s.age}`,
    body: "Which activity do you want to focus on?",
    choices: options.map(a => ({ text: a, fn: () => { s.currentActivity = a; addLog(`${s.name} shifts focus to ${a}.`); render(); setScenario(generateYearScenario()); } }))
  });
}



function relationshipAction() {
  const s = app.state;
  const choices = [];

  function maybeStartRelationship(source, odds, extras = {}) {
    if (chance(odds)) {
      s.relationshipStatus = "Dating";
      s.relationships += 2;
      s.hope += 1;
      if (extras.stress) s.stress += extras.stress;
      if (extras.money) s.money += extras.money;
      addLog(`${s.name} meets someone through ${source.toLowerCase()}.`);
    } else {
      if (extras.failHope) s.hope += extras.failHope;
      if (extras.failStress) s.stress += extras.failStress;
      if (extras.failMoney) s.money += extras.failMoney;
      addLog(`${s.name} tries ${source.toLowerCase()}, but nothing turns into a relationship yet.`);
    }
    render();
    setScenario(generateYearScenario());
  }

  if (s.relationshipStatus === "Single") {
    choices.push(
      { text: "Ask friends to set you up.", fn: () => maybeStartRelationship("a friend setup", 0.54, { failHope: -1 }) },
      { text: "Try a dating app.", fn: () => maybeStartRelationship("a dating app", 0.46, { failHope: -1, failStress: 1 }) },
      { text: "Meet people through school or work.", fn: () => maybeStartRelationship("school or work", 0.5, { failHope: -1 }) },
      { text: "Go out more and see what happens.", fn: () => maybeStartRelationship("social events", 0.42, { failMoney: -1 }) },
      { text: "Stay single for now.", fn: () => { s.purpose += 1; s.stress = clamp(s.stress - 1, 0, 10); addLog(`${s.name} stays single and focuses on other parts of life.`); render(); setScenario(generateYearScenario()); } }
    );
  } else {
    choices.push(
      { text: "Plan real time together.", fn: () => { s.relationships += 2; s.hope += 1; addLog(`${s.name} puts real time into the relationship.`); render(); setScenario(generateYearScenario()); } },
      { text: "Have a serious talk about where this is going.", fn: () => {
          if (s.relationshipStatus === "Dating") s.relationshipStatus = "Long-term relationship";
          else if (s.relationshipStatus === "Long-term relationship" && chance(0.5)) s.relationshipStatus = "Married";
          s.relationships += 1;
          s.trust += 1;
          addLog(`${s.name} has a defining conversation about the relationship.`);
          render();
          setScenario(generateYearScenario());
        } },
      { text: "Keep some distance and focus on yourself.", fn: () => { s.stress = clamp(s.stress - 1, 0, 10); s.relationships -= 1; addLog(`${s.name} steps back and protects some personal space.`); render(); setScenario(generateYearScenario()); } },
      { text: "Work through a difficult issue directly.", fn: () => { if (chance(0.6)) { s.relationships += 1; s.trust += 1; addLog(`${s.name} works through a difficult issue honestly.`); } else { s.relationships -= 2; s.stress += 1; addLog(`${s.name} tries to fix a problem, but the conversation goes badly.`); } render(); setScenario(generateYearScenario()); } }
    );
    if (["Long-term relationship", "Married"].includes(s.relationshipStatus)) {
      choices.push({ text: "Talk about having a child.", fn: () => { if (chance(0.45)) { s.children += 1; s.relationships += 1; s.money -= 6; s.stress += 1; addLog(`${s.name}'s family grows.`); } else { s.relationships += 1; addLog(`${s.name} talks seriously about children, but the timing is not right yet.`); } render(); setScenario(generateYearScenario()); } });
    }
    choices.push({ text: "End the relationship.", fn: () => { s.relationshipStatus = "Single"; s.relationships -= 2; s.stress += 1; addLog(`${s.name} ends a relationship.`); render(); setScenario(generateYearScenario()); } });
  }
  choices.push({ text: "Go back.", fn: () => setScenario(generateYearScenario()) });
  showChoiceModal({
    header: s.relationshipStatus === "Single" ? "Dating" : "Relationships",
    title: s.relationshipStatus === "Single" ? "What do you want to do about dating this year?" : "What do you want to do about your relationship this year?",
    body: s.relationshipStatus === "Single" ? "Choose how you want to meet people, or decide to leave dating alone for now." : "Choose how you want to handle your personal life this year.",
    choices,
    footer: `Current status: ${s.relationshipStatus}`
  });
}

function takeLoanAction() {
  const s = app.state;
  setScenario({
    title: "Take out a loan",
    body: "How much do you want to borrow?",
    choices: [20, 40, 80].map(amount => ({ text: `Borrow $${amount}k`, fn: () => { s.money += amount; s.debt += amount; s.loanHistory.push({ age: s.age, amount }); addLog(`${s.name} borrows $${amount}k.`); render(); setScenario(generateYearScenario()); } })).concat([{ text: "Never mind.", fn: () => setScenario(generateYearScenario()) }])
  });
}

function buyHouseAction() {
  const s = app.state;
  setScenario({
    title: "Buy property",
    body: "What kind of home do you want to buy?",
    choices: DATA.houseOptions.map(h => ({ text: `${h.label} — $${h.cost}k`, fn: () => {
      const down = Math.min(h.cost, Math.max(30, h.cost * 0.15));
      s.money -= down;
      s.debt += Math.max(0, h.cost - down);
      s.house = h.label;
      s.houseUpkeep = h.upkeep;
      addLog(`${s.name} buys a ${h.label.toLowerCase()}.`);
      render(); setScenario(generateYearScenario());
    }})).concat([{ text: "Wait and keep renting.", fn: () => setScenario(generateYearScenario()) }])
  });
}

function buyCarAction() {
  const s = app.state;
  setScenario({
    title: "Buy a car",
    body: "What kind of car do you want?",
    choices: DATA.carOptions.map(c => ({ text: `${c.label} — $${c.cost}k`, fn: () => {
      if (s.money < c.cost * 0.2) {
        s.debt += c.cost;
      } else {
        s.money -= c.cost * 0.2;
        s.debt += c.cost * 0.8;
      }
      s.car = c.label;
      s.carUpkeep = c.upkeep;
      addLog(`${s.name} buys ${c.label.toLowerCase()}.`);
      render(); setScenario(generateYearScenario());
    }})).concat([{ text: "Not now.", fn: () => setScenario(generateYearScenario()) }])
  });
}

function goBackToSchoolAction() {
  const s = app.state;

  if (s.justGraduated || s.schoolStage === "After High School" || s.educationStage === "High School Graduate" || s.schoolStage === "Gap Year") {
    showPostHighSchoolPortal();
    return;
  }

  if (s.inSchool) {
    const choices = [];

    if (["University", "College / Trades", "Graduate School", "Professional School"].includes(s.schoolStage)) {
      choices.push(
        { text: "Continue this program.", fn: () => advanceYear({ average: 2, discipline: 1 }) },
        { text: "Reduce your course load.", fn: () => advanceYear({ stress: -1, average: 1, money: -2 }) },
        { text: "Change your major or field.", fn: () => chooseMajor(s.schoolStage === "College / Trades" ? "College / Trades" : "University", "mid") },
        { text: s.schoolStage === "College / Trades" ? "Apply to a different college or trades program." : "Apply to other schools.", fn: () => choosePostSecondaryType(s.schoolStage === "College / Trades" ? "College / Trades" : "University") }
      );

      if (s.schoolStage === "University") {
        choices.push({ text: "Apply to transfer to another university.", fn: () => choosePostSecondaryType("University") });
        if (s.yearsInPostSecondary >= 2) {
          choices.push({ text: "Apply to graduate school.", fn: () => applyGraduateSchoolAction("Graduate School") });
          choices.push({ text: "Apply to professional school.", fn: () => applyGraduateSchoolAction("Professional School") });
        }
      } else if (s.schoolStage === "College / Trades") {
        choices.push({ text: "Apply to another college or trades program.", fn: () => choosePostSecondaryType("College / Trades") });
        choices.push({ text: "Apply to university after this.", fn: () => choosePostSecondaryType("University") });
      } else if (s.schoolStage === "Graduate School") {
        choices.push({ text: "Stay in your graduate program.", fn: () => advanceYear({ average: 2, discipline: 1, stress: 1 }) });
        choices.push({ text: "Apply to professional school after this.", fn: () => applyGraduateSchoolAction("Professional School") });
      } else if (s.schoolStage === "Professional School") {
        choices.push({ text: "Stay in your professional program.", fn: () => advanceYear({ average: 2, discipline: 1, stress: 1 }) });
      }

      choices.push(
        { text: "Leave school for now.", fn: () => { s.inSchool = false; s.schoolStage = "Working Years"; addLog(`${s.name} steps away from school.`); render(); setScenario(generateYearScenario()); } },
        { text: "Go back.", fn: () => render() }
      );

      showChoiceModal({
        header: "School portal",
        title: ["Graduate School", "Professional School"].includes(s.schoolStage) ? "Advanced study options" : "Post-secondary options",
        body: "Pick what you want to do with your education next.",
        choices,
        footer: `${s.schoolStage}${s.major ? ` • ${s.major}` : ""}${s.postSecondaryStatus ? ` • ${s.postSecondaryStatus}` : ""}`
      });
      return;
    }

    if (s.schoolStage === "High School" && s.age >= 17) {
      showPostHighSchoolPortal();
      return;
    }

    showChoiceModal({
      header: "School portal",
      title: "Student options",
      body: "Choose what you want to do with school this year.",
      choices: [
        { text: "Keep going.", fn: () => advanceYear({ average: 2, discipline: 1 }) },
        { text: "Reduce your course load.", fn: () => advanceYear({ stress: -1, average: 1, money: -2 }) },
        { text: "Go back.", fn: () => render() }
      ],
      footer: s.schoolStage
    });
    return;
  }

  const choices = [];
  if (s.educationStage === "High School Graduate" || s.educationStage === "None") {
    choices.push(
      { text: "Apply to universities.", fn: () => showPostHighSchoolPortal() },
      { text: "Apply to college, community college, or trades.", fn: () => choosePostSecondaryType("College / Trades") },
      { text: "Take a gap year first.", fn: () => { s.schoolStage = "Gap Year"; s.postSecondaryStatus = "Gap year"; advanceYear({ hope: 1, purpose: 1, money: 2 }); } },
      { text: "Start working instead.", fn: () => { s.schoolStage = "Working Years"; s.field = "General"; s.postSecondaryStatus = "Working"; advanceYear({ money: 2, hope: 1 }); } }
    );
  }
  if (["University", "College / Trades"].includes(s.educationStage)) {
    choices.push(
      { text: "Apply to graduate school.", fn: () => applyGraduateSchoolAction("Graduate School") },
      { text: "Apply to professional school.", fn: () => applyGraduateSchoolAction("Professional School") }
    );
  }
  choices.push(
    { text: "Take a certificate program.", fn: () => { s.inSchool = true; s.schoolStage = "College / Trades"; s.yearsInPostSecondary = 0; s.money -= 8; s.certifications.push("Certificate"); s.postSecondaryStatus = "Mature student certificate"; advanceYear({ purpose: 1, performance: 1 }); } },
    { text: "Go back.", fn: () => render() }
  );

  showChoiceModal({
    header: "School portal",
    title: (s.educationStage === "High School Graduate" || s.educationStage === "None") ? "After high school" : "Return to school",
    body: (s.educationStage === "High School Graduate" || s.educationStage === "None")
      ? "Choose the path you want to apply for next."
      : "Pick the kind of school path you want to pursue next.",
    choices,
    footer: s.educationStage || "No completed credential yet"
  });
}

function askRaiseAction() {
  const s = app.state;
  const odds = 0.35 + (s.performance - 5) * 0.07 + ((app.state.currentWorld?.raises) || 0);
  if (chance(odds)) {
    const bump = Math.max(3, Math.round(s.salary * 0.08));
    s.salary += bump;
    addLog(`${s.name} successfully negotiates a raise.`);
    showLetter({ type: "Career Update", title: "Raise Approved", body: `Your request is accepted.

New salary: $${Math.round(s.salary)}k`, meta: `Performance mattered here.` });
  } else {
    s.stress += 1;
    addLog(`${s.name} asks for a raise and is turned down.`);
    showLetter({ type: "Career Update", title: "Raise Denied", body: `The answer is no for now. Timing, budgets, or perception work against you.`, meta: `This can still change later.` });
  }
  render();
  setScenario(generateYearScenario());
}

function askPromotionAction() {
  const s = app.state;
  const odds = 0.22 + (s.performance - 5) * 0.08;
  if (chance(odds)) {
    s.jobLevel = clamp(s.jobLevel + 1, 0, 5);
    s.job = jobTitleForState();
    s.salary += 9;
    addLog(`${s.name} secures a promotion.`);
  } else {
    s.stress += 1;
    addLog(`${s.name} pushes for promotion but is told not yet.`);
  }
  render();
  setScenario(generateYearScenario());
}

function quitJobAction() {
  const s = app.state;
  if (!s.job) return;
  addLog(`${s.name} leaves a job at ${s.company}.`);
  s.job = null; s.salary = 0; s.company = null; s.workCulture = ""; s.jobLevel = 0; s.hope += 1; s.stress -= 1;
  render();
  setScenario(generateYearScenario());
}

function educationRank(stage) {
  const map = {
    "None": 0,
    "Elementary School": 0,
    "Middle School": 0,
    "High School": 0,
    "High School Graduate": 1,
    "College / Trades": 2,
    "University": 3,
    "Graduate School": 4,
    "Professional School": 5
  };
  return map[stage] ?? 0;
}

function currentEducationRank() {
  const s = app.state;
  if (s.inSchool && ["University", "College / Trades", "Graduate School", "Professional School"].includes(s.schoolStage)) {
    return educationRank(s.schoolStage);
  }
  return educationRank(s.educationStage);
}

function availableJobsForField(field) {
  return DATA.jobBoard[field] || DATA.jobBoard.General;
}

function applyToSpecificJob(role) {
  const s = app.state;
  const eligible = currentEducationRank() >= educationRank(role.minEducation);
  if (!eligible) return;
  if (s.criminalRecord && role.recordPolicy === "No") {
    addLog(`${s.name} is screened out of ${role.title} because of a background check.`);
    s.hope -= 1;
    render();
    setScenario(generateYearScenario());
    return;
  }
  if (s.criminalRecord && role.recordPolicy === "Sometimes" && chance(0.45)) {
    addLog(`${s.name} applies for ${role.title}, but the background check closes the door.`);
    s.hope -= 1;
    render();
    setScenario(generateYearScenario());
    return;
  }
  s.targetRole = role;
  addLog(`${s.name} applies for ${role.title}.`);
  const schoolSignal = currentEducationRank() * 0.05;
  const odds = 0.28 + schoolSignal + (s.performance - 5) * 0.04 + ((s.average || 75) - 70) / 120 - (s.criminalRecord ? 0.12 : 0);
  if (chance(odds)) {
    setScenario(interviewScenario());
  } else {
    addLog(`${s.name} applies for ${role.title} but does not hear back this round.`);
    s.hope -= 1;
    render();
    setScenario(generateYearScenario());
  }
}

function applyJobsAction() {
  const s = app.state;
  s.applicationsThisYear += 1;
  const primaryField = s.field || fieldFromMajor(s.major) || "General";
  const fields = [...new Set([primaryField, "General", "Business", "Arts", "Education", "Computer Science", "Medicine", "Skilled Trades", "Engineering", "Social Sciences"])];
  const jobs = fields.flatMap(f => availableJobsForField(f).map(job => ({...job, boardField: f}))).slice(0, 18);
  const cards = jobs.map(job => {
    const eligible = currentEducationRank() >= educationRank(job.minEducation);
    return {
      text: `${job.title} — $${job.salary}k`,
      html: `<div class="job-card ${eligible ? 'eligible' : 'ineligible'}"><div class="job-top"><strong>${job.title}</strong><span>$${job.salary}k</span></div><div class="job-meta">Field: ${job.boardField || primaryField} • Education needed: ${job.minEducation} • Record policy: ${job.recordPolicy || "Sometimes"}</div><div class="job-desc">${job.description}</div><div class="job-eligibility">${eligible ? 'You can apply now' : 'Education requirement not met yet'}</div></div>`,
      disabled: !eligible,
      fn: () => applyToSpecificJob(job)
    };
  });

  showChoiceModal({
    header: "Job board",
    title: `Apply for jobs — ${primaryField}`,
    body: "Pick a role to apply for. The highlighted roles are the ones you currently qualify for.",
    choices: cards.concat([{ text: "Go back.", fn: () => setScenario(generateYearScenario()) }])
  });
}

function startBusinessAction() {
  const s = app.state;
  if (s.money < 50) return;
  s.money -= 35;
  s.businessOwner = true;
  s.field = s.field || "Business";
  s.job = "Founder";
  s.company = `${s.name} Studio`;
  s.salary = 30 + Math.round(Math.random() * 20);
  s.peakSalary = Math.max(s.peakSalary || 0, s.salary);
  addLog(`${s.name} starts a business.`);
  render();
  setScenario(generateYearScenario());
}

function crimeAction() {
  setScenario({
    title: "A risky choice",
    body: "What line do you cross?",
    choices: [
      { text: "Shoplift from a large store.", fn: () => commitCrimeOutcome("shoplifting") },
      { text: "Get into a bar fight.", fn: () => commitCrimeOutcome("fight") },
      { text: "Vandalize property.", fn: () => commitCrimeOutcome("vandalism") },
      { text: "Break into a car for quick cash.", fn: () => commitCrimeOutcome("theft") },
      { text: "Sell fake concert tickets online.", fn: () => commitCrimeOutcome("fraud") },
      { text: "Drive under the influence.", fn: () => commitCrimeOutcome("dui") },
      { text: "Kill someone during a violent confrontation.", fn: () => commitCrimeOutcome("homicide") },
      { text: "Back out.", fn: () => setScenario(generateYearScenario()) }
    ]
  });
}

function commitCrimeOutcome(kind) {
  const s = app.state;
  const map = {
    shoplifting: { caught: 0.32, fine: 2, jail: 0, label: "shoplifting" },
    fight: { caught: 0.5, fine: 5, jail: 1, label: "a bar fight" },
    vandalism: { caught: 0.46, fine: 4, jail: 1, label: "vandalism" },
    theft: { caught: 0.58, fine: 6, jail: 2, label: "a car break-in" },
    fraud: { caught: 0.64, fine: 10, jail: 3, label: "ticket fraud" },
    dui: { caught: 0.62, fine: 8, jail: 2, label: "a DUI" },
    homicide: { caught: 0.9, fine: 0, jail: 12, label: "killing someone" }
  };
  const item = map[kind];
  if (!chance(item.caught)) {
    s.money += kind === "fraud" ? 10 : kind === "theft" ? 4 : 0;
    s.stress += 1;
    addLog(`${s.name} commits ${item.label} and avoids immediate consequences.`);
    render();
    setScenario(generateYearScenario());
    return;
  }
  s.underCharges = true;
  s.lastCrimeSeverity = kind;
  addLog(`${s.name} is charged after ${item.label}.`);
  const sentenceLine = item.jail > 0 ? `Sentence in this simulation: ${item.jail} year${item.jail === 1 ? "" : "s"} in jail.` : `Sentence in this simulation: a fine of $${item.fine}k.`;
  showLetter({
    type: "Charge Filed",
    title: "A charge enters the system",
    body: `A rumour has become a legal process.

Justice Eleanor Graves, a senior provincial judge, reviews the file.

${sentenceLine}`,
    meta: `This is just a simplified simulation. It does not reflect a real legal scenario.`
  });
  render();
  setScenario(legalScenario());
}

function resolveCharge(mode) {
  const s = app.state;
  const base = {
    shoplifting: { fine: 2, jail: 0 },
    fight: { fine: 5, jail: 1 },
    vandalism: { fine: 4, jail: 1 },
    theft: { fine: 6, jail: 2 },
    fraud: { fine: 10, jail: 3 },
    dui: { fine: 8, jail: 2 },
    homicide: { fine: 0, jail: 12 }
  }[s.lastCrimeSeverity || "fight"];

  s.underCharges = false;
  s.criminalRecord = true;

  let fine = base.fine;
  let jail = base.jail;
  if (mode === "lawyer" && fine > 0) {
    s.money -= 10;
    fine = Math.max(1, fine - 1);
    if (jail > 1) jail -= 1;
  } else if (mode === "cooperate") {
    if (fine > 0) fine = Math.max(1, fine - 1);
  }

  if (fine > 0) {
    s.money -= fine;
    addLog(`${s.name} is fined $${fine}k.`);
  }
  if (jail > 0) {
    s.jailYears = jail;
    s.job = null; s.salary = 0; s.company = null;
    addLog(`${s.name} gets ${jail} year${jail === 1 ? "" : "s"} of jail time.`);
  } else {
    addLog(`${s.name} avoids jail but leaves court with a criminal record.`);
  }
  render();
  setScenario(generateYearScenario());
}

function retireAction() {
  setScenario(retirementPromptScenario());
}

function retireNow() {
  const s = app.state;
  s.retired = true;
  s.retirementIncome = Math.round((s.salary * 0.34) + (s.money > 150 ? 10 : 0));
  s.job = null; s.company = null; s.salary = 0; s.schoolStage = "Retirement";
  addLog(`${s.name} retires.`);
  render();
  setScenario(generateYearScenario());
}


function chooseSchoolOffer(stage, major, tier = "mid") {
  const s = app.state;
  const universityPools = {
    high: ["University of British Columbia", "McGill University", "University of Toronto", "Queen's University", "McMaster University", "University of Waterloo"],
    mid: ["Simon Fraser University", "University of Victoria", "University of Calgary", "Western University", "University of Ottawa", "Dalhousie University"],
    safe: ["Thompson Rivers University", "University of the Fraser Valley", "Vancouver Island University", "Kwantlen Polytechnic University", "University of Northern British Columbia", "Mount Royal University"]
  };
  const collegePools = {
    high: ["BCIT", "NAIT", "SAIT", "George Brown College", "Seneca Polytechnic", "Sheridan College"],
    mid: ["Langara College", "Douglas College", "Vancouver Community College", "Camosun College", "Humber Polytechnic", "Conestoga College"],
    safe: ["Selkirk College", "College of New Caledonia", "North Island College", "Local apprenticeship intake", "Regional trades centre", "Community college pathway"]
  };
  const pool = stage === "University" ? universityPools[tier] : collegePools[tier];
  const picks = [...pool].sort(() => Math.random() - 0.5).slice(0, 4);
  app.state.pendingSchoolApps = { stage, major, tier, picks };
  setScenario({
    title: "Applications",
    body: `What schools do you apply to for ${major}?`,
    choices: [
      { text: `Apply to ${picks[0]} only`, fn: () => resolveSchoolApplications([picks[0]], stage, major, tier) },
      { text: `Apply to ${picks[0]} and ${picks[1]}`, fn: () => resolveSchoolApplications([picks[0], picks[1]], stage, major, tier) },
      { text: `Apply to ${picks[0]}, ${picks[1]}, and ${picks[2]}`, fn: () => resolveSchoolApplications([picks[0], picks[1], picks[2]], stage, major, tier) },
      { text: `Apply broadly to ${picks[0]}, ${picks[1]}, ${picks[2]}, and ${picks[3]}` , fn: () => resolveSchoolApplications(picks, stage, major, tier) },
      { text: "Change your plan", fn: () => choosePostSecondaryType(stage) }
    ]
  });
}


function resolveSchoolApplications(applied, stage, major, tier) {
  const s = app.state;
  const baseOdds = stage === "University"
    ? { high: 0.42, mid: 0.68, safe: 0.86 }[tier]
    : { high: 0.55, mid: 0.78, safe: 0.92 }[tier];
  const averageAdj = (s.average - 75) / 100;
  const accepted = applied.filter(() => chance(clamp(baseOdds + averageAdj, 0.15, 0.97)));
  if (!accepted.length) {
    setScenario({
      title: "Application Results",
      body: "Your applications come back with no offer this round. What do you do next?",
      choices: [
        { text: "Apply again to a less competitive path.", fn: () => choosePostSecondaryType(stage) },
        { text: "Take a gap year.", fn: () => { s.schoolStage = "Gap Year"; s.inSchool = false; s.educationStage = "High School Graduate"; s.postSecondaryStatus = "No offer this round"; advanceYear({ hope: -1, purpose: 1 }); } },
        { text: "Start working.", fn: () => { s.schoolStage = "Working Years"; s.inSchool = false; s.educationStage = "High School Graduate"; s.field = "General"; s.postSecondaryStatus = "No offer this round"; advanceYear({ hope: -1 }); } }
      ]
    });
    return;
  }

  const costMap = stage === "University"
    ? { high: [26, 24, 22], mid: [19, 17, 16], safe: [14, 12, 11] }
    : { high: [16, 14, 13], mid: [11, 10, 9], safe: [7, 6, 5] };
  setScenario({
    title: "Application Results",
    body: "You receive offers. Which one do you accept?",
    choices: accepted.map((school, idx) => ({
      text: `${school} — about $${costMap[tier][idx] || costMap[tier][0]}k per year`,
      fn: () => {
        s.schoolStage = stage;
        s.inSchool = true;
        s.major = major;
        s.field = fieldFromMajor(major);
        s.postSecondaryStatus = `Accepted — ${school}`;
        s.yearsInPostSecondary = 0;
        s.money -= costMap[tier][idx] || costMap[tier][0];
        showLetter({
          type: "Admissions Office",
          title: "Offer of Admission",
          body: `${s.name},\n\nYou have been admitted to ${school} for ${major}.`,
          meta: `Estimated yearly cost: $${costMap[tier][idx] || costMap[tier][0]}k`
        });
        advanceYear({ hope: 1, stress: 1 });
      }
    })).concat([{ text: "Take a gap year instead.", fn: () => { s.schoolStage = "Gap Year"; s.inSchool = false; s.postSecondaryStatus = "Deferred"; advanceYear({ hope: 1, purpose: 1 }); } }, { text: "Go back.", fn: () => chooseSchoolOffer(stage, major, tier) }])
  });
}

function pendingOfferScenario() {
  const o = app.state.pendingOffer;
  return {
    title: `Age ${app.state.age} — A job offer turns into a decision`,
    body: `Someone finally puts possibility into writing. This role is real enough to change your next year.\n\nCompany: ${o.company}\nRole: ${o.title}\nSalary: $${Math.round(o.salary)}k\nCulture: ${o.culture}`,
    choices: [
      { text: "Accept the offer.", fn: acceptPendingOffer },
      { text: "Negotiate before accepting.", fn: negotiateOfferAction },
      { text: "Decline and keep searching.", fn: declineOfferAction }
    ]
  };
}

function acceptPendingOffer() {
  const s = app.state, o = s.pendingOffer;
  if (!o) return setScenario(generateYearScenario());
  s.company = o.company;
  s.workCulture = o.culture;
  s.field = o.field;
  s.jobLevel = o.level;
  s.job = o.title;
  s.salary = o.salary;
  s.peakSalary = Math.max(s.peakSalary || 0, s.salary);
  s.pendingOffer = null;
  addLog(`${s.name} accepts a role at ${s.company}.`);
  render();
  setScenario(generateYearScenario());
}

function negotiateOfferAction() {
  const s = app.state, o = s.pendingOffer;
  if (!o) return setScenario(generateYearScenario());
  const odds = 0.32 + (s.average - 75) / 100 + (s.performance - 5) * 0.03;
  if (chance(odds)) {
    o.salary += 4;
    addLog(`${s.name} negotiates a better offer from ${o.company}.`);
  } else {
    addLog(`${s.name} tries to negotiate, but the company holds the line.`);
    if (chance(0.12)) { s.pendingOffer = null; addLog(`The offer is withdrawn.`); }
  }
  render();
  setScenario(generateYearScenario());
}

function declineOfferAction() {
  const s = app.state;
  if (s.pendingOffer) addLog(`${s.name} turns down an offer from ${s.pendingOffer.company}.`);
  s.pendingOffer = null;
  s.hope -= 1;
  render();
  setScenario(generateYearScenario());
}

function interviewScenario() {
  const s = app.state;
  return {
    title: `Age ${s.age}`,
    body: "How do you handle the interview?",
    choices: [
      { text: "Prepare carefully and answer directly.", fn: () => resolveInterview(0.18, 1) },
      { text: "Lean on charm and improvisation.", fn: () => resolveInterview(0.08, 0) },
      { text: "Over-prepare and come in tense.", fn: () => resolveInterview(0.03, -1) },
      { text: "Cancel. You are not ready.", fn: () => { s.hope -= 1; addLog(`${s.name} backs out of an interview.`); render(); setScenario(generateYearScenario()); } }
    ]
  };
}

function resolveInterview(bonus, perfDelta) {
  const s = app.state;
  s.performance = clamp(s.performance + perfDelta, 0, 10);
  const odds = 0.28 + (s.average - 70) / 100 + (s.performance - 5) * 0.03 + bonus - (s.criminalRecord ? 0.18 : 0);
  if (chance(odds)) autoOfferJobMaybe();
  else {
    addLog(`${s.name} interviews but does not get the role.`);
    s.hope -= 1;
  }
  render();
  setScenario(generateYearScenario());
}

function rentHousingAction() {
  const s = app.state;
  const options = [
    ["Roommate apartment", 12, "Shared apartment"],
    ["Studio", 18, "Studio rental"],
    ["Family rental", 24, "Family rental"]
  ];
  setScenario({
    title: "Choose a rental",
    body: "Renting can buy flexibility, but it can also keep money flowing away from ownership.",
    choices: options.map(([label, rent, name]) => ({ text: `${label} — $${rent}k / year`, fn: () => { s.rent = rent; s.rentedHome = name; s.moves += 1; addLog(`${s.name} moves into a ${label.toLowerCase()}.`); render(); setScenario(generateYearScenario()); } })).concat([{ text: "Stay where you are.", fn: () => setScenario(generateYearScenario()) }])
  });
}

function manageHousingAction() {
  const s = app.state;
  setScenario({
    title: "Housing decisions",
    body: `A house is not only an asset. It is upkeep, timing, and the way debt attaches itself to ordinary life.\n\nCurrent home: ${s.house}`,
    choices: [
      { text: "Pay extra toward the mortgage.", fn: () => { const pay = Math.min(18, Math.max(6, s.money * 0.15)); s.money -= pay; s.debt = Math.max(0, s.debt - pay); addLog(`${s.name} pays down housing debt.`); render(); setScenario(generateYearScenario()); } },
      { text: "Sell the house and downsize.", fn: () => { s.money += 18; s.debt = Math.max(0, s.debt - 28); s.rent = 12; s.rentedHome = "Downsized rental"; s.house = null; s.houseUpkeep = 0; addLog(`${s.name} sells a home and downsizes.`); render(); setScenario(generateYearScenario()); } },
      { text: "Keep things as they are.", fn: () => setScenario(generateYearScenario()) }
    ]
  });
}

function manageCarAction() {
  const s = app.state;
  setScenario({
    title: "Car decisions",
    body: `A car keeps solving one problem by creating three quieter ones: maintenance, insurance, and risk.\n\nCurrent car: ${s.car}`,
    choices: [
      { text: "Pay off part of the car debt.", fn: () => { const pay = Math.min(8, Math.max(3, s.money * 0.08)); s.money -= pay; s.debt = Math.max(0, s.debt - pay); addLog(`${s.name} pays down car debt.`); render(); setScenario(generateYearScenario()); } },
      { text: "Sell the car.", fn: () => { s.money += 6; s.car = null; s.carUpkeep = 0; s.carInsurance = false; addLog(`${s.name} sells their car.`); render(); setScenario(generateYearScenario()); } },
      { text: "Keep driving it.", fn: () => setScenario(generateYearScenario()) }
    ]
  });
}

function insuranceAction() {
  const s = app.state;
  setScenario({
    title: "Insurance",
    body: "What insurance do you want this year?",
    choices: [
      { text: s.healthInsurance ? "Keep health insurance" : "Buy health insurance — $2k / year", fn: () => { s.healthInsurance = true; addLog(`${s.name} maintains health coverage.`); render(); setScenario(generateYearScenario()); } },
      { text: s.carInsurance ? "Keep car insurance" : "Buy car insurance — $1.5k / year", fn: () => { s.carInsurance = true; addLog(`${s.name} insures a car.`); render(); setScenario(generateYearScenario()); } },
      { text: s.homeInsurance ? "Keep home insurance" : "Buy home insurance — $1.8k / year", fn: () => { s.homeInsurance = true; addLog(`${s.name} insures their home.`); render(); setScenario(generateYearScenario()); } },
      { text: "Leave insurance unchanged.", fn: () => setScenario(generateYearScenario()) }
    ]
  });
}

function payDebtAction() {
  const s = app.state;
  const pay = Math.min(s.debt, Math.max(5, Math.floor(s.money * 0.2)));
  if (pay <= 0) return setScenario(generateYearScenario());
  s.money -= pay;
  s.debt = Math.max(0, s.debt - pay);
  addLog(`${s.name} pays down ${pay}k of debt.`);
  render();
  setScenario(generateYearScenario());
}

function bankruptcyAction() {
  const s = app.state;
  setScenario({
    title: "Bankruptcy becomes a real possibility",
    body: "Do you file for bankruptcy?",
    choices: [
      { text: "File for bankruptcy.", fn: () => { s.bankruptcyUsed = true; s.debt *= 0.35; s.money = Math.max(s.money, 2); s.hope -= 1; s.stress -= 2; s.criminalRecord = s.criminalRecord; addLog(`${s.name} files for bankruptcy and restructures their finances.`); render(); setScenario(generateYearScenario()); } },
      { text: "Try to manage without it.", fn: () => setScenario(generateYearScenario()) }
    ]
  });
}

function applyGraduateSchoolAction(type) {
  const options = type === "Graduate School"
    ? ["Computer Science", "Business", "Engineering", "Arts", "Education", "Medicine", "Social Sciences"]
    : ["Law", "Medicine", "MBA", "Teaching Credential"];
  setScenario({
    title: type === "Graduate School" ? "Graduate school applications" : "Professional school applications",
    body: "Choose the field you want to apply in.",
    choices: options.map(opt => ({
      text: opt,
      fn: () => chooseGraduateTier(type, opt)
    })).concat([{ text: "Go back.", fn: goBackToSchoolAction }])
  });
}

function chooseGraduateTier(type, focus) {
  setScenario({
    title: focus,
    body: "Choose the kind of schools you want to target.",
    choices: [
      { text: "Highly competitive schools", fn: () => resolveGraduateApplications(type, focus, "high") },
      { text: "Balanced programs", fn: () => resolveGraduateApplications(type, focus, "mid") },
      { text: "Safer options", fn: () => resolveGraduateApplications(type, focus, "safe") },
      { text: "Go back.", fn: () => applyGraduateSchoolAction(type) }
    ]
  });
}

function resolveGraduateApplications(type, focus, tier) {
  const s = app.state;
  const pools = type === "Graduate School"
    ? {
        high: ["University of Toronto", "University of British Columbia", "McGill University"],
        mid: ["Simon Fraser University", "University of Victoria", "University of Calgary"],
        safe: ["University of Northern British Columbia", "Thompson Rivers University", "Kwantlen Polytechnic University"]
      }
    : {
        high: ["University of Toronto", "McGill University", "University of British Columbia"],
        mid: ["University of Victoria", "Western University", "University of Ottawa"],
        safe: ["Lakehead University", "Thompson Rivers University", "Regional Professional Program"]
      };
  const costs = type === "Graduate School"
    ? { high: 18, mid: 14, safe: 10 }
    : { high: 28, mid: 22, safe: 16 };
  const baseOdds = type === "Graduate School"
    ? { high: 0.32, mid: 0.58, safe: 0.78 }[tier]
    : { high: 0.24, mid: 0.46, safe: 0.68 }[tier];
  const picks = pools[tier];
  const odds = clamp(baseOdds + ((s.average - 75) / 100) + ((s.discipline - 5) * 0.03), 0.12, 0.97);
  const accepted = picks.filter(() => chance(odds));
  if (!accepted.length) {
    showLetter({
      type: "Admissions Office",
      title: "Application Decision",
      body: `${s.name},\n\nNo offer arrives this round for ${focus}.`,
      meta: "You can work, strengthen your file, and try again later."
    });
    s.hope -= 1;
    render();
    setScenario(generateYearScenario());
    return;
  }
  setScenario({
    title: "Graduate results",
    body: "You receive offers. Which one do you accept?",
    choices: accepted.map(school => ({
      text: `${school} — about $${costs[tier]}k per year`,
      fn: () => {
        s.inSchool = true;
        s.schoolStage = type;
        s.gradTrack = focus;
        s.major = focus;
        s.field = focus === "Law" || focus === "MBA" || focus === "Teaching Credential" ? "General" : fieldFromMajor(focus);
        s.postSecondaryStatus = `Accepted — ${school}`;
        s.money -= costs[tier];
        s.yearsInPostSecondary = 0;
        showLetter({
          type: "Admissions Office",
          title: type === "Graduate School" ? "Graduate Admission" : "Professional Program Offer",
          body: `${s.name},\n\nYou have been admitted to ${school} for ${focus}.`,
          meta: `Estimated yearly cost: $${costs[tier]}k`
        });
        advanceYear({ purpose: 2, stress: 1 });
      }
    })).concat([{ text: "Go back.", fn: () => chooseGraduateTier(type, focus) }])
  });
}

function showLetter({ type, title, body, meta }) {
  $("modalContent").innerHTML = `
    <div class="letter-head">${type}</div>
    <h2 class="letter-title">${title}</h2>
    <div class="letter-body">${body.replace(/\n/g, "<br>")}</div>
    <div class="letter-meta">${meta}</div>
    <div class="letter-sign">The Weight of Becoming</div>
  `;
  $("modal").classList.remove("hidden");
}

function closeModal() {
  $("modal").classList.add("hidden");
  app.modalActions = {};
}

function showChoiceModal({ header = "Decision", title = "", body = "", choices = [], footer = "" }) {
  const ids = choices.map((_, idx) => `modal_choice_${Date.now()}_${idx}`);
  app.modalActions = {};
  choices.forEach((choice, idx) => { if (!choice.disabled) app.modalActions[ids[idx]] = choice.fn; });
  $("modalContent").innerHTML = `
    <div class="letter-head">${header}</div>
    <h2 class="letter-title">${title}</h2>
    <div class="letter-body">${String(body).replace(/\n/g, "<br>")}</div>
    <div class="modal-choice-list">${choices.map((choice, idx) => {
      const inner = choice.html || choice.text;
      const cls = `modal-choice-btn ${choice.disabled ? 'disabled' : ''} ${choice.html ? 'rich-choice' : ''}`;
      const attr = choice.disabled ? 'disabled aria-disabled="true"' : '';
      return `<button class="${cls}" data-choice-id="${ids[idx]}" ${attr}>${inner}</button>`;
    }).join("")}</div>
    ${footer ? `<div class="letter-meta">${footer}</div>` : ""}
  `;
  $("modal").classList.remove("hidden");
  $$(".modal-choice-btn").forEach(btn => {
    if (btn.disabled) return;
    btn.onclick = () => {
      const fn = app.modalActions[btn.dataset.choiceId];
      closeModal();
      if (fn) fn();
    };
  });
}

function showIllnessPopup() {
  const s = app.state;
  if (!s?.illness || !s.alive) return;
  const options = medicalOptionsFor(s.illness, s.healthInsurance);
  showChoiceModal({
    header: "Medical decision",
    title: `${capitalize(s.illness)} requires attention`,
    body: `You can leave this for later, but recovery usually improves when you deal with it now.`,
    choices: options.map(opt => ({
      text: `${opt.label} — $${opt.display}`,
      fn: () => {
        s.money -= opt.cost;
        s.health = clamp(s.health + opt.health, 0, 10);
        s.stress = clamp(s.stress + opt.stress, 0, 10);
        s.hope = clamp(s.hope + opt.hope, 0, 10);
        addLog(`${s.name} chooses ${opt.shortLabel} for ${s.illness}.`);
        if (opt.clear || chance(opt.recoverChance)) s.illness = "";
        render();
      }
    })).concat([{
      text: "Leave it for now.",
      fn: () => {
        s.health = clamp(s.health - 1, 0, 10);
        s.stress = clamp(s.stress + 1, 0, 10);
        addLog(`${s.name} puts off treatment for ${s.illness}.`);
        render();
      }
    }]),
    footer: s.healthInsurance ? "Insurance lowers some costs." : "Without insurance, medication and follow-up care cost more."
  });
}




document.addEventListener("DOMContentLoaded", init);
