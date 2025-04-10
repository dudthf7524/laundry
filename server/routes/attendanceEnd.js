const express = require('express');
const router = express.Router();
const attendanceEnd = require('../databases/attendanceEnd');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post("/register", authMiddlewareSession, async (req, res) => {
    try {
        const result = await attendanceEnd.attendanceEndRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;