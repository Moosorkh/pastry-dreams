import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import RecipeCard from '../components/features/recipes/RecipeCard';

const categories = ['All', 'Cakes', 'Cookies', 'Breads', 'Desserts', 'Pastries'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'] as const;

const recipes = [
  {
    id: '1',
    title: 'Classic French Macarons',
    description: 'Delicate almond meringue cookies with a smooth ganache filling. Perfect for special occasions or afternoon tea.',
    prepTime: '30m',
    cookTime: '20m',
    difficulty: 'Hard' as const,
    category: 'Cookies',
    image: '/api/placeholder/400/300',
    timeNeeded: '30m prep•20m cook',
  },
  {
    id: '2',
    title: 'Chocolate Soufflé',
    description: 'Light and airy chocolate soufflé that rises to perfection. A classic French dessert that never fails to impress.',
    prepTime: '20m',
    cookTime: '15m',
    difficulty: 'Medium' as const,
    category: 'Desserts',
    image: '/api/placeholder/400/300',
    timeNeeded: '20m prep•15m cook',
  },
  {
    id: '3',
    title: 'Artisan Croissants',
    description: 'Flaky, buttery croissants made from scratch. The ultimate French breakfast pastry.',
    prepTime: '45m',
    cookTime: '25m',
    difficulty: 'Hard' as const,
    category: 'Breads',
    image: '/api/placeholder/400/300',
    timeNeeded: '45m prep•25m cook',
  },
];

export default function Recipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string | null
  ) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const handleDifficultyChange = (
    event: React.MouseEvent<HTMLElement>,
    newDifficulty: string | null
  ) => {
    if (newDifficulty !== null) {
      setSelectedDifficulty(newDifficulty);
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 8 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ fontFamily: 'Playfair Display' }}
        >
          Recipes
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 6 }}
        >
          Discover our collection of carefully crafted recipes, from classic French pastries to modern desserts.
        </Typography>

        {/* Search and Filters */}
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <ToggleButtonGroup
                value={selectedCategory}
                exclusive
                onChange={handleCategoryChange}
                aria-label="recipe category"
                sx={{ flexWrap: 'wrap' }}
              >
                {categories.map((category) => (
                  <ToggleButton 
                    key={category} 
                    value={category}
                    sx={{ 
                      m: 0.5,
                      borderRadius: 2,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      },
                    }}
                  >
                    {category}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Difficulty
              </Typography>
              <ToggleButtonGroup
                value={selectedDifficulty}
                exclusive
                onChange={handleDifficultyChange}
                aria-label="recipe difficulty"
              >
                {difficulties.map((difficulty) => (
                  <ToggleButton 
                    key={difficulty} 
                    value={difficulty}
                    sx={{ 
                      m: 0.5,
                      borderRadius: 2,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      },
                    }}
                  >
                    {difficulty}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>

        {/* Recipe Grid */}
        <Grid container spacing={4}>
          {filteredRecipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No recipes found
            </Typography>
            <Typography color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}