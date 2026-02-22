export const events = [
  // Age 1: Family baseline (one-time)
  {
    id: "family_baseline_1",
    minAge: 1,
    maxAge: 1,
    once: true,
    title: "A quiet pattern forms",
    body: "Your family’s routines shape you before you can even name them. Some homes feel steady; others feel tense. Either way, you learn what “normal” means.",
    choices: [
      { text: "You grow up feeling supported", delta: { hope: +3, trust: +2 }, log: "Warm support becomes your default expectation." },
      { text: "You grow up feeling pressure", delta: { hope: -1, trust: -1, connections: +1 }, log: "You adapt early — careful, observant, and socially alert." }
    ]
  },

  // Age 5: Hobby becomes real (one-time)
  {
    id: "hobby_emerges_5",
    minAge: 5,
    maxAge: 6,
    once: true,
    title: "A hobby finds you",
    body: "At this age, you don’t “build a resume.” You just repeat what feels alive — the thing you keep returning to without being told.",
    choices: [
      { text: "Lean into it (practice often)", delta: { hope: +2, health: +1 }, log: "You start forming identity through repetition." },
      { text: "Keep it casual (no pressure)", delta: { trust: +1, hope: +1 }, log: "You keep joy intact without turning it into stress." }
    ]
  },

  // Age 8–12: Mentor
  {
    id: "mentor_notices",
    minAge: 8,
    maxAge: 16,
    once: true,
    title: "A mentor notices you",
    body: "A teacher pulls you aside after class and offers to introduce you to a community program.",
    choices: [
      { text: "Accept and follow through", delta: { connections: +6, hope: +3 }, log: "You built a real connection and gained momentum." },
      { text: "Say thanks, but avoid commitment", delta: { trust: -2, hope: -1 }, log: "You stayed safe, but missed a door opening." }
    ]
  },

  // Age 12–18: Family pressure (teen years)
  {
    id: "family_pressure_teen",
    minAge: 12,
    maxAge: 18,
    once: true,
    title: "Expectations get louder",
    body: "At home, someone expects you to prioritize stability over what you actually want.",
    choices: [
      { text: "Communicate calmly and set boundaries", delta: { trust: +4, hope: +2 }, log: "You protected your goals without burning bridges." },
      { text: "Argue and shut down", delta: { trust: -5, hope: -2 }, log: "You felt heard for a second, then regret hit." }
    ]
  },

  // Age 14–30: Health warning
  {
    id: "health_warning",
    minAge: 14,
    maxAge: 35,
    once: true,
    title: "Your body sends a warning",
    body: "You’ve been pushing too hard. Your sleep is messy, and small pains don’t go away.",
    choices: [
      { text: "Rest + recover (skip an opportunity)", delta: { health: +6, money: -200, hope: +1 }, log: "You chose longevity over short-term wins." },
      { text: "Ignore it and keep going", delta: { health: -7, connections: +2 }, log: "You gained progress, but your body paid the price." }
    ]
  },

  // Age 16–40: Side gig
  {
    id: "side_gig",
    minAge: 16,
    maxAge: 45,
    once: true,
    title: "A small paid chance",
    body: "Someone offers a short paid task. It’s not glamorous, but it’s real money.",
    choices: [
      { text: "Take it", delta: { money: +900, hope: +1 }, log: "You stacked small wins into stability." },
      { text: "Decline to protect time", delta: { hope: +2, connections: -1 }, log: "You kept time for yourself, but drifted a bit socially." }
    ]
  },

  // Age 10–60: Trust test
  {
    id: "trust_test",
    minAge: 10,
    maxAge: 60,
    once: true,
    title: "A trust test",
    body: "A friend shares something private and asks you not to tell anyone.",
    choices: [
      { text: "Keep it private", delta: { trust: +6, connections: +1 }, log: "People learn they can rely on you." },
      { text: "Tell one person anyway", delta: { trust: -8, connections: -2 }, log: "The story spread. The relationship didn’t recover." }
    ]
  }
];