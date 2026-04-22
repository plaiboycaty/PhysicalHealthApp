const testModel = require('../models/testModel');
const scoring = require('../utils/scoring');

const testController = {
  // GET /api/tests/:id
  getTestDetail: async (req, res, next) => {
    try {
      const testId = parseInt(req.params.id);

      // 1. Lấy thông tin bài test
      const testInfo = await testModel.getTestById(testId);
      if (!testInfo) {
        return res.status(404).json({ message: 'Không tìm thấy thông tin bộ câu hỏi này' });
      }

      // 2. Lấy danh sách câu hỏi và đáp án (Dữ liệu phẳng)
      const rawData = await testModel.getQuestionsAndOptions(testId);

      // 3. THUẬT TOÁN GỘP CÂY DỮ LIỆU (NEST OBJECT)
      // Chuyển hàng chục dòng query thành dạng cấu trúc cha - con để FE gọi map() vẽ UI
      const questionsMap = {};
      rawData.forEach(row => {
        // Nếu câu hỏi này chưa có trong bộ chứa, thì khởi tạo nó
        if (!questionsMap[row.question_id]) {
          questionsMap[row.question_id] = {
            id: row.question_id,
            content: row.question_content,
            order: row.question_order,
            options: [] // Khởi tạo mảng rỗng để nhét đáp án vào sau
          };
        }
        // Sau đó đẩy đáp án vào trong options của câu hỏi đó
        questionsMap[row.question_id].options.push({
          id: row.option_id,
          content: row.option_content,
          score: row.score
        });
      });

      // Chuyển cái bộ chứa (Map) về lại thành Mảng (Array) chuẩn JSON
      const questionsArray = Object.values(questionsMap);

      // 4. Trả về kết quả hoành tráng cho Client
      res.status(200).json({
        message: 'Lấy dữ liệu bài test thành công',
        test: {
          id: testInfo.id,
          name: testInfo.name,
          description: testInfo.description,
          questions: questionsArray
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/tests/submit
  submitTest: async (req, res, next) => {
    try {
      const userId = req.user.user_id;
      const { test_id, option_ids } = req.body;

      if (!test_id || !option_ids || !Array.isArray(option_ids) || option_ids.length === 0) {
        return res.status(400).json({ message: 'Dữ liệu nộp bài không hợp lệ, mảng đáp án không được trống' });
      }

      // 1. Đưa mảng option_ids qua Model để cộng tổng điểm
      const numericOptionIds = option_ids.map(id => parseInt(id)).filter(id => !isNaN(id));
      const totalScore = await testModel.getOptionsScore(numericOptionIds);

      // 2. Chấm điểm (File utils/scoring.js) 
      let category = '';
      if (test_id === 1) {
        category = scoring.evaluateZungAnxiety(totalScore);
      } else {
        category = 'Chưa xác định mức độ';
      }

      // 3. Lưu kết quả vào bảng test_results trong MySQL
      const resultId = await testModel.saveTestResult(userId, test_id, totalScore, category);

      // 4. Trả kết quả cuối cùng
      res.status(201).json({
        message: 'Nộp bài test thành công',
        result: {
          id: resultId,
          test_id,
          total_score: totalScore,
          category: category
        }
      });

    } catch (error) {
      next(error);
    }
  }
};

module.exports = testController;
