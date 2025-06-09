// Save as: src/components/FeaturedCarouselSection.tsx

import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, Chip, IconButton } from '@mui/material';
import {
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from '@mui/icons-material';
import { galleryItems } from '../../data/mockData';

export default function FeaturedCarouselSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Get featured items from your existing gallery data
  const featuredItems = galleryItems
    .filter(item => item.featured === true)
    .slice(0, 6);

  const handleNextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
  }, [featuredItems.length]);

  const handlePrevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
  }, [featuredItems.length]);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(handleNextSlide, 5000);
    return () => clearInterval(timer);
  }, [handleNextSlide]);

  if (featuredItems.length === 0) {
    return null; // Don't render if no featured items
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 5,
            fontFamily: 'Playfair Display',
            fontWeight: 600,
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '25%',
              width: '50%',
              height: 3,
              backgroundColor: 'primary.main',
            }
          }}
        >
          Featured Creations
        </Typography>

        {/* Simple Carousel */}
        <Box
          sx={{
            position: 'relative',
            mb: 6,
            height: { xs: '550px', md: '400px' },
            borderRadius: 2,
            boxShadow: 3,
            overflow: 'hidden',
          }}
        >
          {featuredItems.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: activeSlide === index ? 1 : 0,
                transition: 'opacity 0.5s ease',
                backgroundColor: 'background.paper',
              }}
            >
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} md={8} sx={{ height: { xs: '250px', md: '100%' } }}>
                  <Box
                    component="img"
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{
                    p: { xs: 2, md: 4 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Chip
                      label={item.category}
                      color="primary"
                      size="small"
                      sx={{ alignSelf: 'flex-start', mb: 2 }}
                    />
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 500,
                        fontSize: { xs: '1.5rem', md: '2rem' }
                      }}
                    >
                      {item.alt}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {item.description || "A handcrafted creation made with premium ingredients and expert techniques."}
                    </Typography>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to="/gallery"
                      sx={{
                        alignSelf: 'flex-start',
                        mt: 'auto',
                        '&:hover': {
                          backgroundColor: 'rgba(121, 0, 163, 0.08)',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      View in Gallery
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}

          {/* Navigation arrows */}
          <IconButton
            aria-label="Previous slide"
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
              zIndex: 10,
            }}
            onClick={handlePrevSlide}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="Next slide"
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
              zIndex: 10,
            }}
            onClick={handleNextSlide}
          >
            <KeyboardArrowRightIcon fontSize="large" />
          </IconButton>

          {/* Indicator dots */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 16,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            {featuredItems.map((_, index) => (
              <Box
                key={index}
                onClick={() => setActiveSlide(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  mx: 0.5,
                  bgcolor: index === activeSlide ? 'primary.main' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: index === activeSlide ? 'primary.main' : 'rgba(255,255,255,0.8)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/gallery"
            size="large"
            endIcon={<KeyboardArrowRightIcon />}
            sx={{
              px: 3,
              borderRadius: 28,
              boxShadow: 2,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.3s ease',
            }}
          >
            View All Creations
          </Button>
        </Box>
      </Container>
    </Box>
  );
}