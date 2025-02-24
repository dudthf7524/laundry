const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { secret, expiresIn } = require('../config/jwt');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 인증 및 계정 관리 API
 */

/**
 * @swagger
 * /api/user/check-username:
 *   post:
 *     summary: 아이디 중복 확인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: 확인할 사용자 아이디
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: 아이디 사용 가능
 *       400:
 *         description: 아이디가 이미 사용 중
 */
const checkUsernameAvailability = async (req, res) => {
  const { user_id } = req.body;
  const user = await userService.findUserByUsername(user_id);
  if (user) {
    return res.status(400).json({ message: 'Username is already taken' });
  }
  res.status(200).json({ message: 'Username is available' });
};

/**
 * @swagger
 * /api/user/join:
 *   post:
 *     summary: 회원가입
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: 사용자 아이디
 *                 example: "user123"
 *               name:
 *                 type: string
 *                 description: 사용자 이름
 *                 example: "홍길동"
 *               nickname:
 *                 type: string
 *                 description: 닉네임
 *                 example: "길동이"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 비밀번호
 *                 example: "mypassword123"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 이미 사용 중인 아이디
 *       500:
 *         description: 서버 오류 발생
 */
const registerUser = async (req, res) => {
  const { user_id, name, nickname, password } = req.body;
  const existingUser = await userService.findUserByUsername(user_id);
  if (existingUser) {
    return res.status(400).json({ message: 'Username is already taken' });
  }
  const newUser = await userService.createUser(user_id, name, nickname, password);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
};

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: 사용자 아이디
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 비밀번호
 *                 example: "mypassword123"
 *     responses:
 *       200:
 *         description: 로그인 성공 (토큰 반환)
 *       401:
 *         description: 잘못된 아이디 또는 비밀번호
 *       500:
 *         description: 서버 오류 발생
 */
const loginUser = async (req, res) => {
  const { user_id, password } = req.body;
  const user = await userService.findUserByUsername(user_id);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // JWT 토큰 생성
  const token = jwt.sign({ user_id: user.user_id }, secret, { expiresIn });

  // ✅ 클라이언트로 토큰 반환
  res.status(200).json({ 
    message: 'Login successful', 
    token 
  });
};

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: 프로필 조회 (토큰 필요)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 프로필 정보 반환
 *       401:
 *         description: 인증 실패
 */
const getProfile = (req, res) => {
  res.status(200).json({ message: 'Welcome to your profile', user: req.user });
};

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: 로그아웃
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 */
const logoutUser = async (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

/**
 * @swagger
 * /api/user/delete:
 *  delete:
 *      summary: 회원탈퇴
 *      tags: [Users]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: 회원탈퇴 성공
 */
const deleteUser = async (req, res) => {
  const { user_id } = req.user;
  await userService.deleteUser(user_id);
  res.status(200).json({ message: 'User deleted successfully' });
};

module.exports = { checkUsernameAvailability, registerUser, loginUser, getProfile, logoutUser, deleteUser };
