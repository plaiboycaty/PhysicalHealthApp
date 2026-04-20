const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Khai báo các đường dẫn mở công khai (Không bị chặn bởi Middleware)
router.post('/register', authController.register);
router.post('/login', authController.login);

// --- TEST MIDDLEWARE ---
// Endpoint này bọc thêm "trạm gác" authMiddleware đứng trước
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({
    message: '🎉 Chúc mừng bạn đã nộp Token thành công !',
    // req.user được móc ra từ Middleware
    user_info: req.user
  });
});

module.exports = router;
