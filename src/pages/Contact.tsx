import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Snackbar,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const businessHours = [
  { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { days: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { days: 'Sunday', hours: 'Closed' },
];

const eventTypes = [
  'Wedding',
  'Birthday',
  'Anniversary',
  'Corporate Event',
  'Other',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    eventType: '',
    eventDate: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);

    setSnackbar({
      open: true,
      message: 'Thank you for your message. We will get back to you soon!',
      severity: 'success',
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'general',
      eventType: '',
      eventDate: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontFamily: 'Playfair Display' }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8 }}
        >
          Whether you're planning a special event or just want to say hello,
          I'd love to hear from you.
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Stack spacing={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                  Contact Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon color="primary" />
                    <Typography>Mkarimzade24@Gmail.com</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkedInIcon color="primary" />
                    <Typography><a href='https://www.linkedin.com/in/maryam-karimzadeh-467600206/'>LinkedIn</a></Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon color="primary" />
                    <Typography>Irvine, CA</Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                  Business Hours
                </Typography>
                <Stack spacing={2}>
                  {businessHours.map((schedule, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TimeIcon color="primary" />
                        <Typography variant="subtitle2">{schedule.days}</Typography>
                      </Box>
                      <Typography color="text.secondary" sx={{ pl: 4 }}>
                        {schedule.hours}
                      </Typography>
                      {index < businessHours.length - 1 && <Divider sx={{ mt: 1 }} />}
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                      Send us a Message
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel>Type of Inquiry</FormLabel>
                      <RadioGroup
                        row
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="general"
                          control={<Radio />}
                          label="General Inquiry"
                        />
                        <FormControlLabel
                          value="event"
                          control={<Radio />}
                          label="Event Order"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {formData.inquiryType === 'event' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          select
                          label="Event Type"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                        >
                          {eventTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Event Date"
                          name="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}