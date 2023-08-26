const User = require('../models/User');

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
    } catch (err) {
      res.status(500).json(err);
    }
  }
};