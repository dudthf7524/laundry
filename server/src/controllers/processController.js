const processService = require('../services/processService');

/**
 * @swagger
 * tags:
 *   name: Processes
 *   description: 업무 공정 및 직원 업무 관리 API
 */

/**
 * @swagger
 * /api/process:
 *   post:
 *     summary: 새로운 업무 공정 추가
 *     tags: [Processes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 공정 이름
 *                 example: 포장 공정
 *               location:
 *                 type: string
 *                 description: 공정 위치
 *                 example: 1번 공정실
 *     responses:
 *       201:
 *         description: 공정이 성공적으로 추가됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.createProcess = async (req, res) => {
  try {
    const process = await processService.createProcess(req.body);
    res.status(201).json({ message: '업무 공정이 추가되었습니다.', data: process });
  } catch (error) {
    res.status(500).json({ message: '업무 공정 추가 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/process/{id}:
 *   put:
 *     summary: 업무 공정 수정
 *     tags: [Processes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 공정 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 공정 이름
 *                 example: 포장 공정
 *               location:
 *                 type: string
 *                 description: 공정 위치
 *                 example: 1번 공정실
 *     responses:
 *       200:
 *         description: 공정이 성공적으로 수정됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.updateProcess = async (req, res) => {
  try {
    const processId = req.params.id;
    const updatedProcess = await processService.updateProcess(processId, req.body);
    res.status(200).json({ message: '업무 공정이 수정되었습니다.', data: updatedProcess });
  } catch (error) {
    res.status(500).json({ message: '업무 공정 수정 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/process/{id}:
 *   delete:
 *     summary: 업무 공정 삭제
 *     tags: [Processes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 공정 ID
 *     responses:
 *       200:
 *         description: 공정이 성공적으로 삭제됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.deleteProcess = async (req, res) => {
  try {
    const processId = req.params.id;
    await processService.deleteProcess(processId);
    res.status(200).json({ message: '업무 공정이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '업무 공정 삭제 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/process/tasks:
 *   post:
 *     summary: 직원에게 업무 부과
 *     tags: [Processes]
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
 *               process_id:
 *                 type: string
 *                 description: 업무 공정 ID
 *                 example: "proc001"
 *               task_detail:
 *                 type: string
 *                 description: 업무 상세 내용
 *                 example: "포장 작업 진행"
 *     responses:
 *       201:
 *         description: 업무가 부과됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.assignTask = async (req, res) => {
  try {
    const task = await processService.assignTask(req.body);
    res.status(201).json({ message: '업무가 부과되었습니다.', data: task });
  } catch (error) {
    res.status(500).json({ message: '업무 부과 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/process/tasks/{id}:
 *   put:
 *     summary: 부과된 업무 수정
 *     tags: [Processes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 업무 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_detail:
 *                 type: string
 *                 description: 수정할 업무 상세 내용
 *                 example: "포장 작업 완료 검수"
 *     responses:
 *       200:
 *         description: 업무가 성공적으로 수정됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await processService.updateTask(taskId, req.body);
    res.status(200).json({ message: '업무가 수정되었습니다.', data: updatedTask });
  } catch (error) {
    res.status(500).json({ message: '업무 수정 중 오류 발생', error: error.message });
  }
};

/**
 * @swagger
 * /api/process/tasks/{id}:
 *   delete:
 *     summary: 부과된 업무 삭제
 *     tags: [Processes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 업무 ID
 *     responses:
 *       200:
 *         description: 업무가 성공적으로 삭제됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await processService.deleteTask(taskId);
    res.status(200).json({ message: '업무가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '업무 삭제 중 오류 발생', error: error.message });
  }
};
