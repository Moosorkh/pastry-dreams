import express from 'express';
import { 
  uploadRecipeImage, 
  uploadGalleryImage, 
  deleteUploadedImage 
} from '../controllers/uploadController';
import { protect, restrictTo } from '../middleware/auth';
import { 
  uploadRecipeImage as uploadRecipeImageMiddleware, 
  uploadGalleryImage as uploadGalleryImageMiddleware 
} from '../utils/cloudinary';

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// Upload recipe image
router.post(
  '/recipe', 
  uploadRecipeImageMiddleware.single('image'), 
  uploadRecipeImage
);

// Upload gallery image - admin only
router.post(
  '/gallery', 
  restrictTo('ADMIN'), 
  uploadGalleryImageMiddleware.single('image'), 
  uploadGalleryImage
);

// Delete image - works for both recipe and gallery
router.delete('/', deleteUploadedImage);

export default router;