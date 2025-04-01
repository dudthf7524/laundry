const express = require('express');
const router = express.Router();
const chart = require('../databases/chart');

router.post("/date", async (req, res) => {

    try {
        const result = await chart.chartDate(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});
    
router.post("/month", async (req, res) => {
   
    try {
        const result = await chart.chartMonth(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/year", async (req, res) => {
    try {
        const result = await chart.chartYear(req.body)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;