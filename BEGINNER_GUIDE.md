# 👶 HƯỚNG DẪN CHO NGƯỜI MỚI BẮT ĐẦU

Nếu bạn chưa từng code hoặc chưa biết cách chạy project, đây là hướng dẫn chi tiết từng bước!

## 📋 Yêu cầu trước khi bắt đầu

### 1. Cài đặt Node.js

**Windows:**
1. Truy cập: https://nodejs.org
2. Download phiên bản LTS (khuyên dùng)
3. Chạy file .msi và làm theo hướng dẫn
4. Mở Command Prompt và gõ: `node --version`
5. Nếu hiện số version → Thành công!

**Kiểm tra:**
```bash
node --version
npm --version
```

### 2. Cài đặt Git (Tùy chọn)

**Windows:**
1. Truy cập: https://git-scm.com
2. Download và cài đặt
3. Mở Git Bash và gõ: `git --version`

### 3. Tạo tài khoản MongoDB Atlas (Miễn phí)

1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Nhấn "Try Free"
3. Đăng ký bằng email hoặc Google
4. Làm theo hướng dẫn tạo cluster (chọn FREE tier)

---

## 🚀 Bắt đầu với MealMe

### Bước 1: Mở thư mục project

1. Mở **File Explorer**
2. Vào thư mục `d:\MealMe`
3. Nhấn chuột phải → **"Open in Terminal"** (hoặc Command Prompt)

### Bước 2: Cài đặt Backend

```bash
cd backend
npm install
```

**Giải thích:** Lệnh này sẽ tải về tất cả thư viện cần thiết cho backend.

**Đợi 1-2 phút...**

### Bước 3: Cấu hình MongoDB

#### 3.1. Lấy Connection String

1. Vào MongoDB Atlas: https://cloud.mongodb.com
2. Nhấn **"Connect"** ở cluster của bạn
3. Chọn **"Connect your application"**
4. Copy chuỗi connection string (dạng: `mongodb+srv://...`)

#### 3.2. Cập nhật file .env

1. Mở file `backend\.env` bằng Notepad
2. Tìm dòng: `MONGO_URI=...`
3. Thay thế bằng connection string của bạn
4. Thay `<username>` và `<password>` bằng thông tin thật

**Ví dụ:**
```env
MONGO_URI=mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/mealme
JWT_SECRET=my_secret_key_2024
PORT=5000
NODE_ENV=development
```

5. Lưu file (Ctrl + S)

### Bước 4: Import dữ liệu mẫu

```bash
npm run seed
```

**Kết quả mong đợi:**
```
MongoDB Connected: cluster0.abc123.mongodb.net
✅ Data seeded successfully!
```

**Nếu lỗi:**
- Kiểm tra lại connection string
- Đảm bảo đã whitelist IP trong MongoDB Atlas:
  - Network Access → Add IP Address → Allow Access from Anywhere

### Bước 5: Chạy Backend

```bash
npm run dev
```

**Kết quả mong đợi:**
```
Server running on port 5000
MongoDB Connected: cluster0.abc123.mongodb.net
```

**Giữ terminal này mở!**

### Bước 6: Cài đặt Frontend (Terminal mới)

1. Mở terminal mới (Ctrl + Shift + ` trong VS Code)
2. Hoặc mở Command Prompt mới

```bash
cd d:\MealMe\frontend
npm install
```

**Đợi 1-2 phút...**

### Bước 7: Chạy Frontend

```bash
npm run dev
```

**Kết quả mong đợi:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Bước 8: Mở trình duyệt

1. Mở Chrome/Edge/Firefox
2. Truy cập: **http://localhost:3000**
3. Bạn sẽ thấy trang chủ MealMe! 🎉

---

## 🎮 Hướng dẫn sử dụng

### 1. Đăng ký tài khoản

1. Nhấn **"Đăng ký"** ở góc phải
2. Điền thông tin:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `123456`
   - Mục tiêu: Chọn bất kỳ (ví dụ: "Ăn healthy")
3. Nhấn **"Đăng ký"**

### 2. Khám phá Dashboard

Sau khi đăng ký, bạn sẽ thấy Dashboard với 4 tính năng chính:

#### 🔍 Gợi ý món ăn
1. Nhấn vào card "Gợi ý món ăn"
2. Nhập nguyên liệu: `trứng, bánh mì, phô mai`
3. Nhấn "Tìm món ăn"
4. Xem kết quả gợi ý!

#### 📅 Thực đơn 1 ngày
1. Nhấn vào card "Thực đơn 1 ngày"
2. Nhập ngân sách (tùy chọn): `100000`
3. Nhấn "Tạo thực đơn"
4. Xem menu cho 3 bữa: sáng, trưa, tối

#### 📆 Thực đơn 7 ngày
1. Nhấn vào card "Thực đơn 7 ngày"
2. Nhập ngân sách tuần (tùy chọn): `700000`
3. Nhấn "Tạo thực đơn tuần"
4. Xem menu cho cả tuần!

#### ❤️ Món yêu thích
1. Vào chi tiết món ăn bất kỳ
2. Nhấn nút "🤍 Lưu món"
3. Vào "Món yêu thích" để xem danh sách

---

## ❓ Câu hỏi thường gặp

### Q: Làm sao để dừng server?

**A:** Nhấn `Ctrl + C` trong terminal đang chạy server.

### Q: Port 5000 đã được sử dụng?

**A:** Đổi PORT trong file `backend\.env`:
```env
PORT=5001
```

### Q: Không kết nối được MongoDB?

**A:** 
1. Kiểm tra connection string trong `.env`
2. Vào MongoDB Atlas → Network Access
3. Nhấn "Add IP Address" → "Allow Access from Anywhere"
4. Chạy lại `npm run dev`

### Q: Trang web không hiển thị dữ liệu?

**A:**
1. Kiểm tra backend đang chạy (http://localhost:5000)
2. Kiểm tra đã chạy `npm run seed` chưa
3. Xem console trong browser (F12) để check lỗi

### Q: Làm sao để chạy lại từ đầu?

**A:**
```bash
# Dừng cả 2 server (Ctrl + C)

# Terminal 1 - Backend
cd d:\MealMe\backend
npm run dev

# Terminal 2 - Frontend
cd d:\MealMe\frontend
npm run dev
```

### Q: Muốn thêm món ăn mới?

**A:**
1. Mở file `backend\data\meals.json`
2. Thêm món mới theo format có sẵn
3. Chạy lại: `npm run seed`

---

## 🎓 Học thêm

### Muốn hiểu code hơn?

**Backend (Node.js):**
- `server.js` - File chính khởi động server
- `models/` - Định nghĩa cấu trúc dữ liệu
- `controllers/` - Logic xử lý
- `routes/` - Định nghĩa API endpoints

**Frontend (React):**
- `src/App.jsx` - Component chính
- `src/pages/` - Các trang web
- `src/components/` - Các component tái sử dụng
- `src/context/` - Quản lý state toàn cục

### Tài nguyên học tập:

- **React:** https://react.dev/learn
- **Node.js:** https://nodejs.org/en/docs/
- **MongoDB:** https://www.mongodb.com/docs/
- **Express:** https://expressjs.com/

---

## 🆘 Cần trợ giúp?

1. Đọc file `README.md` để biết thêm chi tiết
2. Đọc file `QUICKSTART.md` cho hướng dẫn nhanh
3. Check file `CHECKLIST.md` để đảm bảo không thiếu gì

---

## 🎉 Chúc mừng!

Bạn đã chạy thành công project MealMe! 

**Next steps:**
- Thử tất cả tính năng
- Tùy chỉnh giao diện
- Thêm món ăn mới
- Deploy lên internet (xem `DEPLOY.md`)

**Happy coding! 🚀**
