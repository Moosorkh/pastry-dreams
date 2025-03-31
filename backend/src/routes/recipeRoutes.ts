import express from 'express';
import { 
  getRecipes, 
  getRecipe, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe 
} from '../controllers/recipeController';
import { protect, restrictTo } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipe);

// Protected routes - require login
router.use(protect);

// Admin and authenticated users can create recipes
router.post('/', createRecipe);

// Recipe creator and admin can update/delete
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;