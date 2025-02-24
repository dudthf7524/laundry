const scheduleService = require('../services/scheduleService');

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: 캘린더, 스케줄, 휴가 관리 API
 */

/**
 * @swagger
 * /api/schedule/calendar:
 *   get:
 *     summary: 캘린더 데이터 조회
 *     tags: [Schedules]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 캘린더 데이터 반환
 *       500:
 *         description: 서버 오류 발생
 */
exports.getCalendarData = async (req, res) => {
  try {
    const data = await scheduleService.getCalendarData();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: '캘린더 데이터를 불러오는 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: 단일 스케줄 추가
 *     tags: [Schedules]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: string
 *                 description: 직원 ID
 *                 example: "emp123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: 스케줄 날짜
 *                 example: "2025-02-20"
 *               start_time:
 *                 type: string
 *                 format: time
 *                 description: 시작 시간
 *                 example: "09:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 description: 종료 시간
 *                 example: "18:00"
 *     responses:
 *       201:
 *         description: 스케줄이 추가됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.createSchedule = async (req, res) => {
  try {
    const schedule = await scheduleService.createSchedule(req.body);
    res.status(201).json({ message: '스케줄이 추가되었습니다.', data: schedule });
  } catch (error) {
    res.status(500).json({ message: '스케줄 추가 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule/bulk:
 *   post:
 *     summary: 반복(일괄) 스케줄 추가
 *     tags: [Schedules]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: 시작 날짜
 *                 example: "2025-02-15"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: 종료 날짜
 *                 example: "2025-03-15"
 *               dayOfWeek:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 반복할 요일 (월, 화, 수 등)
 *                 example: ["월", "수", "금"]
 *               scheduleData:
 *                 type: object
 *                 description: 반복할 스케줄 데이터
 *     responses:
 *       201:
 *         description: 스케줄이 일괄 추가됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.createBulkSchedules = async (req, res) => {
  try {
    const { startDate, endDate, dayOfWeek, scheduleData } = req.body;
    await scheduleService.createBulkSchedules(startDate, endDate, dayOfWeek, scheduleData);
    res.status(201).json({ message: '스케줄이 일괄 추가되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '스케줄 일괄 추가 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule/{id}:
 *   put:
 *     summary: 스케줄 수정
 *     tags: [Schedules]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 스케줄 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_time:
 *                 type: string
 *                 format: time
 *                 example: "10:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 example: "19:00"
 *     responses:
 *       200:
 *         description: 스케줄이 수정됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const updatedSchedule = await scheduleService.updateSchedule(scheduleId, req.body);
    res.status(200).json({ message: '스케줄이 수정되었습니다.', data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: '스케줄 수정 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule/vacations:
 *   post:
 *     summary: 휴가 추가
 *     tags: [Schedules]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: string
 *                 description: 직원 ID
 *                 example: "emp123"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-20"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-25"
 *               vacation_type:
 *                 type: string
 *                 example: "연차"
 *               status:
 *                 type: string
 *                 example: "승인"
 *     responses:
 *       201:
 *         description: 휴가가 추가됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.createVacation = async (req, res) => {
  try {
    const { employee_id, start_date, end_date, vacation_type, status } = req.body;
    await vacationService.createVacation(employee_id, start_date, end_date, vacation_type, status);
    res.status(201).json({ message: '휴가가 성공적으로 추가되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '휴가 추가 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule/vacations/{id}:
 *   put:
 *     summary: 휴가 수정
 *     tags: [Schedules]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 휴가 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: 휴가 시작일
 *                 example: "2025-02-20"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: 휴가 종료일
 *                 example: "2025-02-25"
 *               vacation_type:
 *                 type: string
 *                 description: 휴가 유형
 *                 example: "연차"
 *               status:
 *                 type: string
 *                 description: 휴가 상태 (승인, 대기, 거절)
 *                 example: "승인"
 *     responses:
 *       200:
 *         description: 휴가가 성공적으로 수정됨
 *       404:
 *         description: 해당 휴가를 찾을 수 없음
 *       500:
 *         description: 서버 오류 발생
 */
exports.updateVacation = async (req, res) => {
  try {
    const vacationId = req.params.id;
    const updatedVacation = await vacationService.updateVacation(vacationId, req.body);

    if (!updatedVacation) {
      return res.status(404).json({ message: "수정할 휴가를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: '휴가가 수정되었습니다.', data: updatedVacation });
  } catch (error) {
    res.status(500).json({ message: '휴가 수정 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule/vacations/{id}:
 *   delete:
 *     summary: 휴가 삭제
 *     tags: [Schedules]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 휴가 ID
 *     responses:
 *       200:
 *         description: 휴가가 성공적으로 삭제됨
 *       404:
 *         description: 해당 휴가를 찾을 수 없음
 *       500:
 *         description: 서버 오류 발생
 */
exports.deleteVacation = async (req, res) => {
  try {
    const vacationId = req.params.id;
    const deleted = await vacationService.deleteVacation(vacationId);

    if (!deleted) {
      return res.status(404).json({ message: "삭제할 휴가를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: '휴가가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '휴가 삭제 중 오류 발생', error: error.message });
  }
};
