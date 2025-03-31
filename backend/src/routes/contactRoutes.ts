import express from 'express';
import { 
  submitContact, 
  getContactMessages, 
  getContactMessage,
  updateContactMessage,
  deleteContactMessage
} from '../controllers/contactController';
import { protect, restrictTo } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/', submitContact);

// Admin only routes
router.use(protect, restrictTo('ADMIN'));

router.get('/', getContactMessages);
router.get('/:id', getContactMessage);
router.put('/:id', updateContactMessage);
router.delete('/:id', deleteContactMessage);

export default router;