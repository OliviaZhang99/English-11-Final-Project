"use strict";

/*
  LIFE.SIM — Website Game Version (HUD + Dialogue + Choices)
  - Start/Continue overlay
  - Save/Load/Restart
  - Guaranteed event every year (no empty childhood)
  - Typewriter dialogue
  - Impact reply after each choice (stat + money deltas)
  - Death with cause + end summary
*/

/* ----------------------------
   Save + Constants
----------------------------- */

/** localStorage key for saving */
const SAVE_KEY = "life_sim_site_save_v1";

/** max age if nothing else ends the game */
const MAX_AGE = 92;

/* ----------------------------
   DOM Helpers
----------------------------- */

/** get element by id */
const $ = (id) => document.getElementById(id);

/** safe text */
function esc(s){
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

/* overlay + start controls */
const startOverlay = $("startOverlay");
const inpName = $("inpName");
const selBackground = $("selBackground");
const selHobby = $("selHobby");
const selVibe = $("selVibe");
const btnStart = $("btnStart");
const btnContinue = $("btnContinue");
const btnResetSave = $("btnResetSave");

/* sidebar */
const sideAge = $("sideAge");
const sideBg = $("sideBg");
const sideEdu = $("sideEdu");
const sideCash = $("sideCash");
const sideDebt = $("sideDebt");
const sideStatus = $("sideStatus");

const sideHealth = $("sideHealth");
const sideStress = $("sideStress");
const sideHope = $("sideHope");
const sideTrust = $("sideTrust");
const sideRep = $("sideRep");

const healthFill = $("healthFill");
const stressFill = $("stressFill");
const hopeFill = $("hopeFill");
const trustFill = $("trustFill");
const repFill = $("repFill");

const dangerChip = $("dangerChip");
const conditionsBox = $("conditions");
const badgesBox = $("badges");

/* character + dialogue */
const playerMood = $("playerMood");
const playerArt = $("playerArt");
const npcName = $("npcName");
const npcMood = $("npcMood");
const npcArt = $("npcArt");

const sceneTitle = $("sceneTitle");
const speaker = $("speaker");
const sceneText = $("sceneText");

const impactBox = $("impactBox");
const choicesBox = $("choices");

/* buttons */
const ageUpBtn = $("ageUpBtn");
const saveBtn = $("saveBtn");
const restartBtn = $("restartBtn");

/* timeline */
const timeline = $("timeline");

/* modal */
const modal = $("modal");
const modalTitle = $("modalTitle");
const modalBody = $("modalBody");
const modalClose = $("modalClose");

/* ----------------------------
   Utility
----------------------------- */

/** clamp */
function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

/** random int inclusive */
function randi(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

/** roll probability */
function roll(p){ return Math.random() < p; }

/** pick random */
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/** money formatting */
function money(n){
  const s = n < 0 ? "-" : "";
  const v = Math.abs(Math.round(n));
  return `${s}$${v.toLocaleString()}`;
}

/** education label */
function eduLabel(level){
  const labels = [
    "Not in school",
    "Elementary school",
    "Middle school",
    "High school",
    "Some college / trade",
    "Bachelor’s degree",
    "Graduate / professional"
  ];
  return labels[clamp(level,0,labels.length-1)];
}

/** stage by age */
function stageFromAge(age){
  if(age < 13) return "child";
  if(age < 18) return "teen";
  if(age < 30) return "young adult";
  if(age < 50) return "adult";
  if(age < 70) return "midlife";
  return "elder";
}

/** background starting package */
function backgroundPackage(bg){
  if(bg === "lower") return { cash: 80, debt: 0, allowance: 8, trust: 45, hope: 64, rep: 40, health: 78 };
  if(bg === "upper") return { cash: 1200, debt: 0, allowance: 60, trust: 62, hope: 72, rep: 60, health: 82 };
  return { cash: 280, debt: 0, allowance: 22, trust: 55, hope: 68, rep: 50, health: 80 };
}

/* ----------------------------
   Game State
----------------------------- */

let state = null;

/** create new life */
function createNewState(name, bg, hobby, vibe){
  const pkg = backgroundPackage(bg);

  return {
    version: 1,
    player: { name: name || "Player", bg, hobby, vibe },

    life: { age: 6, year: 1, stage: stageFromAge(6), edu: 1 },

    stats: {
      health: pkg.health,
      stress: 20,
      hope: pkg.hope,
      trust: pkg.trust,
      reputation: pkg.rep
    },

    money: { cash: pkg.cash, debt: pkg.debt, allowance: pkg.allowance },

    conditions: [],      // strings
    badges: [],          // strings

    seen: {},            // event ids seen once
    yearlySeen: {},      // per-age yearly event lock

    alive: true,
    death: null,         // {age, reason}

    log: []              // timeline entries
  };
}

/** save */
function saveGame(){
  if(!state) return;
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  refreshContinue();
}

/** load */
function loadGame(){
  const raw = localStorage.getItem(SAVE_KEY);
  if(!raw) return null;
  try{
    const parsed = JSON.parse(raw);
    if(parsed && parsed.version === 1) return parsed;
    return null;
  }catch{
    return null;
  }
}

/** reset */
function resetSave(){
  localStorage.removeItem(SAVE_KEY);
  refreshContinue();
}

/** continue only if save exists */
function refreshContinue(){
  const has = !!loadGame();
  btnContinue.disabled = !has;
  btnContinue.style.opacity = has ? "1" : "0.45";
}

/* ----------------------------
   Timeline + Conditions + Badges
----------------------------- */

/** add timeline entry */
function addLog(title, text){
  state.log.unshift({
    t: `Age ${state.life.age} • Year ${state.life.year}`,
    title,
    text
  });
  state.log = state.log.slice(0, 220);
}

/** add badge if missing */
function addBadge(name){
  if(!state.badges.includes(name)) state.badges.push(name);
}

/** add condition if missing */
function addCondition(name){
  if(!state.conditions.includes(name)) state.conditions.push(name);
}

/** remove condition */
function removeCondition(name){
  const i = state.conditions.indexOf(name);
  if(i >= 0) state.conditions.splice(i,1);
}

/* ----------------------------
   Typewriter + Impact
----------------------------- */

let typingToken = 0;

/** typewriter into sceneText */
function typeScene(text){
  typingToken++;
  const my = typingToken;
  sceneText.textContent = "";
  let i = 0;
  const speed = text.length > 360 ? 8 : 14;

  function tick(){
    if(my !== typingToken) return;
    i = Math.min(text.length, i + 2);
    sceneText.textContent = text.slice(0,i);
    if(i < text.length) setTimeout(tick, speed);
  }
  tick();
}

/** show impact lines */
function showImpact(lines){
  if(!lines || lines.length === 0){
    impactBox.textContent = "";
    impactBox.style.display = "none";
    return;
  }
  impactBox.style.display = "block";
  impactBox.textContent = "Result:\n" + lines.join("\n");
}

/** snapshot for delta */
function snap(){
  return {
    health: state.stats.health,
    stress: state.stats.stress,
    hope: state.stats.hope,
    trust: state.stats.trust,
    rep: state.stats.reputation,
    cash: state.money.cash,
    debt: state.money.debt
  };
}

/** delta lines */
function diff(a,b){
  const out = [];
  const line = (k, x, y) => {
    if(x === y) return;
    const d = y - x;
    const sign = d > 0 ? "+" : "";
    out.push(`${k}: ${x} → ${y} (${sign}${d})`);
  };
  line("Health", a.health, b.health);
  line("Stress", a.stress, b.stress);
  line("Hope", a.hope, b.hope);
  line("Trust", a.trust, b.trust);
  line("Reputation", a.rep, b.rep);
  if(a.cash !== b.cash) out.push(`Cash: ${money(a.cash)} → ${money(b.cash)}`);
  if(a.debt !== b.debt) out.push(`Debt: ${money(a.debt)} → ${money(b.debt)}`);
  return out;
}

/* ----------------------------
   Rendering UI
----------------------------- */

/** render meters */
function setMeter(fillEl, val){
  fillEl.style.width = `${clamp(val,0,100)}%`;
}

/** render full UI */
function renderAll(){
  if(!state) return;

  // sidebar
  sideAge.textContent = `${state.life.age} (${state.life.stage})`;
  sideBg.textContent = state.player.bg;
  sideEdu.textContent = eduLabel(state.life.edu);
  sideCash.textContent = money(state.money.cash);
  sideDebt.textContent = money(state.money.debt);
  sideStatus.textContent = state.alive ? "Alive" : "Dead";

  sideHealth.textContent = `${state.stats.health}/100`;
  sideStress.textContent = `${state.stats.stress}/100`;
  sideHope.textContent = `${state.stats.hope}/100`;
  sideTrust.textContent = `${state.stats.trust}/100`;
  sideRep.textContent = `${state.stats.reputation}/100`;

  setMeter(healthFill, state.stats.health);
  setMeter(stressFill, state.stats.stress);
  setMeter(hopeFill, state.stats.hope);
  setMeter(trustFill, state.stats.trust);
  setMeter(repFill, state.stats.reputation);

  // danger chip
  const danger = [];
  if(state.stats.health <= 25) danger.push("Health low");
  if(state.stats.hope <= 25) danger.push("Hope low");
  if(state.stats.stress >= 80) danger.push("Stress critical");
  if(state.money.debt >= 2500) danger.push("Debt heavy");
  dangerChip.textContent = danger.length ? danger.join(" • ") : "Stable";

  // conditions + badges
  conditionsBox.innerHTML = state.conditions.length
    ? state.conditions.map(c => `<span class="chip">${esc(c)}</span>`).join("")
    : `<span class="chip muted">None</span>`;

  badgesBox.innerHTML = state.badges.length
    ? state.badges.map(b => `<span class="chip">${esc(b)}</span>`).join("")
    : `<span class="chip muted">None</span>`;

  // mood
  playerMood.textContent =
    state.stats.stress >= 80 ? "😵 Overloaded"
    : state.stats.hope <= 25 ? "😶 Numb"
    : state.stats.health <= 25 ? "🤕 Unwell"
    : "🙂 Okay";

  // timeline
  timeline.innerHTML = state.log.map(item => `
    <div class="logItem">
      <div class="logMeta">${esc(item.t)}</div>
      <div class="logTitle">${esc(item.title)}</div>
      <div class="logText">${esc(item.text)}</div>
    </div>
  `).join("");
}

/* ----------------------------
   Events (guaranteed each year)
----------------------------- */

/** create choice object */
function Choice(label, sub, log, effects){
  return { label, sub, log, effects: effects || [] };
}

/** apply effect */
function applyEffect(e){
  if(e.type === "stat"){
    state.stats[e.key] = clamp(state.stats[e.key] + e.delta, 0, 100);
    return;
  }
  if(e.type === "money"){
    state.money.cash += (e.cash || 0);
    state.money.debt = Math.max(0, state.money.debt + (e.debt || 0));
    return;
  }
  if(e.type === "condAdd"){ addCondition(e.name); return; }
  if(e.type === "condRemove"){ removeCondition(e.name); return; }
  if(e.type === "badge"){ addBadge(e.name); return; }
}

/** background flavor */
function bgFlavor(){
  if(state.player.bg === "lower") return "Money shows up as stress before it shows up as numbers.";
  if(state.player.bg === "upper") return "Comfort exists, but expectations can cut.";
  return "Stability helps, but it’s not a shield.";
}

/** one-time milestones */
function milestones(){
  return [
    {
      id:"m_start_6",
      age:6,
      title:"Identity",
      npc:"Time",
      mood:"—",
      text:`You are ${state.player.name}.\n${bgFlavor()}\nYou don’t understand “life” yet. You just feel it.`,
      choices:[
        Choice("Begin", "You step into the story.", "You begin.",
          [{type:"stat", key:"hope", delta:+2}, {type:"stat", key:"trust", delta:+1}])
      ]
    },
    {
      id:"m_teen_13",
      age:13,
      title:"Teen years begin",
      npc:"A mirror",
      mood:"—",
      text:"Same world. New expectations.\nPeople judge you like you’re already finished.",
      choices:[
        Choice("Reinvent yourself", "Decide who you are first.", "Confidence climbs.",
          [{type:"stat", key:"reputation", delta:+5}, {type:"stat", key:"hope", delta:+2}]),
        Choice("Stay consistent", "No performing.", "Peace stays quieter.",
          [{type:"stat", key:"hope", delta:+2}, {type:"stat", key:"trust", delta:+1}])
      ]
    },
    {
      id:"m_crime_16",
      age:16,
      title:"A crime opportunity appears",
      npc:"Someone dangerous",
      mood:"⚠️",
      text:"Someone suggests something illegal.\nNot movie crime. Real crime.\nThey ask what you’ll do.",
      choices:[
        Choice("Refuse and leave", "Clean exit.", "You refuse.",
          [{type:"stat", key:"reputation", delta:+4}, {type:"stat", key:"trust", delta:+2}]),
        Choice("Warn someone quietly", "Stop it without becoming a target.", "You protect people carefully.",
          [{type:"stat", key:"trust", delta:+4}, {type:"stat", key:"stress", delta:+3}, {type:"stat", key:"hope", delta:-1}]),
        Choice("Go along with it", "Fast money, slow consequences.", "You gamble with your future.",
          [{type:"money", cash:randi(120,600)}, {type:"stat", key:"reputation", delta:-14}, {type:"stat", key:"hope", delta:-8}, {type:"condAdd", name:"Paranoia"}])
      ]
    }
  ];
}

/** yearly event pools (always meaningful) */
function yearEventForAge(age){
  const stage = state.life.stage;
  const hobby = state.player.hobby;
  const vibe = state.player.vibe;

  const child = [
    {
      title:"A mistake in front of people",
      npc:"Classroom",
      mood:"—",
      text:"You answer confidently… and you’re wrong.\nThe room reacts before you can.",
      choices:[
        Choice("Laugh it off", "You don’t let it own you.", "You recover quickly.",
          [{type:"stat", key:"reputation", delta:+2}, {type:"stat", key:"stress", delta:-1}]),
        Choice("Go quiet", "You feel it in your chest.", "It sticks with you longer than it should.",
          [{type:"stat", key:"hope", delta:-2}, {type:"stat", key:"stress", delta:+3}])
      ]
    },
    {
      title:"You witness cruelty",
      npc:"Hallway",
      mood:"—",
      text:"It’s subtle, but it’s cruelty.\nYou understand it without having the words.",
      choices:[
        Choice("Step in", "Even if your voice shakes.", "Courage becomes real.",
          [{type:"stat", key:"reputation", delta:+3}, {type:"stat", key:"trust", delta:+2}, {type:"stat", key:"stress", delta:+2}]),
        Choice("Tell an adult later", "Quiet protection.", "You help without becoming a target.",
          [{type:"stat", key:"trust", delta:+2}, {type:"stat", key:"stress", delta:+1}])
      ]
    },
    {
      title:`Your ${hobby} becomes a refuge`,
      npc:"Yourself",
      mood:"—",
      text:`You realize your ${hobby} isn’t just “something you do.”\nIt’s where you go when life is loud.`,
      choices:[
        Choice("Commit", "Practice even when you don’t feel like it.", "Skill becomes identity.",
          [{type:"stat", key:"hope", delta:+4}, {type:"stat", key:"stress", delta:+2}, {type:"badge", name:`Disciplined (${hobby})`}]),
        Choice("Keep it casual", "Protect the fun.", "You keep it yours.",
          [{type:"stat", key:"hope", delta:+2}, {type:"stat", key:"stress", delta:-1}])
      ]
    },
    {
      title:"A family money moment",
      npc:"Home",
      mood:"—",
      text:"You overhear adults talking about money.\nNobody explains it to you. You still understand.",
      choices:[
        Choice("Offer help", "Small hands, real intention.", "Trust grows in the cracks.",
          [{type:"stat", key:"trust", delta:+3}, {type:"stat", key:"hope", delta:+1}]),
        Choice("Stay out of it", "You don’t want to make it worse.", "You learn quiet survival.",
          [{type:"stat", key:"hope", delta:-1}, {type:"stat", key:"stress", delta:+2}])
      ]
    }
  ];

  const teen = [
    {
      title:"Friend group pressure",
      npc:"Friends",
      mood:"—",
      text:"Someone wants you to pick a side.\nNot choosing is also a choice.",
      choices:[
        Choice("Pick the right side", "Even if it costs you.", "Respect rises.",
          [{type:"stat", key:"reputation", delta:+3}, {type:"stat", key:"stress", delta:+2}]),
        Choice("Stay neutral", "You avoid enemies.", "You keep peace, lose clarity.",
          [{type:"stat", key:"hope", delta:-2}, {type:"stat", key:"stress", delta:+1}])
      ]
    },
    {
      title:"A grade that feels personal",
      npc:"School",
      mood:"—",
      text:"You get a result that doesn’t match how hard you tried.\nIt lands like an insult.",
      choices:[
        Choice("Adjust strategy", "Ego down, skill up.", "You learn how to improve.",
          [{type:"stat", key:"hope", delta:+2}, {type:"stat", key:"reputation", delta:+2}, {type:"stat", key:"stress", delta:+2}]),
        Choice("Spiral quietly", "You keep it inside.", "It weighs more than it should.",
          [{type:"stat", key:"hope", delta:-3}, {type:"stat", key:"stress", delta:+4}, {type:"condAdd", name:"Burnout"}])
      ]
    },
    {
      title:`Your vibe (${vibe}) gets tested`,
      npc:"A situation",
      mood:"—",
      text:"You’re put in a situation where your usual personality isn’t enough.\nYou have to adapt.",
      choices:[
        Choice("Adapt anyway", "You become flexible.", "Growth feels uncomfortable — but real.",
          [{type:"stat", key:"hope", delta:+3}, {type:"stat", key:"stress", delta:+2}, {type:"badge", name:"Adaptable"}]),
        Choice("Stay rigid", "Protect your comfort zone.", "Safe, but limiting.",
          [{type:"stat", key:"hope", delta:-1}, {type:"stat", key:"reputation", delta:-1}])
      ]
    },
    {
      title:"A rumor touches your name",
      npc:"School",
      mood:"⚠️",
      text:"Someone says something about you that isn’t true.\nIt spreads faster than you can correct it.",
      choices:[
        Choice("Confront it calmly", "Direct, controlled.", "You take your name back.",
          [{type:"stat", key:"reputation", delta:+2}, {type:"stat", key:"stress", delta:+2}]),
        Choice("Ignore it", "You hope it dies.", "It lingers.",
          [{type:"stat", key:"reputation", delta:-3}, {type:"stat", key:"hope", delta:-2}, {type:"stat", key:"stress", delta:+3}])
      ]
    }
  ];

  const pool = (stage === "child") ? child : (stage === "teen") ? teen : teen;
  return pick(pool);
}

/** pick event for current age (milestone first, then yearly guaranteed) */
function pickEvent(){
  const age = state.life.age;

  // milestone if exists and unseen
  const ms = milestones().find(e => e.age === age && !state.seen[e.id]);
  if(ms) return ms;

  // yearly once per age
  if(!state.yearlySeen[String(age)]){
    const y = yearEventForAge(age);
    return {
      id: `y_${age}`,
      age,
      title: y.title,
      npc: y.npc,
      mood: y.mood,
      text: y.text,
      choices: y.choices,
      yearly: true
    };
  }

  // fallback: still meaningful (rare)
  const y2 = yearEventForAge(age);
  return {
    id: null,
    age,
    title: y2.title,
    npc: y2.npc,
    mood: y2.mood,
    text: y2.text,
    choices: y2.choices,
    yearly: false
  };
}

/* ----------------------------
   Showing events + choices
----------------------------- */

/** clear choice buttons */
function clearChoices(){
  choicesBox.innerHTML = "";
}

/** show one event on screen */
function showEvent(ev){
  sceneTitle.textContent = `${ev.title}`;
  speaker.textContent = ev.npc || "Life";

  npcName.textContent = ev.npc || "—";
  npcMood.textContent = ev.mood || "—";
  npcArt.textContent = ""; // you can add ASCII later

  showImpact([]);
  typeScene(ev.text);

  clearChoices();
  ev.choices.forEach((ch, idx) => {
    const b = document.createElement("button");
    b.className = "choiceBtn";
    b.innerHTML = `<div class="choiceTop">${esc(ch.label)}</div><div class="choiceSub">${esc(ch.sub)}</div>`;
    b.onclick = () => choose(ev, idx);
    choicesBox.appendChild(b);
  });
}

/** apply a choice */
function choose(ev, idx){
  const ch = ev.choices[idx];
  const before = snap();

  // apply effects
  (ch.effects || []).forEach(applyEffect);

  // mark seen
  if(ev.id && ev.id.startsWith("m_")) state.seen[ev.id] = true;
  if(ev.yearly) state.yearlySeen[String(state.life.age)] = true;

  // money/stress drift after each decision (makes life feel real)
  driftAfterDecision();

  const after = snap();
  const lines = diff(before, after);

  addLog(ev.title, `You chose: ${ch.label}. ${ch.log}`);
  showImpact(lines.length ? lines : ["No visible stat change."]);

  renderAll();
  saveGame();

  // check death after effects
  checkDeath();
}

/* ----------------------------
   Drift + Age Up
----------------------------- */

/** small drift that makes consequences accumulate */
function driftAfterDecision(){
  // allowance or small income
  if(state.life.stage === "child" || state.life.stage === "teen"){
    state.money.cash += state.money.allowance;
  }else{
    state.money.cash += randi(30, 160);
  }

  // basic expenses
  const expense = (state.life.stage === "child") ? randi(5, 22)
    : (state.life.stage === "teen") ? randi(12, 40)
    : randi(80, 260);

  if(state.money.cash >= expense){
    state.money.cash -= expense;
  }else{
    const remain = expense - state.money.cash;
    state.money.cash = 0;
    state.money.debt += remain;
    state.stats.stress = clamp(state.stats.stress + 5, 0, 100);
    state.stats.hope = clamp(state.stats.hope - 2, 0, 100);
    addCondition("Financial stress");
  }

  // stress impacts health
  if(state.stats.stress >= 80){
    state.stats.health = clamp(state.stats.health - randi(2,6), 0, 100);
  }
  if(state.stats.hope <= 25){
    state.stats.health = clamp(state.stats.health - randi(1,4), 0, 100);
  }
}

/** age up to next year and force a new event */
function ageUp(){
  if(!state.alive) return;

  state.life.age += 1;
  state.life.year += 1;
  state.life.stage = stageFromAge(state.life.age);

  // education progression
  if(state.life.age <= 12) state.life.edu = 1;
  else if(state.life.age <= 14) state.life.edu = 2;
  else if(state.life.age <= 17) state.life.edu = 3;

  // natural aging effects (soft)
  if(state.life.age >= 50 && roll(0.35)) state.stats.health = clamp(state.stats.health - randi(0,2), 0, 100);
  if(state.life.age >= 70 && roll(0.55)) state.stats.health = clamp(state.stats.health - randi(1,4), 0, 100);

  // survival mechanic: hope changes how harsh the year feels
  if(state.stats.hope <= 20) state.stats.stress = clamp(state.stats.stress + 3, 0, 100);
  if(state.stats.hope >= 75) state.stats.stress = clamp(state.stats.stress - 2, 0, 100);

  renderAll();
  saveGame();

  // death checks before next event
  if(checkDeath()) return;

  // show next event (guaranteed)
  showEvent(pickEvent());
}

/* ----------------------------
   Death System (with reason)
----------------------------- */

/** decide cause of death */
function computeDeathReason(){
  const age = state.life.age;

  // direct causes
  if(state.stats.health <= 0) {
    if(state.conditions.includes("Financial stress") && state.money.debt >= 4500) return "Health collapse under prolonged stress and instability";
    if(state.stats.stress >= 95) return "Stress-related health collapse";
    return "Critical health decline";
  }

  // soft fail conditions
  if(state.stats.stress >= 100) return "Total burnout and systemic collapse";
  if(state.stats.hope <= 0) return "Loss of hope leading to shutdown";

  // old age
  if(age >= MAX_AGE) return "Old age";

  // risk-based (elder)
  if(age >= 78 && state.stats.health <= 22) return "Complications from aging and low health";

  // debt spiral edge case
  if(state.money.debt >= 9000 && state.stats.health <= 25) return "Debt spiral and stress complications";

  return null;
}

/** check if dead; if yes, end game */
function checkDeath(){
  if(!state.alive) return true;

  const reason = computeDeathReason();
  if(!reason) return false;

  state.alive = false;
  state.death = { age: state.life.age, reason };

  addLog("Death", `You died at age ${state.life.age}. Cause: ${reason}.`);
  saveGame();
  renderAll();
  showDeathSummary();
  return true;
}

/** show death modal */
function showDeathSummary(){
  const lines = [];
  lines.push(`You died at age ${state.death.age}.`);
  lines.push(`Cause: ${state.death.reason}`);
  lines.push("");
  lines.push("Final stats:");
  lines.push(`Health: ${state.stats.health}/100`);
  lines.push(`Stress: ${state.stats.stress}/100`);
  lines.push(`Hope: ${state.stats.hope}/100`);
  lines.push(`Trust: ${state.stats.trust}/100`);
  lines.push(`Reputation: ${state.stats.reputation}/100`);
  lines.push("");
  lines.push(`Cash: ${money(state.money.cash)}`);
  lines.push(`Debt: ${money(state.money.debt)}`);
  lines.push("");
  lines.push(`Badges: ${state.badges.length ? state.badges.join(", ") : "None"}`);
  lines.push(`Conditions: ${state.conditions.length ? state.conditions.join(", ") : "None"}`);

  openModal("Life Summary", lines.join("\n"));
}

/* ----------------------------
   Modal
----------------------------- */

function openModal(title, body){
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.classList.remove("hidden");
}

function closeModal(){
  modal.classList.add("hidden");
}

/* ----------------------------
   Start/Continue/Restart
----------------------------- */

/** start new life */
function startNew(){
  const name = (inpName.value || "").trim() || "Player";
  state = createNewState(name, selBackground.value, selHobby.value, selVibe.value);
  addLog("Start", "A life begins.");
  saveGame();

  startOverlay.style.display = "none";
  renderAll();
  showEvent(pickEvent());
}

/** continue saved */
function continueSaved(){
  const loaded = loadGame();
  if(!loaded) return;
  state = loaded;

  startOverlay.style.display = "none";
  renderAll();

  if(state.alive){
    showEvent(pickEvent());
  }else{
    showDeathSummary();
  }
}

/** restart to start overlay */
function restartToMenu(){
  startOverlay.style.display = "flex";
}

/* ----------------------------
   Boot
----------------------------- */

function boot(){
  // show overlay first
  startOverlay.style.display = "flex";
  refreshContinue();

  btnStart.onclick = startNew;
  btnContinue.onclick = continueSaved;
  btnResetSave.onclick = () => { resetSave(); refreshContinue(); };

  ageUpBtn.onclick = () => { showImpact([]); ageUp(); };
  saveBtn.onclick = () => { saveGame(); openModal("Saved", "Game saved."); };
  restartBtn.onclick = restartToMenu;

  modalClose.onclick = closeModal;
  modal.onclick = (e) => { if(e.target === modal) closeModal(); };

  // avatars (simple)
  const avatars = ["Nova", "Luna", "Spark"];
  const charButtons = $("charButtons");
  charButtons.innerHTML = "";
  avatars.forEach((name, i) => {
    const b = document.createElement("button");
    b.className = "secondary";
    b.type = "button";
    b.textContent = name;
    b.onclick = () => {
      playerArt.textContent = (i === 0) ? "🙂" : (i === 1) ? "😌" : "😈";
      addLog("Avatar", `You picked ${name}.`);
      renderAll();
      saveGame();
    };
    charButtons.appendChild(b);
  });

  // default art
  playerArt.textContent = "🙂";
  npcArt.textContent = "…";
}

document.addEventListener("DOMContentLoaded", boot);