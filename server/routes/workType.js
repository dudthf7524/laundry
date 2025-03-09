const express = require('express');
const router = express.Router();
const workType = require('../databases/workType');

router.post("/register", async (req, res) => {
  
    try {
        const result = await workType.workTypeRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/list", async (req, res) => {
    try {
        const result = await workType.workTypeList();
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;