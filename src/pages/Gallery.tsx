import { useState } from 'react';
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
} from '@mui/material';
import { galleryItems } from '../data/mockData';

const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Desserts', 'Custom Orders'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');

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
    setSelectedDescription(description); // Use the description parameter
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
                    {item.description}
                  </Typography>
                )}
              </Box>
            </ImageListItem>
          ))}
        </ImageList>

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
                width: isMobile ? '90%' : '90%',
                height: isMobile ? '50%' : '90%',
                maxWidth: isMobile ? '100vw' : '1200px',
                maxHeight: isMobile ? '90vh' : '90vh',
                boxShadow: isMobile ? 0 : 24,
                outline: 'none',
                bgcolor: 'background.paper',
                borderRadius: isMobile ? 0 : 2,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                p: isMobile ? 0 : 2,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={selectedImage}
                  alt={selectedTitle}
                  style={{
                    maxWidth: '100%',
                    maxHeight: isMobile ? '100%' : '80vh',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: isMobile ? 0 : '8px 8px 0 0',
                  }}
                />
              </Box>
              <Box sx={{ p: isMobile ? 2 : 3, flexShrink: 0 }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {selectedTitle}
                </Typography>
                {selectedDescription && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      textAlign: 'center',
                    }}
                  >
                    {selectedDescription}
                  </Typography>
                )}
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Container>
  );
}