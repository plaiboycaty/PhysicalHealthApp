const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');
const authMiddleware = require('../middlewares/authMiddleware');

// API Public: Lấy biểu tượng cảm xúc
router.get('/emotions', diaryController.getEmotions);

// API Private: Bắt buộc đính kèm Token (Đi qua trạm gác)
router.get('/diaries', authMiddleware, diaryController.getMyDiaries);
router.post('/diaries', authMiddleware, diaryController.addDiary);

// API Update và Delete
router.put('/diaries/:id', authMiddleware, diaryController.editDiary);
router.delete('/diaries/:id', authMiddleware, diaryController.removeDiary);

module.exports = router;
