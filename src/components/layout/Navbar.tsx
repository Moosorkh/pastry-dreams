import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Collections as GalleryIcon,
  MenuBook as RecipesIcon,
  Email as ContactIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  // { name: 'About', path: '/about', icon: <InfoIcon /> },
  { name: 'Gallery', path: '/gallery', icon: <GalleryIcon /> },
  { name: 'Recipes', path: '/recipes', icon: <RecipesIcon /> },
  { name: 'Contact', path: '/contact', icon: <ContactIcon /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    // Close mobile drawer if open
    if (mobileOpen) {
      setMobileOpen(false);
    }

    // Handle the About navigation
    if (path === '/about') {
      if (location.pathname === '/') {
        // If we're on the home page, scroll to the about section
        const aboutSection = document.getElementById('about');
        aboutSection?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If we're on another page, navigate to home first
        navigate('/', { state: { scrollToAbout: true } });
      }
    } else {
      // Regular navigation for other links
      navigate(path);
    }
  };

  // Check if we need to scroll to About section after navigation
  useEffect(() => {
    if (location.state && location.state.scrollToAbout) {
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        aboutSection?.scrollIntoView({ behavior: 'smooth' });

        // Clean up state to prevent scrolling on subsequent renders
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  const drawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'primary.main',
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ fontFamily: 'Playfair Display' }}>
          Sweet Creations
        </Typography>
        <IconButton color="inherit" onClick={handleDrawerToggle} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {pages.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? 600 : 400 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Sweet Creations
        </Typography>
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        backgroundColor: 'white' 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo for desktop */}
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              letterSpacing: '.1rem',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'primary.dark',
              }
            }}
          >
            Sweet Creations
          </Typography>

          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'text.primary',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            Sweet Creations
          </Typography>

          {/* Desktop navigation links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigation(page.path)}
                sx={{
                  position: 'relative',
                  mx: 1.5,
                  my: 1,
                  color: location.pathname === page.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === page.path ? 700 : 500,
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: location.pathname === page.path ? '100%' : '0%',
                    height: '2px',
                    bottom: -4,
                    left: 0,
                    backgroundColor: 'primary.main',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.main',
                    '&::after': {
                      width: '100%',
                    },
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Contact button on desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/contact"
              sx={{
                borderRadius: 28,
                px: 3,
                textTransform: 'none',
                boxShadow: 2,
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              Get in Touch
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: 280,
            boxShadow: 8
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}