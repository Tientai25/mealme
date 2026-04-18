const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Multer config - store in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file ảnh!'), false);
    }
  }
});

// Upload single image
router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn ảnh' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'mealme',
          transformation: [
            { width: 1080, height: 1080, crop: 'limit' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Lỗi upload ảnh' });
  }
});

// Upload multiple images
router.post('/images', protect, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Vui lòng chọn ảnh' });
    }

    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'mealme',
            transformation: [
              { width: 1080, height: 1080, crop: 'limit' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve({
              url: result.secure_url,
              publicId: result.public_id
            });
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const results = await Promise.all(uploadPromises);
    res.json({ images: results });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Lỗi upload ảnh' });
  }
});

// Delete image
router.delete('/image/:publicId', protect, async (req, res) => {
  try {
    const publicId = req.params.publicId.replace(/-/g, '/');
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Đã xóa ảnh' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Lỗi xóa ảnh' });
  }
});

module.exports = router;
