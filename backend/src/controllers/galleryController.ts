import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Custom interface for extended request
interface AuthRequest extends Request {
  user?: any;
}

// Get all gallery items with filtering
export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    
    // Build where clause for filtering
    let whereClause: any = {};
    
    if (category && category !== 'All') {
      whereClause.category = category as string;
    }
    
    if (featured === 'true') {
      whereClause.featured = true;
    }
    
    // Get gallery items
    const galleryItems = await prisma.galleryItem.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        uploader: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single gallery item
export const getGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const galleryItem = await prisma.galleryItem.findUnique({
      where: { id },
      include: {
        uploader: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: galleryItem
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create new gallery item
export const createGalleryItem = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, image, featured } = req.body;
    
    // Create gallery item
    const galleryItem = await prisma.galleryItem.create({
      data: {
        title,
        category,
        image,
        featured: featured || false,
        uploaderId: req.user.id
      }
    });
    
    res.status(201).json({
      success: true,
      data: galleryItem
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update gallery item
export const updateGalleryItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if gallery item exists
    const galleryItem = await prisma.galleryItem.findUnique({
      where: { id }
    });
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }
    
    // Check if user is uploader or admin
    if (galleryItem.uploaderId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this gallery item'
      });
    }
    
    // Update gallery item
    const updatedGalleryItem = await prisma.galleryItem.update({
      where: { id },
      data: req.body
    });
    
    res.status(200).json({
      success: true,
      data: updatedGalleryItem
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete gallery item
export const deleteGalleryItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if gallery item exists
    const galleryItem = await prisma.galleryItem.findUnique({
      where: { id }
    });
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }
    
    // Check if user is uploader or admin
    if (galleryItem.uploaderId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this gallery item'
      });
    }
    
    // Delete gallery item
    await prisma.galleryItem.delete({
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