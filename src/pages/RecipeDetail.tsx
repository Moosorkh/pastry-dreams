import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Restaurant as RestaurantIcon,
  LocalDining as DiningIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';

// This would typically come from an API
const recipeData = {
  id: '1',
  title: 'Classic French Macarons',
  description: 'Delicate almond meringue cookies with a smooth ganache filling. Perfect for special occasions or afternoon tea.',
  difficulty: 'Hard' as const,
  category: 'Cookies',
  prepTime: '30 minutes',
  cookTime: '20 minutes',
  servings: 24,
  rating: 4.8,
  image: '/api/placeholder/800/400',
  ingredients: [
    '100g ground almonds',
    '100g powdered sugar',
    '2 large egg whites (aged overnight)',
    '50g granulated sugar',
    'Food coloring (optional)',
    '150g heavy cream',
    '150g chocolate (for filling)',
  ],
  instructions: [
    'Sift ground almonds and powdered sugar together in a bowl.',
    'Beat egg whites until foamy, then gradually add granulated sugar until stiff peaks form.',
    'Fold dry ingredients into egg whites carefully until mixture is smooth and flowing.',
    'Pipe small circles onto parchment-lined baking sheets.',
    'Let rest for 30 minutes until a skin forms on top.',
    'Bake at 150°C (300°F) for 15-20 minutes.',
    'Let cool completely before filling.',
    'For the ganache filling, heat cream and pour over chopped chocolate. Stir until smooth.',
    'Once cooled, pipe filling between two macaron shells.',
  ],
  tips: [
    'Make sure all ingredients are at room temperature',
    'Age your egg whites for 24-48 hours for best results',
    'Tap the baking sheet on the counter to remove air bubbles',
    'Use a template under parchment paper for consistent sizes',
  ],
};

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
} as const;

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [servings, setServings] = useState(recipeData.servings);

  // Function to adjust ingredient quantities based on serving size
  const adjustQuantity = (ingredient: string) => {
    const match = ingredient.match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)\s(.+)/);
    if (match) {
      const [_, amount, unit, item] = match;
      const adjustedAmount = (parseFloat(amount) * servings / recipeData.servings).toFixed(0);
      return `${adjustedAmount}${unit} ${item}`;
    }
    return ingredient;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/recipes" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="small" />
            Recipes
          </Link>
          <Typography color="text.primary">{recipeData.title}</Typography>
        </Breadcrumbs>

        {/* Recipe Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" component="h1" sx={{ fontFamily: 'Playfair Display', mb: 2 }}>
            {recipeData.title}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Rating value={recipeData.rating} precision={0.1} readOnly sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={recipeData.difficulty}
                color={difficultyColors[recipeData.difficulty]}
                size="small"
              />
              <Chip
                label={recipeData.category}
                variant="outlined"
                size="small"
              />
              <Chip
                icon={<AccessTimeIcon />}
                label={`Prep: ${recipeData.prepTime}`}
                variant="outlined"
                size="small"
              />
              <Chip
                icon={<DiningIcon />}
                label={`Cook: ${recipeData.cookTime}`}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {recipeData.description}
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
            src={recipeData.image}
            alt={recipeData.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
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
                {recipeData.ingredients.map((ingredient, index) => (
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
                {recipeData.instructions.map((instruction, index) => (
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

            <Paper sx={{ p: 3, bgcolor: 'primary.light' }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display', color: 'primary.contrastText' }}>
                Pro Tips
              </Typography>
              <List>
                {recipeData.tips.map((tip, index) => (
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}