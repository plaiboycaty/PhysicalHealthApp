const testModel = require('../models/testModel');

const treatmentHelper = {
  getTreatmentStatus: async (userId) => {
    try {
      const lastTest = await testModel.getLatestTestResultByUserId(userId);
      
      if (!lastTest) {
        return 'none'; // Chưa từng làm bài test
      }

      const ngayLamTest = new Date(lastTest.created_at);
      const hienTai = new Date();
      const diffTime = Math.abs(hienTai - ngayLamTest);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays > 28) {
        return 'expired'; // Đã qua 4 tuần (28 ngày) -> Cần test lại
      } else {
        return 'in_progress'; // Vẫn đang trong khoảng thời gian lộ trình 4 tuần
      }
    } catch (error) {
      console.error('Lỗi tính toán treatment_status:', error);
      return 'none';
    }
  }
};

module.exports = treatmentHelper;
