const userData = [
  {
    username: 'Ant_Man',
    email: 'antman@email.com'
  },
  {
    username: 'Batman',
    email: 'batman@email.com'
  },
  // {
  //   username: 'Beyonce',
  //   email: 'beyonce@email.com'
  // },
  // {
  //   username: 'Black_Panther',
  //   email: 'blackpanther@email.com'
  // },
  {
    username: 'Black_Widow',
    email: 'blackwidow@email.com'
  },
  {
    username: 'Blue_Ivy',
    email: 'blueivy@email.com'
  },
  {
    username: 'Captain_Marvel',
    email: 'captainmarvell@email.com'
  },
  {
    username: 'Doctor-Strange',
    email: 'doctorstrange@email.com'
  },
  {
    username: 'Iron_Man',
    email: 'ironman@email.com'
  },
  {
    username: 'Loki',
    email: 'loki@email.com'
  },
  {
    username: 'Mary_Jane',
    email: 'maryjane@email.com'
  },
  {
    username: 'Okoye',
    email: 'okoye@email.com'
  },
  {
    username: 'Shang_Chi',
    email: 'shangchi@email.com'
  },
  {
    username: 'Scarlet_Witch',
    email: 'scarletwitch@email.com'
  }
];

const thoughts = [
  // 'I\'m one of one, I\'m number one, I\'m the only one',
  'Category, bad b*tch, I\'m the bar',
  'You must not know bout me',
  'I mopped the floor now watch me sweep up these Ms',
  'I will always be the best thing you never had',
  'Comfortable in my skin, cozy with who I am',
  // 'I\'m on that new vibration',
  'Promise this my mood 4 eva',
  // 'I dream it, I work hard, I grind til I own it',
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
  // 'You\'re that girl',
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
const getRandomArrItems = (arr, num) => arr[Math.floor(Math.random() * arr.length)];
// const getRandomArrItems = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
// NOTES: Get random name
const getRandomUser = () => {
  return getRandomArrItems(userData, 1).username;
};


  const getRandomFriends = (currentUserId, int) => {
  let results = [];
  let potentialFriends = userData.filter(user => user.username !== currentUserId);

  for (let i = 0; i < int; i++) {
    const randomFriend = getRandomArrItems(potentialFriends, 1);
    // const randomFriend = getRandomArrItems(potentialFriends);
          results.push(randomFriend.username);
      potentialFriends = potentialFriends.filter(user => user.username !== randomFriend.username);
    }
    return results;
};

// NOTES: Get random date
const getRandomDate = (days) => {
  const today = new Date();
  const randomNumberOfDays = Math.floor(Math.random() * days);
  const randomDate = new Date(today);
  
  randomDate.setDate(today.getDate() - randomNumberOfDays);
  
  return randomDate;
};

  // NOTES: Generates random thoughts, includes reactions
  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        createdAt: getRandomDate(30),
        thoughtText: getRandomArrItems(thoughts, 2),
        username: getRandomUser(),
        reactions: [...getReactions(3)]
      });
    }
    return results;
  };



// NOTES: Create the reactions that will be attached to thoughts
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItems(possibleReactions, 3);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItems(possibleReactions, 3),
      username: getRandomUser(),
      createdAt: getRandomDate(30)
    });
  }
  return results;
};

// NOTES: Exports functions for seed.js
module.exports = { getRandomThoughts, userData, getRandomArrItems, getRandomUser, getRandomFriends };