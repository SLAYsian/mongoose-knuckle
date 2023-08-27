const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThoughts, userData, getRandomArrItems, getRandomFriends } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected!');
  // NOTES: Delete collection if exists
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts'}).toArray();
  if  (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  // NOTES: Insert Users and Thoughts
  const thoughts = getRandomThoughts(14);
  await Thought.collection.insertMany(thoughts);

  const users = [];
  for (let i = 0; i < 13; i++) {
    const user = getRandomArrItems(userData, 1);
    const email = user.email;
    const randomThoughts = getRandomThoughts(2)
    const randomFriends = getRandomFriends(user.username, 2);
    users.push({
      username: user.username,
      email: email,
      thoughts: randomThoughts,
      friends: randomFriends,
    })
  }
  await User.collection.insertMany(users);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});