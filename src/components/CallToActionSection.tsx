// Save as: src/components/CallToActionSection.tsx

import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// This component is a call-to-action section that encourages users to contact the cake designer.
export default function CallToActionSection() {
  return (
    // This section is designed to be visually appealing and encourage user interaction.
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: 'Playfair Display',
            fontWeight: 600,
          }}
        >
          Ready to Create Something Sweet?
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          Whether you're planning a special event or need a custom cake, I'm here to bring your sweet dreams to life.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/contact"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 28,
            fontSize: '1.1rem',
            boxShadow: 3,
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 5,
            },
            transition: 'all 0.3s ease',
          }}
        >
          Contact Me Today
        </Button>
      </Container>
    </Box>
  );
}