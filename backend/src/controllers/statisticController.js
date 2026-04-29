const statisticModel = require('../models/statisticModel');

const statisticController = {
  // API Biểu đồ tiến triển tâm lý (Line Chart)
  getTestHistory: async (req, res, next) => {
    try {
      const userId = req.user.user_id;
      // Nếu Frontend không gửi tham số period lên, mặc định lấy TẤT CẢ (all)
      const period = req.query.period || 'all'; 
      
      const history = await statisticModel.getTestProgression(userId, period);
      
      res.status(200).json({
        message: 'Lấy lịch sử bài test thành công',
        period: period,
        data: history
      });
    } catch (error) {
      next(error);
    }
  },

  // API Biểu đồ tỷ lệ cảm xúc (Pie Chart)
  getEmotionStats: async (req, res, next) => {
    try {
      const userId = req.user.user_id;
      // Nhật ký thì nên xem theo Tuần (week) là chuẩn nhất
      const period = req.query.period || 'week'; 
      
      const stats = await statisticModel.getEmotionCounts(userId, period);
      
      // Tính tổng số lượng nhật ký để Frontend dễ dàng chia phần trăm (%)
      const totalDiaries = stats.reduce((sum, item) => sum + parseInt(item.count), 0);

      res.status(200).json({
        message: 'Lấy thống kê cảm xúc thành công',
        period: period,
        total: totalDiaries,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = statisticController;
