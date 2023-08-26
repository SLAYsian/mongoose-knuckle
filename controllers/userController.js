const { User, Thought } = require('../models');

module.exports = {
  // SECTION: GET ALL USERS
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // SECTION: GET ONE USER
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');
      if (!user) {
        return res.status(404).json({ message: `No user with the ID: ${req.params.userId}`});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // SECTION: CREATE NEW USER
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // SECTION: UPDATE USER
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        );
      if (!user) {
        return res.status(404).json({ message: `No user with the ID: ${req.params.userId}` });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // SECTION: DELETE USER
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: `No user with the ID: ${req.params.userId}` });
      }
      await Thought.deleteMany({ username: user.username });

      res.json({ message: 'User and associated thoughts successfully deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // SECTION: ADD FRIEND
  async addFriend (req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
      const user = await User.findOne( { _id: req.params.userId} );
      if (!user) {
        return res.status(404).json({ message: `No user with the ID: ${req.params.userId}` });
      }
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId }, 
        { $addToSet: { friends: user._id} }, 
        { runValidators: true, new: true } 
        );
        if (!friend) {
          return res.status(404).json({ message: `No user with the ID: ${req.params.friendId} to add as friend!` });
        }
        res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // SECTION: DELETE FRIEND
  async removeFriend (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId});
      if (!user) {
        return res.status(404).json({ message: `No user with the ID: ${req.params.userId}` });
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId }, 
        { $pull: { friends: req.params.friendId } }, 
        { runValidators: true, new: true } 
        );
        if (!updatedUser) {
          return res.status(404).json({ message: `No user with the ID: ${req.params.userId}!` });
        }
        res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};