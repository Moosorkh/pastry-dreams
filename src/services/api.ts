import axios from 'axios';
import { Recipe, GalleryItem, ContactFormData } from '../types';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // This allows cookies to be sent with requests
});

// Add auth token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    return await api.post('/auth/register', { name, email, password });
  },
  
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    return await api.get('/auth/me');
  }
};

// Recipe services
export const recipeService = {
  getRecipes: async (params?: any) => {
    return await api.get('/recipes', { params });
  },
  
  getRecipe: async (id: string) => {
    return await api.get(`/recipes/${id}`);
  },
  
  createRecipe: async (recipeData: Partial<Recipe>) => {
    return await api.post('/recipes', recipeData);
  },
  
  updateRecipe: async (id: string, recipeData: Partial<Recipe>) => {
    return await api.put(`/recipes/${id}`, recipeData);
  },
  
  deleteRecipe: async (id: string) => {
    return await api.delete(`/recipes/${id}`);
  }
};

// Gallery services
export const galleryService = {
  getGalleryItems: async (category?: string) => {
    return await api.get('/gallery', { params: { category } });
  },
  
  getGalleryItem: async (id: string) => {
    return await api.get(`/gallery/${id}`);
  },
  
  createGalleryItem: async (itemData: Partial<GalleryItem>) => {
    return await api.post('/gallery', itemData);
  },
  
  updateGalleryItem: async (id: string, itemData: Partial<GalleryItem>) => {
    return await api.put(`/gallery/${id}`, itemData);
  },
  
  deleteGalleryItem: async (id: string) => {
    return await api.delete(`/gallery/${id}`);
  }
};

// Upload services
export const uploadService = {
  uploadRecipeImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return await api.post('/uploads/recipe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  uploadGalleryImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return await api.post('/uploads/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  deleteImage: async (url: string) => {
    return await api.delete('/uploads', { data: { url } });
  }
};

// Contact services
export const contactService = {
  submitContactForm: async (formData: ContactFormData) => {
    return await api.post('/contact', formData);
  },
  
  getContactMessages: async (params?: any) => {
    return await api.get('/contact', { params });
  },
  
  getContactMessage: async (id: string) => {
    return await api.get(`/contact/${id}`);
  },
  
  updateContactMessage: async (id: string, status: string) => {
    return await api.put(`/contact/${id}`, { status });
  },
  
  deleteContactMessage: async (id: string) => {
    return await api.delete(`/contact/${id}`);
  }
};

export default api;