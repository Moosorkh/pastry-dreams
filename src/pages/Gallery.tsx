
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { galleryItems } from '../data/mockData';

const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Desserts', 'Custom Orders'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [modalDimensions, setModalDimensions] = useState({ width: '90vw', maxHeight: '90vh' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryChange = (_event: React.MouseEvent<HTMLElement>, newCategory: string) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const handleOpenModal = (src: string, alt: string, description: string = '') => {
    setSelectedImage(src);
    setSelectedTitle(alt);
    setSelectedDescription(description);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to handle image loading and calculate appropriate modal size
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    
    setImageSize({ width: naturalWidth, height: naturalHeight });
    
    // Calculate modal dimensions based on image ratio and viewport
    const viewportWidth = window.innerWidth * 0.9; // 90% of viewport width
    const viewportHeight = window.innerHeight * 0.85; // 85% of viewport height
    
    // Determine which dimension constrains the image more
    const widthRatio = viewportWidth / naturalWidth;
    const heightRatio = (viewportHeight - 120) / naturalHeight; // Account for text space
    
    // Use the smaller ratio to ensure image fits in viewport
    const limitingRatio = Math.min(widthRatio, heightRatio, 1); // Don't enlarge small images
    
    // Calculate modal dimensions, ensuring a minimum width for text
    const modalWidth = Math.max(Math.min(naturalWidth * limitingRatio, viewportWidth), isMobile ? viewportWidth : 400);
    
    setModalDimensions({
      width: modalWidth + 'px',
      maxHeight: viewportHeight + 'px'
    });
  };

  // Recalculate dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (modalOpen && selectedImage) {
        // Create a temporary image to get dimensions
        const img = new Image();
        img.onload = () => {
          const { naturalWidth, naturalHeight } = img;
          
          // Recalculate using the same logic as handleImageLoad
          const viewportWidth = window.innerWidth * 0.9;
          const viewportHeight = window.innerHeight * 0.85;
          
          const widthRatio = viewportWidth / naturalWidth;
          const heightRatio = (viewportHeight - 120) / naturalHeight;
          
          const limitingRatio = Math.min(widthRatio, heightRatio, 1);
          const modalWidth = Math.max(Math.min(naturalWidth * limitingRatio, viewportWidth), isMobile ? viewportWidth : 400);
          
          setModalDimensions({
            width: modalWidth + 'px',
            maxHeight: viewportHeight + 'px'
          });
        };
        img.src = selectedImage;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [modalOpen, selectedImage, isMobile]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{ mb: 2, fontFamily: 'Playfair Display', color: 'text.primary' }}
        >
          Gallery
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Explore our handcrafted pastries, custom cakes, and breads.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="category filter"
            sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {categories.map((category) => (
              <ToggleButton key={category} value={category}>
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <ImageList
          variant="masonry"
          cols={isMobile ? 1 : isTablet ? 2 : 4}
          gap={16}
          sx={{ overflow: 'hidden', m: 0 }}
        >
          {filteredItems.map((item) => (
            <ImageListItem
              key={item.id}
              sx={{
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 2,
                position: 'relative',
                '&:hover .overlay': { opacity: 1 },
                '& img': {
                  transition: 'transform 0.3s',
                },
                '&:hover img': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => handleOpenModal(item.src, item.alt, item.description || '')}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{ width: '100%', display: 'block' }}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  px: 2,
                  py: 1,
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <Typography variant="subtitle1">{item.alt}</Typography>
                {item.description && (
                  <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
                    {item.description.length > 50 
                      ? `${item.description.substring(0, 50)}...` 
                      : item.description}
                  </Typography>
                )}
              </Box>
            </ImageListItem>
          ))}
        </ImageList>

        {/* Enhanced Modal with adaptive sizing and better text handling */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <Fade in={modalOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: { xs: 2, sm: 3 },
                width: modalDimensions.width,
                maxHeight: modalDimensions.maxHeight,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Close button */}
              <IconButton
                onClick={handleCloseModal}
                aria-label="close"
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'text.secondary',
                  bgcolor: 'rgba(255,255,255,0.7)',
                  zIndex: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                }}
                size="small"
              >
                <CloseIcon />
              </IconButton>
              
              {/* Image container */}
              <Box 
                sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  textAlign: 'center',
                  mb: 2
                }}
              >
                <img
                  src={selectedImage}
                  alt={selectedTitle}
                  onLoad={handleImageLoad}
                  style={{
                    maxWidth: '100%',
                    maxHeight: isMobile ? '65vh' : '70vh',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                    borderRadius: '4px',
                  }}
                />
              </Box>
              
              {/* Title */}
              <Typography 
                variant="h6" 
                component="h3"
                sx={{ 
                  fontFamily: 'Playfair Display',
                  textAlign: 'center',
                  width: '100%',
                  mt: 1,
                }}
              >
                {selectedTitle}
              </Typography>
              
              {/* Description with better text handling */}
              {selectedDescription && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    hyphens: 'auto',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'normal',
                    WebkitHyphens: 'auto',
                    MsHyphens: 'auto',
                    lineHeight: 1.5,
                    mt: 1,
                    px: { xs: 1, sm: 2 }
                  }}
                >
                  {selectedDescription}
                </Typography>
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Container>
  );
}