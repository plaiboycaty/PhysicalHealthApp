const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statisticController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route thống kê phải đi qua cổng bảo vệ
router.get('/tests/history', authMiddleware, statisticController.getTestHistory);
router.get('/diaries/emotions', authMiddleware, statisticController.getEmotionStats);

module.exports = router;
