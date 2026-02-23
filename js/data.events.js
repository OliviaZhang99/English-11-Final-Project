export const events = [
  {
    id: "family_baseline_1",
    minAge: 1,
    maxAge: 1,
    once: true,
    title: "The first atmosphere",
    body:
      "You won’t remember this year clearly — but your nervous system will.\n" +
      "Tone of voice, routines, silence after conflict.\n" +
      "This becomes your first definition of “normal.”",
    choices: [
      {
        text: "Home feels steady most days (predictable routines, gentle voices)",
        delta: { hope: +2, trust: +4 },
        log: "Consistency teaches you that safety can be real."
      },
      {
        text: "Home feels unpredictable (mood shifts, tension, sudden conflict)",
        delta: { hope: -1, trust: -2, connections: +2 },
        log: "You learn to read rooms early. You adapt fast — but trust takes time."
      }
    ]
  },

  {
    id: "play_style_4",
    minAge: 4,
    maxAge: 4,
    once: true,
    title: "The way you play becomes a clue",
    body:
      "Some kids run toward others. Some build worlds alone.\n" +
      "Neither is wrong — but each shapes how you practice being human.",
    choices: [
      {
        text: "You play with other kids (sharing, arguing, repairing)",
        delta: { connections: +3, trust: +1 },
        log: "You learn that relationships can break and still be repaired."
      },
      {
        text: "You play alone (focused, imaginative, self-contained)",
        delta: { hope: +2, trust: +1 },
        log: "You become good at being with yourself."
      }
    ]
  },

  {
    id: "school_first_label_7",
    minAge: 7,
    maxAge: 8,
    once: true,
    title: "Your first label",
    body:
      "School quietly hands you a role: “smart,” “loud,” “shy,” “helper.”\n" +
      "Sometimes it fits. Sometimes it sticks anyway.",
    choices: [
      {
        text: "You get praised and start tying worth to achievement",
        delta: { hope: +2, trust: -1, connections: +1 },
        log: "The praise feels good. The pressure quietly joins it."
      },
      {
        text: "You get overlooked and learn to motivate yourself",
        delta: { hope: +1, trust: +1, connections: -1 },
        log: "You stop waiting to be chosen. You begin choosing yourself."
      }
    ]
  },

  {
    id: "expectations_get_louder",
    minAge: 12,
    maxAge: 16,
    once: true,
    title: "Expectations get louder",
    body:
      "At some point, adults stop asking what you like and start asking what you’ll become.\n" +
      "The future enters the room and sits down at the table.",
    choices: [
      {
        text: "You negotiate calmly — boundaries without burning bridges",
        delta: { trust: +3, hope: +2 },
        log: "You protect your goals while keeping relationships intact."
      },
      {
        text: "You comply to keep the peace",
        delta: { hope: -2, trust: +1, connections: +1 },
        log: "You gain approval, but part of you feels unspoken."
      }
    ]
  },

  {
    id: "mentor_notices",
    minAge: 13,
    maxAge: 18,
    once: true,
    title: "Someone takes you seriously",
    body:
      "A teacher, coach, or older student notices how hard you work and offers a real door:\n" +
      "a program, a recommendation, an introduction.",
    choices: [
      {
        text: "You say yes and show up consistently",
        delta: { connections: +6, hope: +3 },
        log: "Momentum compounds. People start expecting good things from you."
      },
      {
        text: "You hesitate and let it pass",
        delta: { hope: -1, trust: -1 },
        log: "Nothing collapses — but you wonder later what could’ve happened."
      }
    ]
  }
];
