# 🔔 Realtime Features & Image Upload

## ✨ Tính năng Realtime đã thêm

### 1. **Live Notifications**
- Thông báo realtime khi user thích món ăn
- Thông báo khi có món mới
- Badge đếm số thông báo chưa đọc
- Browser notifications (nếu user cho phép)

### 2. **Online Users Tracking**
- Hiển thị số user đang online
- Status dot (xanh = online, xám = offline)
- Tự động reconnect khi mất kết nối

### 3. **Socket.io Integration**
- WebSocket connection với auto-reconnect
- Fallback sang polling nếu WebSocket fail
- Optimized cho production

## 📸 Chuẩn bị Upload Ảnh (Tương lai)

### Đã setup:
- ✅ Multer middleware (xử lý file upload)
- ✅ Cloudinary integration (lưu ảnh trên cloud)
- ✅ Upload routes (`/api/upload/image`, `/api/upload/images`)
- ✅ Image optimization (resize, compress)
- ✅ File validation (chỉ chấp nhận ảnh, max 5MB)

### Để sử dụng:

#### 1. Đăng ký Cloudinary (Free)
1. Truy cập: https://cloudinary.com/users/register/free
2. Lấy credentials: Cloud Name, API Key, API Secret
3. Thêm vào `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

#### 2. Upload ảnh từ Frontend

```javascript
// Upload single image
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload/image', {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
  
  const data = await response.json();
  return data.url; // URL ảnh trên Cloudinary
};

// Upload multiple images
const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  
  const response = await fetch('/api/upload/images', {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
  
  const data = await response.json();
  return data.images; // Array of image URLs
};
```

#### 3. Component ví dụ

```jsx
import { useState } from 'react';

const ImageUpload = () => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    setPreview(URL.createObjectURL(file));

    // Upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      const data = await res.json();
      console.log('Uploaded:', data.url);
      
      // Emit realtime notification
      socket.emit('meal:created', { 
        mealName: 'Món mới',
        image: data.url 
      });
    } catch (error) {
      alert('Lỗi upload!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleUpload}
        disabled={uploading}
      />
      {preview && <img src={preview} alt="Preview" />}
      {uploading && <p>Đang upload...</p>}
    </div>
  );
};
```

## 🚀 Deploy với Realtime

### Render
- ✅ Hỗ trợ WebSocket
- ✅ Tự động scale
- ⚠️ Free tier: sleep sau 15 phút

### Vercel (Frontend)
- ✅ Hỗ trợ Socket.io client
- ✅ Auto deploy khi push

### Environment Variables cần thêm:

**Backend (Render):**
```
FRONTEND_URL=https://your-app.vercel.app
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

**Frontend (Vercel):**
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## 📊 Giới hạn Free Tier

| Service | Free Tier | Giới hạn |
|---------|-----------|----------|
| **Render** | ✅ | 750h/tháng, sleep sau 15 phút |
| **Cloudinary** | ✅ | 25GB storage, 25GB bandwidth |
| **MongoDB Atlas** | ✅ | 512MB storage |
| **Vercel** | ✅ | 100GB bandwidth |

## 🎯 Roadmap tương lai

- [ ] Share món ăn lên Facebook
- [ ] Share món ăn lên Instagram
- [ ] Camera capture trong app
- [ ] Image filters (giống Instagram)
- [ ] Social feed (xem món của người khác)
- [ ] Comments & Reactions
- [ ] Follow/Unfollow users
- [ ] Live cooking sessions

## 🐛 Troubleshooting

### Socket không connect?
- Kiểm tra CORS trong `server.js`
- Kiểm tra `FRONTEND_URL` trong env
- Xem console log: `socket.connected`

### Upload ảnh lỗi?
- Kiểm tra Cloudinary credentials
- File size < 5MB
- Chỉ chấp nhận file ảnh

### Notification không hiện?
- Request permission: `Notification.requestPermission()`
- Kiểm tra browser settings
- Chỉ hoạt động trên HTTPS (production)

---

**Chúc bạn code vui vẻ! 🚀**
