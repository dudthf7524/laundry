const express = require('express');
const router = express.Router();
const attendanceStart = require('../databases/attendanceStart');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post("/register", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
    try {
        const result = await attendanceStart.attendanceStartRegister(req.body, user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

router.get("/new/one", authMiddlewareSession, async (req, res) => {
  
    const user_code = req.user.user_code;

    try {
        const result = await attendanceStart.attendanceStartNewOne(user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;