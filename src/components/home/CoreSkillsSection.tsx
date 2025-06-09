import { forwardRef } from 'react';
import { Box, Container, Typography, Grid, Paper, Fade } from '@mui/material';
import { coreSkills } from '../../data/homeData';
import React from 'react';

const CoreSkillsSection = forwardRef<HTMLDivElement>((_props, ref) => {
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
                    {React.createElement(skill.icon)}
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
  );
});

CoreSkillsSection.displayName = 'CoreSkillsSection';

export default CoreSkillsSection;