// Scenario mode: 24 relatable situations (6 per axis). Each option carries a value
// toward the axis's second letter (E, N, F, P): +2 strongly, +1 slightly, -1/-2 toward
// the first letter. Shaped like questions.js so utils/scoring.js scores it unchanged.
export const SCENARIO_VERSION = 1;

const s = (axis, emoji, text, options) => ({
  emoji,
  statement: text,
  mapping: [{ axis, direction: 1 }],
  options: options.map(([label, value]) => ({ text: label, value })),
});

export const scenarios = [
  s('IE', '🎉', 'A friend invites you to a party where you only know them.', [
    ['Yay, new people! I go and work the room.', 2],
    ["I go, stick with my friend, and maybe meet one or two people.", 1],
    ['I go for an hour, then slip out quietly.', -1],
    ['I make up an excuse and stay in with snacks.', -2],
  ]),
  s('SN', '🧩', 'You get a new gadget with a thick instruction manual.', [
    ['Read the manual step by step before touching anything.', -2],
    ['Skim the quick-start guide, then try it.', -1],
    ['Ignore the manual and figure it out by feel.', 1],
    ['Start imagining hacks and uses it was never designed for.', 2],
  ]),
  s('TF', '🍕', 'Your friend cooked dinner for you, and honestly it was not great.', [
    ['"This is so sweet of you, thank you!" (and you mean it)', 2],
    ['Say it was lovely, then gently suggest a little more salt next time.', 1],
    ['Say the effort was great and point out what to fix.', -1],
    ['Tell them honestly. They\'ll want to improve.', -2],
  ]),
  s('JP', '✈️', 'You are going on a week-long trip.', [
    ['Day-by-day itinerary, bookings done, spreadsheet ready.', -2],
    ['Flights and hotel booked, a rough list of things to see.', -1],
    ['Flights booked; the rest we\'ll figure out there.', 1],
    ['One-way ticket. Let the adventure decide.', 2],
  ]),
  s('IE', '📱', 'Your phone buzzes: a friend is calling, unplanned.', [
    ['Answer instantly. I love a surprise chat!', 2],
    ['Pick up. A quick catch-up sounds nice.', 1],
    ['Let it ring and text "what\'s up?" instead.', -1],
    ['Panic slightly, ignore it, and call back tomorrow (maybe).', -2],
  ]),
  s('SN', '🎬', 'A movie ends with an open, mysterious ending.', [
    ['Love it! I\'ll be reading fan theories until 3am.', 2],
    ['Interesting. I\'ll think about what it meant.', 1],
    ['Kind of annoying. Just tell me what happened.', -1],
    ['Hate it. I want a clear ending, thank you.', -2],
  ]),
  s('TF', '🏆', 'Your team has to pick one person for an award.', [
    ['Whoever has the best results, full stop.', -2],
    ['Mostly results, but effort counts too.', -1],
    ['Whoever grew the most or helped others shine.', 1],
    ['Whoever needs the encouragement most right now.', 2],
  ]),
  s('JP', '📚', 'A big assignment is due in two weeks.', [
    ['Start today and finish a few days early.', -2],
    ['Make a plan and chip away at it.', -1],
    ['Think about it a lot, then do most of it the last few days.', 1],
    ['The night before. Pressure is my muse.', 2],
  ]),
  s('IE', '🍽️', 'Lunch break at a new job or school.', [
    ['Sit with a big group and introduce myself.', 2],
    ['Join one friendly-looking person.', 1],
    ['Eat with headphones in, maybe chat later.', -1],
    ['Find the quietest corner possible.', -2],
  ]),
  s('SN', '🗺️', 'You are exploring a new city without a guide.', [
    ['Follow a map to the famous sights.', -2],
    ['Check reviews and pick a few practical spots.', -1],
    ['Wander and see what catches my eye.', 1],
    ['Invent a story about the city as I go.', 2],
  ]),
  s('TF', '😢', 'A friend is crying about a breakup.', [
    ['Hug them and let them cry as long as they need.', 2],
    ['Listen, then remind them how amazing they are.', 1],
    ['Listen, then help them think about next steps.', -1],
    ['Explain why it was probably for the best.', -2],
  ]),
  s('JP', '🛒', 'Grocery shopping.', [
    ['Detailed list, sorted by aisle.', -2],
    ['A list, but I add a few extras.', -1],
    ['A vague idea of what I need.', 1],
    ['Whatever looks good. Dinner is a surprise.', 2],
  ]),
  s('IE', '🎤', 'Someone asks for a volunteer to go on stage.', [
    ['My hand is up before they finish the sentence.', 2],
    ['If nobody else goes, sure.', 1],
    ['I sink into my seat and avoid eye contact.', -1],
    ['I would rather fight a bear.', -2],
  ]),
  s('SN', '💡', 'At work or school, you are given a brand-new problem.', [
    ['Look at how it was solved before.', -2],
    ['Gather the facts, then pick the sensible fix.', -1],
    ['Brainstorm a few creative approaches.', 1],
    ['Question whether the problem is even the right one.', 2],
  ]),
  s('TF', '🤝', 'Two friends ask you to settle an argument.', [
    ['Look at the facts and say who is right.', -2],
    ['Be fair, even if one of them is upset.', -1],
    ['Find a middle ground so nobody feels bad.', 1],
    ['Focus on making sure they stay friends.', 2],
  ]),
  s('JP', '🗓️', 'Your weekend plans get cancelled.', [
    ['Annoying. Quickly make a new plan.', -2],
    ['Slightly disappointed, but I find something else.', -1],
    ['Nice, now the weekend is open!', 1],
    ['I secretly hoped it would happen.', 2],
  ]),
  s('IE', '🔋', 'After a long, busy week, you recharge by…', [
    ['Going out with as many friends as possible.', 2],
    ['Dinner with a couple of close friends.', 1],
    ['A quiet evening with one person.', -1],
    ['Being completely alone. Do not disturb.', -2],
  ]),
  s('SN', '📖', 'Pick a book to read on holiday.', [
    ['A true story or a useful how-to.', -2],
    ['A realistic novel about everyday life.', -1],
    ['Fantasy or science fiction.', 1],
    ['Something strange and philosophical.', 2],
  ]),
  s('TF', '📝', 'You are giving feedback on a friend\'s work.', [
    ['Clear and direct: here is what is wrong.', -2],
    ['Honest, with a few suggestions.', -1],
    ['Start with what I love, then gently suggest changes.', 1],
    ['Mostly encouragement. They worked so hard!', 2],
  ]),
  s('JP', '🧳', 'Packing for a trip.', [
    ['Checklist, packed two days early.', -2],
    ['Packed the night before, list in hand.', -1],
    ['Thrown together an hour before leaving.', 1],
    ['Forgot half of it. I\'ll buy it there.', 2],
  ]),
  s('IE', '💬', 'In a group chat, you are usually…', [
    ['Sending memes and starting conversations.', 2],
    ['Replying and joining in often.', 1],
    ['Reading everything but replying rarely.', -1],
    ['The chat is muted. I\'ll catch up someday.', -2],
  ]),
  s('SN', '☁️', 'You are lying on the grass, looking at clouds.', [
    ['Checking if it will rain later.', -2],
    ['Noticing their shapes and colors.', -1],
    ['Seeing dragons and castles.', 1],
    ['Thinking about how tiny we are in the universe.', 2],
  ]),
  s('TF', '🐶', 'You are choosing between two job offers.', [
    ['Higher salary and better career growth.', -2],
    ['Mostly the better deal, but the vibe matters.', -1],
    ['The team that felt the friendliest.', 1],
    ['The one that lets me help people the most.', 2],
  ]),
  s('JP', '🎨', 'Your room or desk right now is…', [
    ['Spotless. Everything has a place.', -2],
    ['Mostly tidy.', -1],
    ['Organized chaos. I know where things are.', 1],
    ['A creative explosion.', 2],
  ]),
];
