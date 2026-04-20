const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Lấy chuỗi token từ header "Authorization"
  const authHeader = req.header('Authorization');

  // Kiểm tra: Không có header hoặc format không phải là "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      status: 401, 
      message: '🚨 Truy cập bị từ chối. Không tìm thấy Token hợp lệ!' 
    });
  }

  // 2. Cắt lấy phần token thực sự ở phía sau chữ "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // 3. Giải mã và xác thực token bằng Mã Bí Mật (JWT_SECRET)
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Gắn toàn bộ thông tin đã giải mã (user_id, email,...) vào req.user
    // Bất cứ function nào đứng sau trạm gác này đều có thể lấy req.user ra xài
    req.user = decodedPayload;
    
    // Cho phép mở cổng để request đi tới Controller tiếp theo
    next();
  } catch (error) {
    // Nếu token hết hạn so với thời điểm expiresIn
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        status: 401, 
        message: '⏰ Token đã hết hạn. Vui lòng đăng nhập lại!' 
      });
    }
    
    // Nếu token bị chỉnh sửa bậy bạ
    return res.status(401).json({ 
      status: 401, 
      message: '❌ Token không hợp lệ hoặc đã bị can thiệp!' 
    });
  }
};

module.exports = authMiddleware;
