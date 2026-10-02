// Quiz data. Schema: see src/utils/quizEngine.js.
const opt = (label, id) => ({ label, scores: { [id]: 1 } });

const quiz = {
  slug: 'element',
  title: 'Which Element Are You: Fire, Water, Earth or Air?',
  shortTitle: 'Your Element',
  emoji: '🔥',
  description: 'Are you a spark, a wave, a mountain or a breeze? 8 quick questions reveal your elemental energy.',
  seoDescription:
    'Which element are you: fire, water, earth or air? Take this free elemental personality quiz to discover your energy, strengths and perfect element match.',
  questions: [
    {
      text: 'Pick a perfect getaway:',
      options: [
        opt('A buzzing city with nightlife', 'fire'),
        opt('A quiet beach at sunset', 'water'),
        opt('A cabin in the forest', 'earth'),
        opt('A mountain top with endless views', 'air'),
      ],
    },
    {
      text: 'When you are stressed, you…',
      options: [
        opt('Work out or blast music', 'fire'),
        opt('Talk it through with someone close', 'water'),
        opt('Make a list and tackle it step by step', 'earth'),
        opt('Daydream or start a new idea', 'air'),
      ],
    },
    {
      text: 'Your friends come to you for…',
      options: [
        opt('Motivation and hype', 'fire'),
        opt('Comfort and a listening ear', 'water'),
        opt('Practical advice that works', 'earth'),
        opt('Fresh ideas and fun plans', 'air'),
      ],
    },
    {
      text: 'Choose a color palette:',
      options: [
        opt('Red, orange and gold', 'fire'),
        opt('Blue, teal and silver', 'water'),
        opt('Green, brown and cream', 'earth'),
        opt('White, sky blue and lavender', 'air'),
      ],
    },
    {
      text: 'How do you make big decisions?',
      options: [
        opt('Go with my gut, right now', 'fire'),
        opt('Follow my feelings', 'water'),
        opt('Weigh the facts carefully', 'earth'),
        opt('Look at every possibility', 'air'),
      ],
    },
    {
      text: 'Pick a hobby:',
      options: [
        opt('Dance or sports', 'fire'),
        opt('Music, art or journaling', 'water'),
        opt('Cooking or gardening', 'earth'),
        opt('Reading, travel or learning languages', 'air'),
      ],
    },
    {
      text: 'Your biggest strength:',
      options: [
        opt('Passion', 'fire'),
        opt('Empathy', 'water'),
        opt('Reliability', 'earth'),
        opt('Curiosity', 'air'),
      ],
    },
    {
      text: 'Your room is…',
      options: [
        opt('Bold and full of energy', 'fire'),
        opt('Soft, cozy and personal', 'water'),
        opt('Neat, with plants everywhere', 'earth'),
        opt('Light, airy and a little chaotic', 'air'),
      ],
    },
  ],
  outcomes: {
    fire: {
      name: 'Fire',
      emoji: '🔥',
      tagline: 'Bold, passionate and impossible to ignore.',
      summary:
        "You light up every room. You're confident, driven and full of energy, and your enthusiasm inspires everyone around you to go for it.",
      sharePhrase: 'My element is Fire 🔥',
      sections: [
        { title: 'Your elemental strengths', list: ['Passion and drive', 'Courage', 'Natural charisma'] },
        { title: 'Keep in balance', text: "Burnout is real. Rest is fuel, not weakness." },
        { title: 'Best element matches', cards: [{ name: 'Air', text: 'Air feeds your flame with ideas.' }, { name: 'Fire', text: 'Double the spark, double the fun.' }] },
      ],
    },
    water: {
      name: 'Water',
      emoji: '🌊',
      tagline: 'Deep, intuitive and endlessly caring.',
      summary:
        "You feel deeply and understand people without them saying a word. You're adaptable, creative and the friend everyone trusts with their secrets.",
      sharePhrase: 'My element is Water 🌊',
      sections: [
        { title: 'Your elemental strengths', list: ['Empathy', 'Intuition', 'Creativity'] },
        { title: 'Keep in balance', text: "Protect your energy. You can't pour from an empty cup." },
        { title: 'Best element matches', cards: [{ name: 'Earth', text: 'Earth gives you a steady shore.' }, { name: 'Water', text: 'Two deep souls who just get it.' }] },
      ],
    },
    earth: {
      name: 'Earth',
      emoji: '🌿',
      tagline: 'Grounded, loyal and quietly strong.',
      summary:
        "You're steady, practical and dependable. When life gets chaotic, people lean on you, and you always find a sensible way through.",
      sharePhrase: 'My element is Earth 🌿',
      sections: [
        { title: 'Your elemental strengths', list: ['Reliability', 'Patience', 'Practical wisdom'] },
        { title: 'Keep in balance', text: "Try something new now and then. Growth needs a little change." },
        { title: 'Best element matches', cards: [{ name: 'Water', text: 'Water helps you bloom.' }, { name: 'Earth', text: 'A rock-solid partnership.' }] },
      ],
    },
    air: {
      name: 'Air',
      emoji: '🌬️',
      tagline: 'Curious, free-spirited and full of ideas.',
      summary:
        "Your mind never stops. You're clever, sociable and always exploring, and you bring fresh perspectives to everything you touch.",
      sharePhrase: 'My element is Air 🌬️',
      sections: [
        { title: 'Your elemental strengths', list: ['Curiosity', 'Communication', 'Open-mindedness'] },
        { title: 'Keep in balance', text: "Ground your ideas: finish one before chasing the next." },
        { title: 'Best element matches', cards: [{ name: 'Fire', text: 'You fan each other\'s flames.' }, { name: 'Air', text: 'Endless conversations.' }] },
      ],
    },
  },
};

export default quiz;
