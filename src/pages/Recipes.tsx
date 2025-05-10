import { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, TextField, ToggleButton,
  ToggleButtonGroup, InputAdornment, CircularProgress, Alert, Button
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import RecipeCard from '../components/features/recipes/RecipeCard';
import { recipes as mockRecipes } from '../data/mockData';
import { Recipe } from '../types';

const categories = ['All', 'Cakes', 'Cookies', 'Breads', 'Desserts', 'Pastries'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'] as const;

export default function Recipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Load mock recipes instead of fetching from API
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay for demo purposes
    setTimeout(() => {
      setRecipes(mockRecipes);
      setLoading(false);
    }, 500);
  }, []);

  // Filter recipes locally based on selected category and difficulty
  useEffect(() => {
    // No need to reload data, just let the filtering happen in the render
  }, [selectedCategory, selectedDifficulty]);

  // Function to handle search
  const handleSearch = () => {
    // Just trigger re-render with current filters
    // The actual filtering is done in the filteredRecipes calculation
  };

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: string | null
  ) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const handleDifficultyChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDifficulty: string | null
  ) => {
    if (newDifficulty !== null) {
      setSelectedDifficulty(newDifficulty);
    }
  };

  // Filter recipes locally
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = searchQuery === '' || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" onClick={handleSearch}>
                    Search
                  </Button>
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

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Container>
  );
}