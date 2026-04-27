const db = require('../config/db');

const userModel = {
  // Tìm người dùng theo email
  findUserByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Trả về user đầu tiên hoặc undefined
  },

  // Tạo người dùng mới
  createUser: async (userData) => {
    const { full_name, email, password_hash, gender, dob } = userData;
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password_hash, gender, dob) VALUES (?, ?, ?, ?, ?)',
      [full_name, email, password_hash, gender, dob]
    );
    return result.insertId; // Trả về ID của user vừa được tạo
  },

  // Lấy thông tin user bằng ID
  getUserById: async (userId) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0];
  },

  // Cập nhật mật khẩu mới
  updatePassword: async (userId, newPasswordHash) => {
    const [result] = await db.query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [newPasswordHash, userId]
    );
    return result.affectedRows;
  }
};

module.exports = userModel;
