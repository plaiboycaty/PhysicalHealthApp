const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');
const authMiddleware = require('../middlewares/authMiddleware');

// API Public: Lấy biểu tượng cảm xúc
router.get('/emotions', diaryController.getEmotions);

// API Private: Bắt buộc đính kèm Token (Đi qua trạm gác)
router.get('/diaries', authMiddleware, diaryController.getMyDiaries);
router.post('/diaries', authMiddleware, diaryController.addDiary);

// Hành động nhắm vào một bài cụ thể dựa vào ID trên URL
router.put('/diaries/:id', authMiddleware, diaryController.editDiary);
router.delete('/diaries/:id', authMiddleware, diaryController.removeDiary);

module.exports = router;
