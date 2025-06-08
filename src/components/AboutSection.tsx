// Save as: src/components/AboutSection.tsx

import { useState, useCallback, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Avatar,
  Box,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';


// import maryProfileImage from '../assets/mary-kitchen.png';

const AboutSection = forwardRef<HTMLDivElement>((_props, ref) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenProfileModal = useCallback(() => {
    setProfileModalOpen(true);
  }, []);

  const handleCloseProfileModal = useCallback(() => {
    setProfileModalOpen(false);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ my: 8 }} ref={ref}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 600,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 80,
                height: 3,
                backgroundColor: 'primary.main',
              }
            }}
          >
            About Mary
          </Typography>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            Passionate Pastry Cook with Over 5 Years of Experience
          </Typography>
          <Typography paragraph>
            Mary Karimzadeh is a talented cake decorator with a passion for baking and pastry arts. Her expertise ranges from elegant cake decoration to creating French and Italian pastries with a focus on special events and custom creations.
          </Typography>
          <Typography paragraph>
            After earning a Professional Pastry Diploma at Culinary Lab Cooking School in Tustin, Mary honed her skills working in prestigious establishments including North Italia and currently at Lido House in Newport Beach. Her outgoing personality and drive for excellence, combined with meticulous attention to detail, define her approach to pastry arts.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<KeyboardArrowRightIcon />}
              component={RouterLink}
              to="/contact"
              sx={{
                borderRadius: 28,
                px: 3,
                '&:hover': {
                  transform: 'translateX(4px)',
                },
                transition: 'transform 0.3s ease',
              }}
            >
              Get in Touch
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            // src={maryProfileImage} // Uncomment when you add the image
            alt="Mary Karimzadeh"
            onClick={handleOpenProfileModal}
            sx={{
              width: { xs: 280, md: 320 },
              height: { xs: 280, md: 320 },
              boxShadow: 4,
              border: '4px solid white',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              bgcolor: 'primary.light', 
              fontSize: '4rem',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            M
          </Avatar>
          {/* Profile Image Modal */}
          <Modal
            open={profileModalOpen}
            onClose={handleCloseProfileModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
            aria-labelledby="profile-modal-title"
          >
            <Fade in={profileModalOpen}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isMobile ? '95%' : '70%',
                  maxWidth: isMobile ? '100%' : '600px',
                  maxHeight: isMobile ? '95vh' : '80vh',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 2,
                  outline: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                role="dialog"
                aria-modal="true"
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton
                    onClick={handleCloseProfileModal}
                    aria-label="close"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      bgcolor: 'rgba(0,0,0,0.05)',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Avatar
                  // src={maryProfileImage} // Uncomment when you add the image
                  alt="Mary Karimzadeh - Pastry Chef"
                  sx={{
                    width: isMobile ? 200 : 300,
                    height: isMobile ? 200 : 300,
                    fontSize: '6rem',
                    bgcolor: 'primary.light',
                    borderRadius: 1,
                    boxShadow: 2,
                  }}
                >
                  M
                </Avatar>
                <Typography id="profile-modal-title" variant="h6" sx={{ mt: 2, fontFamily: 'Playfair Display' }}>
                  Mary Karimzadeh
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pastry Chef & Cake Decorator
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </Grid>
      </Grid>
    </Container>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;