import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { galleryService, uploadService } from '../../services/api';

interface GalleryFormData {
  title: string;
  category: string;
  featured: boolean;
  image?: string;
}

const categories = ['Cakes', 'Cookies', 'Breads', 'Desserts', 'Pastries', 'Custom Orders'];

const GalleryItemForm: React.FC = () => {
  const [formData, setFormData] = useState<GalleryFormData>({
    title: '',
    category: '',
    featured: false
  });

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Load gallery item data if editing
  useEffect(() => {
    const fetchGalleryItem = async () => {
      if (id) {
        setIsEditing(true);
        setLoading(true);
        try {
          const response = await galleryService.getGalleryItem(id);
          const item = response.data.data;
          
          setFormData({
            title: item.title,
            category: item.category,
            featured: item.featured,
            image: item.image
          });
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to load gallery item');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGalleryItem();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      featured: e.target.checked
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageLoading(true);
    try {
      const response = await uploadService.uploadGalleryImage(file);
      setFormData(prev => ({
        ...prev,
        image: response.data.data.url
      }));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setImageLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!formData.image) {
      setError('Please upload an image');
      setLoading(false);
      return;
    }
    
    try {
      if (isEditing && id) {
        await galleryService.updateGalleryItem(id, formData);
      } else {
        await galleryService.createGalleryItem(formData);
      }
      
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save gallery item');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          {isEditing ? 'Edit Gallery Item' : 'Add Gallery Item'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        <Paper sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Basic Info */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Item Details
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleSelectChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={handleSwitchChange}
                      name="featured"
                      color="primary"
                    />
                  }
                  label="Featured Item"
                />
              </Grid>
              
              {/* Image Upload */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Gallery Image
                </Typography>
                
                {formData.image && (
                  <Box sx={{ mb: 2 }}>
                    <img 
                      src={formData.image} 
                      alt="Gallery preview" 
                      style={{ 
                        width: '100%', 
                        maxHeight: '400px', 
                        objectFit: 'contain',
                        borderRadius: '8px' 
                      }} 
                    />
                  </Box>
                )}
                
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  disabled={imageLoading}
                  startIcon={imageLoading ? <CircularProgress size={24} /> : undefined}
                >
                  {formData.image ? 'Change Image' : 'Upload Image'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
              </Grid>
              
              {/* Submit Buttons */}
              <Grid item xs={12} sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || !formData.image}
                    startIcon={loading ? <CircularProgress size={24} /> : undefined}
                  >
                    {isEditing ? 'Update Item' : 'Add Item'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default GalleryItemForm;