const express = require('express');
const router = express.Router();
const time = require('../databases/time');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post("/register", async (req, res) => {
    try {
        const result = await time.timeRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/detail", authMiddlewareSession, async (req, res) => {
    
    const user_code = req.user.user_code;

    try {
        const result = await time.timeDetail(user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;