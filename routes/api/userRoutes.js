const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController');

// SECTION: /api/users
router.route('/').get(getUsers).post(createUser);

// SECTION: /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// SECTION: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post.apply(addFriend).delete(removeFriend);

module.exports = router;


