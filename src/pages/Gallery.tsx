import { useState, useEffect, useRef, useCallback } from 'react';
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
  Skeleton,
  Chip,
  Zoom,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { galleryItems } from '../data/mockData';

const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Desserts', 'Custom Orders'];

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [, setImageSize] = useState({ width: 0, height: 0 });
  const [modalDimensions, setModalDimensions] = useState({ width: '90vw', maxHeight: '90vh' });
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());
  const [, setZoomLevel] = useState(1);
  const [, setIsFullscreen] = useState(false);
  const [touchState, setTouchState] = useState<TouchState | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleCategoryChange = (_event: React.MouseEvent<HTMLElement>, newCategory: string) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  // Preload adjacent images for smooth navigation
  const preloadAdjacentImages = useCallback((index: number) => {
    const preloadIndexes = [
      (index + 1) % filteredItems.length,
      (index - 1 + filteredItems.length) % filteredItems.length,
    ];

    preloadIndexes.forEach((idx) => {
      const item = filteredItems[idx];
      if (item && !preloadedImages.has(item.src)) {
        const img = new Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, item.src]));
        };
        img.src = item.src;
      }
    });
  }, [filteredItems, preloadedImages]);

  const handleOpenModal = (index: number) => {
    const item = filteredItems[index];
    setSelectedImage(item.src);
    setSelectedTitle(item.alt);
    setSelectedDescription(item.description || '');
    setCurrentIndex(index);
    setZoomLevel(1);
    setModalOpen(true);
    preloadAdjacentImages(index);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setZoomLevel(1);
    setIsFullscreen(false);
  };

  const showNextImage = useCallback(() => {
    const newIndex = (currentIndex + 1) % filteredItems.length;
    handleOpenModal(newIndex);
  }, [currentIndex, filteredItems.length]);

  const showPreviousImage = useCallback(() => {
    const newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    handleOpenModal(newIndex);
  }, [currentIndex, filteredItems.length]);



  // Handle image loading states
  const handleImageLoadStart = (src: string) => {
    setLoadingImages(prev => new Set([...prev, src]));
  };

  const handleImageLoadComplete = (src: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(src);
      return newSet;
    });
    setErrorImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(src);
      return newSet;
    });
  };

  const handleImageError = (src: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(src);
      return newSet;
    });
    setErrorImages(prev => new Set([...prev, src]));
  };

  // Enhanced image load handler for modal
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    
    setImageSize({ width: naturalWidth, height: naturalHeight });
    
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

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchState({
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchState) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    const deltaTime = Date.now() - touchState.startTime;

    // Swipe detection (minimum distance and speed)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 500) {
      if (deltaX > 0) {
        showPreviousImage();
      } else {
        showNextImage();
      }
    }

    setTouchState(null);
  };

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          showNextImage();
          e.preventDefault();
          break;
        case 'ArrowLeft':
          showPreviousImage();
          e.preventDefault();
          break;
        case 'Escape':
          handleCloseModal();
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, showNextImage, showPreviousImage]);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{ 
            mb: 2, 
            fontFamily: 'Playfair Display', 
            color: 'text.primary',
            background: 'linear-gradient(45deg, #8B4513, #D2691E)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
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
            sx={{ 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              '& .MuiToggleButton-root': {
                borderRadius: '20px',
                mx: 0.5,
                my: 0.5,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                border: '2px solid',
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                transition: 'all 0.3s ease',
              }
            }}
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
                borderRadius: 3,
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  '& .overlay': { 
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                  '& img': {
                    transform: 'scale(1.08)',
                  },
                },
                '& img': {
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '100%',
                  display: 'block',
                },
              }}
              onClick={() => handleOpenModal(index)}
            >
              {loadingImages.has(item.src) && (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                  }}
                />
              )}
              
              {errorImages.has(item.src) ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 200,
                    bgcolor: 'grey.100',
                    color: 'text.secondary',
                  }}
                >
                  <Alert severity="error" variant="outlined">
                    Failed to load image
                  </Alert>
                </Box>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  onLoadStart={() => handleImageLoadStart(item.src)}
                  onLoad={() => handleImageLoadComplete(item.src)}
                  onError={() => handleImageError(item.src)}
                />
              )}
              
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)',
                  color: '#fff',
                  px: 2,
                  py: 2,
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {item.alt}
                </Typography>
                {item.description && (
                  <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.3 }}>
                    {item.description.length > 60 
                      ? `${item.description.substring(0, 60)}...` 
                      : item.description}
                  </Typography>
                )}
              </Box>
            </ImageListItem>
          ))}
        </ImageList>

        {/* Enhanced Modal with Navigation and Zoom */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <Fade in={modalOpen}>
            <Box
              ref={modalRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 24,
                p: { xs: 2, sm: 3 },
                width: modalDimensions.width,
                height: 'auto',
                maxHeight: modalDimensions.maxHeight,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                outline: 'none',
              }}
            >
              {/* Simplified Header with Controls */}
              <Box sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                display: 'flex', 
                gap: 1, 
                zIndex: 3 
              }}>
                <Chip
                  label={`${currentIndex + 1} / ${filteredItems.length}`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)',
                  }}
                />
                
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    bgcolor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    '&:hover': { 
                      bgcolor: 'rgba(0,0,0,0.95)',
                      transform: 'scale(1.1)',
                    },
                    width: 40,
                    height: 40,
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.2s ease',
                  }}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              
              {/* Enhanced Navigation - Positioned inside image area */}
              <IconButton
                onClick={showPreviousImage}
                sx={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.95)',
                  color: 'text.primary',
                  border: '2px solid rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,1)',
                    transform: 'translateY(-50%) scale(1.1)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                  zIndex: 2,
                  width: 56,
                  height: 56,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <KeyboardArrowLeft fontSize="large" />
              </IconButton>

              <IconButton
                onClick={showNextImage}
                sx={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.95)',
                  color: 'text.primary',
                  border: '2px solid rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,1)',
                    transform: 'translateY(-50%) scale(1.1)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                  zIndex: 2,
                  width: 56,
                  height: 56,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <KeyboardArrowRight fontSize="large" />
              </IconButton>
              
              {/* Image container - Contained within modal */}
              <Box 
                sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  mt: 6,
                  mb: 2,
                }}
              >
                {loadingImages.has(selectedImage) && (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '50vh',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}>
                    <CircularProgress size={48} />
                  </Box>
                )}
                
                <Zoom in={modalOpen} timeout={300}>
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt={selectedTitle}
                    onLoad={handleImageLoad}
                    onLoadStart={() => handleImageLoadStart(selectedImage)}
                    onLoadCapture={() => handleImageLoadComplete(selectedImage)}
                    style={{
                      maxWidth: '100%',
                      maxHeight: isMobile ? '60vh' : '64vh',
                      objectFit: 'contain',
                      display: 'block',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: '8px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                  />
                </Zoom>
              </Box>
              
              {/* Title and Description - Below image */}
              <Typography 
                variant="h5" 
                component="h3"
                sx={{ 
                  fontFamily: 'Playfair Display',
                  textAlign: 'center',
                  width: '100%',
                  fontWeight: 600,
                  mb: selectedDescription ? 1 : 0,
                }}
              >
                {selectedTitle}
              </Typography>
              
              {selectedDescription && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    px: { xs: 2, sm: 4 },
                    maxWidth: '600px',
                    mx: 'auto',
                  }}
                >
                  {selectedDescription}
                </Typography>
              )}

              {/* Keyboard shortcuts hint */}
              {!isMobile && (
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{
                    mt: 2,
                    textAlign: 'center',
                    opacity: 0.7,
                  }}
                >
                  Use ← → keys to navigate • ESC to close
                </Typography>
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Container>
  );
}