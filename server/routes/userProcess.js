const express = require('express');
const router = express.Router();
const userProcess = require('../databases/userProcess');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post("/register", async (req, res) => {
    try {
        const result = await userProcess.userProcessRegister(req.body);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

router.get("/list", async (req, res) => {
    try {
        const result = await userProcess.userProcessList();
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/one/list", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;

    try {
        const result = await userProcess.userProcessOneList(user_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/delete", async (req, res) => {
    try {
        const result = await userProcess.userProcessDelete(req.body);
        return res.json({ result: result, user_code: req.body.user_code });
    } catch (error) {
        console.error(error)
    }
});

router.post("/update", async (req, res) => {

    try {
        const result = await userProcess.userProcessUpdate(req.body);
        return res.json({ result: result, user_code: req.body.user_code });
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;