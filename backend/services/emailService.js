const nodemailer = require('nodemailer');

// Tạo transporter với Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Gửi email chào mừng khi đăng ký
const sendWelcomeEmail = async (email, username) => {
  const mailOptions = {
    from: `"MealMe 🍽️" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Chào mừng bạn đến với MealMe! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4caf50 0%, #81c784 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #4caf50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #4caf50; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍽️ Chào mừng đến với MealMe!</h1>
          </div>
          <div class="content">
            <h2>Xin chào ${username}! 👋</h2>
            <p>Cảm ơn bạn đã đăng ký tài khoản MealMe. Chúng tôi rất vui được đồng hành cùng bạn trong hành trình ăn uống lành mạnh!</p>
            
            <h3>🎯 Bạn có thể làm gì với MealMe?</h3>
            
            <div class="feature">
              <strong>🔍 Gợi ý món ăn thông minh</strong>
              <p>Nhập nguyên liệu có sẵn, nhận gợi ý món ăn phù hợp với mục tiêu của bạn</p>
            </div>
            
            <div class="feature">
              <strong>📅 Thực đơn tự động</strong>
              <p>Tạo thực đơn 1 ngày hoặc 7 ngày không trùng lặp</p>
            </div>
            
            <div class="feature">
              <strong>❤️ Lưu món yêu thích</strong>
              <p>Bookmark các món ăn bạn thích để dễ dàng tìm lại</p>
            </div>
            
            <div style="text-align: center;">
              <a href="http://localhost:3000/dashboard" class="button">Bắt đầu ngay! 🚀</a>
            </div>
            
            <p style="margin-top: 30px;">Nếu bạn có bất kỳ câu hỏi nào, đừng ngại liên hệ với chúng tôi!</p>
            
            <p>Chúc bạn có trải nghiệm tuyệt vời! 🌟</p>
            
            <p><strong>Đội ngũ MealMe</strong></p>
          </div>
          <div class="footer">
            <p>Email này được gửi tự động, vui lòng không reply.</p>
            <p>© 2024 MealMe. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}`);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

module.exports = { sendWelcomeEmail };
