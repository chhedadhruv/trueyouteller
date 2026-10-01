// Quiz data. Schema: see src/utils/quizEngine.js.
const quiz = {
  slug: 'inside-out',
  title: 'Which Inside Out Character Are You?',
  shortTitle: 'Inside Out',
  emoji: '🧠',
  description: "Ever wondered which of the emotions from Inside Out you're most like? Take this quiz to find out!",
  seoDescription:
    'Which Inside Out emotion are you: Joy, Sadness, Anger, Fear, Disgust, Anxiety, Envy, Ennui or Embarrassment? Take this free Inside Out personality quiz.',
  questions: [
    {
      text: "It's your first day at a new school/job. How do you feel?",
      options: [
        {
          label: 'Excited for new possibilities!',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'A bit overwhelmed and worried.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Annoyed by all the changes.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Just feeling a little blue.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Slightly judgmental of everything.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'Mentally rehearsing every possible conversation.',
          scores: {
            anxiety: 1,
          },
        },
      ],
    },
    {
      text: 'A friend shares some bad news. Your first instinct is to:',
      options: [
        {
          label: 'Look for the silver lining and cheer them up.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Offer comfort and a listening ear.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Demand to know who caused this problem.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Worry about all the potential negative outcomes.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Express disapproval of the situation.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'Go quiet. You never know the right thing to say.',
          scores: {
            embarrassment: 1,
          },
        },
      ],
    },
    {
      text: 'What kind of movie do you prefer for a night in?',
      options: [
        {
          label: 'Uplifting comedy or adventure.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'A thought-provoking drama.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'An intense action thriller.',
          scores: {
            anger: 1,
          },
        },
        {
          label: "Anything that's not too scary or unsettling.",
          scores: {
            fear: 1,
          },
        },
        {
          label: 'A critically acclaimed film, nothing cheesy.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'Whatever is on. I will probably scroll my phone anyway.',
          scores: {
            ennui: 1,
          },
        },
      ],
    },
    {
      text: 'Your plans suddenly change. How do you react?',
      options: [
        {
          label: 'Embrace the spontaneity and find new fun.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Feel a pang of disappointment.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Get frustrated and a little hot-headed.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Anxiety about the unknown sets in.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Roll your eyes at the inconvenience.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: "Wonder why everyone else's plans always work out.",
          scores: {
            envy: 1,
          },
        },
      ],
    },
    {
      text: "What's your biggest pet peeve?",
      options: [
        {
          label: 'Negativity that brings others down.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Feeling misunderstood or unheard.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Injustice or unfairness.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Unnecessary risks or unsafe situations.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Bad taste or poor manners.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'Being put on the spot in front of people.',
          scores: {
            embarrassment: 1,
          },
        },
      ],
    },
    {
      text: 'How do you approach a new challenge?',
      options: [
        {
          label: 'With optimistic determination.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Carefully, considering all possible setbacks.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Aggressively, ready to tackle it head-on.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'With a thorough risk assessment.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Only if it meets high standards.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'Plan for every single thing that could possibly go wrong.',
          scores: {
            anxiety: 1,
          },
        },
      ],
    },
    {
      text: 'Someone says something rude to you. Your response?',
      options: [
        {
          label: 'Try to brush it off and stay positive.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Feel hurt and maybe withdraw a bit.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Immediately snap back with a sharp retort.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Become anxious about further conflict.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Give them a look of utter disdain.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'Barely react. It is not worth the energy.',
          scores: {
            ennui: 1,
          },
        },
      ],
    },
    {
      text: "What's your go-to outfit?",
      options: [
        {
          label: 'Something bright and cheerful.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Comfortable and cozy.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Sharp and commanding.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Practical and safe.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Stylish and impeccable.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'Whatever that influencer I follow is wearing.',
          scores: {
            envy: 1,
          },
        },
      ],
    },
    {
      text: 'You see a mistake happening. What do you do?',
      options: [
        {
          label: 'Find a creative way to make it right.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Point it out gently, concerned for others.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Confront it directly and fix it immediately.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Hesitate, worrying about making it worse.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Express disapproval of the error.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'Turn red and hope nobody realizes it was you.',
          scores: {
            embarrassment: 1,
          },
        },
      ],
    },
    {
      text: "What truly makes a memory 'core' for you?",
      options: [
        {
          label: 'Its pure happiness and warmth.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Its profound emotional depth.',
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Its impact on justice or fairness.',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Its lesson in avoiding future danger.',
          scores: {
            fear: 1,
          },
        },
        {
          label: 'Its sheer authenticity and truth.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'It was something everyone else wished they had.',
          scores: {
            envy: 1,
          },
        },
      ],
    },
    {
      text: "You have a big presentation tomorrow. What's on your mind?",
      options: [
        {
          label: 'What if I mess up? What if they hate it? I need to practice 100 more times.',
          scores: {
            anxiety: 1,
          },
        },
        {
          label: "I'm so nervous something will go wrong with the projector.",
          scores: {
            fear: 1,
          },
        },
        {
          label: "I can't wait to share my ideas!",
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Ugh, do I have to?',
          scores: {
            ennui: 1,
          },
        },
        {
          label: "Honestly? I'll just wing it and hope nobody notices.",
          scores: {
            embarrassment: 1,
          },
        },
      ],
    },
    {
      text: "You see someone wearing an outfit you've been wanting. You think:",
      options: [
        {
          label: 'I wish that was me. They look so good.',
          scores: {
            envy: 1,
          },
        },
        {
          label: 'I would have styled it way better.',
          scores: {
            disgust: 1,
          },
        },
        {
          label: 'They look amazing! Good for them!',
          scores: {
            joy: 1,
          },
        },
        {
          label: "I'll probably never be able to pull that off.",
          scores: {
            sadness: 1,
          },
        },
        {
          label: 'Cool outfit, I guess. Fashion is kind of a chore.',
          scores: {
            ennui: 1,
          },
        },
      ],
    },
    {
      text: 'You accidentally trip in a crowded hallway. What do you do?',
      options: [
        {
          label: 'My life is over. I need to become invisible.',
          scores: {
            embarrassment: 1,
          },
        },
        {
          label: 'Who put that floor there?!',
          scores: {
            anger: 1,
          },
        },
        {
          label: 'Laugh it off and maybe do a little bow.',
          scores: {
            joy: 1,
          },
        },
        {
          label: 'Oh no, is everyone staring at me?',
          scores: {
            fear: 1,
          },
        },
        {
          label: "Notice how gracefully everyone else walks. Why can't I?",
          scores: {
            envy: 1,
          },
        },
      ],
    },
    {
      text: 'The group is trying to decide what to do. Your input is:',
      options: [
        {
          label: '*shrug* Whatever.',
          scores: {
            ennui: 1,
          },
        },
        {
          label: "Let's make a pro/con list for every option.",
          scores: {
            anxiety: 1,
          },
        },
        {
          label: 'Just pick something already! This is taking forever.',
          scores: {
            anger: 1,
          },
        },
        {
          label: "Let's do something super fun!",
          scores: {
            joy: 1,
          },
        },
        {
          label: 'What if we pick wrong and the whole day is ruined?',
          scores: {
            anxiety: 1,
          },
        },
      ],
    },
  ],
  outcomes: {
    joy: {
      name: 'Joy',
      emoji: '😄',
      tagline: "Alright, let's make some core memories!",
      summary:
        "Joy is the optimistic and energetic leader of Riley's emotions, always striving to keep Riley happy and positive. She's boundless enthusiasm and finds the good in every situation.",
      sharePhrase: "I'm the Joy of my mind!",
      sections: [
        {
          title: 'Habits you share with Joy',
          list: [
            'Always looking for the bright side, even in tough situations.',
            'A boundless energy and enthusiasm that can sometimes overwhelm others.',
            'A tendency to try and fix negative emotions by focusing on the positive.',
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: 'If you were in Inside Out, your most iconic moment would be enthusiastically leading an initiative in Headquarters, determined to turn a frown upside down, no matter the odds.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Disgust',
              text: "While seemingly opposite, Joy often uses Disgust's critical eye to help Riley avoid things that aren't good, showing a complementary dynamic.",
            },
            {
              name: 'Sadness',
              text: "You'd eventually learn the profound importance of Sadness, realizing that true happiness can't exist without acknowledging all emotions.",
            },
          ],
        },
      ],
    },
    sadness: {
      name: 'Sadness',
      emoji: '😢',
      tagline: "It's okay to feel sad.",
      summary:
        "Sadness is Riley's often misunderstood emotion, prone to melancholy but possessing a deep capacity for empathy and connection. She helps Riley process loss and allows others to offer comfort and support.",
      sharePhrase: "I'm the Sadness of my mind!",
      sections: [
        {
          title: 'Habits you share with Sadness',
          list: [
            'A tendency to slow down and reflect on feelings.',
            'A deep capacity for empathy and comforting others.',
            'Sometimes feeling misunderstood or underestimated.',
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: 'If you were in Inside Out, your most iconic moment would be helping a friend feel genuinely seen and understood, even if it means sitting with them in their sadness.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Joy',
              text: "You'd form an unexpected but profound bond, as Joy learns to appreciate your essential role in processing emotions for overall well-being.",
            },
            {
              name: 'Bing Bong',
              text: "You'd connect deeply with anyone who needs comfort and reassurance, much like Sadness connects with Bing Bong.",
            },
          ],
        },
      ],
    },
    anger: {
      name: 'Anger',
      emoji: '😡',
      tagline: "That's it! I'm taking this to the next level!",
      summary:
        "Anger is the hot-headed and passionate emotion, quick to react to injustice or frustration. He acts as Riley's protector, ensuring fairness and standing up for what's right, sometimes with explosive results.",
      sharePhrase: "I'm the Anger of my mind!",
      sections: [
        {
          title: 'Habits you share with Anger',
          list: [
            'A tendency to react quickly and assertively to perceived wrongs.',
            'Being fueled by a desire for fairness and justice.',
            "Sometimes literally fuming when things don't go your way.",
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: "If you were in Inside Out, your most iconic moment would be dramatically erupting when something unfair happens, perhaps with flames shooting from your head, ready to fight for what's right.",
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Fear',
              text: 'While different, your assertiveness can sometimes provide a necessary push for Fear to overcome hesitation.',
            },
            {
              name: 'Disgust',
              text: "You both have strong opinions and aren't afraid to express them, though your methods differ.",
            },
          ],
        },
      ],
    },
    fear: {
      name: 'Fear',
      emoji: '😱',
      tagline: "We're going to DIE!",
      summary:
        "Fear is the highly anxious and cautious emotion, constantly assessing risks and trying to keep Riley safe from perceived dangers. He's a meticulous planner, though often to an excessive degree.",
      sharePhrase: "I'm the Fear of my mind!",
      sections: [
        {
          title: 'Habits you share with Fear',
          list: [
            'Meticulously planning for every possible negative outcome.',
            'A tendency to worry excessively, even about minor things.',
            'Constantly assessing risks and potential dangers in new situations.',
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: 'If you were in Inside Out, your most iconic moment would be presenting a highly detailed, multi-scenario risk assessment for a seemingly simple situation, complete with charts and backup plans.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Joy',
              text: "While your caution can frustrate Joy, your meticulousness can actually save the day, and Joy's optimism can help calm your nerves.",
            },
            {
              name: 'Sadness',
              text: 'You both can share a quieter, more reflective space, though for different reasons; Sadness might find your anxieties relatable.',
            },
          ],
        },
      ],
    },
    disgust: {
      name: 'Disgust',
      emoji: '🙄',
      tagline: 'Ugh, fine. Whatever.',
      summary:
        'Disgust is the sassy, opinionated, and highly judgmental emotion, protecting Riley from anything she deems gross, uncool, or morally questionable. She has impeccable taste and strong standards.',
      sharePhrase: "I'm the Disgust of my mind!",
      sections: [
        {
          title: 'Habits you share with Disgust',
          list: [
            'A strong aversion to anything gross, unappealing, or tacky.',
            'A quick, often sarcastic, judgment of situations or people.',
            'Maintaining high standards for yourself and your surroundings.',
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: 'If you were in Inside Out, your most iconic moment would be giving a dramatic eye-roll or a scathing verbal assessment of something that truly offends your sensibilities.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Anger',
              text: "You both share a fiery passion for your convictions and aren't afraid to voice your strong opinions.",
            },
            {
              name: 'Joy',
              text: 'Despite your differences, Joy often relies on your keen discernment to navigate social situations and keep things positive.',
            },
          ],
        },
      ],
    },
    anxiety: {
      name: 'Anxiety',
      emoji: '😬',
      tagline: "I'm gonna need to see your credentials.",
      summary:
        'Anxiety is a highly energetic and detail-oriented emotion, constantly planning for potential problems and striving for future safety. They are driven by a need to prepare for every possible scenario.',
      sharePhrase: "I'm the Anxiety of my mind!",
      sections: [
        {
          title: 'Habits you share with Anxiety',
          list: [
            'Compulsively creating lists and contingency plans.',
            'A fast-paced, often fidgety, energy driven by future concerns.',
            'Constantly replaying scenarios to identify potential issues.',
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: 'If you were in Inside Out, your most iconic moment would be presenting a meticulously detailed, color-coded plan for a simple outing, accounting for every conceivable variable.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Fear',
              text: 'You both understand the importance of caution and planning, often sharing similar worries and preparedness strategies.',
            },
            {
              name: 'Anger',
              text: "While Anger's directness might contrast with your caution, you both share a drive to tackle problems, albeit from different angles.",
            },
          ],
        },
      ],
    },
    ennui: {
      name: 'Ennui',
      emoji: '😑',
      tagline: 'Whatever.',
      summary:
        'Ennui is characterized by a profound sense of boredom, apathy, and disinterest. They view most situations with a detached, unimpressed attitude, often using a phone as a barrier to engagement.',
      sharePhrase: "I'm the Ennui of my mind!",
      sections: [
        {
          title: 'Habits you share with Ennui',
          list: [
            'A constant need to be entertained, yet rarely impressed.',
            'A detached, almost indifferent, response to most situations.',
            'Often found distracted by a phone or other personal device.',
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: 'If you were in Inside Out, your most iconic moment would be lounging on a sofa, scrolling dismissively through a phone, while the other emotions are in a frantic state.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Disgust',
              text: 'You both share a critical perspective on the world, though Disgust is more passionate and you are more detached.',
            },
            {
              name: 'Sadness',
              text: "Your quiet, often withdrawn demeanor might find a strange comfort in Sadness's melancholy, though you'd likely remain unimpressed.",
            },
          ],
        },
      ],
    },
    embarrassment: {
      name: 'Embarrassment',
      emoji: '😳',
      tagline: 'Uh... oops?',
      summary:
        'Embarrassment is a shy and self-conscious emotion who often retreats or hides when awkward social situations arise. They are highly attuned to social faux pas and personal blunders.',
      sharePhrase: "I'm the Embarrassment of my mind!",
      sections: [
        {
          title: 'Habits you share with Embarrassment',
          list: [
            'A tendency to blush or hide when feeling awkward.',
            'Overthinking social interactions after they happen.',
            'A strong desire to avoid being the center of embarrassing attention.',
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: 'If you were in Inside Out, your most iconic moment would be shrinking into your hoodie and trying to disappear after a minor social blunder, wishing the ground would swallow you whole.',
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Sadness',
              text: 'You both share a softer, more sensitive side and might find comfort in quiet, understanding companionship.',
            },
            {
              name: 'Fear',
              text: 'You both have a heightened awareness of potential pitfalls, though Fear focuses on danger and you focus on social awkwardness.',
            },
          ],
        },
      ],
    },
    envy: {
      name: 'Envy',
      emoji: '😍',
      tagline: 'I could do that, but better.',
      summary:
        "Envy is a sharp and observant emotion, constantly comparing oneself to others and striving for what they perceive as missing. They are often driven by a desire to have what others possess, whether it's talent, status, or possessions.",
      sharePhrase: "I'm the Envy of my mind!",
      sections: [
        {
          title: 'Habits you share with Envy',
          list: [
            "Constantly comparing yourself to others' achievements.",
            'A keen eye for what others possess or accomplish.',
            'A quiet determination to acquire or surpass what you admire.',
          ],
        },
        {
          title: 'Your iconic Inside Out moment',
          text: "If you were in Inside Out, your most iconic moment would be meticulously observing someone else's impressive feat, then immediately devising a plan to do it even better, possibly with a slightly green glow around you.",
        },
        {
          title: "Who you'd be friends with",
          cards: [
            {
              name: 'Disgust',
              text: 'You both share a critical and observant nature, often pointing out perceived flaws or areas for improvement, even if for different reasons.',
            },
            {
              name: 'Anger',
              text: "Your drive to obtain what others have can align with Anger's assertiveness, especially when dealing with perceived unfairness in who gets what.",
            },
          ],
        },
      ],
    },
  },
};

export default quiz;
