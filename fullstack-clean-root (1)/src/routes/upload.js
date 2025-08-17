import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import auth from '../middleware/auth.js';

const router = express.Router();

// ensure CLOUDINARY_URL is configured in env
cloudinary.config({ secure: true });

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'expense-tracker',
      allowed_formats: ['jpg','png','jpeg','webp'],
      transformation: [{ width: 512, height: 512, crop: 'limit' }]
    };
  }
});

const upload = multer({ storage });

router.post('/', auth, upload.single('photo'), async (req, res) => {
  if (!req.file?.path) return res.status(400).json({ message: 'Upload failed' });
  res.json({ url: req.file.path });
});

export default router;
