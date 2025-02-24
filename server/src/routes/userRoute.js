const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/check-username', userController.checkUsernameAvailability);
router.post('/join', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, userController.getProfile);
router.post('/logout', authMiddleware, userController.logoutUser);

module.exports = router;