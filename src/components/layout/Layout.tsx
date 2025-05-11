import {  useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {

  Box,
  Container,

} from '@mui/material';
import Footer from './Footer'; // Import the Footer component
import Navbar from './Navbar';



export default function Layout() {
  const location = useLocation();



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