const express = require('express');
const router = express.Router();
const attendanceEnd = require('../databases/attendanceEnd');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const time = require('../databases/time');

router.post("/register", authMiddlewareSession, async (req, res) => {
    try {
        const result = await attendanceEnd.attendanceEndRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/admin/register", authMiddlewareSession, async (req, res) => {
    const user_code = req.body.user_code;
    var end_time;
    try {
        const result = await time.timeDetail(user_code)
        end_time = result.end_time;
    } catch (error) {
        console.error(error)
    }
    req.body.end_time = end_time;
    try {
        const result = await attendanceEnd.attendanceEndRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;