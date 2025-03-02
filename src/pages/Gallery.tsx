import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MasonryGrid from '../components/features/gallery/MasonryGrid';
import Button from '../components/ui/Button';

// This would typically come from your backend
const galleryItems = [
  {
    id: '1',
    src: '/api/placeholder/600/800',
    alt: 'Wedding Cake with Roses',
    category: 'Cakes'
  },
  {
    id: '2',
    src: '/api/placeholder/600/600',
    alt: 'French Macarons',
    category: 'Pastries'
  },
  {
    id: '3',
    src: '/api/placeholder/600/700',
    alt: 'Birthday Cake',
    category: 'Cakes'
  },
  // Add more items as needed
];

const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Custom Orders'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-serif font-bold text-gray-900 sm:text-5xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Gallery
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore our collection of handcrafted pastries, custom cakes, and artisanal breads.
        </motion.p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="min-w-[100px]"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MasonryGrid 
          images={filteredImages}
          columns={3}
        />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}