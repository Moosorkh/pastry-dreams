import { ReactElement } from 'react';

export interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: ReactElement;
}
  
export interface Specialty {
  title: string;
  description: string;
}

// Recipe Types
export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  rating?: number;
  image: string;
  timeNeeded: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
}
  
// Gallery Types
export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}
  
// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  eventDate?: string;
  eventType?: string;
}