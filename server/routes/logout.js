const express = require('express');
const router = express.Router();

router.get("/logout", (req, res) => {
    console.log(req.session)
    console.log("로그아웃 요청 도착");
    console.log("현재 로그인 상태:", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        console.log("로그인 상태가 아닙니다.");
        return res.status(400).json({ message: "로그인 상태가 아닙니다." });
    }

    req.logout((err) => {
        if (err) {
            console.error("로그아웃 오류:", err);
            return res.status(500).json({ message: "로그아웃 실패", error: err });
        }

        req.session.destroy(() => {
            console.log("세션 삭제 완료");
            res.clearCookie("connect.sid");
            console.log("쿠키 삭제 완료");
            return res.status(200).json({ message: "로그아웃 성공" });
        });
    });
});

module.exports = router;