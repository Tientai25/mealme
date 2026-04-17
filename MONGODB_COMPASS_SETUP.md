# 🗄️ HƯỚNG DẪN SETUP MONGODB COMPASS

Hướng dẫn cài đặt và sử dụng MongoDB Compass (Local Database) cho MealMe

---

## 📥 Bước 1: Cài đặt MongoDB Community Server

### Windows:

1. **Download MongoDB:**
   - Truy cập: https://www.mongodb.com/try/download/community
   - Chọn version: **Latest** (ví dụ: 7.0.x)
   - Platform: **Windows**
   - Package: **MSI**
   - Nhấn **Download**

2. **Cài đặt:**
   - Chạy file `.msi` vừa tải
   - Chọn **Complete** installation
   - ✅ Tick vào **"Install MongoDB as a Service"**
   - ✅ Tick vào **"Install MongoDB Compass"** (GUI tool)
   - Nhấn **Next** → **Install**
   - Đợi 2-3 phút

3. **Kiểm tra cài đặt:**
   ```bash
   # Mở Command Prompt
   mongod --version
   ```
   
   Nếu thấy version → Thành công! ✅

---

## 🧭 Bước 2: Cài đặt MongoDB Compass (nếu chưa có)

Nếu bạn đã cài MongoDB nhưng chưa có Compass:

1. Truy cập: https://www.mongodb.com/try/download/compass
2. Download và cài đặt
3. Mở MongoDB Compass

---

## 🔌 Bước 3: Kết nối với MongoDB Compass

1. **Mở MongoDB Compass**

2. **Connection String:**
   ```
   mongodb://localhost:27017
   ```

3. **Nhấn "Connect"**

4. **Tạo Database:**
   - Nhấn **"Create Database"**
   - Database Name: `mealme`
   - Collection Name: `users`
   - Nhấn **"Create Database"**

---

## ⚙️ Bước 4: Cấu hình Backend

File `.env` trong `backend/` đã được cập nhật:

```env
MONGO_URI=mongodb://localhost:27017/mealme
JWT_SECRET=mealme_secret_key_2024_change_this
PORT=5000
NODE_ENV=development
```

**Không cần thay đổi gì!** ✅

---

## 🌱 Bước 5: Seed Data

```bash
cd backend
npm run seed
```

**Kết quả:**
```
MongoDB Connected: localhost
✅ Data seeded successfully!
```

---

## 🔍 Bước 6: Xem dữ liệu trong Compass

1. Mở **MongoDB Compass**
2. Refresh (F5)
3. Mở database **mealme**
4. Bạn sẽ thấy 2 collections:
   - **meals** (20 documents)
   - **users** (0 documents - sẽ có sau khi đăng ký)

---

## 🚀 Bước 7: Chạy Backend

```bash
npm run dev
```

**Kết quả:**
```
Server running on port 5000
MongoDB Connected: localhost
```

---

## ✅ So sánh: MongoDB Atlas vs Compass

| Feature | MongoDB Atlas (Cloud) | MongoDB Compass (Local) |
|---------|----------------------|------------------------|
| **Cài đặt** | Không cần cài | Cần cài MongoDB Server |
| **Internet** | Cần internet | Không cần internet |
| **Tốc độ** | Phụ thuộc mạng | Rất nhanh (local) |
| **Miễn phí** | 512MB | Không giới hạn |
| **Deploy** | Dễ dàng | Cần config thêm |
| **Phù hợp** | Production | Development |

---

## 🎯 Khuyến nghị

### Development (Đang code):
✅ **Dùng MongoDB Compass (Local)**
- Nhanh hơn
- Không cần internet
- Dễ debug

### Production (Deploy):
✅ **Dùng MongoDB Atlas (Cloud)**
- Không cần server riêng
- Auto backup
- Scalable

---

## 🔄 Chuyển đổi giữa Local và Cloud

### Từ Local → Cloud (khi deploy):

1. Tạo MongoDB Atlas account
2. Lấy connection string
3. Cập nhật `.env`:
   ```env
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mealme
   ```
4. Chạy lại `npm run seed` (nếu cần)

### Từ Cloud → Local (khi dev):

1. Cài MongoDB + Compass
2. Cập nhật `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/mealme
   ```
3. Chạy lại `npm run seed`

---

## 🐛 Troubleshooting

### Lỗi: "MongoServerError: connect ECONNREFUSED"

**Nguyên nhân:** MongoDB service chưa chạy

**Giải pháp:**

**Windows:**
1. Mở **Services** (Win + R → `services.msc`)
2. Tìm **MongoDB Server**
3. Nhấn chuột phải → **Start**

**Hoặc chạy lệnh:**
```bash
net start MongoDB
```

---

### Lỗi: "mongod is not recognized"

**Nguyên nhân:** MongoDB chưa được thêm vào PATH

**Giải pháp:**
1. Thêm vào PATH: `C:\Program Files\MongoDB\Server\7.0\bin`
2. Restart terminal
3. Thử lại

---

### Lỗi: "Database mealme not found"

**Nguyên nhân:** Chưa seed data

**Giải pháp:**
```bash
cd backend
npm run seed
```

---

### Compass không kết nối được

**Giải pháp:**
1. Check MongoDB service đang chạy
2. Thử connection string: `mongodb://127.0.0.1:27017`
3. Restart MongoDB service
4. Restart Compass

---

## 📊 Xem dữ liệu trong Compass

### Sau khi seed:

**Collection: meals**
- 20 documents
- Có thể xem, edit, delete trực tiếp

**Collection: users**
- Ban đầu trống
- Sau khi đăng ký sẽ có user

### Thao tác trong Compass:

1. **Xem document:**
   - Click vào collection
   - Xem dạng JSON hoặc Table

2. **Tìm kiếm:**
   - Filter: `{ "tags": "healthy" }`
   - Tìm tất cả món healthy

3. **Edit document:**
   - Click vào document
   - Edit trực tiếp
   - Save

4. **Delete document:**
   - Hover vào document
   - Click icon thùng rác

---

## 🎓 Tips

### 1. Backup dữ liệu:
```bash
# Export
mongodump --db mealme --out ./backup

# Import
mongorestore --db mealme ./backup/mealme
```

### 2. Xóa tất cả data:
```bash
# Trong Compass
# Click vào database "mealme" → Drop Database
```

### 3. Reset data:
```bash
cd backend
npm run seed
```

### 4. Xem logs:
- Trong Compass: Performance tab
- Hoặc xem trong terminal khi chạy backend

---

## 🎉 Hoàn thành!

Bây giờ bạn đã có:
- ✅ MongoDB Server chạy local
- ✅ MongoDB Compass để xem dữ liệu
- ✅ Database mealme với 20 món ăn
- ✅ Backend kết nối thành công

**Chạy backend:**
```bash
cd backend
npm run dev
```

**Chạy frontend:**
```bash
cd frontend
npm run dev
```

**Truy cập:** http://localhost:3000

---

## 📞 Cần trợ giúp?

- MongoDB Docs: https://www.mongodb.com/docs/
- Compass Guide: https://www.mongodb.com/docs/compass/
- Community: https://www.mongodb.com/community/forums/

---

**Happy Coding with MongoDB Compass! 🗄️**
