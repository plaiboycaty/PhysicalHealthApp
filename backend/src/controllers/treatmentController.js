const treatmentModel = require('../models/treatmentModel');

const treatmentController = {
  // Lấy Lộ trình điều trị dựa trên bài Test gần nhất
  getMyRoadmap: async (req, res, next) => {
    try {
      const userId = req.user.user_id;

      // 1. Lấy kết quả bài test gần nhất
      const category = await treatmentModel.getLatestTestCategory(userId);

      // Nếu chưa làm bài test nào
      if (!category) {
        return res.status(404).json({
          status: 'no_test',
          message: 'Bạn chưa làm bài đánh giá tâm lý nào. Vui lòng làm bài test để nhận lộ trình.'
        });
      }

      // 2. Nếu không có bệnh
      if (category === 'Không lo âu') {
        return res.status(200).json({
          status: 'healthy',
          message: 'Sức khỏe tâm lý của bạn rất tốt! Bạn không cần lộ trình điều trị.'
        });
      }

      // 3. Nếu có bệnh, bốc lộ trình từ kho thuốc (bảng treatments)
      const roadmap = await treatmentModel.getRoadmapByCategory(category);

      // Trường hợp trong Database chưa có data cho bệnh này
      if (roadmap.length === 0) {
        return res.status(404).json({
          status: 'missing_data',
          message: `Hệ thống chưa có lộ trình cho hạng mục: ${category}`
        });
      }

      // 4. Trả lộ trình về cho Frontend vẽ Timeline
      // Nếu bệnh nặng, đính kèm cờ báo động đỏ để Frontend chuẩn bị 
      let isEmergency = category.includes('nặng');

      res.status(200).json({
        status: isEmergency ? 'emergency' : 'treatment',
        category: category,
        is_emergency: isEmergency,
        data: roadmap
      });

    } catch (error) {
      next(error);
    }
  }
};

module.exports = treatmentController;
