const jwt = require('jsonwebtoken');
const noticeService = require('../services/noticeService');

/**
 * @swagger
 * tags:
 *   name: Notices
 *   description: 공지 관리 API
 */

/**
 * @swagger
 * /api/notices:
 *   post:
 *     summary: 공지 생성
 *     tags: [Notices]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin_id:
 *                 type: string
 *                 description: 공지를 생성하는 관리자 ID
 *                 example: "admin123"
 *               content:
 *                 type: string
 *                 description: 공지 내용
 *                 example: "내일부터 새로운 근무 일정이 적용됩니다."
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: 공지 시작일
 *                 example: "2025-02-15"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: 공지 종료일
 *                 example: "2025-02-20"
 *     responses:
 *       201:
 *         description: 공지가 성공적으로 생성됨
 *       500:
 *         description: 서버 오류 발생
 */
exports.createNotice = async (req, res) => {
  try {
    const { admin_id, content, start_date, end_date } = req.body;
    const notice = await noticeService.createNotice(admin_id, content, start_date, end_date);
    res.status(201).json({ message: '공지 생성 성공', data: notice });
  } catch (error) {
    res.status(500).json({ message: '공지 생성 실패', error: error.message });
  }
};

/**
 * @swagger
 * /api/notices:
 *   get:
 *     summary: 모든 공지 조회
 *     tags: [Notices]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 모든 공지 목록 반환
 *       500:
 *         description: 서버 오류 발생
 */
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await noticeService.getAllNotices();
    res.status(200).json({ data: notices });
  } catch (error) {
    res.status(500).json({ message: '공지 조회 실패', error: error.message });
  }
};

/**
 * @swagger
 * /api/notices/{id}:
 *   get:
 *     summary: 특정 공지 조회
 *     tags: [Notices]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 공지의 ID
 *     responses:
 *       200:
 *         description: 해당 공지 반환
 *       404:
 *         description: 공지를 찾을 수 없음
 *       500:
 *         description: 서버 오류 발생
 */
exports.getNoticeById = async (req, res) => {
  try {
    const noticeId = req.params.id;
    const notice = await noticeService.getNoticeById(noticeId);
    if (!notice) {
      return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
    }
    res.status(200).json({ data: notice });
  } catch (error) {
    res.status(500).json({ message: '공지 조회 실패', error: error.message });
  }
};

/**
 * @swagger
 * /api/notices/my:
 *   get:
 *     summary: 본인에게 할당된 모든 공지 조회
 *     tags: [Notices]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자가 볼 수 있는 공지 목록 반환
 *       500:
 *         description: 서버 오류 발생
 */
exports.getMyNotices = async (req, res) => {
  try {
    const userId = req.user.id;  // 로그인된 사용자 ID 가져오기 (authMiddleware 사용 가정)
    const notices = await noticeService.getNoticesForUser(userId);
    res.status(200).json({ data: notices });
  } catch (error) {
    res.status(500).json({ message: '공지 조회 실패', error: error.message });
  }
};
