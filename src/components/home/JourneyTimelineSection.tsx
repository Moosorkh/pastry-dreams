import { useState, useCallback, forwardRef } from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { achievements } from '../../data/homeData';
import React from 'react';

interface JourneyTimelineSectionProps {
  initialShowFull?: boolean;
}

const JourneyTimelineSection = forwardRef<HTMLDivElement, JourneyTimelineSectionProps>(
  ({ initialShowFull = false }, ref) => {
    const [showFullJourney, setShowFullJourney] = useState(initialShowFull);

    const toggleJourneyDisplay = useCallback(() => {
      setShowFullJourney(prev => !prev);
    }, []);

    const displayedAchievements = showFullJourney ? achievements : achievements.slice(0, 2);

    return (
      <Box sx={{ bgcolor: 'grey.50', py: 8 }} ref={ref}>
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
                    {achievement.icon && React.createElement(achievement.icon)}
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
    );
  }
);

JourneyTimelineSection.displayName = 'JourneyTimelineSection';

export default JourneyTimelineSection;