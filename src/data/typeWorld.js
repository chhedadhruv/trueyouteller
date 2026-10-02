// "Your type's world": playful extras for each type, shown on result and type pages.
// Character twins are fun fan-style approximations, not official typings.

export const TYPE_WORLD = {
  ISTJ: {
    watch: ['The Crown', 'Apollo 13', 'Suits'],
    twin: 'Baldev Singh (Dilwale Dulhania Le Jayenge)',
    dreamDay: 'A calm morning, a clear to-do list, everything ticked off by 5pm, and nobody "just quickly" changing the plan.',
    weekend: 'Sorting the house, a long walk on a familiar route, and a classic film you know by heart.',
  },
  ISFJ: {
    watch: ['Little Women', 'Gilmore Girls', 'Paddington 2'],
    twin: 'Naina Talwar (Yeh Jawaani Hai Deewani)',
    dreamDay: 'Helping someone who really needed it, in a warm team where everyone says thank you.',
    weekend: 'Baking for family, a cozy rewatch of a comfort show, and a phone call with your oldest friend.',
  },
  INFJ: {
    watch: ['Dead Poets Society', 'Arrival', 'Taare Zameen Par'],
    twin: 'Ram Shankar Nikumbh (Taare Zameen Par)',
    dreamDay: 'One deep, meaningful conversation that changes someone\'s life, then quiet time to journal about it.',
    weekend: 'A long solo walk, a thoughtful book, and a heart-to-heart over chai.',
  },
  INTJ: {
    watch: ['Inception', 'Sherlock', 'Chak De! India'],
    twin: 'Kabir Khan (Chak De! India)',
    dreamDay: 'Hours of uninterrupted deep work on a hard problem, and a plan that comes together perfectly.',
    weekend: 'Learning a new skill, strategy games, and absolutely no surprise visitors.',
  },
  ISTP: {
    watch: ['Mad Max: Fury Road', 'The Martian', 'Sholay'],
    twin: 'Jai (Sholay)',
    dreamDay: 'Fixing something broken with your own hands, then riding off somewhere quiet.',
    weekend: 'A solo road trip, tinkering in the garage, and an action movie.',
  },
  ISFP: {
    watch: ['Amélie', 'Spirited Away', 'Taare Zameen Par'],
    twin: 'Ishaan Awasthi (Taare Zameen Par)',
    dreamDay: 'Creating something beautiful at your own pace, with good music and nobody watching the clock.',
    weekend: 'A sketchbook in a park, a farmers\' market, and a sunset you photograph twenty times.',
  },
  INFP: {
    watch: ['Tamasha', 'Howl\'s Moving Castle', 'The Perks of Being a Wallflower'],
    twin: 'Ved (Tamasha)',
    dreamDay: 'Writing, designing or dreaming up a story that makes someone feel less alone.',
    weekend: 'Rainy-day reading, a playlist for every mood, and long talks about life with one close friend.',
  },
  INTP: {
    watch: ['3 Idiots', 'Interstellar', 'Black Mirror'],
    twin: 'Ranchoddas "Rancho" Chanchad (3 Idiots)',
    dreamDay: 'Falling down a fascinating rabbit hole of ideas, with no meetings at all.',
    weekend: 'Documentaries, a half-finished side project, and a debate about the nature of time.',
  },
  ESTP: {
    watch: ['Top Gun: Maverick', 'Fast & Furious', 'Sholay'],
    twin: 'Veeru (Sholay)',
    dreamDay: 'Fast decisions, real action and a big win by lunchtime.',
    weekend: 'Adventure sports, a spontaneous trip, and a night out that turns into a story.',
  },
  ESFP: {
    watch: ['Jab We Met', 'Mamma Mia!', 'La La Land'],
    twin: 'Geet (Jab We Met)',
    dreamDay: 'Being on stage, on camera or in the middle of a crowd, making everyone smile.',
    weekend: 'Brunch with friends, dancing, and saying yes to whatever comes up.',
  },
  ENFP: {
    watch: ['Yeh Jawaani Hai Deewani', 'Up', 'Into the Spider-Verse'],
    twin: 'Bunny (Yeh Jawaani Hai Deewani)',
    dreamDay: 'Brainstorming wild ideas with inspiring people, then starting three new projects.',
    weekend: 'A spontaneous trip with friends, deep 2am conversations, and a new hobby you\'ll love for a month.',
  },
  ENTP: {
    watch: ['Zindagi Na Milegi Dobara', 'Catch Me If You Can', 'The Social Network'],
    twin: 'Imran (Zindagi Na Milegi Dobara)',
    dreamDay: 'Pitching a bold idea, winning a debate, and breaking a rule that deserved breaking.',
    weekend: 'Hackathons, escape rooms and arguing about movies just for fun.',
  },
  ESTJ: {
    watch: ['The Devil Wears Prada', 'Moneyball', 'Shark Tank'],
    twin: 'Viru Sahastrabuddhe (3 Idiots)',
    dreamDay: 'Leading an efficient team, hitting every target, and ending the day with a perfect report.',
    weekend: 'Organizing a family event, a game of cricket, and planning next week in detail.',
  },
  ESFJ: {
    watch: ['Dilwale Dulhania Le Jayenge', 'Friends', 'The Holiday'],
    twin: 'Simran (Dilwale Dulhania Le Jayenge)',
    dreamDay: 'Bringing people together, remembering everyone\'s birthday, and hosting the perfect gathering.',
    weekend: 'A family get-together you organized, a wedding playlist, and calling everyone to check in.',
  },
  ENFJ: {
    watch: ['Lagaan', 'Ted Lasso', 'The Pursuit of Happyness'],
    twin: 'Bhuvan (Lagaan)',
    dreamDay: 'Inspiring a team to believe in something bigger, then watching them pull it off.',
    weekend: 'Volunteering, mentoring a friend, and a big dinner where everyone feels included.',
  },
  ENTJ: {
    watch: ['Succession', 'The Dark Knight', 'Kabhi Khushi Kabhie Gham'],
    twin: 'Yashvardhan Raichand (Kabhi Khushi Kabhie Gham)',
    dreamDay: 'Setting a bold vision in the morning and closing a big deal by evening.',
    weekend: 'Strategy board games, planning your five-year goals, and a fancy dinner you booked weeks ago.',
  },
};

// Spotify search (playlists change often, so we link to search rather than one playlist).
export const spotifyLink = (code) => `https://open.spotify.com/search/${code}%20personality%20playlist`;
