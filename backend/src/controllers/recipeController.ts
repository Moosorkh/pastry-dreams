import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import slugify from 'slugify';

// Custom interface for extended request
interface AuthRequest extends Request {
  user?: any;
}

// Get all recipes with filtering, pagination
export const getRecipes = async (req: Request, res: Response) => {
  try {
    const { 
      category, 
      difficulty, 
      search,
      page = '1', 
      limit = '10' 
    } = req.query;
    
    // Parse pagination params
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    // Build where clause for filtering
    let whereClause: any = {};
    
    if (category && category !== 'All') {
      whereClause.category = category as string;
    }
    
    if (difficulty && difficulty !== 'All') {
      whereClause.difficulty = difficulty as string;
    }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    // Get recipes with count
    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where: whereClause,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          difficulty: true,
          category: true,
          prepTime: true,
          cookTime: true,
          servings: true,
          image: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.recipe.count({ where: whereClause })
    ]);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: recipes
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single recipe by slug or id
export const getRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if id is uuid or slug
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    
    const recipe = await prisma.recipe.findUnique({
      where: isUuid ? { id } : { slug: id },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: recipe
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create new recipe
export const createRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { 
      title, 
      description, 
      difficulty, 
      category, 
      prepTime, 
      cookTime,
      servings,
      ingredients,
      instructions,
      tips,
      image
    } = req.body;
    
    // Generate slug from title
    const slug = slugify(title, { lower: true });
    
    // Check if slug already exists
    const existingRecipe = await prisma.recipe.findUnique({
      where: { slug }
    });
    
    if (existingRecipe) {
      return res.status(400).json({
        success: false,
        message: 'Recipe with this title already exists'
      });
    }
    
    // Create recipe
    const recipe = await prisma.recipe.create({
      data: {
        title,
        slug,
        description,
        difficulty,
        category,
        prepTime,
        cookTime,
        servings,
        ingredients,
        instructions,
        tips: tips || [],
        image,
        authorId: req.user.id
      }
    });
    
    res.status(201).json({
      success: true,
      data: recipe
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update recipe
export const updateRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id }
    });
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    // Check if user is author or admin
    if (recipe.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe'
      });
    }
    
    // Generate new slug if title is changed
    let slug = recipe.slug;
    if (req.body.title && req.body.title !== recipe.title) {
      slug = slugify(req.body.title, { lower: true });
      
      // Check if new slug already exists (except for current recipe)
      const existingRecipe = await prisma.recipe.findFirst({
        where: {
          slug,
          id: { not: id }
        }
      });
      
      if (existingRecipe) {
        return res.status(400).json({
          success: false,
          message: 'Recipe with this title already exists'
        });
      }
    }
    
    // Update recipe
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        ...req.body,
        slug
      }
    });
    
    res.status(200).json({
      success: true,
      data: updatedRecipe
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete recipe
export const deleteRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id }
    });
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    // Check if user is author or admin
    if (recipe.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe'
      });
    }
    
    // Delete recipe
    await prisma.recipe.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      data: {}
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};