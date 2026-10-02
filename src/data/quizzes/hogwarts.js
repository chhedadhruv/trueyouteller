// Quiz data. Schema: see src/utils/quizEngine.js.
const opt = (label, id, points = 1) => ({ label, scores: { [id]: points } });

const quiz = {
  slug: 'hogwarts-house',
  title: 'Which Hogwarts House Do You Belong In?',
  shortTitle: 'Hogwarts House',
  emoji: '🏰',
  description: 'Brave, clever, loyal or ambitious? Answer 9 magical questions and the Sorting Hat will decide.',
  seoDescription:
    'Which Hogwarts house are you: Gryffindor, Ravenclaw, Hufflepuff or Slytherin? Take this free Sorting Hat personality quiz and find your house in 2 minutes.',
  questions: [
    {
      text: 'You find a mysterious locked door in the castle. You…',
      options: [
        opt('Open it immediately, whatever is behind it', 'gryffindor'),
        opt('Study the lock and work out the riddle', 'ravenclaw'),
        opt('Go get your friends so nobody explores alone', 'hufflepuff'),
        opt('Note it down: secret rooms are useful', 'slytherin'),
      ],
    },
    {
      text: 'Pick a class to ace:',
      options: [
        opt('Defence Against the Dark Arts', 'gryffindor'),
        opt('Charms, with all its clever theory', 'ravenclaw'),
        opt('Herbology: plants are underrated', 'hufflepuff'),
        opt('Potions: precision gets results', 'slytherin'),
      ],
    },
    {
      text: 'What would you most hate to be called?',
      options: [
        opt('A coward', 'gryffindor', 2),
        opt('Ignorant', 'ravenclaw', 2),
        opt('Selfish', 'hufflepuff', 2),
        opt('Ordinary', 'slytherin', 2),
      ],
    },
    {
      text: 'Your friend is being picked on in the corridor. You…',
      options: [
        opt('Step in right away, wand out', 'gryffindor'),
        opt('Out-talk the bully with a perfect comeback', 'ravenclaw'),
        opt('Stand next to your friend and stay by their side', 'hufflepuff'),
        opt('Quietly make sure the bully regrets it later', 'slytherin'),
      ],
    },
    {
      text: 'Choose a magical pet:',
      options: [
        opt('A loyal, fearless dog', 'gryffindor'),
        opt('A wise owl', 'ravenclaw'),
        opt('A cuddly toad that everyone loves', 'hufflepuff'),
        opt('A sleek black cat', 'slytherin'),
      ],
    },
    {
      text: 'Group project! You naturally become…',
      options: [
        opt('The one who presents to the whole class', 'gryffindor'),
        opt('The researcher with all the facts', 'ravenclaw'),
        opt('The glue who makes sure everyone is included', 'hufflepuff'),
        opt('The strategist who makes sure you win', 'slytherin'),
      ],
    },
    {
      text: 'Which treasure would you take from the Room of Requirement?',
      options: [
        opt('A legendary sword', 'gryffindor'),
        opt('A book with every answer', 'ravenclaw'),
        opt('An endless feast to share', 'hufflepuff'),
        opt('A ring that gives you influence', 'slytherin'),
      ],
    },
    {
      text: 'How do you want to be remembered?',
      options: [
        opt('As a hero', 'gryffindor', 2),
        opt('As a genius', 'ravenclaw', 2),
        opt('As a true friend', 'hufflepuff', 2),
        opt('As a legend', 'slytherin', 2),
      ],
    },
    {
      text: 'The Sorting Hat whispers in your ear. You ask for…',
      options: [
        opt('Wherever the adventure is', 'gryffindor'),
        opt('Wherever I can learn the most', 'ravenclaw'),
        opt("Wherever I'll belong", 'hufflepuff'),
        opt('Wherever I can become great', 'slytherin'),
      ],
    },
  ],
  outcomes: {
    gryffindor: {
      name: 'Gryffindor',
      emoji: '🦁',
      tagline: 'Brave at heart, daring and bold.',
      summary:
        'You run toward a challenge, not away from it. You stand up for what is right, protect your friends and would rather try and fail than never try at all.',
      sharePhrase: "The Sorting Hat put me in Gryffindor! 🦁",
      sections: [
        { title: 'Your house traits', list: ['Courage when it counts', 'A strong sense of justice', 'Chivalry and loyalty to friends'] },
        { title: 'Watch out for', text: 'Acting before thinking. Not every locked door needs to be opened tonight.' },
        { title: 'Common room vibe', text: 'Cozy red armchairs, a roaring fire and someone always planning a midnight adventure.' },
      ],
    },
    ravenclaw: {
      name: 'Ravenclaw',
      emoji: '🦅',
      tagline: 'Wit beyond measure is our greatest treasure.',
      summary:
        "You're curious about everything, love ideas, and see the world a little differently. Learning isn't homework for you, it's an adventure.",
      sharePhrase: "The Sorting Hat put me in Ravenclaw! 🦅",
      sections: [
        { title: 'Your house traits', list: ['Wit and wisdom', 'Creativity and originality', 'A love of learning'] },
        { title: 'Watch out for', text: 'Living in your head. Sometimes the answer is to try it, not to read another book.' },
        { title: 'Common room vibe', text: 'A starry ceiling, full bookshelves and a door that asks you a riddle to get in.' },
      ],
    },
    hufflepuff: {
      name: 'Hufflepuff',
      emoji: '🦡',
      tagline: 'Just and loyal, patient and true.',
      summary:
        "You're the friend everyone wants: warm, fair and hard-working. You don't need the spotlight, because you care about people more than prizes.",
      sharePhrase: "The Sorting Hat put me in Hufflepuff! 🦡",
      sections: [
        { title: 'Your house traits', list: ['Loyalty that never wavers', 'Patience and hard work', 'Kindness and fair play'] },
        { title: 'Watch out for', text: 'Putting everyone else first. Your needs matter too.' },
        { title: 'Common room vibe', text: 'Sunny, plant-filled and next to the kitchens, so snacks are always nearby.' },
      ],
    },
    slytherin: {
      name: 'Slytherin',
      emoji: '🐍',
      tagline: 'Ambitious, cunning and resourceful.',
      summary:
        "You know what you want and you have a plan to get it. You're resourceful, determined and fiercely protective of the people in your inner circle.",
      sharePhrase: "The Sorting Hat put me in Slytherin! 🐍",
      sections: [
        { title: 'Your house traits', list: ['Ambition and drive', 'Resourcefulness under pressure', 'Natural leadership'] },
        { title: 'Watch out for', text: "Winning at all costs. The best victories are ones you're proud of." },
        { title: 'Common room vibe', text: 'Under the lake, with green lamps, elegant leather sofas and the occasional giant squid.' },
      ],
    },
  },
};

export default quiz;
