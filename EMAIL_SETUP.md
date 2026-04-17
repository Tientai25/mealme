# 📧 HƯỚNG DẪN SETUP EMAIL - MealMe

Hướng dẫn cấu hình Gmail để gửi email chào mừng khi đăng ký

---

## 🎯 Tính năng Email

Khi user đăng ký tài khoản mới, hệ thống sẽ tự động gửi email chào mừng với:
- ✅ Lời chào mừng cá nhân hóa
- ✅ Giới thiệu các tính năng chính
- ✅ Link truy cập Dashboard
- ✅ Thiết kế đẹp mắt với HTML/CSS

---

## 📝 Bước 1: Tạo App Password cho Gmail

### 1.1. Bật xác thực 2 bước (2FA)

1. Truy cập: https://myaccount.google.com/security
2. Tìm **"2-Step Verification"** (Xác minh 2 bước)
3. Nhấn **"Get Started"** và làm theo hướng dẫn
4. Xác thực bằng số điện thoại

### 1.2. Tạo App Password

1. Sau khi bật 2FA, quay lại: https://myaccount.google.com/security
2. Tìm **"App passwords"** (Mật khẩu ứng dụng)
3. Nhấn vào **"App passwords"**
4. Chọn:
   - **App:** Mail
   - **Device:** Other (Custom name)
   - Nhập tên: `MealMe Backend`
5. Nhấn **"Generate"**
6. Copy mật khẩu 16 ký tự (dạng: `xxxx xxxx xxxx xxxx`)

**Lưu ý:** Mật khẩu này chỉ hiện 1 lần, hãy lưu lại!

---

## ⚙️ Bước 2: Cấu hình Backend

### 2.1. Cập nhật file .env

Mở file `backend/.env` và thêm:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**Thay thế:**
- `your-email@gmail.com` → Email Gmail của bạn
- `xxxx xxxx xxxx xxxx` → App Password vừa tạo (giữ nguyên dấu cách)

**Ví dụ:**
```env
EMAIL_USER=mealme.app@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### 2.2. Cài đặt nodemailer

```bash
cd backend
npm install
```

Nodemailer đã được thêm vào `package.json`.

---

## 🧪 Bước 3: Test gửi email

### 3.1. Chạy backend

```bash
cd backend
npm run dev
```

### 3.2. Đăng ký tài khoản mới

1. Mở frontend: http://localhost:3000
2. Nhấn **"Đăng ký"**
3. Điền thông tin:
   - Username: `testuser`
   - Email: **Email thật của bạn** (để nhận email)
   - Password: `123456`
   - Mục tiêu: Chọn bất kỳ
4. Nhấn **"Đăng ký"**

### 3.3. Kiểm tra email

1. Mở hộp thư email của bạn
2. Tìm email từ **MealMe 🍽️**
3. Nếu không thấy, check **Spam/Junk**

**Email sẽ có:**
- Subject: "Chào mừng bạn đến với MealMe! 🎉"
- Nội dung HTML đẹp mắt
- Button "Bắt đầu ngay!"

---

## 🎨 Tùy chỉnh Email Template

### Sửa nội dung email

Mở file: `backend/services/emailService.js`

```javascript
const sendWelcomeEmail = async (email, username) => {
  const mailOptions = {
    from: `"MealMe 🍽️" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Chào mừng bạn đến với MealMe! 🎉',
    html: `
      <!-- Sửa HTML ở đây -->
    `
  };
  // ...
};
```

### Thay đổi màu sắc

Trong phần `<style>`:
```css
.header { 
  background: linear-gradient(135deg, #4caf50 0%, #81c784 100%); 
}
.button { 
  background: #4caf50; 
}
```

### Thay đổi link Dashboard

Tìm dòng:
```html
<a href="http://localhost:3000/dashboard" class="button">
```

Đổi thành URL production khi deploy:
```html
<a href="https://your-app.vercel.app/dashboard" class="button">
```

---

## 🔧 Troubleshooting

### Lỗi: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Nguyên nhân:** Chưa bật 2FA hoặc App Password sai

**Giải pháp:**
1. Bật 2-Step Verification
2. Tạo lại App Password
3. Copy đúng 16 ký tự (có dấu cách)
4. Cập nhật lại `.env`

---

### Lỗi: "Error sending email: connect ETIMEDOUT"

**Nguyên nhân:** Firewall hoặc mạng chặn port 587/465

**Giải pháp:**
1. Check firewall
2. Thử mạng khác
3. Hoặc tắt tạm email (xem phần dưới)

---

### Lỗi: "self signed certificate in certificate chain"

**Nguyên nhân:** SSL certificate issue

**Giải pháp:** Thêm vào `emailService.js`:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
```

---

### Email vào Spam

**Giải pháp:**
1. Đánh dấu "Not Spam" lần đầu
2. Thêm sender vào Contacts
3. Khi deploy production, setup SPF/DKIM records

---

## 🚫 Tắt tính năng Email (Tùy chọn)

Nếu không muốn dùng email, có thể tắt:

### Cách 1: Không cấu hình EMAIL_USER

Để trống trong `.env`:
```env
EMAIL_USER=
EMAIL_PASSWORD=
```

Code sẽ tự động bỏ qua việc gửi email.

### Cách 2: Comment code

Trong `authController.js`:
```javascript
// sendWelcomeEmail(email, username);
```

---

## 📊 Email Templates khác

### Email Reset Password (Có sẵn)

File `emailService.js` đã có template reset password, có thể dùng sau:

```javascript
const { sendResetPasswordEmail } = require('../services/emailService');

// Trong controller
await sendResetPasswordEmail(email, resetToken);
```

### Thêm template mới

Thêm vào `emailService.js`:

```javascript
const sendMealPlanEmail = async (email, username, mealPlan) => {
  const mailOptions = {
    from: `"MealMe 🍽️" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thực đơn tuần của bạn đã sẵn sàng! 📅',
    html: `
      <!-- HTML template -->
    `
  };
  
  await transporter.sendMail(mailOptions);
};

module.exports = { 
  sendWelcomeEmail, 
  sendMealPlanEmail 
};
```

---

## 🌐 Deploy với Email

### Cập nhật .env trên Render

1. Vào Render Dashboard
2. Chọn service backend
3. Environment → Add Environment Variable:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```
4. Save changes

### Cập nhật link trong email

Đổi từ `localhost:3000` sang URL production:
```javascript
<a href="https://mealme.vercel.app/dashboard" class="button">
```

---

## 💡 Tips

### Tip 1: Dùng email riêng cho app
Tạo Gmail mới cho MealMe thay vì dùng email cá nhân:
- `mealme.app@gmail.com`
- `noreply.mealme@gmail.com`

### Tip 2: Test với Mailtrap
Dùng Mailtrap.io để test email trong development:
```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "your-mailtrap-user",
    pass: "your-mailtrap-pass"
  }
});
```

### Tip 3: Async email
Email được gửi async nên không làm chậm response đăng ký.

### Tip 4: Log email
Check terminal để xem email đã gửi:
```
✅ Email sent to user@example.com
```

---

## 📈 Nâng cao

### Dùng SendGrid (Production)

SendGrid tốt hơn Gmail cho production:

1. Đăng ký: https://sendgrid.com
2. Lấy API Key
3. Cập nhật code:
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email,
  from: 'noreply@mealme.com',
  subject: 'Welcome to MealMe!',
  html: '...'
};

await sgMail.send(msg);
```

### Email Queue với Bull

Dùng Redis + Bull để queue emails:
```bash
npm install bull redis
```

---

## ✅ Checklist

- [ ] Bật 2FA cho Gmail
- [ ] Tạo App Password
- [ ] Cập nhật `.env` với EMAIL_USER và EMAIL_PASSWORD
- [ ] Chạy `npm install`
- [ ] Test đăng ký với email thật
- [ ] Check email đã nhận
- [ ] Tùy chỉnh template (nếu muốn)
- [ ] Cập nhật link khi deploy

---

## 🎉 Hoàn thành!

Bây giờ MealMe đã có tính năng gửi email chào mừng như các web chuyên nghiệp! 📧

**Test ngay:** Đăng ký tài khoản mới và check email! 🚀
