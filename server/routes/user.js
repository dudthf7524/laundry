const express = require('express');
const router = express.Router();
const user = require('../databases/user');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../configToken/jwt');
const authMiddleware = require('../src/middlewares/authMiddleware');

router.post("/check", async (req, res) => {
    const { user_id } = req.body;

    try {
        const result = await user.userCheck(user_id);
        if (result) {
            return res.status(400).json({ message: 'Username is already taken' });
        } else {
            res.status(200).json({ message: 'Username is available' });
        }
    } catch (error) {
        console.error(error)

    }




});


router.post("/join", async (req, res) => {

    const data = req.body;
    try {
        const result = await user.userJoin(data)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.post("/login", async (req, res) => {

    const data = req.body;
    const result = await user.userLogin(data)
    const check = result.check;
    if (check === 1) {
        const token = jwt.sign({ user_code: result.user.user_code, user_auth: result.user.auth_code }, secret, { expiresIn });
        console.log("token")
        console.log(token)
        res.json({ check, token });

    } else {
        res.json({ check });
    }

});
router.get("/auth", authMiddleware, async (req, res) => {
    console.log(req.user)
    console.log('aaaa')
});

router.get("/list", authMiddleware, async (req, res) => {
    try {
        const result = await user.userList()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;