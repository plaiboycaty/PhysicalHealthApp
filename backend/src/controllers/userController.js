const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const userController = {
  // Đổi mật khẩu
  changePassword: async (req, res, next) => {
    try {
      const userId = req.user.user_id; // Lấy ID an toàn từ Token
      const { old_password, new_password } = req.body;

      if (!old_password || !new_password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp mật khẩu cũ và mật khẩu mới' });
      }

      // 1. Dùng ID móc thông tin user lên
      const user = await userModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản người dùng' });
      }

      // 2. Mang mật khẩu cũ người dùng vừa gõ vào xem có khớp với mật khẩu đang lưu không
      const isMatch = await bcrypt.compare(old_password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Mật khẩu cũ không chính xác!' });
      }

      // 3. Nếu đúng pass cũ, tiến hành băm (hash) mật khẩu mới
      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(new_password, salt);

      // 4. Lưu cái pass mới đã băm đó vào Database
      await userModel.updatePassword(userId, newPasswordHash);

      res.status(200).json({ message: 'Đổi mật khẩu thành công!' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
