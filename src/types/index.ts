// Recipe Types
export interface Recipe {
    id: string;
    title: string;
    description: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    image: string;
    slug: string;
    ingredients?: string[];
    instructions?: string[];
    tips?: string[];
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