# 🍽️ MealMe - Hôm nay ăn gì?

Web app giúp bạn lên thực đơn phù hợp với mục tiêu và nguyên liệu có sẵn!

## 🚀 Công nghệ sử dụng

### Frontend
- React 18 + Vite
- React Router DOM
- Axios
- CSS thuần

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## 📁 Cấu trúc thư mục

```
mealme/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── mealController.js
│   │   └── mealPlanController.js
│   ├── data/
│   │   ├── meals.json
│   │   └── seeder.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Meal.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── mealRoutes.js
│   │   └── mealPlanRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── MealCard.jsx
    │   │   ├── MealCard.css
    │   │   ├── Navbar.jsx
    │   │   ├── Navbar.css
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Dashboard.css
    │   │   ├── DailyPlan.jsx
    │   │   ├── DailyPlan.css
    │   │   ├── Favorites.jsx
    │   │   ├── Favorites.css
    │   │   ├── Home.jsx
    │   │   ├── Home.css
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Auth.css
    │   │   ├── MealDetail.jsx
    │   │   ├── MealDetail.css
    │   │   ├── SuggestMeal.jsx
    │   │   ├── SuggestMeal.css
    │   │   ├── WeeklyPlan.jsx
    │   │   └── WeeklyPlan.css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🛠️ Cài đặt

### 1. Clone repository

```bash
git clone <your-repo-url>
cd mealme
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

### 3. Cấu hình MongoDB

**Bạn có 2 lựa chọn:**

#### Option 1: MongoDB Compass (Local - Khuyên dùng cho dev)

1. Cài MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Cài MongoDB Compass (đi kèm hoặc tải riêng)
3. Mở Compass và connect: `mongodb://localhost:27017`
4. File `.env` đã sẵn sàng với connection string local

**Chi tiết:** Xem file `MONGODB_COMPASS_SETUP.md`

#### Option 2: MongoDB Atlas (Cloud - Cho production)

1. Truy cập [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo tài khoản miễn phí
3. Tạo cluster mới
4. Nhấn "Connect" → "Connect your application"
5. Copy connection string
6. Cập nhật file `.env` với connection string của bạn

### 4. Tạo file .env

Tạo file `.env` trong thư mục `backend/`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mealme
JWT_SECRET=your_super_secret_jwt_key_here_change_this
PORT=5000
NODE_ENV=development
```

**Lưu ý:** Thay `<username>`, `<password>` và connection string bằng thông tin của bạn.

### 5. Seed dữ liệu

```bash
npm run seed
```

### 6. Chạy Backend

```bash
npm run dev
```

Backend sẽ chạy tại: `http://localhost:5000`

### 7. Cài đặt Frontend

Mở terminal mới:

```bash
cd frontend
npm install
```

### 8. Chạy Frontend

```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

## 🎯 Tính năng

### Authentication
- ✅ Đăng ký tài khoản
- ✅ Đăng nhập
- ✅ JWT token authentication
- ✅ Protected routes

### Meal Management
- ✅ Xem danh sách món ăn
- ✅ Chi tiết món ăn
- ✅ Lưu món yêu thích
- ✅ Gợi ý món theo nguyên liệu

### Meal Planning
- ✅ Tạo thực đơn 1 ngày (3 bữa)
- ✅ Tạo thực đơn 7 ngày
- ✅ Lọc theo mục tiêu (giảm cân, tăng cân, healthy, tiết kiệm)
- ✅ Lọc theo ngân sách

## 📱 Các trang

1. **Home** - Trang chủ giới thiệu
2. **Login** - Đăng nhập
3. **Register** - Đăng ký
4. **Dashboard** - Trang chính sau khi đăng nhập
5. **Suggest Meal** - Gợi ý món theo nguyên liệu
6. **Favorites** - Danh sách món yêu thích
7. **Meal Detail** - Chi tiết món ăn
8. **Daily Plan** - Thực đơn 1 ngày
9. **Weekly Plan** - Thực đơn 7 ngày

## 🌐 Deploy

### Deploy Backend lên Render

1. Truy cập [Render.com](https://render.com)
2. Tạo tài khoản và đăng nhập
3. Nhấn "New +" → "Web Service"
4. Connect GitHub repository
5. Cấu hình:
   - **Name:** mealme-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`
6. Thêm Environment Variables:
   ```
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret>
   NODE_ENV=production
   ```
7. Nhấn "Create Web Service"
8. Copy URL backend (ví dụ: `https://mealme-backend.onrender.com`)

### Deploy Frontend lên Vercel

1. Truy cập [Vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Nhấn "Add New" → "Project"
4. Import repository
5. Cấu hình:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Thêm Environment Variable:
   ```
   VITE_API_URL=https://mealme-backend.onrender.com
   ```
7. Nhấn "Deploy"

### Cập nhật API URL trong Frontend

Sau khi deploy backend, cập nhật file `frontend/src/services/api.js`:

```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user (protected)

### Meals
- `GET /api/meals` - Lấy danh sách món
- `GET /api/meals/:id` - Chi tiết món
- `POST /api/meals/suggest` - Gợi ý món
- `POST /api/meals/favorite/:id` - Toggle yêu thích (protected)
- `GET /api/meals/favorites` - Danh sách yêu thích (protected)

### Meal Plans
- `POST /api/meal-plan/day` - Tạo thực đơn ngày
- `POST /api/meal-plan/week` - Tạo thực đơn tuần

## 👤 User Model

```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  goal: String, // lose_weight | gain_weight | maintain | healthy | cheap
  dislikedFoods: [String],
  favoriteMeals: [ObjectId]
}
```

## 🍱 Meal Model

```javascript
{
  name: String,
  description: String,
  ingredients: [String],
  calories: Number,
  price: Number,
  cookTime: Number,
  image: String,
  tags: [String]
}
```

## 🎨 Design

- Màu chủ đạo: Xanh lá (#4caf50) + Trắng
- Responsive mobile-first
- Animation mượt mà
- UI hiện đại, dễ sử dụng

## 📝 Scripts

### Backend
```bash
npm start        # Chạy production
npm run dev      # Chạy development với nodemon
npm run seed     # Import dữ liệu mẫu
```

### Frontend
```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run preview  # Preview production build
```

## 🐛 Troubleshooting

### Lỗi kết nối MongoDB
- Kiểm tra connection string trong `.env`
- Đảm bảo IP của bạn được whitelist trong MongoDB Atlas
- Kiểm tra username/password

### Lỗi CORS
- Đảm bảo backend đã cài `cors` package
- Kiểm tra proxy trong `vite.config.js`

### Lỗi JWT
- Kiểm tra `JWT_SECRET` trong `.env`
- Xóa token cũ trong localStorage

## 📄 License

MIT License

## 👨‍💻 Author

Được tạo bởi AI Assistant

---

**Chúc bạn code vui vẻ! 🚀**
