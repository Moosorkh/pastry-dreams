import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MasonryGridProps {
  images: {
    id: string;
    src: string;
    alt: string;
    category?: string;
    aspectRatio?: number; // width/height ratio for better layout calculation
  }[];
  columns?: number;
  gap?: number;
  onImageClick?: (image: MasonryGridProps['images'][0]) => void;
  className?: string;
}

interface ColumnLayout {
  images: MasonryGridProps['images'];
  height: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ 
  images, 
  columns = 3, 
  gap = 16,
  onImageClick,
  className = ''
}) => {
  const [layout, setLayout] = useState<ColumnLayout[]>([]);
  const [imageHeights, setImageHeights] = useState<Map<string, number>>(new Map());
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  // Memoize initial column structure
  const initialColumns = useMemo(
    () => Array(columns).fill(null).map(() => ({ images: [], height: 0 })),
    [columns]
  );

  // Handle image load to get actual dimensions
  const handleImageLoad = useCallback((imageId: string, img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const height = img.offsetWidth / aspectRatio;
    
    setImageHeights(prev => new Map(prev).set(imageId, height));
  }, []);

  // Calculate layout based on actual image dimensions
  const calculateLayout = useCallback((images: MasonryGridProps['images'], imageHeights: Map<string, number>) => {
    const newLayout: ColumnLayout[] = Array(columns)
      .fill(null)
      .map(() => ({ images: [], height: 0 }));

    images.forEach((image) => {
      // Find the shortest column
      const shortestColumnIndex = newLayout.reduce((minIndex, column, index) => 
        column.height < newLayout[minIndex].height ? index : minIndex, 0
      );
      
      // Get image height (use aspect ratio if available, otherwise estimate)
      let imageHeight = imageHeights.get(image.id);
      if (!imageHeight) {
        // Fallback calculation using aspect ratio or default
        const aspectRatio = image.aspectRatio || 1;
        imageHeight = 300 / aspectRatio; // Assume 300px width as base
      }
      
      // Add image to shortest column
      newLayout[shortestColumnIndex].images.push(image);
      newLayout[shortestColumnIndex].height += imageHeight + gap;
    });

    return newLayout;
  }, [columns, gap]);

  // Update layout when images or dimensions change
  useEffect(() => {
    if (images.length === 0) {
      setLayout(initialColumns);
      return;
    }

    const newLayout = calculateLayout(images, imageHeights);
    setLayout(newLayout);
  }, [images, imageHeights, calculateLayout, initialColumns]);

  // Handle responsive column adjustment
  useEffect(() => {
    const handleResize = () => {
      // Recalculate layout on window resize
      const newLayout = calculateLayout(images, imageHeights);
      setLayout(newLayout);
    };

    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);
    
    return () => window.removeEventListener('resize', debouncedResize);
  }, [images, imageHeights, calculateLayout]);

  const handleImageClick = useCallback((image: MasonryGridProps['images'][0]) => {
    onImageClick?.(image);
  }, [onImageClick]);

  return (
    <div 
      className={`grid ${className}`} 
      style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`
      }}
    >
      {layout.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col" style={{ gap: `${gap}px` }}>
          <AnimatePresence mode="popLayout">
            {column.images.map((image, imageIndex) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  layout: { duration: 0.3 }
                }}
                whileHover={{ y: -4 }}
                className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${
                  onImageClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleImageClick(image)}
                role={onImageClick ? 'button' : undefined}
                tabIndex={onImageClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onImageClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleImageClick(image);
                  }
                }}
              >
                <img
                  ref={(el) => {
                    if (el) {
                      imageRefs.current.set(image.id, el);
                    }
                  }}
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  loading={imageIndex < 6 ? 'eager' : 'lazy'} // Load first 6 images eagerly
                  onLoad={(e) => handleImageLoad(image.id, e.currentTarget)}
                  onError={(e) => {
                    // Handle broken images gracefully
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <div className="text-white">
                    <p className="text-lg font-semibold mb-1 drop-shadow-lg">
                      {image.alt}
                    </p>
                    {image.category && (
                      <p className="text-sm opacity-80 drop-shadow">
                        {image.category}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default MasonryGrid;