import { useState, useEffect } from 'react';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from './Footer'; // Import the Footer component
import Navbar from './Navbar';

const pages = [
  { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Recipes', path: '/recipes' },
  { name: 'Contact', path: '/contact' },
];

export default function Layout() {
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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: 'Playfair Display' }}>
        Sweet Creations
      </Typography>
      <List>
        {pages.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                textAlign: 'center',
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                }
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar/>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
          <Outlet />
        </Container>
      </Box>

      {/* Use the Footer component instead of inline footer */}
      <Footer />
    </Box>
  );
}