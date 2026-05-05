const nodemailer = require('nodemailer');
require('dotenv').config();

// Tạo transporter để kết nối với máy chủ SMTP của Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Hàm gửi email chung
 * @param {string} to - Địa chỉ email người nhận
 * @param {string} subject - Tiêu đề email
 * @param {string} text - Nội dung text của email
 */
const sendMail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"Đội ngũ Psychological Health" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email đã được gửi thành công: ' + info.response);
    return true;
  } catch (error) {
    console.error('❌ Lỗi khi gửi Email:', error);
    return false;
  }
};

module.exports = {
  sendMail
};
