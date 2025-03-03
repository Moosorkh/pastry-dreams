import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Card,
    CardContent,
    Stack,
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
  } from '@mui/icons-material';
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
  
  export default function About() {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 8 }}>
          {/* Hero Section */}
          <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/api/placeholder/600/800"
                alt="Mary in her kitchen"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
  
          {/* Specialties Section */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h3" 
              align="center" 
              gutterBottom
              sx={{ fontFamily: 'Playfair Display' }}
            >
              My Specialties
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
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
          </Box>
  
          {/* Journey Timeline */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h3" 
              align="center" 
              gutterBottom
              sx={{ fontFamily: 'Playfair Display', mb: 6 }}
            >
              My Journey
            </Typography>
            <Timeline position="alternate">
              {achievements.map((achievement, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      {achievement.icon}
                    </TimelineDot>
                    {index < achievements.length - 1 && <TimelineConnector />}
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
          </Box>
  
          {/* Philosophy Section */}
          <Box sx={{ mb: 8 }}>
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
          </Box>
        </Box>
      </Container>
    );
  }