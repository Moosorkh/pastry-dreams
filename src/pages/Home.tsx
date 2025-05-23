import { useState, useRef, useEffect, useCallback } from 'react';
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
  Modal,
  Backdrop,
  useMediaQuery,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Close as CloseIcon } from '@mui/icons-material';
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
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { galleryItems } from '../data/mockData';
import bannerImage from '../../public/banner-image.png';
import maryProfileImage from '../assets/mary-kitchen.png';
import theme from '../theme';

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
        <Fab
          color="primary"
          size="small"
          aria-label="scroll back to top"
          sx={{
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}
        >
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

  // Fixed pause state management - separated manual and hover pause
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const isPaused = isManuallyPaused || isHoverPaused;

  // Touch event states for swipeable carousel
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeProgress, setSwipeProgress] = useState<number>(0);
  const progressKey = `${activeSlide}-${isPaused}`;


  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const location = useLocation();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Define minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  // Featured items for carousel from gallery
  const featuredItems = galleryItems
    .filter(item => item.featured === true)
    .slice(0, 6);

  const displayedAchievements = showFullJourney ? achievements : achievements.slice(0, 2);
  // Handler functions with useCallback to prevent unnecessary re-renders
  const handleOpenProfileModal = useCallback(() => {
    setProfileModalOpen(true);
  }, []);

  const handleCloseProfileModal = useCallback(() => {
    setProfileModalOpen(false);
  }, []);

  const handleNextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setPrevSlide(activeSlide);
    setSlideDirection('left');
    setActiveSlide((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));

    // Reset transitioning state after animation completes
    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    // Clean up the timer if the component unmounts during transition
    return () => {
      window.clearTimeout(timer);
    };
  }, [activeSlide, isTransitioning, featuredItems.length]);

  const handlePrevSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setPrevSlide(activeSlide);
    setSlideDirection('right');
    setActiveSlide((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));

    // Reset transitioning state after animation completes
    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    // Clean up the timer if the component unmounts during transition
    return () => {
      window.clearTimeout(timer);
    };
  }, [activeSlide, isTransitioning, featuredItems.length]);

  const handleDotClick = useCallback((index: number) => {
    if (isTransitioning || index === activeSlide) return;

    setIsTransitioning(true);
    setPrevSlide(activeSlide);
    setSlideDirection(index > activeSlide ? 'left' : 'right');
    setActiveSlide(index);

    // Reset transitioning state after animation completes
    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    // Clean up the timer if the component unmounts during transition
    return () => {
      window.clearTimeout(timer);
    };
  }, [activeSlide, isTransitioning]);

  // Fixed toggle pause function
  const togglePause = useCallback(() => {
    setIsManuallyPaused(prev => !prev);
  }, []);

  // Touch handlers for swipeable carousel
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null); // Reset end touch when starting new touch
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentX = e.targetTouches[0].clientX;
    setTouchEnd(currentX);

    // Calculate swipe progress as a percentage for visual feedback
    const diff = touchStart - currentX;
    // Limit the progress to between -25 and 25 percent
    const progress = Math.max(-25, Math.min(25, (diff / window.innerWidth) * 100));
    setSwipeProgress(progress);
  }, [touchStart]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && !isTransitioning) {
      handleNextSlide();
    } else if (isRightSwipe && !isTransitioning) {
      handlePrevSlide();
    }

    // Reset all touch values
    setTouchEnd(null);
    setTouchStart(null);
    setSwipeProgress(0);
  }, [touchStart, touchEnd, isTransitioning, handleNextSlide, handlePrevSlide, minSwipeDistance]);

  // Handle carousel hover/focus events - Fixed function
  const handleCarouselInteraction = useCallback((isPausing: boolean) => {
    setIsHoverPaused(isPausing);
  }, []);

  // Toggle journey display
  const toggleJourneyDisplay = useCallback(() => {
    setShowFullJourney(prev => !prev);
  }, []);
  useEffect(() => {
    if (location.hash === '#journey') {
      journeySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      setShowFullJourney(true);
    }
  }, [location]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselRef.current && carouselRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          handlePrevSlide();
        } else if (e.key === 'ArrowRight') {
          handleNextSlide();
        } else if (e.key === ' ') {
          e.preventDefault(); // Prevent page scroll on space
          togglePause();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrevSlide, handleNextSlide, togglePause]);

  // Fixed Auto-advance slides effect
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Only set up timer if not paused and not transitioning
    if (!isPaused && !isTransitioning) {
      timerRef.current = window.setTimeout(() => {
        // Check if document is still visible and component is still mounted
        if (!document.hidden && !isPaused) {
          handleNextSlide();
        }
      }, 5000); // Change slide every 5 seconds
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, isTransitioning, handleNextSlide]); // Removed activeSlide dependency
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
              onClick={handleOpenProfileModal}
              sx={{
                width: { xs: 280, md: 320 },
                height: { xs: 280, md: 320 },
                boxShadow: 4,
                border: '4px solid white',
                cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)', // Subtle scale effect on hover
                },
              }}
            />
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
                  <Box
                    component="img"
                    src={maryProfileImage}
                    alt="Mary Karimzadeh - Pastry Chef"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: isMobile ? 'calc(90vh - 60px)' : 'calc(60vh - 60px)',
                      borderRadius: 1,
                      boxShadow: 2,
                    }}
                  />
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
                      aria-hidden="true"
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
      {/* Featured Creations Carousel - Enhanced with improved controls */}
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

          {/* Enhanced carousel with improved pause/play functionality */}
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
            aria-label={`Featured creations carousel. ${isManuallyPaused ? 'Paused' : 'Auto-playing'}. Use arrow keys to navigate.`}
            role="region"
            aria-roledescription="carousel"
            aria-live="polite"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => handleCarouselInteraction(true)}
            onMouseLeave={() => handleCarouselInteraction(false)}
            onFocus={() => handleCarouselInteraction(true)}
            onBlur={() => handleCarouselInteraction(false)}
          >
            {featuredItems.map((item, index) => (
              <Box
                key={item.id}
                aria-hidden={activeSlide !== index}
                aria-roledescription="slide"
                role="group"
                aria-label={`Slide ${index + 1} of ${featuredItems.length}: ${item.alt}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: activeSlide === index ? 1 : 0,
                  transform: `translateX(${activeSlide === index
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
                      loading="lazy"
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
  sx={{
    alignSelf: 'flex-start',
    mt: 'auto',
    position: 'relative',
    zIndex: 2, // ensures it's above layout bleed
    padding: '8px 16px',
    minHeight: '44px', // improves tap target
    bottom: 30,
    '&:hover': {
      backgroundColor: 'rgba(121, 0, 163, 0.08)',
      borderColor: 'primary.main',
    },
  }}
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
                aria-hidden="true"
              >
                {swipeProgress > 0 ? <KeyboardArrowLeftIcon fontSize="large" /> : <KeyboardArrowRightIcon fontSize="large" />}
              </Box>
            )}

            {/* Enhanced Play/pause button */}
            <IconButton
              aria-label={isManuallyPaused ? "Play slideshow" : "Pause slideshow"}
              sx={{
                position: 'absolute',
                left: { xs: 8, sm: 16 },
                top: 16,
                bgcolor: isManuallyPaused ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.5)',
                color: isManuallyPaused ? 'primary.main' : 'white',
                border: isManuallyPaused ? '2px solid' : 'none',
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: isManuallyPaused ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.7)',
                  transform: 'scale(1.1)',
                },
                zIndex: 10,
                transition: 'all 0.2s ease',
              }}
              onClick={togglePause}
            >
              {isManuallyPaused ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>

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

            {/* Progress indicator - shows when auto-playing */}
            {!isPaused && (
              <Box
                key={progressKey} // Triggers restart on each slide
                sx={{
                  position: 'absolute',
                  bottom: { xs: 48, md: 48 },
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20%',
                  height: 5,
                  opacity: 0.5,
                  bgcolor: 'rgba(255,255,255,0.3)',
                  borderRadius: 1,
                  overflow: 'hidden',
                  zIndex: 10,
                }}
                aria-hidden="true"
              >
                <Box
                  sx={{
                    height: '100%',
                    bgcolor: 'primary.main',
                    animation: 'progress 5s linear forwards',
                    '@keyframes progress': {
                      '0%': { width: '0%' },
                      '100%': { width: '100%' },
                    },
                  }}
                />
              </Box>
            )}

            {/* Enhanced Indicator dots with better visibility */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                bottom: { xs: 16, md: 16 },
                left: 0,
                right: 0,
                zIndex: 10,
                py: 2
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
                    width: { xs: 10, md: 12 },
                    height: { xs: 10, md: 12 },
                    borderRadius: '50%',
                    mx: 0.5,
                    bgcolor: index === activeSlide ? 'primary.main' : 'rgba(255,255,255,0.6)',
                    border: '2px solid',
                    borderColor: index === activeSlide ? 'primary.main' : 'rgba(255,255,255,0.8)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: index === activeSlide ? 'scale(1.2)' : 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.2)',
                      bgcolor: index === activeSlide ? 'primary.main' : 'rgba(255,255,255,0.8)',
                    },
                    '&:focus': {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px'
                    }
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
              onClick={toggleJourneyDisplay}
              startIcon={showFullJourney ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{
                px: 3,
                borderRadius: 28,
                '&:hover': {
                  backgroundColor: 'rgba(233, 30, 99, 0.08)',
                },
              }}
              aria-expanded={showFullJourney}
              aria-controls="journey-timeline"
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
