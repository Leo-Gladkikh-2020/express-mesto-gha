const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/me', getCurrentUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
