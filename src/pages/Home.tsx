import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
  Avatar,
  Collapse,
  IconButton,
  Chip,
  Divider,
  Fade,
  useScrollTrigger,
  Zoom,
  Fab,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {
  School as SchoolIcon,
  Restaurant as RestaurantIcon,
  EmojiEvents as AwardIcon,
  StarBorder as StarIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  Cake as CakeIcon,
  Restaurant as KitchenIcon,
  Celebration as CelebrationIcon,
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
} from '@mui/icons-material';
import { featuredCreations, galleryItems } from '../data/mockData';
import bannerImage from '../../public/banner-image.png';
import maryProfileImage from '../assets/mary-kitchen.png';

// Core skills from resume
const coreSkills = [
  { 
    title: 'Cake Decoration', 
    description: 'Expert in decorating cakes for special occasions with creative and personalized designs.',
    icon: <CakeIcon color="primary" fontSize="large" />
  },
  { 
    title: 'Pastry Preparation', 
    description: 'Skilled in preparing a wide variety of pastries from scratch using traditional techniques.',
    icon: <KitchenIcon color="primary" fontSize="large" />
  },
  { 
    title: 'Event Planning', 
    description: 'Experience in planning and preparing desserts for special events like weddings and celebrations.',
    icon: <CelebrationIcon color="primary" fontSize="large" />
  },
  { 
    title: 'Bread Making', 
    description: 'Expertise in creating artisanal breads and Italian doughs with authentic techniques.',
    icon: <RestaurantIcon color="primary" fontSize="large" />
  },
];

// Career timeline
const achievements = [
  {
    year: '2024',
    title: 'Sweet Creations Founded',
    description: 'Launched my own pastry business, focusing on custom cakes and specialty desserts.',
    icon: <AwardIcon />,
  },
  {
    year: '2023-Present',
    title: 'Pastry Chef at Lido House',
    description: 'Leading pastry operations at this prestigious Newport Beach establishment. Responsible for presentation, decoration, baking, and special event planning.',
    icon: <StarIcon />,
  },
  {
    year: '2022-2023',
    title: 'Pastry Cook at North Italia',
    description: 'Prepared Italian breads, pastries, puddings and desserts from scratch. Developed expertise in authentic Italian techniques and presentation.',
    icon: <RestaurantIcon />,
  },
  {
    year: '2021-2022',
    title: 'Pastry Diploma from Culinary Lab',
    description: 'Earned Professional Pastry Diploma. Trained in breads, pastries, laminated doughs, chocolates, tiered cakes, and plated desserts. Completed over 1,000 hours of apprenticeship.',
    icon: <SchoolIcon />,
  },
];

// ScrollToTop button component
function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={scrollToTop}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardDoubleArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

export default function Home() {
  const [showFullJourney, setShowFullJourney] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#journey') {
      journeySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      setShowFullJourney(true);
    }
  }, [location]);

  const displayedAchievements = showFullJourney ? achievements : achievements.slice(0, 2);

  // Featured items for carousel from gallery
  const featuredItems = galleryItems
    .filter(item => item.featured === true)
    .slice(0, 6);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [featuredItems.length]);

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          position: 'relative', 
          backgroundImage: `url(${bannerImage})`, 
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
              Award-Winning Pastry Chef | Custom Cakes & Artisan Pastries
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
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* About Mary Section */}
      <Container maxWidth="lg" sx={{ my: 8 }} ref={aboutSectionRef}>
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
              Passionate Pastry Chef with Over 5 Years of Experience
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
              src={maryProfileImage} 
              alt="Mary Karimzadeh"
              sx={{
                width: { xs: 280, md: 320 },
                height: { xs: 280, md: 320 },
                boxShadow: 4,
                border: '4px solid white',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Core Skills Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }} ref={skillsSectionRef}>
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
            Core Expertise
          </Typography>
          <Grid container spacing={4}>
            {coreSkills.map((skill, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        mb: 2, 
                        p: 1.5, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {skill.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {skill.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.description}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Creations Carousel */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
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
          
          {/* Simple carousel to match screenshot */}
          <Box sx={{ position: 'relative', mb: 6 }}>
            {featuredItems.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  display: index === activeSlide ? 'block' : 'none',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <Grid container sx={{ bgcolor: 'background.paper' }}>
                  <Grid item xs={12} md={8}>
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt}
                      sx={{
                        width: '100%',
                        height: { xs: '250px', md: '400px' },
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Chip
                        label={item.category}
                        color="primary"
                        size="small"
                        sx={{ alignSelf: 'flex-start', mb: 2 }}
                      />
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontFamily: 'Playfair Display', fontWeight: 500 }}
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
                        sx={{ alignSelf: 'flex-start', mt: 'auto' }}
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
              sx={{
                position: 'absolute',
                left: { xs: 10, sm: -20 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                zIndex: 2,
              }}
              onClick={handlePrevSlide}
            >
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                right: { xs: 10, sm: -20 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                zIndex: 2,
              }}
              onClick={handleNextSlide}
            >
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>

            {/* Indicator dots */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {featuredItems.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    mx: 0.5,
                    bgcolor: index === activeSlide ? 'primary.main' : 'grey.400',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.2)',
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

      {/* Journey Timeline */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }} ref={journeySectionRef}>
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
            Professional Journey
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              With over 5 years of experience in pastry arts, my career path has taken me from custom cake decoration to leading pastry operations at premier establishments.
            </Typography>
          </Box>
          
          <Timeline position="alternate">
            {displayedAchievements.map((achievement, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined">
                    {achievement.icon}
                  </TimelineDot>
                  {index < displayedAchievements.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {achievement.title}
                    </Typography>
                    <Typography 
                      color="primary" 
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      {achievement.year}
                    </Typography>
                    <Typography color="text.secondary">
                      {achievement.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => setShowFullJourney(!showFullJourney)}
              startIcon={showFullJourney ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{ 
                px: 3,
                borderRadius: 28,
                '&:hover': {
                  backgroundColor: 'rgba(233, 30, 99, 0.08)',
                },
              }}
            >
              {showFullJourney ? 'Show Less' : 'View Full Journey'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
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

      {/* Back to Top Button */}
      <ScrollToTop />
    </Box>
  );
}