import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
} from '@mui/material';

const featuredCreations = [
  {
    id: 1,
    title: 'French Macarons',
    image: '/api/placeholder/400/300',
    category: 'Pastries',
    description: 'Delicate almond meringue cookies with smooth ganache filling',
  },
  {
    id: 2,
    title: 'Wedding Cake',
    image: '/api/placeholder/400/300',
    category: 'Cakes',
    description: 'Elegant multi-tiered cakes for your special day',
  },
  {
    id: 3,
    title: 'Artisan Croissants',
    image: '/api/placeholder/400/300',
    category: 'Breads',
    description: 'Flaky, buttery croissants made from scratch',
  },
];

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(/api/placeholder/1600/800)`,
          minHeight: '500px',
        }}
      >
        {/* Increase the priority of the hero background image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="lg">
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                  pt: { xs: 8, md: 12 },
                }}
              >
                <Typography 
                  component="h1" 
                  variant="h2" 
                  color="inherit" 
                  gutterBottom
                  sx={{ fontFamily: 'Playfair Display' }}
                >
                  Crafting Sweet Moments
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Each creation is a unique blend of traditional techniques and modern creativity. 
                  From elegant wedding cakes to delicate French pastries, we bring your sweetest dreams to life.
                </Typography>
                <Button 
                  variant="contained" 
                  component={RouterLink} 
                  to="/gallery"
                  size="large"
                  sx={{ mt: 2, mr: 2 }}
                >
                  View Gallery
                </Button>
                <Button 
                  variant="outlined" 
                  component={RouterLink} 
                  to="/contact"
                  size="large"
                  sx={{ 
                    mt: 2,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Contact Me
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Featured Creations Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            mb: 6, 
            fontFamily: 'Playfair Display',
            textAlign: 'center',
          }}
        >
          Featured Creations
        </Typography>
        <Grid container spacing={4}>
          {featuredCreations.map((creation) => (
            <Grid item key={creation.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={creation.image}
                  alt={creation.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="h2"
                    sx={{ fontFamily: 'Playfair Display' }}
                  >
                    {creation.title}
                  </Typography>
                  <Typography 
                    variant="subtitle2" 
                    color="primary" 
                    gutterBottom
                  >
                    {creation.category}
                  </Typography>
                  <Typography>
                    {creation.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}