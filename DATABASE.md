# Kiến Trúc Cơ Sở Dữ Liệu (MySQL)

Hệ thống sử dụng Cơ sở dữ liệu quan hệ (Relational Database) bao gồm 8 bảng, đạt chuẩn thiết kế 3NF, phục vụ luồng nghiệp vụ đánh giá tâm lý và ghi chú nhật ký.

## 🗄️ Danh sách các bảng (Tables)

### Nhóm 1: Quản lý Người dùng & Cảm xúc
* **`users`**: Lưu thông tin định danh của người dùng (ID, email, password_hash, ngày sinh, giới tính).
* **`emotions`**: Lưu danh mục các biểu tượng cảm xúc để chuẩn hóa dữ liệu thống kê (ID, tên cảm xúc, URL icon).
* **`diaries`**: Lưu trữ các bài viết nhật ký hằng ngày (Khóa ngoại trỏ về `users` và `emotions`).

### Nhóm 2: Quản lý Bài Test (Dynamic Tests)
Thiết kế lưu trữ câu hỏi và đáp án độc lập giúp hệ thống linh hoạt mở rộng các bài test (ZUNG, BECK, YOUNG) mà không cần sửa code.
* **`tests`**: Lưu thông tin chung của bộ test (Tên bộ test, mô tả).
* **`questions`**: Lưu nội dung từng câu hỏi (Khóa ngoại trỏ về `tests`).
* **`options`**: Lưu các lựa chọn đáp án và điểm số tương ứng. Thiết kế này giải quyết triệt để vấn đề "tính điểm ngược" hoặc "điểm nhảy cóc" của các thang đo y khoa.

### Nhóm 3: Lưu trữ Kết quả & Phác đồ
* **`test_results`**: Lưu lịch sử làm bài (Tổng điểm, Phân loại mức độ), phục vụ vẽ biểu đồ tiến triển.
* **`treatments`**: Lưu trữ các lộ trình hỗ trợ theo từng tuần, được ánh xạ (map) với kết quả phân loại của người dùng.

## 🔗 Mối quan hệ (Relationships)
* `users` (1) --- (N) `diaries`
* `users` (1) --- (N) `test_results`
* `tests` (1) --- (N) `questions`
* `questions` (1) --- (N) `options`
* `emotions` (1) --- (N) `diaries`

