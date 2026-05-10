const jwt = require('jsonwebtoken');

const optionalAuthMiddleware = (req, res, next) => {
  // 1. Lấy chuỗi token từ header "Authorization"
  const authHeader = req.header('Authorization');

  // Nếu không có token -> Coi là Khách (Guest)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  // 2. Nếu có Token, cắt lấy phần token thực sự
  const token = authHeader.split(' ')[1];

  try {
    // 3. Giải mã và xác thực token
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Nếu Token hợp lệ, gán thông tin user vào req.user (User đã đăng ký)
    req.user = decodedPayload;
    next();
  } catch (error) {
    // Nếu token hết hạn hoặc sai lệch, vẫn coi họ là Khách (Không chặn lỗi 401 như authMiddleware)
    req.user = null;
    next();
  }
};

module.exports = optionalAuthMiddleware;
