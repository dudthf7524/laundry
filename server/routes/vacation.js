const express = require('express');
const router = express.Router();
const vacation = require('../databases/vacation');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');


router.post("/register", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;

    console.log('현재 로그인된 유저', user_code);

    console.log('넘어오는 데이터값', req.body)

    try {
        const result = await vacation.vacationRegister(req.body, user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


router.get("/list", async (req, res) => {
    try {
        const result = await vacation.vacationList()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/allow", async (req, res) => {
    try {
        const result = await vacation.vacationAllow(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/user", authMiddlewareSession,  async (req, res) => {
    const user_code = req.user.user_code
    try {
        const result = await vacation.vacationUser(user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});
module.exports = router;