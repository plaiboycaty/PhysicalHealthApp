const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const authMiddleware = require('../middlewares/authMiddleware');

// Tất cả các hành động liên quan đến Bài Test đều là riêng tư -> Cần có Token
router.get('/:id', authMiddleware, testController.getTestDetail);
router.post('/submit', authMiddleware, testController.submitTest);

module.exports = router;
