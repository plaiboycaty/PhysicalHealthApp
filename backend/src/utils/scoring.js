/**
 * File chứa các thuật toán Y tế / Nghiệp vụ.
 * Tách file này ra giúp Database không bị ảnh hưởng khi mình chỉnh sửa thang điểm.
 */

const evaluateZungAnxiety = (score) => {
  // Thang điểm Zung SAS (Dựa trên tài liệu y khoa bạn cung cấp)
  if (score <= 40) return 'Không lo âu';
  if (score >= 41 && score <= 50) return 'Lo âu mức độ nhẹ';
  if (score >= 51 && score <= 60) return 'Lo âu mức độ vừa';
  if (score >= 61 && score <= 70) return 'Lo âu mức độ nặng';

  return 'Lo âu mức độ rất nặng';
};

// Nếu có bài BECK hay YOUNG thì định nghĩa hàm ở đây rồi export ra chung
// const evaluateBeckDepression = (score) => { ... }

module.exports = {
  evaluateZungAnxiety
};
