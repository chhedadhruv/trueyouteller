// Quiz data. Schema: see src/utils/quizEngine.js.
const quiz = {
  slug: 'friends',
  title: 'Which FRIENDS Character Are You?',
  shortTitle: 'FRIENDS',
  emoji: '☕',
  description: "Ever wondered which of the iconic FRIENDS characters you're most like? Take this quiz to find out!",
  seoDescription:
    'Which FRIENDS character are you: Monica, Chandler, Phoebe, Ross, Rachel or Joey? Take this free 10-question FRIENDS personality quiz and find out.',
  questions: [
    {
      text: 'At Central Perk, the couch is taken. Your move?',
      options: [
        {
          label: 'Wait patiently',
          scores: {
            'ross-geller': 1,
            'monica-geller': 1,
          },
        },
        {
          label: 'Try to persuade',
          scores: {
            'joey-tribbiani': 1,
            'rachel-green': 1,
          },
        },
        {
          label: 'Find another seat',
          scores: {
            'chandler-bing': 1,
          },
        },
        {
          label: 'Leave immediately',
          scores: {
            'phoebe-buffay': 1,
          },
        },
      ],
    },
    {
      text: 'Thanksgiving food messed up. Your reaction?',
      options: [
        {
          label: 'Fix it meticulously',
          scores: {
            'monica-geller': 1,
          },
        },
        {
          label: 'Crack jokes',
          scores: {
            'chandler-bing': 1,
          },
        },
        {
          label: 'Offer to help (badly)',
          scores: {
            'joey-tribbiani': 1,
            'rachel-green': 1,
          },
        },
        {
          label: 'Eat quietly',
          scores: {
            'ross-geller': 1,
          },
        },
      ],
    },
    {
      text: 'Moving heavy furniture. Your strategy?',
      options: [
        {
          label: "Yell 'PIVOT!'",
          scores: {
            'ross-geller': 1,
          },
        },
        {
          label: 'Lift alone',
          scores: {
            'joey-tribbiani': 1,
          },
        },
        {
          label: 'Unconventional method',
          scores: {
            'phoebe-buffay': 1,
          },
        },
        {
          label: 'Give instructions',
          scores: {
            'monica-geller': 1,
          },
        },
      ],
    },
    {
      text: 'Ideal Friday night plan?',
      options: [
        {
          label: 'Quiet night in',
          scores: {
            'ross-geller': 1,
            'monica-geller': 1,
          },
        },
        {
          label: 'Go out, meet people',
          scores: {
            'rachel-green': 1,
            'joey-tribbiani': 1,
          },
        },
        {
          label: 'Cook big meal',
          scores: {
            'monica-geller': 1,
          },
        },
        {
          label: 'Watch sports loudly',
          scores: {
            'joey-tribbiani': 1,
            'chandler-bing': 1,
          },
        },
      ],
    },
    {
      text: 'Dealing with difficult roommate?',
      options: [
        {
          label: 'Reason logically',
          scores: {
            'ross-geller': 1,
            'monica-geller': 1,
          },
        },
        {
          label: 'Passive-aggressive notes',
          scores: {
            'chandler-bing': 1,
          },
        },
        {
          label: 'Elaborate trick',
          scores: {
            'phoebe-buffay': 1,
            'chandler-bing': 1,
          },
        },
        {
          label: 'Direct confrontation',
          scores: {
            'monica-geller': 1,
          },
        },
      ],
    },
    {
      text: 'Your relationship with food?',
      options: [
        {
          label: 'Precise art',
          scores: {
            'monica-geller': 1,
          },
        },
        {
          label: "Love it, don't share",
          scores: {
            'joey-tribbiani': 1,
          },
        },
        {
          label: 'Show love through it',
          scores: {
            'monica-geller': 1,
            'joey-tribbiani': 1,
          },
        },
        {
          label: 'Health/balance focused',
          scores: {
            'ross-geller': 1,
          },
        },
      ],
    },
    {
      text: 'Your personal style?',
      options: [
        {
          label: 'Trend-conscious',
          scores: {
            'rachel-green': 1,
          },
        },
        {
          label: 'Comfy, practical',
          scores: {
            'joey-tribbiani': 1,
          },
        },
        {
          label: 'Eclectic, unique',
          scores: {
            'phoebe-buffay': 1,
          },
        },
        {
          label: 'Grab-and-go',
          scores: {
            'joey-tribbiani': 1,
          },
        },
      ],
    },
    {
      text: 'Hearing gossip, you typically?',
      options: [
        {
          label: 'Want juicy details',
          scores: {
            'rachel-green': 1,
          },
        },
        {
          label: 'Try to mediate',
          scores: {
            'monica-geller': 1,
          },
        },
        {
          label: 'Find it annoying',
          scores: {
            'ross-geller': 1,
            'chandler-bing': 1,
          },
        },
        {
          label: 'Analyze socially',
          scores: {
            'ross-geller': 1,
          },
        },
      ],
    },
    {
      text: 'Planning a trip. First step?',
      options: [
        {
          label: 'Detailed itinerary',
          scores: {
            'monica-geller': 1,
          },
        },
        {
          label: 'Who to go with',
          scores: {
            'rachel-green': 1,
            'joey-tribbiani': 1,
          },
        },
        {
          label: 'Quirky destination',
          scores: {
            'phoebe-buffay': 1,
          },
        },
        {
          label: 'Logical travel',
          scores: {
            'ross-geller': 1,
          },
        },
      ],
    },
    {
      text: 'Your catchphrase is most likely?',
      options: [
        {
          label: 'Could I BE any more...',
          scores: {
            'chandler-bing': 1,
          },
        },
        {
          label: "How YOU doin'?",
          scores: {
            'joey-tribbiani': 1,
          },
        },
        {
          label: 'Smelly Cat...',
          scores: {
            'phoebe-buffay': 1,
          },
        },
        {
          label: 'I KNOW!',
          scores: {
            'monica-geller': 1,
          },
        },
      ],
    },
  ],
  outcomes: {
    'ross-geller': {
      name: 'Ross Geller',
      emoji: '🦖',
      tagline: 'PIVOT! PIVOT! PIVOT!',
      summary:
        "Ross is the intellectual, sometimes socially awkward, and deeply emotional paleontologist. He's a romantic at heart, prone to dramatic declarations and often struggles with spontaneity and change.",
      sharePhrase: "I'm the Ross of my friend group!",
      sections: [
        {
          title: 'Habits you share with Ross',
          list: [
            'Over-analyzing situations, often to the point of absurdity.',
            'A deep passion for your interests (dinosaurs, anyone?).',
            "Prone to hilarious meltdowns when things don't go according to plan.",
          ],
        },
        {
          title: 'Your iconic FRIENDS moment',
          text: "If you were in FRIENDS, your most iconic moment would be trying to move a couch up a narrow staircase, repeatedly yelling 'PIVOT!' with increasing desperation.",
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Chandler Bing',
              text: "You share a long history, a love for intellectual banter, and a mutual understanding of life's awkward moments.",
            },
            {
              name: 'Monica Geller',
              text: "Your sibling bond means you understand each other's quirks, even when you drive each other crazy, and you both appreciate order.",
            },
          ],
        },
      ],
    },
    'joey-tribbiani': {
      name: 'Joey Tribbiani',
      emoji: '🍕',
      tagline: "How *you* doin'?",
      summary:
        "Joey is the lovable, simple, and perpetually hungry actor of the group. He's incredibly loyal, charming, and always prioritizes food and friendship above all else, often blissfully unaware of complex situations.",
      sharePhrase: "I'm the Joey of my friend group!",
      sections: [
        {
          title: 'Habits you share with Joey',
          list: [
            'A profound love for food, especially sandwiches, and a strong aversion to sharing.',
            'An effortless ability to charm almost anyone with a simple catchphrase.',
            'Prioritizing loyalty to friends above almost everything else.',
          ],
        },
        {
          title: 'Your iconic FRIENDS moment',
          text: "If you were in FRIENDS, your most iconic moment would be trying to eat an entire Thanksgiving turkey by yourself or charming a date with your signature 'How *you* doin'?'",
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Chandler Bing',
              text: "You'd have the ultimate bromance with Chandler, as you perfectly complement his anxieties with your simple joys and unwavering loyalty.",
            },
            {
              name: 'Phoebe Buffay',
              text: "You'd both appreciate each other's unique perspectives and spontaneous nature, sharing laughs and supporting each other's unconventional dreams.",
            },
          ],
        },
      ],
    },
    'phoebe-buffay': {
      name: 'Phoebe Buffay',
      emoji: '🎸',
      tagline: 'Smelly Cat, Smelly Cat, what are they feeding you?',
      summary:
        'Phoebe is the quirky, free-spirited, and intensely loyal member of the group. She lives by her own rules, embraces her eccentricities, and offers unconventional wisdom and unwavering support.',
      sharePhrase: "I'm the Phoebe of my friend group!",
      sections: [
        {
          title: 'Habits you share with Phoebe',
          list: [
            'Breaking into spontaneous song, usually about a cat or a personal anecdote.',
            'Offering wildly unconventional, yet sometimes profound, advice.',
            'Having a unique and memorable personal style that defies trends.',
          ],
        },
        {
          title: 'Your iconic FRIENDS moment',
          text: "If you were in FRIENDS, your most iconic moment would be singing 'Smelly Cat' at Central Perk, captivating everyone with your unique blend of charm and awkwardness.",
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Joey Tribbiani',
              text: "You'd both embrace each other's quirks without judgment, enjoying spontaneous adventures and simple joys.",
            },
            {
              name: 'Rachel Green',
              text: "You'd share a love for breaking free from expectations and exploring life's possibilities, with a touch of playful chaos.",
            },
          ],
        },
      ],
    },
    'monica-geller': {
      name: 'Monica Geller',
      emoji: '🧽',
      tagline: "Welcome to the real world! It sucks. You're gonna love it!",
      summary:
        'Monica is the organized, competitive, and fiercely loyal chef of the group. She loves to host, clean, and control situations, driven by a deep need for order and perfection.',
      sharePhrase: "I'm the Monica of my friend group!",
      sections: [
        {
          title: 'Habits you share with Monica',
          list: [
            'A compulsive need for cleanliness and order.',
            'Highly competitive, turning almost anything into a game.',
            'A talent for cooking and hosting, always ensuring everyone is fed and happy.',
          ],
        },
        {
          title: 'Your iconic FRIENDS moment',
          text: "If you were in FRIENDS, your most iconic moment would be hosting Thanksgiving, meticulously labeling everything, and secretly judging everyone's table manners, all while making the most delicious food.",
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Chandler Bing',
              text: "You'd appreciate his quick wit and sarcasm, and your need for order would perfectly balance his laid-back chaos.",
            },
            {
              name: 'Ross Geller',
              text: 'As siblings, you share a history and a similar intellectual, sometimes uptight, approach to life, leading to both affection and hilarious sibling rivalry.',
            },
          ],
        },
      ],
    },
    'chandler-bing': {
      name: 'Chandler Bing',
      emoji: '😏',
      tagline: "I'm hopeless and awkward and desperate for love!",
      summary:
        'Chandler is the sarcastic, witty, and often awkward member of the group, known for using humor as a defense mechanism. He struggles with commitment but is fiercely loyal to his friends.',
      sharePhrase: "I'm the Chandler of my friend group!",
      sections: [
        {
          title: 'Habits you share with Chandler',
          list: [
            'Using sarcasm to deflect discomfort or express affection.',
            'A tendency towards awkwardness in emotional or serious situations.',
            'An uncanny ability to make self-deprecating jokes.',
          ],
        },
        {
          title: 'Your iconic FRIENDS moment',
          text: 'If you were in FRIENDS, your most iconic moment would be getting stuck in an awkward social situation and nervously trying to crack jokes to make everyone, including yourself, more comfortable.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Joey Tribbiani',
              text: "You'd have an unbreakable bond with Joey, sharing laughs, providing comfort, and constantly having each other's backs through thick and thin.",
            },
            {
              name: 'Monica Geller',
              text: "You'd find a surprising and perfect balance with Monica, where her order helps ground you, and your humor keeps things light.",
            },
          ],
        },
      ],
    },
    'rachel-green': {
      name: 'Rachel Green',
      emoji: '👗',
      tagline: 'TA-DA!',
      summary:
        'Rachel is the spirited, trend-setting, and ambitious fashionista. She starts off as a spoiled runaway but quickly develops into a fiercely independent and career-driven woman, while remaining deeply loyal to her friends.',
      sharePhrase: "I'm the Rachel of my friend group!",
      sections: [
        {
          title: 'Habits you share with Rachel',
          list: [
            'A keen eye for fashion and always looking stylish.',
            'A tendency to make dramatic entrances or exits.',
            'A fierce loyalty to your friends, even if you sometimes make questionable choices.',
          ],
        },
        {
          title: 'Your iconic FRIENDS moment',
          text: 'If you were in FRIENDS, your most iconic moment would be making a grand entrance in a wedding dress or enthusiastically (and sometimes poorly) attempting to cook Thanksgiving trifle.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Phoebe Buffay',
              text: "You'd appreciate Phoebe's unconventional wisdom and spontaneity, finding joy in her quirky outlook on life.",
            },
            {
              name: 'Joey Tribbiani',
              text: "You'd share a simple, fun-loving connection, often laughing at each other's antics and enjoying lighthearted moments.",
            },
          ],
        },
      ],
    },
  },
};

export default quiz;
