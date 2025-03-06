const express = require('express');
const router = express.Router();
const user = require('../databases/user');

const passport = require('passport');


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
        console.log("user")
        console.log(user)
        console.log(error)
        console.log(info)
        console.log("user")
        if (error) return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
        if (user === "-1") return res.status(401).json(user);
        if (user === "0") return res.status(401).json(user);

        req.login(user, (err) => {
            console.log("user")
            if (err) return next(err);

            // 세션 상태 확인


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

router.post("/update/auth", async (req, res) => {
    try {
        const result = await user.userUpdateAuth(req.body);
        return res.json(result);
    } catch (error) {
        console.error(error)

    }

});

module.exports = router;