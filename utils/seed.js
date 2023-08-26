const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThoughts, userData, getRandomUser, getRandomArrItems, getRandomFriends } = require('./data');

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
  // const insertedUsers = await User.collection.insertMany(userData);
  const thoughts = getRandomThoughts(14);
  await Thought.collection.insertMany(thoughts);

  const users = [];
  for (let i = 0; i < 13; i++) {
    const user = getRandomArrItems(userData, 1);
    const email = user.email;
    const randomThoughts = getRandomThoughts(2)
    // const randomFriends = getRandomFriends(2);
    const randomFriends = getRandomFriends(user.username, 2);
    console.log(randomFriends);
    users.push({
      username: user.username,
      email: email,
      thoughts: randomThoughts,
      friends: randomFriends,
    })
  }



  // const userIds = (insertedUsers.ops || []).map(user => user._id);
  // for (let i = 0; i < 13; i++) {
  //   for (let userId of userIds) {
  //       let randomFriends = getRandomFriends(userIds, 2);
  //       randomFriends = randomFriends.filter(id => id.toString() !== userId.toString());
  //       console.log(randomFriends);
  //       const updatedUser = await User.findByIdAndUpdate(userId, 
  //         { $addToSet: { friends: { $each: randomFriends } } },
  //         { new: true }
  //       );
  //       console.log(updatedUser);
  //       const user = getRandomArrItems(userData, 1);
  //       const email = user.email;
  //       const randomThoughts = getRandomThoughts(2)
  //       users.push({
  //         username: user.username,
  //         email: email,
  //         thoughts: randomThoughts,
  //         friends: randomFriends,
  //       });
  //     }
  // }
  await User.collection.insertMany(users);
  // NOTES: Randomly assign firends to each user
  // const userIds = (insertedUsers.ops || []).map(user => user._id);
  // for (let userId of userIds) {
  //   let randomFriends = getRandomArrItems(userIds, 3);
  //   randomFriends = randomFriends.filter(id => id.toString() !== userId.toString());

  //   const updatedUser = await User.findByIdAndUpdate(userId, 
  //     { $addToSet: { friends: { $each: randomFriends } } },
  //     { new: true }
  //     );
  //     console.log(updatedUser);
  // }

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);

});