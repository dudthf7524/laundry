const express = require('express');
const router = express.Router();
const time = require('../databases/time');

router.post("/register", async (req, res) => {
    try {
        const result = await time.timeRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;