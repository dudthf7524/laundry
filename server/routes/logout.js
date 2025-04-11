const express = require('express');
const router = express.Router();

router.get("/logout", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(400).json({ message: "로그인 상태가 아닙니다." });
    }

    req.logout((err) => {
        if (err) {
            console.error("로그아웃 오류:", err);
            return res.status(500).json({ message: "로그아웃 실패", error: err });
        }

        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            return res.status(200).json({ message: "로그아웃 성공" });
        });
    });
});

module.exports = router;