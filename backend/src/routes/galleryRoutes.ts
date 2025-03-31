import express from 'express';
import { 
  getGalleryItems, 
  getGalleryItem, 
  createGalleryItem, 
  updateGalleryItem, 
  deleteGalleryItem 
} from '../controllers/galleryController';
import { protect, restrictTo } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getGalleryItems);
router.get('/:id', getGalleryItem);

// Protected routes - require login
router.use(protect);

// Only admins can create gallery items
router.post('/', restrictTo('ADMIN'), createGalleryItem);

// Only gallery creator or admin can update/delete
router.put('/:id', updateGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router;