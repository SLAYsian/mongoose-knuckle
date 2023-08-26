const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThoughts, userData } = require('./data');

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

  const thoughts = getRandomThoughts(14);

  await User.collection.insertMany(userData);
  await Thought.collection.insertMany(thoughts);

  console.table(userData);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);

});