const express = require('express');
const router = express.Router();
const taskEnd = require('../databases/taskEnd');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.post("/register", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
   
    try {
        const result = await taskEnd.taskEndRegister(req.body, user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

// router.get("/new/one", authMiddlewareSession, async (req, res) => {
   
//     const user_code = req.user.user_code;

//     try {
//         const result = await task.taskNewOne(user_code)
//         return res.json(result);
//     } catch (error) {
//         console.error(error)
//     }
// });

// router.post("/end/time", authMiddlewareSession, async (req, res) => {
   
//     // const user_code = req.user.user_code;

//     // try {
//     //     const result = await task.taskNewOne(user_code)
//     //     return res.json(result);
//     // } catch (error) {
//     //     console.error(error)
//     // }
// });

module.exports = router;