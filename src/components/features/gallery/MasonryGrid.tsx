import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MasonryGridProps {
  images: {
    id: string;
    src: string;
    alt: string;
    category: string;
  }[];
  columns?: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images, columns = 3 }) => {
  const [columnHeights, setColumnHeights] = useState<number[]>(Array(columns).fill(0));
  const [layout, setLayout] = useState<typeof images[]>(Array(columns).fill([]));

  useEffect(() => {
    const newLayout = Array(columns).fill(null).map(() => [] as typeof images);
    const heights = Array(columns).fill(0);

    images.forEach((image) => {
      // Find the shortest column
      const shortestColumn = heights.indexOf(Math.min(...heights));
      
      // Add image to shortest column
      newLayout[shortestColumn] = [...newLayout[shortestColumn], image];
      
      // Update height (assuming 1 unit = 100px, adjust based on your needs)
      heights[shortestColumn] += 1;
    });

    setLayout(newLayout);
    setColumnHeights(heights);
  }, [images, columns]);

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {layout.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          <AnimatePresence>
            {column.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-lg font-semibold">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;