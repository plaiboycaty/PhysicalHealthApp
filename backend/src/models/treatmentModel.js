const db = require('../config/db');

const treatmentModel = {
  // 1. Lấy kết quả bài test gần nhất của người dùng
  getLatestTestCategory: async (userId) => {
    const [rows] = await db.query(
      'SELECT category FROM test_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    return rows[0] ? rows[0].category : null;
  },

  // 2. Lấy 4 tuần lộ trình tương ứng với hạng mục bệnh đó
  getRoadmapByCategory: async (category) => {
    const [rows] = await db.query(
      'SELECT week_number, title, content FROM treatments WHERE category = ? ORDER BY week_number ASC',
      [category]
    );
    return rows;
  }
};

module.exports = treatmentModel;
