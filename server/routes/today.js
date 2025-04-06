const express = require('express');
const router = express.Router();
const today = require('../databases/today');

router.get("/attendance", async (req, res) => {
    try {
        const result = await today.todayAttendance()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/task", async (req, res) => {
    try {
        const result = await today.todayTask()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;