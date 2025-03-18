const express = require('express');
const router = express.Router();
const process = require('../databases/process');

router.get("/list", async (req, res) => {
    try {
        const result = await process.processList();
        console.log(result)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;