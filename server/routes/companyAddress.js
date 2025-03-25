const express = require('express');
const router = express.Router();
const companyAddress = require('../databases/companyAddress');

router.post("/register", async (req, res) => {
    try {
        const result = await companyAddress.companyRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/list", async (req, res) => {
    console.log('여기까지')
    try {
        const result = await companyAddress.companyList()
        console.log(result)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;