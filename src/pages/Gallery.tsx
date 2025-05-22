import { useState, useEffect } from 'react';
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
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { galleryItems } from '../data/mockData';

const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Desserts', 'Custom Orders'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [, setImageSize] = useState({ width: 0, height: 0 });
  const [modalDimensions, setModalDimensions] = useState({ width: '90vw', maxHeight: '90vh' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const handleCategoryChange = (_event: React.MouseEvent<HTMLElement>, newCategory: string) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const handleOpenModal = (index: number) => {
    const item = filteredItems[index];
    setSelectedImage(item.src);
    setSelectedTitle(item.alt);
    setSelectedDescription(item.description || '');
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const showNextImage = () => handleOpenModal((currentIndex + 1) % filteredItems.length);
  const showPreviousImage = () =>
    handleOpenModal((currentIndex - 1 + filteredItems.length) % filteredItems.length);

  // Function to handle image loading and calculate appropriate modal size
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    
    setImageSize({ width: naturalWidth, height: naturalHeight });
    
    // Calculate modal dimensions based on image ratio and viewport
    const viewportWidth = window.innerWidth * (isMobile ? 0.95 : 0.9);
    const viewportHeight = window.innerHeight * (isMobile ? 0.9 : 0.85);
    
    // Account for navigation controls and text
    const controlsWidth = isMobile ? 100 : 120; // Space for arrows on each side
    const textHeight = selectedDescription ? (isMobile ? 100 : 120) : 60; // Space for title and description
    
    // Determine which dimension constrains the image more
    const widthRatio = (viewportWidth - controlsWidth) / naturalWidth;
    const heightRatio = (viewportHeight - textHeight) / naturalHeight;
    
    // Use the smaller ratio to ensure image fits in viewport
    const limitingRatio = Math.min(widthRatio, heightRatio, 1); // Don't enlarge small images
    
    // Calculate modal dimensions, ensuring a minimum width for text
    const modalWidth = Math.max(
      Math.min(naturalWidth * limitingRatio + (isMobile ? 40 : controlsWidth), viewportWidth), 
      isMobile ? viewportWidth * 0.95 : 400
    );
    
    setModalDimensions({
      width: modalWidth + 'px',
      maxHeight: viewportHeight + 'px'
    });
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      if (e.key === 'ArrowRight') {
        showNextImage();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        handleCloseModal();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentIndex, filteredItems]);

  // Recalculate dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (modalOpen && selectedImage) {
        // Create a temporary image to get dimensions
        const img = new Image();
        img.onload = () => {
          const { naturalWidth, naturalHeight } = img;
          
          // Recalculate using the same logic as handleImageLoad
          const viewportWidth = window.innerWidth * (isMobile ? 0.95 : 0.9);
          const viewportHeight = window.innerHeight * (isMobile ? 0.9 : 0.85);
          const controlsWidth = isMobile ? 100 : 120;
          const textHeight = selectedDescription ? (isMobile ? 100 : 120) : 60;
          
          const widthRatio = (viewportWidth - controlsWidth) / naturalWidth;
          const heightRatio = (viewportHeight - textHeight) / naturalHeight;
          
          const limitingRatio = Math.min(widthRatio, heightRatio, 1);
          const modalWidth = Math.max(
            Math.min(naturalWidth * limitingRatio + (isMobile ? 40 : controlsWidth), viewportWidth), 
            isMobile ? viewportWidth * 0.95 : 400
          );
          
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
  }, [modalOpen, selectedImage, isMobile, selectedDescription]);

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

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6, flexWrap: 'wrap' }}>
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
          cols={isMobile ? 1 : isTablet ? 2 : isLargeScreen ? 4 : 3}
          gap={16}
          sx={{ overflow: 'hidden', m: 0 }}
        >
          {filteredItems.map((item, index) => (
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
                  transition: 'transform 0.3s ease',
                  width: '100%',
                  display: 'block',
                },
                '&:hover img': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => handleOpenModal(index)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
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
                  transition: 'opacity 0.3s ease',
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

        {/* Enhanced Modal with Navigation */}
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
                outline: 'none', // Remove focus outline
              }}
            >
              {/* Close button with dark background */}
              <IconButton
                onClick={handleCloseModal}
                aria-label="close"
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  zIndex: 3, // Above navigation buttons
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.9)',
                  },
                  width: 36,
                  height: 36,
                }}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              
              {/* Previous Image button with dark background */}
              <IconButton
                onClick={showPreviousImage}
                aria-label="previous image"
                sx={{
                  position: 'absolute',
                  left: { xs: 4, sm: 8, md: 16 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.9)',
                  },
                  zIndex: 2,
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                }}
              >
                <ArrowBackIos fontSize={isMobile ? "small" : "medium"} />
              </IconButton>

              {/* Next Image button with dark background */}
              <IconButton
                onClick={showNextImage}
                aria-label="next image"
                sx={{
                  position: 'absolute',
                  right: { xs: 4, sm: 8, md: 16 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.9)',
                  },
                  zIndex: 2,
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                }}
              >
                <ArrowForwardIos fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              
              {/* Image container */}
              <Box 
                sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  textAlign: 'center',
                  mb: 2,
                  mt: 1
                }}
              >
                <img
                  src={selectedImage}
                  alt={selectedTitle}
                  onLoad={handleImageLoad}
                  style={{
                    maxWidth: '100%',
                    maxHeight: isMobile ? '60vh' : '64vh',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                    borderRadius: '4px',
                  }}
                />
              </Box>
              
              {/* Title section improved*/}
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
              
              {/* Description with improved text handling */}
              {selectedDescription && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    hyphens: 'auto',
                    whiteSpace: 'pre-wrap', 
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