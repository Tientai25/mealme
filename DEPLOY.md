# 🚀 HƯỚNG DẪN DEPLOY - MealMe

## 📦 Deploy Backend lên Render.com

### Bước 1: Chuẩn bị

1. Push code lên GitHub repository
2. Đảm bảo file `.env` KHÔNG được commit (đã có trong .gitignore)

### Bước 2: Tạo Web Service trên Render

1. Truy cập: https://render.com
2. Đăng nhập/Đăng ký
3. Nhấn **"New +"** → **"Web Service"**
4. Connect GitHub repository của bạn
5. Chọn repository **mealme**

### Bước 3: Cấu hình Backend

**Build & Deploy:**
- **Name:** `mealme-backend` (hoặc tên bạn muốn)
- **Region:** Singapore (gần Việt Nam nhất)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Chọn **Free** (đủ cho demo)

### Bước 4: Thêm Environment Variables

Nhấn **"Advanced"** → **"Add Environment Variable"**

Thêm các biến sau:

```
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mealme
JWT_SECRET = your_super_secret_jwt_key_production_2024
NODE_ENV = production
PORT = 5000
```

**Lưu ý:** Sử dụng MongoDB Atlas connection string của bạn

### Bước 5: Deploy

1. Nhấn **"Create Web Service"**
2. Đợi 3-5 phút để deploy
3. Copy URL backend (ví dụ: `https://mealme-backend.onrender.com`)

### Bước 6: Test Backend

Truy cập: `https://mealme-backend.onrender.com`

Bạn sẽ thấy: `{"message": "MealMe API is running 🍽️"}`

---

## 🌐 Deploy Frontend lên Vercel

### Bước 1: Chuẩn bị Frontend

Cập nhật file `frontend/src/services/api.js`:

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

export const getMeals = (params) => API.get('/meals', { params });
export const getMealById = (id) => API.get(`/meals/${id}`);
export const suggestMeals = (data) => API.post('/meals/suggest', data);
export const toggleFavorite = (id) => API.post(`/meals/favorite/${id}`);
export const getFavorites = () => API.get('/meals/favorites');
export const getDayPlan = (data) => API.post('/meal-plan/day', data);
export const getWeekPlan = (data) => API.post('/meal-plan/week', data);
```

### Bước 2: Deploy lên Vercel

1. Truy cập: https://vercel.com
2. Đăng nhập bằng GitHub
3. Nhấn **"Add New..."** → **"Project"**
4. Import repository **mealme**

### Bước 3: Cấu hình Frontend

**Project Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Bước 4: Thêm Environment Variable

Trong **Environment Variables**, thêm:

```
VITE_API_URL = https://mealme-backend.onrender.com
```

**Lưu ý:** Thay bằng URL backend của bạn từ Render

### Bước 5: Deploy

1. Nhấn **"Deploy"**
2. Đợi 2-3 phút
3. Vercel sẽ tự động tạo URL (ví dụ: `https://mealme.vercel.app`)

### Bước 6: Test Frontend

1. Truy cập URL Vercel của bạn
2. Đăng ký tài khoản mới
3. Test các tính năng

---

## 🔧 Cấu hình CORS cho Production

Cập nhật file `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mealme.vercel.app', // Thay bằng URL Vercel của bạn
    'https://your-custom-domain.com' // Nếu có custom domain
  ],
  credentials: true
}));
```

Sau đó push code lên GitHub, Render sẽ tự động redeploy.

---

## 📱 Custom Domain (Tùy chọn)

### Vercel (Frontend)

1. Vào **Settings** → **Domains**
2. Thêm domain của bạn (ví dụ: `mealme.com`)
3. Cấu hình DNS theo hướng dẫn

### Render (Backend)

1. Vào **Settings** → **Custom Domain**
2. Thêm subdomain (ví dụ: `api.mealme.com`)
3. Cấu hình DNS

---

## ⚡ Tối ưu hóa

### Backend (Render)

1. **Seed data sau khi deploy:**
   - Vào **Shell** tab
   - Chạy: `npm run seed`

2. **Auto-deploy:**
   - Render tự động deploy khi push code lên GitHub

### Frontend (Vercel)

1. **Preview deployments:**
   - Mỗi PR sẽ có preview URL riêng

2. **Analytics:**
   - Enable Vercel Analytics để theo dõi traffic

---

## 🐛 Troubleshooting

### Backend không kết nối được MongoDB

**Giải pháp:**
1. Vào MongoDB Atlas
2. **Network Access** → **Add IP Address**
3. Chọn **"Allow access from anywhere"** (0.0.0.0/0)

### Frontend không gọi được API

**Giải pháp:**
1. Kiểm tra `VITE_API_URL` trong Vercel
2. Kiểm tra CORS trong backend
3. Xem logs trong Render Dashboard

### Render Free tier sleep sau 15 phút

**Giải pháp:**
1. Sử dụng UptimeRobot để ping mỗi 5 phút
2. Hoặc upgrade lên paid plan ($7/tháng)

---

## 📊 Monitoring

### Backend Logs (Render)

1. Vào Dashboard → Service
2. Nhấn **"Logs"** tab
3. Xem real-time logs

### Frontend Analytics (Vercel)

1. Vào Project → Analytics
2. Xem visitors, page views, performance

---

## 🎉 Hoàn thành!

Bây giờ bạn đã có:
- ✅ Backend API chạy trên Render
- ✅ Frontend chạy trên Vercel
- ✅ MongoDB Atlas database
- ✅ Tự động deploy khi push code

**URLs:**
- Frontend: `https://mealme.vercel.app`
- Backend: `https://mealme-backend.onrender.com`

Chia sẻ link với bạn bè và enjoy! 🚀
