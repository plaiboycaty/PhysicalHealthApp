# Cấu Trúc Mã Nguồn Backend

Backend được xây dựng bằng Node.js & Express.js, tuân thủ nghiêm ngặt mô hình kiến trúc MVC (Model - View - Controller) dành cho RESTful API.

## 📂 Sơ đồ Thư mục
```text
backend/
├── src/
│   ├── config/             # Cấu hình kết nối MySQL và các biến môi trường
│   ├── controllers/        # "Bộ não" xử lý logic nghiệp vụ (Auth, Test, Diary)
│   ├── models/             # Chứa các câu truy vấn SQL tương tác trực tiếp với Database
│   ├── routes/             # Định tuyến các API endpoints
│   ├── middlewares/        # Các lớp bảo vệ (Kiểm tra JWT, Validation dữ liệu)
│   ├── utils/              # Các hàm hỗ trợ (Format ngày tháng, tính toán biểu đồ)
│   └── server.js           # File khởi chạy ứng dụng Express
├── .env                    # Biến bảo mật (PORT, DB_INFO, JWT_SECRET)
└── package.json            # Quản lý dependencies