const express = require('express');
const router = express.Router();
const notice = require('../databases/notice');

router.get("/list", async (req, res) => {
    try {
        const result = await notice.noticeList()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/update", async (req, res) => {
    try {
        const result = await notice.noticeUpdate(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;