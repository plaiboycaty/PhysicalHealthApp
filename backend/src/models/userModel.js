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
  }
};

module.exports = userModel;
