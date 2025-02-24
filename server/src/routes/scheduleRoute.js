const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

// 캘린더 데이터 조회
router.get('/calendar', authMiddleware, scheduleController.getCalendarData);

// 단일 스케줄 추가
router.post('/', authMiddleware, scheduleController.createSchedule);

// 반복(일괄) 스케줄 추가
router.post('/bulk', authMiddleware, scheduleController.createBulkSchedules);

// 스케줄 수정
router.put('/:id', authMiddleware, scheduleController.updateSchedule);

// 휴가 추가
router.post('/vacations', authMiddleware, scheduleController.createVacation);

// 휴가 수정
router.put('/vacations/:id', authMiddleware, scheduleController.updateVacation);

// 휴가 삭제
router.delete('/vacations/:id', authMiddleware, scheduleController.deleteVacation);

module.exports = router;
