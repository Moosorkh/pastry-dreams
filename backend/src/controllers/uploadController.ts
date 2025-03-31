import { Request, Response } from 'express';
import { deleteImage, getPublicIdFromUrl } from '../utils/cloudinary';

// Custom interface for extended request
interface AuthRequest extends Request {
  user?: any;
  file?: Express.Multer.File;
}

// Upload recipe image
export const uploadRecipeImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        url: req.file.path,
        filename: req.file.filename
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Upload gallery image
export const uploadGalleryImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        url: req.file.path,
        filename: req.file.filename
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete image
export const deleteUploadedImage = async (req: AuthRequest, res: Response) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image URL'
      });
    }

    const publicId = getPublicIdFromUrl(url);
    const result = await deleteImage(publicId);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete image'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};