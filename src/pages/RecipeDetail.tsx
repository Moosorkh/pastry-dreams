import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonGroup,
  Button,
  Breadcrumbs,
  Link,
  Rating,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Restaurant as RestaurantIcon,
  LocalDining as DiningIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { recipes } from '../data/mockData';

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
} as const;

export default function RecipeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [recipe, setRecipe] = useState(recipes[0]); // Default to first recipe
  const [servings, setServings] = useState(recipe.servings);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  // Find the recipe by slug when the component mounts or slug changes
  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    
    // Simulate API delay for demo purposes
    setTimeout(() => {
      const foundRecipe = recipes.find(r => r.slug === slug);
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setServings(foundRecipe.servings);
      } else {
        console.error(`Recipe with slug "${slug}" not found`);
        setNotFound(true);
      }
      setLoading(false);
    }, 300);
  }, [slug]);

  // Function to adjust ingredient quantities based on serving size
  const adjustQuantity = (ingredient: string) => {
    const match = ingredient.match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)\s(.+)/);
    if (match) {
      const [_, amount, unit, item] = match;
      const adjustedAmount = (parseFloat(amount) * servings / recipe.servings).toFixed(0);
      return `${adjustedAmount}${unit} ${item}`;
    }
    return ingredient;
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (notFound) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            Recipe not found. The recipe you're looking for might have been removed or doesn't exist.
          </Alert>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/recipes')}
          >
            Back to Recipes
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/recipes" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="small" />
            Recipes
          </Link>
          <Typography color="text.primary">{recipe.title}</Typography>
        </Breadcrumbs>

        {/* Recipe Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" component="h1" sx={{ fontFamily: 'Playfair Display', mb: 2 }}>
            {recipe.title}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Rating value={recipe.rating} precision={0.1} readOnly sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={recipe.difficulty}
                color={difficultyColors[recipe.difficulty as keyof typeof difficultyColors]}
                size="small"
              />
              <Chip
                label={recipe.category}
                variant="outlined"
                size="small"
              />
              <Chip
                icon={<AccessTimeIcon />}
                label={`Prep: ${recipe.prepTime}`}
                variant="outlined"
                size="small"
              />
              <Chip
                icon={<DiningIcon />}
                label={`Cook: ${recipe.cookTime}`}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {recipe.description}
          </Typography>
        </Box>

        {/* Recipe Image */}
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 6,
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: '100%', height: '400px', display: 'block', objectFit: 'cover' }}
            onError={(e) => {
              // Fallback for if the image fails to load
              (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=Recipe+Image';
            }}
          />
        </Paper>

        <Grid container spacing={6}>
          {/* Ingredients */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                Ingredients
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Servings
                </Typography>
                <ButtonGroup size="small">
                  <Button
                    onClick={() => setServings(prev => Math.max(1, prev - 1))}
                    startIcon={<RemoveIcon />}
                  >
                    Less
                  </Button>
                  <Button disabled>
                    {servings}
                  </Button>
                  <Button
                    onClick={() => setServings(prev => prev + 1)}
                    startIcon={<AddIcon />}
                  >
                    More
                  </Button>
                </ButtonGroup>
              </Box>

              <Divider sx={{ my: 2 }} />

              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <RestaurantIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={adjustQuantity(ingredient)} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Instructions and Tips */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                Instructions
              </Typography>
              <List>
                {recipe.instructions.map((instruction, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Typography variant="h6" color="primary">
                        {index + 1}.
                      </Typography>
                    </ListItemIcon>
                    <ListItemText primary={instruction} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {recipe.tips && recipe.tips.length > 0 && (
              <Paper sx={{ p: 3, bgcolor: 'primary.light' }}>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display', color: 'primary.contrastText' }}>
                  Pro Tips
                </Typography>
                <List>
                  {recipe.tips.map((tip, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: 'primary.contrastText' }}>
                        <Typography variant="body1">•</Typography>
                      </ListItemIcon>
                      <ListItemText 
                        primary={tip} 
                        sx={{ 
                          '& .MuiListItemText-primary': { 
                            color: 'primary.contrastText' 
                          } 
                        }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}