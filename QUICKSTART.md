# 🚀 HƯỚNG DẪN CHẠY NHANH - MealMe

## Bước 1: Cài đặt Backend

```bash
cd backend
npm install
```

## Bước 2: Cấu hình MongoDB

**Bạn có 2 lựa chọn:**

### Option 1: MongoDB Compass (Local - Nhanh hơn, khuyên dùng)

1. Truy cập: https://www.mongodb.com/try/download/community
2. Tải và cài MongoDB Community Server
3. Cài MongoDB Compass (GUI tool)
4. Mở Compass, connect: `mongodb://localhost:27017`
5. File `.env` đã sẵn sàng, không cần sửa!

**Chi tiết:** Xem file `MONGODB_COMPASS_SETUP.md`

### Option 2: MongoDB Atlas (Cloud)

1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Đăng ký/Đăng nhập
3. Tạo cluster miễn phí
4. Nhấn "Connect" → "Connect your application"
5. Copy connection string
6. Cập nhật file `.env` với connection string của bạn

## Bước 3: Tạo file .env

File `.env` đã có sẵn trong `backend/`:

**Nếu dùng MongoDB Compass (Local):**
```env
MONGO_URI=mongodb://localhost:27017/mealme
JWT_SECRET=mealme_secret_key_2024_change_this
PORT=5000
NODE_ENV=development
```

**Không cần sửa gì!** ✅

**Nếu dùng MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mealme
JWT_SECRET=mealme_secret_key_2024_change_this
PORT=5000
NODE_ENV=development
```

**Thay thế:**
- `<username>` → username MongoDB của bạn
- `<password>` → password MongoDB của bạn
- `cluster0.xxxxx` → cluster URL của bạn

## Bước 4: Import dữ liệu mẫu

```bash
npm run seed
```

Bạn sẽ thấy: ✅ Data seeded successfully!

## Bước 5: Chạy Backend

```bash
npm run dev
```

Backend chạy tại: http://localhost:5000

## Bước 6: Cài đặt Frontend (Terminal mới)

```bash
cd frontend
npm install
```

## Bước 7: Chạy Frontend

```bash
npm run dev
```

Frontend chạy tại: http://localhost:3000

## 🎉 Xong! Truy cập http://localhost:3000

### Thử ngay:

1. **Đăng ký tài khoản mới**
   - Username: test
   - Email: test@example.com
   - Password: 123456
   - Mục tiêu: Chọn bất kỳ

2. **Khám phá các tính năng:**
   - Dashboard: Xem tổng quan
   - Gợi ý món: Nhập "trứng, bánh mì"
   - Thực đơn ngày: Tạo menu 1 ngày
   - Thực đơn tuần: Tạo menu 7 ngày

## ⚠️ Lỗi thường gặp

### Lỗi: "Cannot connect to MongoDB"
→ **Nếu dùng Compass:** Kiểm tra MongoDB service đang chạy (xem `MONGODB_COMPASS_SETUP.md`)
→ **Nếu dùng Atlas:** Kiểm tra connection string trong `.env` và whitelist IP

### Lỗi: "Port 5000 already in use"
→ Đổi PORT trong `.env` thành 5001 hoặc 8000

### Lỗi: "Module not found"
→ Chạy lại `npm install` trong thư mục đó

## 📞 Cần trợ giúp?

Kiểm tra file README.md để biết thêm chi tiết!
