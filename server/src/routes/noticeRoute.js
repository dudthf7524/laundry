const express = require('express');
const noticeController = require('../controllers/noticeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// 공지 생성
router.post('/', authMiddleware, noticeController.createNotice);

// 공지 전체 조회
router.get('/', authMiddleware, noticeController.getAllNotices);

// 특정 공지 조회
router.get('/:id', authMiddleware, noticeController.getNoticeById);

// 본인에게 내려진 모든 공지 조회
router.get('/my', authMiddleware, noticeController.getMyNotices);

module.exports = router;
