import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up storage for recipe images
const recipeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sweet-creations/recipes',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 800, crop: 'limit' }]
  } as any
});

// Set up storage for gallery images
const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sweet-creations/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1500, height: 1500, crop: 'limit' }]
  } as any
});

// Create upload middleware
export const uploadRecipeImage = multer({ 
  storage: recipeStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export const uploadGalleryImage = multer({ 
  storage: galleryStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Delete image from Cloudinary
export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// Extract public ID from Cloudinary URL
export const getPublicIdFromUrl = (url: string) => {
  const parts = url.split('/');
  const filenameWithExtension = parts[parts.length - 1];
  const filename = filenameWithExtension.split('.')[0];
  const folder = parts[parts.length - 2];
  
  return `${folder}/${filename}`;
};