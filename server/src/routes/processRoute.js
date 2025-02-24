const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const processController = require('../controllers/processController');

const router = express.Router();

// 업무 공정 관련 라우트
router.post('/', authMiddleware, processController.createProcess);
router.put('/:id', authMiddleware, processController.updateProcess);
router.delete('/:id', authMiddleware, processController.deleteProcess);

// 직원 업무 관련 라우트
router.post('/tasks', authMiddleware, processController.assignTask);
router.put('/tasks/:id', authMiddleware, processController.updateTask);
router.delete('/tasks/:id', authMiddleware, processController.deleteTask);

module.exports = router;