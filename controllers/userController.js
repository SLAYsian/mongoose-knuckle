const { User, Thought } = require('../models');

module.exports = {
  // NOTES: Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // NOTES: Get One User
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
  // NOTES: CREATE NEW USER
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // NOTES: DELETE USER
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
};