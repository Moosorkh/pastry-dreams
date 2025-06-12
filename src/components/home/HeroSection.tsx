// Save as: src/components/HeroSection.tsx

import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


// import bannerImage from '../assets/banner-image.png';

export default function HeroSection() {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        // backgroundImage: `url(${bannerImage})`, // Uncomment when you add the image
        backgroundColor: 'primary.light', // Fallback color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: { xs: 6, md: 8 },
        height: { xs: 'auto', md: '450px' },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0,0,0,0.35)'
        }}
      />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: { xs: '100%', md: '600px' } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Playfair Display',
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Mary Karimzadeh
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
              fontWeight: 500
            }}
          >
            Award-Winning Pastry Cook | Custom Cakes & Artisan Pastries
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/gallery"
            sx={{
              mr: 2,
              borderRadius: 2,
              px: 3,
              py: 1,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.3s ease',
            }}
          >
            View Gallery
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/contact"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              color: 'white',
              borderColor: 'white',
              borderWidth: 2,
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.15)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.41)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Contact Me
          </Button>
        </Box>
      </Container>
    </Paper>
  );
}