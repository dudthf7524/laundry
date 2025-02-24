const workService = require('../services/workService');

/**
 * @swagger
 * tags:
 *   name: Works
 *   description: 업무 관련 API
 */

/**
 * @swagger
 * /works:
 *   get:
 *     summary: 전체 업무 조회 (관리자용)
 *     description: 모든 업무 기록을 조회하며, 날짜, 직원 ID, 공정 ID 등의 필터링이 가능합니다.
 *     tags: [Works]
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: 검색할 시작 날짜 (예: 2025-02-01)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: 검색할 종료 날짜 (예: 2025-02-10)
 *       - in: query
 *         name: employee_id
 *         schema:
 *           type: integer
 *         description: 특정 직원의 업무만 조회
 *       - in: query
 *         name: process_id
 *         schema:
 *           type: integer
 *         description: 특정 공정의 업무만 조회
 *     responses:
 *       200:
 *         description: 성공적으로 조회됨
 */
exports.getAllWorks = async (req, res) => {
    try {
      const { start_date, end_date, employee_id, process_id } = req.query;
      const works = await workService.getAllWorks({ start_date, end_date, employee_id, process_id });
      res.status(200).json({ data: works });
    } catch (error) {
      res.status(500).json({ message: '업무 조회 실패', error: error.message });
    }
};

/**
 * @swagger
 * /works/{employee_id}:
 *   get:
 *     summary: 특정 직원의 업무 기록 조회
 *     tags: [Works]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 직원 ID
 *     responses:
 *       200:
 *         description: 성공적으로 조회됨
 */
exports.getEmployeeWorks = async (req, res) => {
  try {
    const employeeId = req.params.employee_id;
    const works = await workService.getEmployeeWorks(employeeId);
    res.status(200).json({ data: works });
  } catch (error) {
    res.status(500).json({ message: '업무 기록 조회 실패', error: error.message });
  }
};

/**
 * @swagger
 * /works/start:
 *   post:
 *     summary: 출근 (업무 시작)
 *     tags: [Works]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *                 description: 직원 ID
 *                 example: 5
 *               process_id:
 *                 type: integer
 *                 description: 업무 공정 ID
 *                 example: 2
 *               schedule_id:
 *                 type: integer
 *                 description: 해당 스케줄 ID
 *                 example: 3
 *     responses:
 *       201:
 *         description: 출근 기록이 생성됨
 */
exports.startWork = async (req, res) => {
  try {
    const { employee_id, process_id, schedule_id } = req.body;
    const work = await workService.startWork(employee_id, process_id, schedule_id);
    res.status(201).json({ message: '출근 기록이 생성되었습니다.', data: work });
  } catch (error) {
    res.status(500).json({ message: '출근 기록 생성 실패', error: error.message });
  }
};

/**
 * @swagger
 * /works/end:
 *   post:
 *     summary: 퇴근 (업무 종료)
 *     tags: [Works]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               work_id:
 *                 type: integer
 *                 description: 업무 기록 ID
 *                 example: 1
 *               completed_quantity:
 *                 type: integer
 *                 description: 완료한 옷 벌 수
 *                 example: 20
 *     responses:
 *       200:
 *         description: 퇴근 기록이 저장됨
 */
exports.endWork = async (req, res) => {
  try {
    const { work_id, completed_quantity } = req.body;
    const work = await workService.endWork(work_id, completed_quantity);
    res.status(200).json({ message: '퇴근 기록이 저장되었습니다.', data: work });
  } catch (error) {
    res.status(500).json({ message: '퇴근 기록 저장 실패', error: error.message });
  }
};

/**
 * @swagger
 * /works/{work_id}:
 *   put:
 *     summary: 업무 기록 수정
 *     tags: [Works]
 *     parameters:
 *       - in: path
 *         name: work_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 업무 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed_quantity:
 *                 type: integer
 *                 description: 완료한 옷 벌 수 수정
 *                 example: 30
 *     responses:
 *       200:
 *         description: 업무 기록이 수정됨
 */
exports.updateWork = async (req, res) => {
  try {
    const workId = req.params.work_id;
    const updatedWork = await workService.updateWork(workId, req.body);
    res.status(200).json({ message: '업무 기록이 수정되었습니다.', data: updatedWork });
  } catch (error) {
    res.status(500).json({ message: '업무 기록 수정 실패', error: error.message });
  }
};

/**
 * @swagger
 * /works/{work_id}:
 *   delete:
 *     summary: 업무 기록 삭제
 *
    *     tags: [Works]
    *    parameters:
    *      - in: path
    *       name: work_id
    *      required: true
    *     schema:
    *      type: integer
    *    description: 삭제할 업무 ID
    *   responses:
    *    200:
    *     description: 업무 기록이 삭제됨
    */

// 업무 기록 삭제
exports.deleteWork = async (req, res) => {
  try {
    const workId = req.params.work_id;
    await workService.deleteWork(workId);
    res.status(200).json({ message: '업무 기록이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '업무 기록 삭제 실패', error: error.message });
  }
};

/**
 * @swagger
 * /works/summary/{employee_id}:
 *  get:
 *   summary: 직원의 업무 성과 요약 조회
 *  tags: [Works]
 * parameters:
 * - in: path
 *  name: employee_id
 * required: true
 * schema:
 * type: integer
 * description: 조회할 직원 ID
 * responses:
 * 200:
 * description: 성공적으로 조회됨
 */

// 직원의 업무 성과 요약 조회
exports.getWorkSummary = async (req, res) => {
  try {
    const employeeId = req.params.employee_id;
    const summary = await workService.getWorkSummary(employeeId);
    res.status(200).json({ data: summary });
  } catch (error) {
    res.status(500).json({ message: '업무 성과 요약 조회 실패', error: error.message });
  }
};
