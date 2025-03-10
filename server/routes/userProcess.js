const express = require('express');
const router = express.Router();
const userProcess = require('../databases/userProcess');

router.post("/register", async (req, res) => {
    
    try {
        const result = await userProcess.userProcessRegister(req.body);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;