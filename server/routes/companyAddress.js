const express = require('express');
const router = express.Router();
const companyAddress = require('../databases/companyAddress');

router.post("/register", async (req, res) => {
    console.log(req.body)
    try {
        const result = await companyAddress.companyRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/list", async (req, res) => {
    try {
        const result = await companyAddress.companyList()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/delete", async (req, res) => {
    try {
        const result = await companyAddress.companyDelete(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});
module.exports = router;