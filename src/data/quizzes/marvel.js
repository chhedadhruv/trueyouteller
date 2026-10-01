// Quiz data. Schema: see src/utils/quizEngine.js.
const opt = (label, scores) => ({ label, scores });

const quiz = {
  slug: 'marvel-hero',
  title: 'Which Marvel Hero Are You?',
  shortTitle: 'Marvel Hero',
  emoji: '🦸',
  description: 'Genius, soldier, god, spy, web-slinger or big green rage machine? Assemble your answers and find out.',
  seoDescription:
    'Which Avenger are you: Iron Man, Captain America, Thor, Black Widow, Spider-Man or Hulk? Take this free Marvel superhero personality quiz.',
  questions: [
    {
      text: 'The city is under attack. What do you do first?',
      options: [
        opt('Build a gadget to fix it', { 'iron-man': 2 }),
        opt('Organize everyone into a plan', { 'captain-america': 2 }),
        opt('Charge straight into the action', { thor: 1, hulk: 1 }),
        opt('Get people to safety, then swing back in', { 'spider-man': 2 }),
      ],
    },
    {
      text: 'Your ideal Saturday:',
      options: [
        opt('Tinkering in my workshop', { 'iron-man': 1 }),
        opt('A long run, then helping a neighbor', { 'captain-america': 1 }),
        opt('A feast with friends and lots of stories', { thor: 1 }),
        opt('Somewhere quiet where nobody bothers me', { hulk: 1, 'black-widow': 1 }),
      ],
    },
    {
      text: 'Pick a superpower:',
      options: [
        opt('Super intelligence', { 'iron-man': 1, hulk: 1 }),
        opt('Super strength', { thor: 1, hulk: 1 }),
        opt('Super agility and stealth', { 'black-widow': 1, 'spider-man': 1 }),
        opt('Unbreakable will', { 'captain-america': 1 }),
      ],
    },
    {
      text: 'How do your friends describe you?',
      options: [
        opt('Brilliant but a little extra', { 'iron-man': 2 }),
        opt('Reliable and principled', { 'captain-america': 2 }),
        opt('Mysterious and capable', { 'black-widow': 2 }),
        opt('Funny, awkward and kind', { 'spider-man': 2 }),
      ],
    },
    {
      text: 'Someone breaks a promise to you. You…',
      options: [
        opt('Make a sarcastic comment and move on', { 'iron-man': 1 }),
        opt('Calmly tell them it matters to you', { 'captain-america': 1 }),
        opt("Remember it. You'll be more careful with them now", { 'black-widow': 1 }),
        opt('Try very hard not to lose your temper', { hulk: 2 }),
      ],
    },
    {
      text: "What's your weakness?",
      options: [
        opt('My ego', { 'iron-man': 1 }),
        opt('Being stubborn about what is right', { 'captain-america': 1 }),
        opt('Overconfidence. I trust my strength a bit too much', { thor: 2 }),
        opt('Trying to juggle everything at once', { 'spider-man': 1 }),
      ],
    },
    {
      text: 'Choose a sidekick item:',
      options: [
        opt('A sarcastic AI assistant', { 'iron-man': 1 }),
        opt('A trusty shield', { 'captain-america': 1 }),
        opt('A hammer only you can lift', { thor: 1 }),
        opt('A really stretchy pair of pants', { hulk: 1 }),
      ],
    },
    {
      text: 'In a team, you are…',
      options: [
        opt('The leader everyone follows', { 'captain-america': 1, thor: 1 }),
        opt('The one with the secret backup plan', { 'black-widow': 2 }),
        opt('The youngest, still proving yourself', { 'spider-man': 1 }),
        opt('The one who funds everything', { 'iron-man': 1 }),
      ],
    },
    {
      text: 'Your theme song is…',
      options: [
        opt('Loud rock', { 'iron-man': 1, thor: 1 }),
        opt('A classic oldie', { 'captain-america': 1 }),
        opt('A moody, mysterious soundtrack', { 'black-widow': 1 }),
        opt('Upbeat pop for my headphones', { 'spider-man': 1 }),
      ],
    },
    {
      text: 'Deep down, what drives you?',
      options: [
        opt('Making up for my mistakes', { 'iron-man': 1, 'black-widow': 1 }),
        opt('Doing what is right, even when it is hard', { 'captain-america': 1 }),
        opt('Being worthy of who I am meant to be', { thor: 1 }),
        opt('Learning to accept every part of myself', { hulk: 1 }),
      ],
    },
  ],
  outcomes: {
    'iron-man': {
      name: 'Iron Man',
      emoji: '🤖',
      tagline: 'Genius, inventor, chronic overachiever.',
      summary:
        "You solve problems with brains, style and a little bit of showmanship. Under the confidence is a big heart, and you'd do anything to protect the people you love.",
      sharePhrase: "I'm Iron Man! 🤖",
      sections: [
        { title: 'Your hero traits', list: ['Inventive and resourceful', 'Witty under pressure', 'Willing to sacrifice for others'] },
        { title: 'Your kryptonite', text: 'Ego and stubbornness. Let others help sometimes.' },
        { title: "Who you'd team up with", cards: [{ name: 'Spider-Man', text: 'You love mentoring talent.' }, { name: 'Hulk', text: 'Science buddies forever.' }] },
      ],
    },
    'captain-america': {
      name: 'Captain America',
      emoji: '🛡️',
      tagline: 'Steady, principled, always does the right thing.',
      summary:
        "You're the moral compass of your group. People trust you because you mean what you say, keep your promises and never leave anyone behind.",
      sharePhrase: "I'm Captain America! 🛡️",
      sections: [
        { title: 'Your hero traits', list: ['Integrity', 'Natural leadership', 'Loyalty to your team'] },
        { title: 'Your kryptonite', text: 'Seeing things as right or wrong can make compromise hard.' },
        { title: "Who you'd team up with", cards: [{ name: 'Black Widow', text: 'Trust earned in the field.' }, { name: 'Thor', text: 'Two worthy leaders.' }] },
      ],
    },
    thor: {
      name: 'Thor',
      emoji: '⚡',
      tagline: 'Big heart, big laugh, bigger hammer.',
      summary:
        "You're warm, bold and larger than life. You love your people fiercely, enjoy a good celebration and keep growing, even when life knocks you down.",
      sharePhrase: "I'm Thor! ⚡",
      sections: [
        { title: 'Your hero traits', list: ['Bravery', 'Generosity', 'Resilience and a great sense of humor'] },
        { title: 'Your kryptonite', text: 'Overconfidence. Sometimes you need a plan, not just a hammer.' },
        { title: "Who you'd team up with", cards: [{ name: 'Hulk', text: 'Friends from work.' }, { name: 'Captain America', text: 'You respect a worthy soul.' }] },
      ],
    },
    'black-widow': {
      name: 'Black Widow',
      emoji: '🕷️',
      tagline: 'Calm, clever and always three steps ahead.',
      summary:
        "You're observant, strategic and quietly loyal. You don't need to be loud to be the most capable person in the room.",
      sharePhrase: "I'm Black Widow! 🕷️",
      sections: [
        { title: 'Your hero traits', list: ['Strategic thinking', 'Composure under pressure', 'Fierce, quiet loyalty'] },
        { title: 'Your kryptonite', text: "Carrying everything alone. You don't have to." },
        { title: "Who you'd team up with", cards: [{ name: 'Captain America', text: 'Trust, earned the hard way.' }, { name: 'Hulk', text: 'You see the gentle side.' }] },
      ],
    },
    'spider-man': {
      name: 'Spider-Man',
      emoji: '🕸️',
      tagline: 'Friendly, funny and always trying to do good.',
      summary:
        "You're kind, quick-witted and a bit of a mess, in the best way. You juggle a lot, but you always show up for your neighborhood and your friends.",
      sharePhrase: "I'm Spider-Man! 🕸️",
      sections: [
        { title: 'Your hero traits', list: ['Kindness', 'Humor in hard times', 'A strong sense of responsibility'] },
        { title: 'Your kryptonite', text: "Overcommitting. You can't be everywhere at once." },
        { title: "Who you'd team up with", cards: [{ name: 'Iron Man', text: 'Mentor and biggest fan.' }, { name: 'Thor', text: 'He thinks you are adorable.' }] },
      ],
    },
    hulk: {
      name: 'Hulk',
      emoji: '💚',
      tagline: 'Gentle genius with a not-so-gentle side.',
      summary:
        'You feel things deeply and think deeply too. Most days you are calm and thoughtful, but when someone you love is threatened, look out.',
      sharePhrase: "I'm Hulk! 💚",
      sections: [
        { title: 'Your hero traits', list: ['Intelligence', 'Strength when it matters', 'Growing self-acceptance'] },
        { title: 'Your kryptonite', text: 'Bottling up feelings until they explode. Talk it out early.' },
        { title: "Who you'd team up with", cards: [{ name: 'Iron Man', text: 'Lab partner.' }, { name: 'Black Widow', text: 'She knows how to calm you down.' }] },
      ],
    },
  },
};

export default quiz;
