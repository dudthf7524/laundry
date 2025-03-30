const express = require('express');
const router = express.Router();
const auth = require('../databases/auth');

router.post("/date", async (req, res) => {

    // try {
    //     const result = await auth.authList()
    //     return res.json(result);
    // } catch (error) {
    //     console.error(error)
    // }
});

router.post("/month", async (req, res) => {

    // try {
    //     const result = await auth.authList()
    //     return res.json(result);
    // } catch (error) {
    //     console.error(error)
    // }
});

router.post("/year", async (req, res) => {

    // try {
    //     const result = await auth.authList()
    //     return res.json(result);
    // } catch (error) {
    //     console.error(error)
    // }
});

module.exports = router;