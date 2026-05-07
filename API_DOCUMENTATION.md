# TÀI LIỆU TÍCH HỢP API (API DOCUMENTATION)
Dự án: **Physical Health App** (Backend: Node.js/Express)

> [!IMPORTANT]
> **Base URL (Gốc):** `http://localhost:3000/api`
> **Xác thực (Auth):** Hầu hết các API đều yêu cầu gửi kèm Token trong Header.
> ```json
> { "Authorization": "Bearer <TOKEN_CỦA_BẠN>" }
> ```

---

## 1. Module Tài Khoản (Authentication & Profile)

### 1.1 Đăng ký
- **URL:** `POST /auth/register`
- **Body (JSON):**
```json
{
  "full_name": "Nguyễn Văn A",
  "email": "nva@gmail.com",
  "password": "mypassword123",
  "gender": "Male",
  "dob": "2000-01-01"
}
```

### 1.2 Đăng nhập
- **URL:** `POST /auth/login`
- **Body (JSON):**
```json
{
  "email": "nva@gmail.com",
  "password": "mypassword123"
}
```
- **Response quan trọng:** Sẽ trả về `token` để dùng cho các API bên dưới.

### 1.3 Lấy thông tin cá nhân
- **URL:** `GET /users/me`
- **Header:** Cần Token

### 1.4 Cập nhật thông tin cá nhân
- **URL:** `PUT /users/me`
- **Header:** Cần Token
- **Body (JSON):** (Không được phép gửi lên `email`)
```json
{
  "full_name": "Nguyễn Văn A (Mới)",
  "gender": "Female",
  "dob": "2000-05-20",
  "avatar_url": "https://link-anh.com/anh.jpg"
}
```

---

## 2. Module Nhật ký & Cảm xúc (Diaries)

### 2.1 Lấy danh sách 5 icon Cảm xúc
- **URL:** `GET /emotions`
- **Header:** Cần Token

### 2.2 Lấy danh sách Nhật ký của tôi
- **URL:** `GET /diaries`
- **Header:** Cần Token

### 2.3 Viết Nhật ký mới
- **URL:** `POST /diaries`
- **Header:** Cần Token
- **Body (JSON):** (`image_url` có thể bỏ trống)
```json
{
  "emotion_id": 1,
  "title": "Hôm nay tuyệt vời",
  "content": "Tôi đã code xong Backend",
  "image_url": "https://imgur.com/anh.jpg"
}
```

### 2.4 Sửa / Xóa Nhật ký
- **URL Sửa:** `PUT /diaries/:id` (Body giống hệt nút Viết mới)
- **URL Xóa:** `DELETE /diaries/:id`
- **Ghi chú:** Đổi `:id` thành ID thực sự của bài nhật ký (Ví dụ: `/diaries/5`).

---

## 3. Module Bài Đánh giá (Tests)

### 3.1 Lấy danh mục các Bài Test
- **URL:** `GET /tests`

### 3.2 Lấy chi tiết câu hỏi & đáp án
- **URL:** `GET /tests/:id` (Ví dụ: `/tests/1` là bài ZUNG)
- **Header:** Cần Token

### 3.3 Nộp bài Test (Rất quan trọng)
- **URL:** `POST /tests/submit`
- **Header:** Cần Token
- **Body (JSON):** (`option_ids` là mảng chứa các đáp án người dùng chọn)
```json
{
  "test_id": 1,
  "option_ids": [1, 5, 12, 16]
}
```
- **Response:** Cần bắt cờ `treatment_status` (Trị giá: `healthy`, `treatment`, `emergency`) để bật Modal.

### 3.4 Gửi Email Cấp Cứu
- **URL:** `POST /tests/emergency-email`
- **Header:** Cần Token
- **Body (JSON):**
```json
{
  "category": "Lo âu mức độ rất nặng",
  "score": 75
}
```

---

## 4. Module Lộ trình & Thống kê

### 4.1 Lấy Lộ trình Điều trị 4 tuần
- **URL:** `GET /roadmap/my-roadmap`
- **Header:** Cần Token
- **Response:** Trả về mảng 4 tuần bài tập để vẽ Timeline.

### 4.2 Biểu đồ Đường (Lịch sử làm test)
- **URL:** `GET /statistics/tests/history?period=all` (Hoặc `period=month`)
- **Header:** Cần Token

### 4.3 Biểu đồ Tròn (Tỷ lệ Cảm xúc Vui/Buồn)
- **URL:** `GET /statistics/diaries/emotions?period=week` (Hoặc `period=all`)
- **Header:** Cần Token
