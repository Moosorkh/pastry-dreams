import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { recipeService, uploadService } from '../../services/api';
import { SelectChangeEvent } from '@mui/material/Select';

interface RecipeFormData {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  image?: string;
}

const categories = ['Cakes', 'Cookies', 'Breads', 'Desserts', 'Pastries'];
const difficulties = ['Easy', 'Medium', 'Hard'] as const;

const RecipeForm: React.FC = () => {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    difficulty: 'Medium',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: 4,
    ingredients: [''],
    instructions: [''],
    tips: ['']
  });

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newIngredient, setNewIngredient] = useState('');
  const [newInstruction, setNewInstruction] = useState('');
  const [newTip, setNewTip] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Load recipe data if editing
  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        setIsEditing(true);
        setLoading(true);
        try {
          const response = await recipeService.getRecipe(id);
          const recipe = response.data.data;
          
          setFormData({
            title: recipe.title,
            description: recipe.description,
            difficulty: recipe.difficulty,
            category: recipe.category,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            tips: recipe.tips || [],
            image: recipe.image
          });
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to load recipe');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
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

  // Handle adding ingredients
  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  // Handle adding instructions
  const addInstruction = () => {
    if (newInstruction.trim()) {
      setFormData(prev => ({
        ...prev,
        instructions: [...prev.instructions, newInstruction.trim()]
      }));
      setNewInstruction('');
    }
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  // Handle adding tips
  const addTip = () => {
    if (newTip.trim()) {
      setFormData(prev => ({
        ...prev,
        tips: [...prev.tips, newTip.trim()]
      }));
      setNewTip('');
    }
  };

  const removeTip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.filter((_, i) => i !== index)
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageLoading(true);
    try {
      const response = await uploadService.uploadRecipeImage(file);
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
    
    try {
      // Remove empty items
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter(item => item.trim() !== ''),
        instructions: formData.instructions.filter(item => item.trim() !== ''),
        tips: formData.tips.filter(item => item.trim() !== '')
      };
      
      if (isEditing && id) {
        await recipeService.updateRecipe(id, cleanedData);
      } else {
        await recipeService.createRecipe(cleanedData);
      }
      
      navigate('/recipes');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save recipe');
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
          {isEditing ? 'Edit Recipe' : 'Create New Recipe'}
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
                  Basic Information
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Recipe Title"
                  name="title"
                  value={formData.title}
                  onChange={handleTextChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleTextChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    name="difficulty"
                    value={formData.difficulty}
                    label="Difficulty"
                    onChange={handleSelectChange}
                  >
                    {difficulties.map((difficulty) => (
                      <MenuItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
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
              
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Prep Time"
                  name="prepTime"
                  placeholder="e.g. 30 minutes"
                  value={formData.prepTime}
                  onChange={handleTextChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Cook Time"
                  name="cookTime"
                  placeholder="e.g. 45 minutes"
                  value={formData.cookTime}
                  onChange={handleTextChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Servings"
                  name="servings"
                  value={formData.servings}
                  onChange={handleNumberChange}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
              
              {/* Image Upload */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Recipe Image
                </Typography>
                
                {formData.image && (
                  <Box sx={{ mb: 2 }}>
                    <img 
                      src={formData.image} 
                      alt="Recipe preview" 
                      style={{ 
                        width: '100%', 
                        maxHeight: '300px', 
                        objectFit: 'cover',
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
              
              {/* Ingredients */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Ingredients
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  {formData.ingredients.map((ingredient, index) => (
                    <Chip
                      key={index}
                      label={ingredient}
                      onDelete={() => removeIngredient(index)}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
                
                <Grid container spacing={1}>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      label="New Ingredient"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      placeholder="e.g. 2 cups flour"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={addIngredient}
                      disabled={!newIngredient.trim()}
                      startIcon={<AddIcon />}
                      sx={{ height: '100%' }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              
              {/* Instructions */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Instructions
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  {formData.instructions.map((instruction, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1,
                        borderBottom: '1px solid #e0e0e0'
                      }}
                    >
                      <Typography variant="body1">
                        {index + 1}. {instruction}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => removeInstruction(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
                
                <Grid container spacing={1}>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      label="New Instruction"
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      placeholder="e.g. Preheat oven to 350°F"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={addInstruction}
                      disabled={!newInstruction.trim()}
                      startIcon={<AddIcon />}
                      sx={{ height: '100%' }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              
              {/* Tips */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Tips (Optional)
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  {formData.tips.map((tip, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1,
                        borderBottom: '1px solid #e0e0e0'
                      }}
                    >
                      <Typography variant="body1">
                        • {tip}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => removeTip(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
                
                <Grid container spacing={1}>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      label="New Tip"
                      value={newTip}
                      onChange={(e) => setNewTip(e.target.value)}
                      placeholder="e.g. Make sure all ingredients are at room temperature"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={addTip}
                      disabled={!newTip.trim()}
                      startIcon={<AddIcon />}
                      sx={{ height: '100%' }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
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
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={24} /> : undefined}
                  >
                    {isEditing ? 'Update Recipe' : 'Create Recipe'}
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

export default RecipeForm;