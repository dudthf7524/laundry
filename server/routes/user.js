const express = require('express');
const router = express.Router();
const user = require('../databases/user');

const passport = require('passport');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');


router.post("/join", async (req, res) => {

    const data = req.body;
    try {
        const result = await user.userJoin(data)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.post('/login', async (req, res, next) => {

    passport.authenticate('user', (error, user, info) => {

        if (error) return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
        if (user === "-1") return res.status(401).json(user);
        if (user === "0") return res.status(401).json(user);

        req.login(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({});
        });
    })(req, res, next);
});

router.get("/auth", (req, res) => {
    res.json(req.user);
});

router.get("/list", async (req, res) => {
    try {
        const result = await user.userList()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/update", async (req, res) => {
    try {
        const result = await user.userUpdate(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/update/auth", async (req, res) => {
    try {
        const result = await user.userUpdateAuth(req.body);
        return res.json(result);
    } catch (error) {
        console.error(error)

    }

});

router.post("/check/id", async (req, res) => {
    const data = req.body;
    try {
        const result = await user.userCheckId(data);
        res.json(result);
    } catch (error) {
        console.error(error)

    }
});

router.post("/check/password", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
    const data = req.body;
    try {
        const result = await user.userCheckPassword(data, user_code);
        res.json(result);
    } catch (error) {
        console.error(error)

    }
});

router.post("/change/id", authMiddlewareSession, async (req, res) => {
    const data = req.body;
    const user_code = req.user.user_code;
    try {
        const result = await user.userChangeId(data, user_code);
        res.json(result);
    } catch (error) {
        console.error(error)

    }
});

router.post("/change/password", authMiddlewareSession, async (req, res) => {

    const data = req.body;
    const user_code = req.user.user_code;

    try {
        const result = await user.userChangePassword(data, user_code);
        res.json(result);
    } catch (error) {
        console.error(error)

    }
});

router.get("/information", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
    try {
        const result = await user.userInformation(user_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/delete", async (req, res) => {
    try {
        const result = await user.userDelete(req.body);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;