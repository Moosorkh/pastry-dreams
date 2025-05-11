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
} from '@mui/icons-material';
import bannerImage from '../../public/banner-image.png';
import maryProfileImage from '../assets/mary-kitchen.jpg';
import { featuredCreations } from '../data/mockData';
import type { Achievement, Specialty } from '../types';

const achievements: Achievement[] = [
  {
    year: '2015',
    title: 'Le Cordon Bleu Paris',
    description: 'Graduated with honors in Pastry Arts. Specialized in French pastry techniques and chocolate work.',
    icon: <SchoolIcon />,
  },
  {
    year: '2016',
    title: 'Apprenticeship at Maison Laurent',
    description: 'Trained under renowned pastry chef Pierre Laurent in his three-star Michelin restaurant.',
    icon: <RestaurantIcon />,
  },
  {
    year: '2018',
    title: 'Head Pastry Chef at The Grand Hotel',
    description: 'Led a team of pastry chefs, creating desserts for high-profile events and weddings.',
    icon: <StarIcon />,
  },
  {
    year: '2020',
    title: 'Sweet Creations Founded',
    description: 'Launched my own pastry business, focusing on custom cakes and French pastries.',
    icon: <RestaurantIcon />,
  },
  {
    year: '2023',
    title: 'Best Local Bakery Award',
    description: 'Received city\'s prestigious culinary award for excellence in pastry arts.',
    icon: <AwardIcon />,
  },
];

const specialties: Specialty[] = [
  {
    title: 'Custom Wedding Cakes',
    description: 'Specializing in elegant, multi-tiered wedding cakes with intricate designs.',
  },
  {
    title: 'French Pastries',
    description: 'Creating authentic French pastries using traditional techniques and premium ingredients.',
  },
  {
    title: 'Chocolate Work',
    description: 'Expert in chocolate tempering, molding, and creating artistic chocolate decorations.',
  },
];

export default function Home() {
  const [showFullJourney, setShowFullJourney] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle About navigation and scroll behavior
  useEffect(() => {
    if (location.pathname === '/about') {
      // Scroll to about section if we're on /about route
      aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash === '#journey') {
      // Scroll to journey section if hash is #journey
      journeySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      setShowFullJourney(true);
    }
  }, [location]);

  const displayedAchievements = showFullJourney
    ? achievements
    : achievements.slice(0, 3);

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${bannerImage})`,
          minHeight: '500px',
        }}
      >
        {/* Overlay for text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="lg">
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                  pt: { xs: 8, md: 12 },
                }}
              >
                <Typography 
                  component="h1" 
                  variant="h2" 
                  color="inherit" 
                  gutterBottom
                  sx={{ fontFamily: 'Playfair Display' }}
                >
                  Crafting Sweet Moments
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Each creation is a unique blend of traditional techniques and modern creativity. 
                  From elegant wedding cakes to delicate French pastries, we bring your sweetest dreams to life.
                </Typography>
                <Button 
                  variant="contained" 
                  component={RouterLink} 
                  to="/gallery"
                  size="large"
                  sx={{ mt: 2, mr: 2 }}
                >
                  View Gallery
                </Button>
                <Button 
                  variant="outlined" 
                  component={RouterLink} 
                  to="/contact"
                  size="large"
                  sx={{ 
                    mt: 2,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Contact Me
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* About Mary Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }} ref={aboutSectionRef} id="about">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{ fontFamily: 'Playfair Display' }}
            >
              Mary Karimzadeh
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Master Pastry Chef
            </Typography>
            <Typography paragraph>
              With over a decade of experience in pastry arts, I've dedicated my life to creating 
              moments of joy through the art of baking. My journey began in the historic kitchens 
              of Paris and has led me to create Sweet Creations, where every pastry tells a story.
            </Typography>
            <Typography paragraph>
              After graduating with honors from Le Cordon Bleu Paris, I trained under renowned pastry chef 
              Pierre Laurent in his three-star Michelin restaurant, where I honed my skills in French patisserie 
              and chocolate work. This invaluable experience shaped my dedication to excellence and attention to detail 
              that defines my approach to pastry arts today.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar 
              src={maryProfileImage} 
              alt="Mary Karimzadeh"
              sx={{
                width: { xs: 280, md: 350 },
                height: { xs: 280, md: 350 },
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Featured Creations Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              mb: 6, 
              fontFamily: 'Playfair Display',
              textAlign: 'center',
            }}
          >
            Featured Creations
          </Typography>
          <Grid container spacing={4}>
            {featuredCreations.map((creation) => (
              <Grid item key={creation.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={creation.image}
                    alt={creation.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="h3"
                      sx={{ fontFamily: 'Playfair Display' }}
                    >
                      {creation.title}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      color="primary" 
                      gutterBottom
                    >
                      {creation.category}
                    </Typography>
                    <Typography>
                      {creation.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="contained" 
              component={RouterLink} 
              to="/gallery"
              size="large"
            >
              View All Creations
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Specialties Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ fontFamily: 'Playfair Display', mb: 6 }}
        >
          My Specialties
        </Typography>
        <Grid container spacing={4}>
          {specialties.map((specialty, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 3, 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {specialty.title}
                </Typography>
                <Typography color="text.secondary">
                  {specialty.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Journey Timeline */}
      <Box sx={{ bgcolor: 'grey.50', py: 8, mb: 8 }} ref={journeySectionRef} id="journey">
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ fontFamily: 'Playfair Display', mb: 6 }}
          >
            My Journey
          </Typography>
          <Timeline position="alternate">
            {displayedAchievements.map((achievement, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    {achievement.icon}
                  </TimelineDot>
                  {index < displayedAchievements.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="h3">
                        {achievement.title}
                      </Typography>
                      <Typography color="primary" gutterBottom>
                        {achievement.year}
                      </Typography>
                      <Typography color="text.secondary">
                        {achievement.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              onClick={() => setShowFullJourney(!showFullJourney)}
              startIcon={showFullJourney ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              size="large"
            >
              {showFullJourney ? 'Show Less' : 'View Full Journey'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Philosophy Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ fontFamily: 'Playfair Display', mb: 4 }}
        >
          My Philosophy
        </Typography>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" align="center" paragraph>
            "I believe that every pastry should be a work of art – a perfect blend of 
            traditional techniques and creative innovation. Quality ingredients, attention 
            to detail, and passion are the key ingredients in everything I create."
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}