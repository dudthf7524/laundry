const express = require('express');
const router = express.Router();
const companyVacation = require('../databases/companyVacation');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');


router.post("/register", async (req, res) => {
    
    try {
        const result = await companyVacation.companyacationRegister(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


router.get("/list", async (req, res) => {
    try {
        const result = await companyVacation.companyacationList()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;