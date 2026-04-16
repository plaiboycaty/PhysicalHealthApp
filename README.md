# Ứng Dụng Đánh Giá Sức Khỏe Tâm Lý

Đây là đồ án tốt nghiệp chuyên ngành Công nghệ Phần mềm. Ứng dụng di động giúp người dùng tự đánh giá mức độ sức khỏe tâm lý thông qua các thang đo chuẩn y khoa, đồng thời cung cấp công cụ theo dõi cảm xúc và gợi ý phác đồ hỗ trợ phù hợp.

## 👨‍💻 Sinh viên thực hiện
* **Họ và tên:** Trần Minh Quân
* **Ngành học:** Công nghệ Phần mềm

## 🛠 Công nghệ sử dụng
Hệ thống được xây dựng theo mô hình Client - Server:
* **Frontend (Mobile App):** React Native, Expo, TypeScript.
* **Backend (RESTful API):** Node.js, Express.js.
* **Cơ sở dữ liệu:** MySQL.
* **Lưu trữ Local:** Expo SecureStore (Token), AsyncStorage.
* **Thiết kế UI/UX:** Figma.

## ✨ Tính năng cốt lõi
1. **Hệ thống Tài khoản:** Đăng nhập, đăng ký và bảo mật bằng JWT.
2. **Đánh giá Tâm lý:** Thực hiện các bài test chuẩn hóa 
(ZUNG - Lo âu, BECK - Trầm cảm, YOUNG - Hưng cảm) với thuật toán tính điểm tự động từ Backend.
3. **Nhật ký Cảm xúc:** Ghi chú lại cảm xúc hàng ngày kèm biểu tượng trực quan.
4. **Thống kê & Biểu đồ:** Trực quan hóa biến động tâm lý và tần suất cảm xúc theo thời gian.
5. **Phác đồ Hỗ trợ:** Đề xuất các lộ trình tĩnh tâm, bài tập hàng ngày dựa trên kết quả bài test.

## 🚀 Hướng dẫn cài đặt (Dành cho môi trường phát triển)
1. Clone dự án về máy.
2. Cài đặt thư viện cho Backend: `cd backend && npm install`
3. Cài đặt thư viện cho Frontend: `cd frontend && npm install`
4. Cấu hình file `.env` cho Backend (kết nối MySQL).
5. Khởi chạy Backend: `npm run dev`
6. Khởi chạy Frontend App: `npx expo start`