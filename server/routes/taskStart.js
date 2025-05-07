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
    try {
        const result = await taskStart.taskStartDate(req.body)
        
        return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

router.post("/month", async (req, res) => {
    try {
        const result = await taskStart.taskStartMonth(req.body)
     
        return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

router.post("/year", async (req, res) => {
    try {
        const result = await taskStart.taskStartYear(req.body)
      
        return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

router.get("/today", authMiddlewareSession, async (req, res) => {
   
    const user_code = req.user.user_code;

    try {
        const result = await taskStart.taskStartToday(user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/update", authMiddlewareSession, async (req, res) => {
    try {
        const result = await taskStart.taskStartUpdate(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/search", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
    const searchDate = req.body.searchDate
    console.log(req.body.searchDate);
    try {
        const result = await taskStart.taskStartSearch(user_code, searchDate)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;