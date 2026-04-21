const db = require('../config/db');

const diaryModel = {
  // Lấy danh sách icon cảm xúc
  getAllEmotions: async () => {
    const [rows] = await db.query('SELECT * FROM emotions ORDER BY id ASC');
    return rows;
  },

  // Lấy danh sách nhật ký của MỘT người dùng (Gộp với bảng emotions để lấy icon)
  getUserDiaries: async (userId) => {
    const query = `
      SELECT d.id, d.title, d.content, d.image_url, d.created_at, e.id AS emotion_id, e.name AS emotion_name, e.icon_url 
      FROM diaries d
      JOIN emotions e ON d.emotion_id = e.id
      WHERE d.user_id = ?
      ORDER BY d.created_at DESC
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
  },

  // Thêm 1 bài nhật ký mới
  createDiary: async (diaryData) => {
    const { user_id, emotion_id, title, content, image_url } = diaryData;
    const [result] = await db.query(
      'INSERT INTO diaries (user_id, emotion_id, title, content, image_url) VALUES (?, ?, ?, ?, ?)',
      [user_id, emotion_id, title, content, image_url || null]
    );
    return result.insertId;
  },

  // Cập nhật nhật ký (chỉ update nếu đúng user_id để tránh hack)
  updateDiary: async (id, userId, updateData) => {
    const { emotion_id, title, content, image_url } = updateData;
    const [result] = await db.query(
      'UPDATE diaries SET emotion_id = ?, title = ?, content = ?, image_url = ? WHERE id = ? AND user_id = ?',
      [emotion_id, title, content, image_url || null, id, userId]
    );
    return result.affectedRows; // Trả về số dòng bị biến đổi (0 nếu không tìm thấy hoặc sai user)
  },

  // Xóa nhật ký (chỉ xóa nếu đúng user_id)
  deleteDiary: async (id, userId) => {
    const [result] = await db.query(
      'DELETE FROM diaries WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows;
  }
};

module.exports = diaryModel;
