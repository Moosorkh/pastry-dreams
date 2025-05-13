import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  Avatar,
  IconButton,
  Chip,
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
import { galleryItems } from '../data/mockData';
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
    title: 'Pastry Cook at Lido House',
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
  const [prevSlide, setPrevSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Touch event states for swipeable carousel
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [swipeProgress, setSwipeProgress] = useState<number>(0);
  
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Define minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

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
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setPrevSlide(activeSlide);
    setSlideDirection('left');
    setActiveSlide((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setPrevSlide(activeSlide);
    setSlideDirection('right');
    setActiveSlide((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === activeSlide) return;
    
    setIsTransitioning(true);
    setPrevSlide(activeSlide);
    setSlideDirection(index > activeSlide ? 'left' : 'right');
    setActiveSlide(index);
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Touch handlers for swipeable carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.targetTouches[0].clientX;
    setTouchEnd(currentX);
    
    // Calculate swipe progress as a percentage for visual feedback
    if (touchStart) {
      const diff = touchStart - currentX;
      // Limit the progress to between -25 and 25 percent
      const progress = Math.max(-25, Math.min(25, (diff / window.innerWidth) * 100));
      setSwipeProgress(progress);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && !isTransitioning) {
      handleNextSlide();
    } else if (isRightSwipe && !isTransitioning) {
      handlePrevSlide();
    }
    
    // Reset all touch values
    setTouchEnd(0);
    setTouchStart(0);
    setSwipeProgress(0);
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselRef.current && carouselRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          handlePrevSlide();
        } else if (e.key === 'ArrowRight') {
          handleNextSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSlide, isTransitioning]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden && !isTransitioning) {
        handleNextSlide();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeSlide, isTransitioning]);

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

      {/* Featured Creations Carousel - IMPROVED with swipe */}
      <Box sx={{ py: 8 }}>
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
            Featured Creations
          </Typography>
          
          {/* Improved carousel with swipe functionality */}
          <Box 
            sx={{ 
              position: 'relative', 
              mb: 6, 
              height: { xs: '550px', md: '400px' },
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
              cursor: 'grab',
              '&:active': {
                cursor: 'grabbing'
              }
            }}
            ref={carouselRef}
            tabIndex={0}
            aria-label="Featured creations carousel"
            role="region"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {featuredItems.map((item, index) => (
              <Box
                key={item.id}
                aria-hidden={activeSlide !== index}
                aria-label={`Slide ${index + 1} of ${featuredItems.length}: ${item.alt}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: activeSlide === index ? 1 : 0,
                  transform: `translateX(${
                    activeSlide === index 
                      ? `${swipeProgress}%` // Apply swipe progress when active
                      : prevSlide === index && slideDirection === 'left'
                        ? '-100%'
                        : prevSlide === index && slideDirection === 'right'
                          ? '100%'
                          : slideDirection === 'left'
                            ? '100%'
                            : '-100%'
                  })`,
                  transition: isTransitioning 
                    ? 'transform 0.5s ease, opacity 0.5s ease' 
                    : swipeProgress !== 0 
                      ? 'transform 0.1s ease' 
                      : 'none',
                  zIndex: activeSlide === index ? 2 : 1,
                  overflow: 'hidden',
                  backgroundColor: 'background.paper',
                }}
              >
                <Grid container sx={{ height: '100%' }}>
                  <Grid item xs={12} md={8} sx={{ height: { xs: '250px', md: '100%' } }}>
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: { xs: 2, md: 4 }, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column' 
                    }}>
                      <Chip
                        label={item.category}
                        color="primary"
                        size="small"
                        sx={{ alignSelf: 'flex-start', mb: 2 }}
                      />
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ 
                          fontFamily: 'Playfair Display', 
                          fontWeight: 500,
                          fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
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

            {/* Swipe indicator */}
            {swipeProgress !== 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: swipeProgress > 0 ? 20 : 'auto',
                  right: swipeProgress < 0 ? 20 : 'auto',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  borderRadius: '50%',
                  p: 1,
                  zIndex: 10,
                  opacity: Math.abs(swipeProgress) / 25,
                }}
              >
                {swipeProgress > 0 ? <KeyboardArrowLeftIcon fontSize="large" /> : <KeyboardArrowRightIcon fontSize="large" />}
              </Box>
            )}

            {/* Navigation arrows */}
            <IconButton
              aria-label="Previous slide"
              sx={{
                position: 'absolute',
                left: { xs: 8, sm: 16 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.7)',
                  transform: 'translateY(-50%) scale(1.1)'
                },
                zIndex: 10,
                transition: 'all 0.2s ease',
              }}
              onClick={handlePrevSlide}
              disabled={isTransitioning}
            >
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Next slide"
              sx={{
                position: 'absolute',
                right: { xs: 8, sm: 16 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.7)',
                  transform: 'translateY(-50%) scale(1.1)'
                },
                zIndex: 10,
                transition: 'all 0.2s ease',
              }}
              onClick={handleNextSlide}
              disabled={isTransitioning}
            >
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>

            {/* Indicator dots */}
            <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    position: 'absolute',
    bottom: { xs: -9, md: 16 }, // Move below the card on mobile
    left: 0,
    right: 0,
    zIndex: 10,
    py: 2 // Add padding for better touch target
  }}
  role="tablist"
  aria-label="Carousel navigation"
>
  {featuredItems.map((_, index) => (
    <Box
      key={index}
      onClick={() => handleDotClick(index)}
      role="tab"
      tabIndex={0}
      aria-selected={activeSlide === index}
      aria-label={`Go to slide ${index + 1}`}
      sx={{
        width: { xs: 10, md: 12 }, // Smaller on mobile
        height: { xs: 10, md: 12 },
        borderRadius: '50%',
        mx: 0.5,
        // Use a more visible color scheme
        bgcolor: index === activeSlide ? 'primary.main' : 'rgba(0,0,0,0.2)',
        border: '1px solid',
        borderColor: index === activeSlide ? 'primary.main' : 'rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: index === activeSlide ? 'scale(1.2)' : 'scale(1)',
        '&:hover': {
          transform: 'scale(1.2)',
          bgcolor: index === activeSlide ? 'primary.main' : 'rgba(0,0,0,0.3)',
        },
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleDotClick(index);
          e.preventDefault();
        }
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
              aria-expanded={showFullJourney}
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