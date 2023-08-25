const usernames = [
  'Ant-Man',
  'Batman',
  'Beyonce',
  'Black Panther',
  'Black Widow',
  'Blue Ivy',
  'Captain Marvel',
  'Doctor Strange',
  'Iron Man',
  'Loki',
  'Mary Jane',
  'Okoye',
  'Ramonda',
  'Shang-Chi',
  'Wanda'
];

const thoughts = [
  'I\'m one of one, I\'m number one, I\'m the only one',
  'Category, bad b*tch, I\'m the bar',
  'You must not know bout me',
  'I mopped the floor now watch me sweep up these Ms',
  'I will always be the best thing you never had',
  'Comfortable in my skin, cozy with who I am',
  'I\'m on that new vibration',
  'Promise this my mood 4 eva',
  'I dream it, I work hard, I grind til I own it',
  'Always stay gracious, best revenge is your paper',
  'I sneezed on the beat and the beat got sicker',
  'This goes out to all the women, gettin it in, you on your grind',
  'Me, myself and I, that\'s all I got in the end, that\'s what I found out',
  'Male or female, it make no difference, I stop the world. World, stop.'
]

const possibleReactions = [
  'YES',
  'Slaayyyyy',
  'Flawless',
  'Hold up',
  'Heated',
  'Cozy',
  'Cuff it',
  'ENERGY',
  'You\'re that girl',
  'XO',
  'Jealous',
  'Shining',
  'Irreplaceable',
  'Release your mind',
  'Run the world',
  'Feelin yaself',
  'Alien superstar',
  'Upgrade U',
  'Dangerously in love',
  'Sorry',
  'Party',
  'America has a problem',
  'Thique',
  'Crazy in love'
];

const users = [];

// NOTES: Get random array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// NOTES: Get random name
const getRandomUser = () =>
  `${getRandomArrItem(usernames)}`;

  // NOTES: Generates random thoughts, includes reactions
  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        createdAt: Math.random() < 0.5,
        thoughtText: getRandomArrItem(thoughts),
        username: getRandomUser(),
        // username: getRandomArrItem(usernames),
        reactions: [...getReactions(3)]
      });
    }
    return results;
  };

// NOTES: Create the reactions that will be attached to thoughts
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      usernname: getRandomUser(),
      // username: getRandomArrItem(usernames),
      createdAt: Math.random() < 0.5
    });
  }
  return results;
};

// NOTES: Exports functions for seed.js
module.exports = { getRandomUser, getRandomThoughts }