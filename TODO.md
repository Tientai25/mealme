# ✅ TODO - Chạy MealMe lần đầu

Copy checklist này và làm theo từng bước!

## 📋 Trước khi bắt đầu

- [ ] Đã cài Node.js (version 16+)
- [ ] Đã có tài khoản MongoDB Atlas (miễn phí)
- [ ] Đã mở thư mục project trong VS Code hoặc terminal

---

## 🔧 Setup Backend

### 1. Cài đặt dependencies
```bash
cd backend
npm install
```
- [ ] Chạy lệnh trên
- [ ] Đợi cài đặt xong (1-2 phút)
- [ ] Không có lỗi

### 2. Cấu hình MongoDB
- [ ] Truy cập https://cloud.mongodb.com
- [ ] Đăng nhập/Đăng ký
- [ ] Tạo cluster (chọn FREE tier)
- [ ] Nhấn "Connect" → "Connect your application"
- [ ] Copy connection string

### 3. Cập nhật .env
- [ ] Mở file `backend/.env`
- [ ] Paste connection string vào `MONGO_URI`
- [ ] Thay `<username>` và `<password>` bằng thông tin thật
- [ ] Đổi `JWT_SECRET` thành chuỗi bí mật của bạn
- [ ] Lưu file

**Ví dụ .env:**
```env
MONGO_URI=mongodb+srv://myuser:mypass@cluster0.abc.mongodb.net/mealme
JWT_SECRET=my_super_secret_key_2024
PORT=5000
NODE_ENV=development
```

### 4. Whitelist IP trong MongoDB
- [ ] Vào MongoDB Atlas → Network Access
- [ ] Nhấn "Add IP Address"
- [ ] Chọn "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Confirm

### 5. Import dữ liệu
```bash
npm run seed
```
- [ ] Chạy lệnh trên
- [ ] Thấy "✅ Data seeded successfully!"
- [ ] Không có lỗi

### 6. Chạy backend
```bash
npm run dev
```
- [ ] Chạy lệnh trên
- [ ] Thấy "Server running on port 5000"
- [ ] Thấy "MongoDB Connected: ..."
- [ ] **GIỮ TERMINAL NÀY MỞ!**

### 7. Test backend
- [ ] Mở browser
- [ ] Truy cập http://localhost:5000
- [ ] Thấy: `{"message": "MealMe API is running 🍽️"}`

---

## 🎨 Setup Frontend

### 1. Mở terminal mới
- [ ] Mở terminal mới (Ctrl + Shift + ` trong VS Code)
- [ ] Hoặc mở Command Prompt mới

### 2. Cài đặt dependencies
```bash
cd frontend
npm install
```
- [ ] Chạy lệnh trên (từ thư mục gốc MealMe)
- [ ] Đợi cài đặt xong (1-2 phút)
- [ ] Không có lỗi

### 3. Chạy frontend
```bash
npm run dev
```
- [ ] Chạy lệnh trên
- [ ] Thấy "Local: http://localhost:3000"
- [ ] **GIỮ TERMINAL NÀY MỞ!**

### 4. Mở web app
- [ ] Mở browser
- [ ] Truy cập http://localhost:3000
- [ ] Thấy trang chủ MealMe với hero section xanh lá
- [ ] Không có lỗi trong Console (F12)

---

## 🎮 Test tính năng

### 1. Đăng ký tài khoản
- [ ] Nhấn "Đăng ký" ở góc phải
- [ ] Điền form:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `123456`
  - Mục tiêu: Chọn bất kỳ
- [ ] Nhấn "Đăng ký"
- [ ] Redirect về Dashboard
- [ ] Thấy "Xin chào, testuser!"

### 2. Test Gợi ý món
- [ ] Nhấn "Gợi ý món ăn"
- [ ] Nhập: `trứng, bánh mì`
- [ ] Nhấn "Tìm món ăn"
- [ ] Thấy danh sách món gợi ý
- [ ] Có ảnh, tên, giá, calories

### 3. Test Thực đơn ngày
- [ ] Nhấn "Thực đơn 1 ngày"
- [ ] Nhập ngân sách: `100000`
- [ ] Nhấn "Tạo thực đơn"
- [ ] Thấy 3 bữa: sáng, trưa, tối
- [ ] Có tổng calories và giá

### 4. Test Thực đơn tuần
- [ ] Nhấn "Thực đơn 7 ngày"
- [ ] Nhập ngân sách: `700000`
- [ ] Nhấn "Tạo thực đơn tuần"
- [ ] Thấy menu 7 ngày
- [ ] Các món không trùng lặp

### 5. Test Yêu thích
- [ ] Vào chi tiết món bất kỳ
- [ ] Nhấn "🤍 Lưu món"
- [ ] Thấy "❤️ Đã lưu"
- [ ] Vào "Món yêu thích"
- [ ] Thấy món vừa lưu

### 6. Test Logout
- [ ] Nhấn "Đăng xuất"
- [ ] Redirect về trang chủ
- [ ] Không vào được Dashboard nữa

### 7. Test Login
- [ ] Nhấn "Đăng nhập"
- [ ] Nhập email: `test@example.com`
- [ ] Nhập password: `123456`
- [ ] Nhấn "Đăng nhập"
- [ ] Vào được Dashboard

---

## 🎉 Hoàn thành!

Nếu tất cả các bước trên đều ✅, chúc mừng bạn đã chạy thành công MealMe!

### 📚 Bước tiếp theo:

- [ ] Đọc `README.md` để hiểu rõ hơn về project
- [ ] Đọc `DEPLOY.md` nếu muốn deploy lên internet
- [ ] Thử tùy chỉnh code và thêm tính năng mới
- [ ] Share với bạn bè!

---

## ⚠️ Nếu gặp lỗi:

### Backend không chạy được:
1. Check connection string trong `.env`
2. Check đã whitelist IP trong MongoDB chưa
3. Check port 5000 có bị chiếm không
4. Xem logs trong terminal để biết lỗi cụ thể

### Frontend không hiển thị data:
1. Check backend có đang chạy không (http://localhost:5000)
2. Check đã seed data chưa (`npm run seed`)
3. Mở Console (F12) xem lỗi
4. Check proxy trong `vite.config.js`

### Lỗi "Module not found":
1. Chạy lại `npm install` trong thư mục đó
2. Xóa `node_modules` và `package-lock.json`
3. Chạy lại `npm install`

### Lỗi khác:
1. Đọc `BEGINNER_GUIDE.md` phần Troubleshooting
2. Google error message
3. Check logs trong terminal

---

## 📞 Cần trợ giúp thêm?

Đọc các file sau:
- `BEGINNER_GUIDE.md` - Hướng dẫn chi tiết cho người mới
- `QUICKSTART.md` - Hướng dẫn nhanh
- `README.md` - Tài liệu đầy đủ
- `CHECKLIST.md` - Checklist tất cả tính năng

---

**Good luck! 🚀**
