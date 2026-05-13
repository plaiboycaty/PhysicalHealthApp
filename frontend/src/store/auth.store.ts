import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  gender: string;
  dob: string;
  avatar_url?: string;
  treatment_status?: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (token: string, user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
  updateUser: (user: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true, // Mặc định là true khi app vừa mở lên

  login: async (token, user) => {
    // Lưu token vào nơi bảo mật nhất của điện thoại
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    // Xóa token khỏi máy
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },

  restoreToken: async () => {
    try {
      // Khi app vừa mở, chui vào SecureStore lấy token ra xem có không
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        // Có token -> Tạm thời cho là đã đăng nhập (Sẽ cần API lấy lại User Profile sau)
        // Trong thực tế, có token ta sẽ gọi API /users/me để lấy user. 
        // Ở đây tạm set isAuthenticated = true.
        set({ token, isAuthenticated: true, isLoading: false });
      } else {
        // Không có token -> Chưa đăng nhập
        set({ token: null, isAuthenticated: false, isLoading: false });
      }
    } catch (e) {
      set({ token: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateUser: (updatedUser) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    }));
  },
}));
