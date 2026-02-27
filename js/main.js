import { els } from "./dom.js";
import { defaultState, applyDelta, educationFromAge, clamp } from "./state.js";
import { identities } from "./data.identities.js";
import { locations } from "./data.locations.js";
import { hobbies } from "./data.hobbies.js";
import { majors } from "./data.majors.js";
import { swcCourses } from "./data.courses.js";
import { renderClassChoices, renderLocationChoices, updateStartReady as updateStartReadyUI } from "./ui.start.js";
import { showScreen, renderSidebar, logLine, showDeltaPopup } from "./ui.game.js";

let state = defaultState();
const E = els();

console.log("[HC] main.js loaded");

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const has = (id) => state.usedEventIds.includes(id);
const mark = (id) => { if (!has(id)) state.usedEventIds.push(id); };

function setAwaitingChoice(on) {
  state.awaitingChoice = on;
  E.btnNextYear.disabled = on;
  E.lockNote.hidden = !on;
}

function enqueue(ev) { state.pendingEvents.push(ev); }
function nextPendingEvent() { return state.pendingEvents.shift() || null; }

function selectUnused(pool) {
  const unused = pool.filter(e => !has(e.onceId));
  if (unused.length === 0) return null;
  return pick(unused);
}

function renderEvent(ev) {
  E.eventTitle.textContent = `Age ${state.age} — ${ev.title}`;
  E.eventBody.textContent = ev.body;
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

      applyDelta(state, ch.delta);
      state.money = Math.round(state.money);

      showDeltaPopup(ch.delta);
      if (ch.log) logLine(E, ch.log);

      renderSidebar(state, E);

      const nxt = nextPendingEvent();
      if (nxt) return renderEvent(nxt);

      E.choiceRow.innerHTML = "";
      setAwaitingChoice(false);
      E.btnNextYear.focus();
    });

    E.choiceRow.appendChild(b);
  });
}

/* ---------- school engine ---------- */
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

  // 18–22 depends on program
  if (state.inSchool) state.schoolType = state.schoolType || "Post-Secondary";
}

function admissionScore(base) {
  // realistic-ish: grades + rep + trust + connections + contest strength
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
    // finish
    logLine(E, `You graduate (${state.degreeLevel}).`);
    state.inSchool = false;
    state.schoolType = "—";

    // keep degree
    // degreeLevel stays as achieved
    state.programLength = 0;
    state.yearsInProgram = 0;

    applyDelta(state, { hope: +3, reputation: +3, trust: +1 });
    showDeltaPopup({ hope: +3, reputation: +3, trust: +1 });
  }
}

/* ---------- scenario-based events ---------- */
function hobbyAtSixEvent() {
  return {
    onceId: "hobby6",
    title: "After-school sign-up day",
    body:
      "Your mom slides a brochure across the table.\n\n" +
      "\"Pick something,\" she says. \"You’ll stick with it longer than you think.\"",
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
      body:
        "Your mom kneels down with three toys.\n\n" +
        "A red car. A tiny piano. A box of blocks.\n\n" +
        "\"Which one?\"",
      choices: [
        { text: "The red car", delta: { connections: +2, trust: +1 }, log: "You like motion." },
        { text: "The piano", delta: { hope: +3, connections: +1 }, log: "You like expression." },
        { text: "The blocks", delta: { grade: +2, hope: +1 }, log: "You like building." },
      ]
    },
    {
      onceId: "kid_broken",
      title: "Something breaks",
      body:
        "You knock something off the counter.\n\n" +
        "It shatters.\n\n" +
        "Footsteps are coming.",
      choices: [
        { text: "Tell the truth", delta: { trust: +3, reputation: +1 }, log: "You own it." },
        { text: "Hide it", delta: { trust: -1, hope: +1 }, log: "You learn damage control." },
        { text: "Blame something else", delta: { trust: -3, reputation: -2 }, log: "You protect yourself. It costs." },
      ]
    },
    {
      onceId: "kid_friend",
      title: "A new kid",
      body:
        "A new kid sits alone.\n\n" +
        "They keep picking at their lunch like they don’t want anyone to notice them.",
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
      body:
        "During a small quiz, you notice someone copying answers.\n\n" +
        "They glance at you like: please.",
      choices: [
        { text: "Tell the teacher", delta: { trust: +2, reputation: +2, connections: -1 }, log: "You choose rules over friendship." },
        { text: "Talk to them after class", delta: { trust: +2, connections: +2 }, log: "You warn them quietly." },
        { text: "Ignore it", delta: { hope: +1, reputation: -1 }, log: "You stay out of it." },
      ]
    },
    {
      onceId: "kid_groupchat",
      title: "Group chat drama",
      body:
        "Someone gets left out of a group chat on purpose.\n\n" +
        "You notice. They notice too.",
      choices: [
        { text: "Add them back", delta: { trust: +2, connections: +2 }, log: "You make it right publicly." },
        { text: "Message them privately", delta: { trust: +2 }, log: "You try to soften it quietly." },
        { text: "Stay silent", delta: { hope: -1, reputation: -1 }, log: "Silence chooses a side." },
      ]
    },
    {
      onceId: "kid_teacher",
      title: "Teacher’s attention",
      body:
        "A teacher praises you in front of everyone.\n\n" +
        "Some classmates look annoyed.",
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
      body:
        "Counselling week.\n\n" +
        "You pick what you’ll carry all year.",
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
      onceId: "hs_cheat_big",
      title: "A bigger cheating moment",
      body:
        "You catch someone cheating on something that actually matters.\n\n" +
        "If you report it, it will blow up.\nIf you don’t, you’ll carry it.",
      choices: [
        { text: "Report it", delta: { trust: +3, reputation: +3, connections: -2 }, log: "You do what you think is right." },
        { text: "Confront them privately", delta: { trust: +3, connections: +2, reputation: +1 }, log: "You try to stop it without ruining them." },
        { text: "Ignore it", delta: { hope: +1, reputation: -2 }, log: "You choose peace. It doesn’t feel clean." },
      ]
    },
    {
      onceId: "hs_party",
      title: "A party invite",
      body:
        "You get invited.\n\n" +
        "You also have something due tomorrow.",
      choices: [
        { text: "Go anyway", delta: { hope: +3, grade: -3, reputation: +1 }, log: "You live a little. Tomorrow hurts." },
        { text: "Stay and finish the work", delta: { grade: +4, hope: -1 }, log: "You choose future-you." },
        { text: "Go for one hour then leave", delta: { hope: +2, grade: -1, reputation: +1 }, log: "You compromise. It’s never perfect." },
      ]
    },
    {
      onceId: "hs_club",
      title: "A club opportunity",
      body:
        "A teacher tells you about a club that could turn into something bigger.\n\n" +
        "\"If you commit,\" they say, \"it’ll show.\"",
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
    body:
      "You can show up and get a real score — or stay invisible.\n\n" +
      "Rankings echo later, whether you like it or not.",
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
    body:
      "You pick a direction.\n\n" +
      "People will ask why. You’ll have to answer with more than vibes.",
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
    body:
      "You realize the current path doesn’t fit.\n\n" +
      "Switching is allowed. It still costs time.",
    choices: majors.map(m => ({
      text: `Switch to ${m.title}`,
      delta: { hope: -1, reputation: -1 },
      apply: () => { state.major = m.title; },
      log: `You switch into ${m.title}.`
    }))
  };
}

function uniApplicationEvent() {
  return {
    onceId: "uni_apps",
    title: "Applications season",
    body:
      "You pick where to apply.\n\n" +
      "Grades matter. Reputation matters.\nTrust and connections matter more than people admit.",
    choices: [
      {
        text: "Apply: Ivy League",
        delta: {},
        apply: () => {
          const ok = admit("Ivy");
          if (ok) {
            startProgram({ schoolType: "Ivy League", programLength: 4, degreeLevel: "Bachelor" });
            enqueue(majorPickEvent("Ivy"));
            logLine(E, "Accepted. The email feels unreal.");
          } else {
            applyDelta(state, { hope: -4, reputation: -2, trust: -1 });
            showDeltaPopup({ hope: -4, reputation: -2, trust: -1 });
            logLine(E, "Rejected. You read the sentence twice.");
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
            logLine(E, "Accepted. Relief hits first.");
          } else {
            applyDelta(state, { hope: -3, trust: -1 });
            showDeltaPopup({ hope: -3, trust: -1 });
            logLine(E, "Rejected. You start planning a detour.");
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
          logLine(E, "You choose the practical route.");
        },
        log: "You enroll."
      }
    ]
  };
}

function fallbackSchoolEvent() {
  return {
    onceId: "fallback",
    title: "Fallback plan",
    body:
      "You still have choices.\n\n" +
      "A detour isn’t a failure. It’s just a different start line.",
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

function gradSchoolPrompt() {
  return {
    onceId: `grad_prompt_${state.age}`,
    title: "More school?",
    body:
      "You could stop here.\n\n" +
      "Or you could keep going, and let the cost become the point.",
    choices: [
      {
        text: "Apply for a Master’s",
        delta: { money: -1200, hope: -1 },
        apply: () => {
          const ok = admit("Masters");
          if (ok) {
            startProgram({ schoolType: "Graduate School", programLength: 2, degreeLevel: "Master" });
            logLine(E, "Accepted. More time. More debt. More leverage.");
          } else {
            applyDelta(state, { hope: -2 });
            showDeltaPopup({ hope: -2 });
            logLine(E, "Rejected. Not now.");
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
            logLine(E, "Accepted. Your life becomes research.");
          } else {
            applyDelta(state, { hope: -3 });
            showDeltaPopup({ hope: -3 });
            logLine(E, "Rejected. The bar was brutal.");
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
    body:
      "You see a flyer for adult programs.\n\n" +
      "It’s not romantic. It’s practical.\nBut it’s a door.",
    choices: [
      {
        text: "Community College",
        delta: { money: -900, hope: +1 },
        apply: () => { startProgram({ schoolType: "Community College", programLength: 2, degreeLevel: "Associate" }); enqueue(majorPickEvent("AdultCommunity")); },
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
            logLine(E, "Accepted. You do this while working.");
          } else {
            applyDelta(state, { hope: -2 });
            showDeltaPopup({ hope: -2 });
            logLine(E, "Rejected. You try the practical route.");
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

/* ---------- yearly event building (no silent years) ---------- */
function buildYearQueue() {
  state.pendingEvents = [];

  setSchoolByAge();

  // hobby at 6
  if (state.age === 6 && state.hobby === "—" && !has("hobby6")) {
    enqueue(hobbyAtSixEvent());
  }

  // childhood (0–7): 2–3 real events
  if (state.age <= 7) {
    const pool = childhoodPool();
    const e1 = selectUnused(pool) || { onceId: `kid_fallback_${state.age}`, title: "A small day", body: "Nothing big happens. You still become someone.", choices: [{ text: "Keep going", delta: { hope: +1 }, log: "Time passes." }] };
    enqueue(e1);

    const e2 = selectUnused(pool) || { onceId: `kid_fallback2_${state.age}`, title: "A small decision", body: "You pick what feels safest.", choices: [{ text: "Choose comfort", delta: { trust: +1 }, log: "You learn your own habits." }] };
    if (e2.onceId !== e1.onceId) enqueue(e2);

    return;
  }

  // late childhood (8–12)
  if (state.age <= 12) {
    const pool = lateChildPool();
    const e1 = selectUnused(pool) || { onceId: `lc_fallback_${state.age}`, title: "A normal day", body: "Something small tests you.", choices: [{ text: "Handle it", delta: { trust: +1 }, log: "You handle it." }] };
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

  // high school (13–17): always 3 events (course/contest/scenario)
  if (state.age <= 17) {
    const pool = highSchoolPool();
    const pickHS = selectUnused(pool);
    if (pickHS) enqueue(pickHS);

    // contest appears frequently
    if (Math.random() < 0.85) enqueue(contestEvent());

    // school habit always
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

    // university applications at 17 (once)
    if (state.age === 17 && !has("uni_apps")) enqueue(uniApplicationEvent());

    return;
  }

  // post-secondary years if enrolled
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

    // progress program + maybe graduate
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

    // after bachelor completion, prompt grad school once
    if (state.degreeLevel === "Bachelor" && !has(`grad_prompt_${state.age}`) && Math.random() < 0.55) {
      enqueue(gradSchoolPrompt());
    }
    return;
  }

  // adult (not in school): 2–3 events, plus optional return to school
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

  // drift money by location economy
  state.money += Math.round(3200 * state.moneyMult);
}

/* ---------- year advance ---------- */
function advanceYear() {
  if (state.awaitingChoice) return;

  state.year += 1;
  state.age += 1;

  renderSidebar(state, E);
  E.timelineSub.textContent = `Age ${state.age}.`;

  buildYearQueue();
  const first = nextPendingEvent();
  if (first) renderEvent(first);
}

/* ---------- start life ---------- */
function startLife() {
  const ident = identities.find(i => i.id === state.selectedIdentityId);
  const loc = locations.find(l => l.id === state.selectedLocationId);
  if (!ident || !loc) return;

  const base = ident.start;

  state = {
    ...defaultState(),
    selectedIdentityId: ident.id,
    selectedLocationId: loc.id,
    name: state.name.trim(),
    gender: state.gender,
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

    // start in school life
    inSchool: false,
    schoolType: "—",
    major: "—",
    degreeLevel: "—",
    yearsInProgram: 0,
    programLength: 0,

    contestStrength: 0,
  };

  showScreen(E, "game");
  E.lifeLog.innerHTML = "";
  E.choiceRow.innerHTML = "";

  renderSidebar(state, E);

  E.eventTitle.textContent = `Age 0 — A first breath`;
  E.eventBody.textContent =
    `${state.name} opens their eyes in ${state.locationLabel}.\n\n` +
    `No manual. No guarantees.\nJust time — and what you do with it.`;
  E.timelineSub.textContent = `Age 0.`;

  logLine(E, `Name: ${state.name}. Gender: ${state.gender}.`);
  logLine(E, `Location: ${state.locationLabel}.`);
  logLine(E, `Class: ${ident.title}.`);

  setAwaitingChoice(false);
}

/* ---------- init ---------- */
function updateStartReady() { updateStartReadyUI(state, E); }

function init() {
  renderLocationChoices(state, E, updateStartReady);
  renderClassChoices(state, E, updateStartReady);
  updateStartReady();
  showScreen(E, "start");

  E.inputName.addEventListener("input", () => { state.name = E.inputName.value; updateStartReady(); });
  E.selectGender.addEventListener("change", () => { state.gender = E.selectGender.value; updateStartReady(); });

  E.btnStartLife.addEventListener("click", () => {
    if (E.btnStartLife.disabled) return;
    startLife();
  });

  E.btnNextYear.addEventListener("click", advanceYear);

  E.btnBackToStart.addEventListener("click", () => {
    showScreen(E, "start");
    state.inGame = false;
    updateStartReady();
  });

  E.btnReset.addEventListener("click", () => {
    state = defaultState();
    E.inputName.value = "";
    E.selectGender.value = "";
    E.selectLocation.value = "";
    showScreen(E, "start");
    renderLocationChoices(state, E, updateStartReady);
    renderClassChoices(state, E, updateStartReady);
    updateStartReady();
  });
}

init();