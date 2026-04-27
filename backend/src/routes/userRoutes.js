const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route đổi mật khẩu (Bắt buộc phải đi qua trạm gác kiểm tra Token)
router.put('/change-password', authMiddleware, userController.changePassword);

module.exports = router;
