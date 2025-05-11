import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Button,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Playfair Display',
                mb: 2
              }}
            >
              Sweet Creations
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Hand-crafted pastries made with passion and premium ingredients.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Sweet Creations. All rights reserved.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Playfair Display',
                mb: 2
              }}
            >
              Contact
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: 1.5 
              }}
            >
              <EmailIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                <Link 
                  href="mailto:Mkarimzade24@Gmail.com" 
                  color="inherit" 
                  sx={{ 
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Mkarimzade24@Gmail.com
                </Link>
              </Typography>
            </Box>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: 1.5 
              }}
            >
              <LinkedInIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                <Link 
                  href="https://www.linkedin.com/in/maryam-karimzadeh-467600206/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  sx={{ 
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  LinkedIn
                </Link>
              </Typography>
            </Box>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: { xs: 'center', md: 'flex-start' } 
              }}
            >
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Playfair Display',
                mb: 2
              }}
            >
              Location
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Irvine, California
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                size="small" 
                component={RouterLink} 
                to="/contact"
                sx={{ mr: 1 }}
              >
                Get in Touch
              </Button>
              <Button 
                variant="contained" 
                size="small" 
                component={RouterLink} 
                to="/recipes"
              >
                Recipes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}