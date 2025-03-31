import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 12, textAlign: 'center' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            py: 8, 
            px: 4,
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            color="primary" 
            sx={{ 
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 700,
              lineHeight: 1
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ mb: 4, fontFamily: 'Playfair Display' }}
          >
            Page Not Found
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ maxWidth: 500, mx: 'auto', mb: 6 }}
          >
            The page you are looking for might have been removed, 
            had its name changed, or is temporarily unavailable.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
          >
            Back to Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;