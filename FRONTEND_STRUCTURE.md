# 📱 Ứng Dụng Đánh Giá Và Hỗ Trợ Sức Khỏe Tâm Lý - Frontend (Mobile App)

Dự án này là phần Frontend của hệ thống đánh giá sức khỏe tâm lý, được xây dựng hoàn toàn bằng hệ sinh thái **React Native & Expo**. Mục tiêu kiến trúc là đảm bảo mã nguồn "sạch" (clean code), dễ bảo trì, tối ưu hóa cho TypeScript và bám sát các tiêu chuẩn của một dự án Production thực tế.

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

* **Core Framework:** React Native + Expo (Managed Workflow - Tối ưu cho Expo Go).
* **Ngôn Ngữ:** TypeScript (Strict Mode).
* **Điều Hướng (Routing):** React Navigation (Sử dụng Stack & Bottom Tabs thay vì Expo Router để kiểm soát luồng Auth tốt hơn).
* **Gọi API (Networking):** Axios (Sử dụng Axios Interceptors để tự động quản lý gắn/làm mới JWT Token).
* **Quản Lý Trạng Thái (State Management):** Zustand (Lưu trữ state global như thông tin User đang đăng nhập).
* **Lưu Trữ Cục Bộ (Local Storage):**
  * `expo-secure-store`: Lưu trữ an toàn tuyệt đối cho chuỗi Token đăng nhập.
  * `@react-native-async-storage/async-storage`: Lưu trữ bản nháp nhật ký, cài đặt theme (Sáng/Tối).
* **Thư Viện Hỗ Trợ (Expo Ecosystem):**
  * `expo-image-picker`: Chọn ảnh từ thư viện cho bài viết nhật ký.
  * `expo-font` & `@expo/vector-icons`: Quản lý font chữ và hệ thống icon.
* **Biểu Đồ (Charts):** `react-native-gifted-charts` (Vẽ biểu đồ cảm xúc hoàn toàn bằng JS/SVG, không kén Native).

## 📂 Kiến Trúc Thư Mục (Folder Structure)

Dự án sử dụng cơ chế **Alias Import** (Ví dụ: `import Button from '@/components/button'`) và phân chia Component theo Domain (Lĩnh vực nghiệp vụ).

```text
src/
├── api/                  # Cấu hình gọi mạng
│   ├── axiosClient.ts    # Cấu hình base URL, Axios Interceptors (gắn Token)
│   ├── auth.api.ts       # Các hàm gọi API đăng nhập, đăng ký
│   └── test.api.ts       # Các hàm gọi API gửi bài test, lấy kết quả
│
├── components/           # Các UI Component dùng chung hoặc theo chức năng
│   ├── button/           # Nút bấm dùng chung toàn app
│
├── constants/            # Chứa các hằng số không thay đổi
│   ├── colors.ts         # Bảng màu (Theme) của app
│   └── mock-data.ts      # Dữ liệu giả để test UI khi chưa có API
│
├── hooks/                # Custom React Hooks
│   ├── useNavigation.ts  # [QUAN TRỌNG] Chứa useAppNavigation, useAuthNavigation giúp loại bỏ Generic Hell của TS
│   └── useAuth.ts        # Hook xử lý logic đăng nhập/đăng xuất
│
├── navigation/           # Cấu hình luồng điều hướng của React Navigation
│   ├── AppNavigator.tsx  # Luồng màn hình chính khi đã đăng nhập (Tabs, Bài test, Nhật ký)
│   ├── AuthNavigator.tsx # Luồng màn hình khi chưa đăng nhập (Login, Register) 
│   └── RootNavigator.tsx # Nơi kiểm tra Token để quyết định hiện App hay Auth
│
├── providers/            # Các Context Providers bọc ngoài ứng dụng
│   └── auth.provider.tsx # Provider khởi tạo trạng thái Auth ban đầu
│
├── screens/              # Các Màn Hình chính (Ghép từ các components)
│   ├── auth/             # Màn hình Đăng nhập / Đăng ký
│   └── home/             # Màn hình trang chủ (Dashboard)
│
├── store/                # Quản lý State Global (Zustand)
│   └── auth.store.ts     # Lưu thông tin user profile
│
├── types/                # Định nghĩa các Interface/Type của TypeScript
│   ├── auth.types.ts     # Type cho User, Token
│   ├── api.types.ts      # Type cho các Response/Request từ Backend
│   └── navigation.types.ts # Type định nghĩa Params cho các màn hình (RootStackParamList)
│
└── utils/                # Các hàm tiện ích dùng chung
    ├── formatDate.ts     # Hàm đổi ngày giờ (ISO sang DD/MM/YYYY)
    └── validators.ts     # Hàm kiểm tra tính hợp lệ của Email, Mật khẩu
