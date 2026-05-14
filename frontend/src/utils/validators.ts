export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateLoginForm = (email: string, password: string): { email?: string, password?: string } => {
  const errors: { email?: string, password?: string } = {};

  if (!email.trim()) {
    errors.email = 'Vui lòng nhập E-mail';
  } else if (!isValidEmail(email)) {
    errors.email = 'E-mail không hợp lệ';
  }

  if (!password) {
    errors.password = 'Vui lòng nhập mật khẩu';
  }

  return errors;
};

export const validateRegisterForm = (
  fullName: string, 
  email: string, 
  password: string, 
  confirmPassword: string, 
  gender: string, 
  dob: string
): any => {
  const errors: any = {};

  if (!fullName.trim()) errors.fullName = 'Vui lòng nhập họ và tên';
  
  if (!email.trim()) {
    errors.email = 'Vui lòng nhập E-mail';
  } else if (!isValidEmail(email)) {
    errors.email = 'E-mail không hợp lệ';
  }

  if (!password) {
    errors.password = 'Vui lòng nhập mật khẩu';
  } else if (password.length < 6) {
    errors.password = 'Mật khẩu phải từ 6 ký tự';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }

  if (!gender) errors.gender = 'Vui lòng chọn giới tính';

  if (!dob.trim()) {
    errors.dob = 'Vui lòng nhập sinh nhật';
  } else {
    const dobParts = dob.split('/');
    if (dobParts.length !== 3 || isNaN(Number(dobParts[0])) || isNaN(Number(dobParts[1])) || isNaN(Number(dobParts[2]))) {
      errors.dob = 'Nhập theo định dạng Ngày/Tháng/Năm';
    }
  }

  return errors;
};
