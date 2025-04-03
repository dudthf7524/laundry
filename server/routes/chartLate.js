const express = require('express');
const router = express.Router();
const chartLate = require('../databases/chartLate');

router.post("/date", async (req, res) => {
    try {
        const result = await chartLate.chartLateDate(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});
    
router.post("/month", async (req, res) => {
   
    try {
        const result = await chartLate.chartLateMonth(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/year", async (req, res) => {
    try {
        const result = await chartLate.chartLateYear(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;