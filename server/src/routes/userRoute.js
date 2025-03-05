const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/check/user', userController.checkUsernameAvailability);
// router.post('/join', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, userController.getProfile);
router.post('/logout', authMiddleware, userController.logoutUser);


router.post("/join", async (req, res) => {
    console.log('aaaaaaaa')
    const { user_id, name, nickname, password } = req.body;

    console.log(req.body)
    //   const existingUser = await userService.findUserByUsername(user_id);
    //   if (existingUser) {
    //     return res.status(400).json({ message: 'Username is already taken' });
    //   }
    //   const newUser = await userService.createUser(user_id, name, nickname, password);
    //   res.status(201).json({ message: 'User registered successfully', user: newUser });
});

module.exports = router;