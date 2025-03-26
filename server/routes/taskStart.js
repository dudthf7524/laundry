const express = require('express');
const router = express.Router();
const taskStart = require('../databases/taskStart');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post("/register", authMiddlewareSession, async (req, res) => {
   
    const user_code = req.user.user_code;
    try {
        const result = await taskStart.taskStartRegister(req.body, user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/new/one", authMiddlewareSession, async (req, res) => {
   
    const user_code = req.user.user_code;

    try {
        const result = await taskStart.taskStartNewOne(user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/date", async (req, res) => {
    console.log(req.body)
    try {
        const result = await taskStart.taskStartDate(req.body)
        console.log("result")
        console.log(result)
        console.log("result")
        return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

router.post("/month", async (req, res) => {
    console.log(req.body)
    try {
        const result = await taskStart.taskStartMonth(req.body)
        console.log("result")
        console.log(result)
        console.log("result")
        return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

router.post("/year", async (req, res) => {
    console.log(req.body)
    try {
        const result = await taskStart.taskStartYear(req.body)
        console.log("result")
        console.log(result)
        console.log("result")
        return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

module.exports = router;