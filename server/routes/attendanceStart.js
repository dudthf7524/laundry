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


router.post("/date", async (req, res) => {
    try {
        const result = await attendanceStart.attendanceStartDate(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/month", async (req, res) => {
    try {
        const result = await attendanceStart.attendanceStartMonth(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/year", async (req, res) => {
    try {
        const result = await attendanceStart.attendanceStartYear(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/today", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;

    try {
        const result = await attendanceStart.attendanceToday(user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/search", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
    const searchDate = req.body.searchDate
    try {
        const result = await attendanceStart.attendanceSearch(user_code, searchDate)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/update", async (req, res) => {
    try {
        const result = await attendanceStart.attendanceUpdate(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;