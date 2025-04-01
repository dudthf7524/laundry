const express = require('express');
const router = express.Router();
const process = require('../databases/process');

router.get("/list", async (req, res) => {
    try {
        const result = await process.processList();
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/update", async (req, res) => {
    try {
        const result = await process.processUpdate(req.body);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;