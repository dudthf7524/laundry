const express = require('express');
const workController = require('../controllers/workController');

const router = express.Router();

// 전체 업무 조회 + 필터링 (관리자용)
router.get('/', workController.getAllWorks);

// 특정 직원의 업무 조회
router.get('/:employee_id', workController.getEmployeeWorks);

// 출근 (실질적 업무 시작)
router.post('/start', workController.startWork);

// 퇴근 (실질적 업무 종료)
router.post('/end', workController.endWork);

// 업무 기록 수정
router.put('/:work_id', workController.updateWork);

// 업무 기록 삭제
router.delete('/:work_id', workController.deleteWork);

// 직원의 업무 성과 요약 조회
router.get('/summary/:employee_id', workController.getWorkSummary);

module.exports = router;
