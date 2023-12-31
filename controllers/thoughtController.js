const { User, Thought } = require('../models');

module.exports = {
  // SECTION: GET ALL THOUGHTS
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // SECTION: GET SINGLE THOUGHT
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId})
      if (!thought) {
        return res.status(404).json({ message: `No thought with the ID: ${req.params.thoughtId}` });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // SECTION: CREATE NEW THOUGHT
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'Thought created, but found no user with that ID!'});
      }
      res.json({ message: 'Thought successfully created!', data: newThought })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // SECTION: UPDATE THOUGHT
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!'});
      }
      res.json(thought)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // SECTION: DELETE THOUGHT
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought deleted!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // SECTION: ADD THOUGHT REACTION
  async addThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // SECTION: REMOVE THOUGHT REACTION
  async removeThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};