const express = require('express');
const router = express.Router();
const attendanceEnd = require('../databases/attendanceEnd');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post("/register", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;

    console.log('현재 로그인된 유저', user_code);

    console.log('넘어오는 데이터값', req.body)

    // try {
    //     const result = await attendanceEnd.attendanceEndRegister(req.body)
    //     return res.json(result);
    // } catch (error) {
    //     console.error(error)
    // }
});

module.exports = router;