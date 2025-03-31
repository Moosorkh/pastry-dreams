import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Event as EventIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { contactService } from '../../services/api';

// const statusColors = {
//   NEW: 'info',
//   READ: 'primary',
//   REPLIED: 'success',
//   ARCHIVED: 'default'
// } as const;

const ContactMessageView: React.FC = () => {
  const [message, setMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      if (!id) return;

      try {
        const response = await contactService.getContactMessage(id);
        setMessage(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load message');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const handleStatusChange = async (status: string) => {
    if (!id) return;

    try {
      await contactService.updateContactMessage(id, status);
      setMessage((prev: any) => ({
        ...prev,
        status
      }));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  if (!message) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="warning">
            Message not found
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin')}
            sx={{ mt: 2 }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }
  type MessageStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

return (
  <Container maxWidth="md">
    <Box sx={{ py: 6 }}>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate('/admin')}
    >
      Back to Dashboard
    </Button>
    
    <Chip
      label={message.status}
      onClick={() => {
        // Ensure message.status is a valid key
        const nextStatusMap: Record<MessageStatus, MessageStatus> = {
          NEW: 'READ',
          READ: 'REPLIED',
          REPLIED: 'ARCHIVED',
          ARCHIVED: 'NEW',
        };

        const nextStatus = nextStatusMap[message.status as MessageStatus];
        handleStatusChange(nextStatus);
      }}
    />
  </Box>
        
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            {message.subject}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Received: {formatDate(message.createdAt)}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">
                  {message.email}
                </Typography>
              </Box>
              
              {message.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">
                    {message.phone}
                  </Typography>
                </Box>
              )}
              
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                From: {message.name}
              </Typography>
            </Grid>
            
            {message.eventDate && (
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">
                    Event Date: {new Date(message.eventDate).toLocaleDateString()}
                  </Typography>
                </Box>
                
                {message.eventType && (
                  <Typography variant="subtitle1">
                    Event Type: {message.eventType}
                  </Typography>
                )}
              </Grid>
            )}
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Message:
          </Typography>
          
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {message.message}
            </Typography>
          </Paper>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
                  contactService.deleteContactMessage(message.id)
                    .then(() => navigate('/admin'))
                    .catch(err => setError(err.response?.data?.message || 'Failed to delete message'));
                }
              }}
            >
              Delete Message
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              component="a"
              href={`mailto:${message.email}?subject=Re: ${message.subject}`}
              onClick={() => {
                if (message.status === 'NEW' || message.status === 'READ') {
                  handleStatusChange('REPLIED');
                }
              }}
            >
              Reply via Email
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>

  );
};

export default ContactMessageView;