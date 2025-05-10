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
} from '@mui/material';

import { galleryItems } from '../data/mockData'; 

const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Custom Orders'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: string,
  ) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

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
            color: 'text.primary'
          }}
        >
          Gallery
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 6 }}
        >
          Explore our collection of handcrafted pastries, custom cakes, and artisanal breads.
        </Typography>

        {/* Category Filter */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="category filter"
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'center',
              '& .MuiToggleButton-root': {
                borderRadius: 2,
                m: 0.5,
                textTransform: 'none',
                fontSize: '0.9rem',
              },
            }}
          >
            {categories.map((category) => (
              <ToggleButton 
                key={category} 
                value={category}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Gallery Grid */}
        <ImageList 
          variant="masonry" 
          cols={isMobile ? 1 : isTablet ? 2 : 3} 
          gap={24}
          sx={{ 
            mb: 8,
            '& .MuiImageListItem-root': {
              overflow: 'hidden',
              borderRadius: 2,
              boxShadow: 1,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.02)',
              },
            },
          }}
        >
          {filteredItems.map((item) => (
            <ImageListItem 
              key={item.title}
              sx={{ 
                cursor: 'pointer',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  transition: 'opacity 0.3s',
                  opacity: 0,
                },
                '&:hover::after': {
                  opacity: 1,
                },
                '&:hover .image-title': {
                  opacity: 1,
                },
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <Typography
                className="image-title"
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  color: 'white',
                  zIndex: 1,
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  fontFamily: 'Playfair Display',
                }}
                variant="h6"
              >
                {item.title}
              </Typography>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
}