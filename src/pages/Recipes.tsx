import { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, TextField, ToggleButton,
  ToggleButtonGroup, InputAdornment, CircularProgress, Alert, Button
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import RecipeCard from '../components/features/recipes/RecipeCard';
import { recipeService } from '../services/api';
import { Recipe } from '../types';

const categories = ['All', 'Cakes', 'Cookies', 'Breads', 'Desserts', 'Pastries'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'] as const;

// Fallback data in case API fails
const fallbackRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic French Macarons',
    description: 'Delicate almond meringue cookies with a smooth ganache filling. Perfect for special occasions or afternoon tea.',
    prepTime: '30m',
    cookTime: '20m',
    difficulty: 'Hard',
    category: 'Cookies',
    image: '/api/placeholder/400/300',
    timeNeeded: '30m prep•20m cook',
    servings: 12,
    slug: 'classic-french-macarons'
  },
  {
    id: '2',
    title: 'Chocolate Soufflé',
    description: 'Light and airy chocolate soufflé that rises to perfection. A classic French dessert that never fails to impress.',
    prepTime: '20m',
    cookTime: '15m',
    difficulty: 'Medium',
    category: 'Desserts',
    image: '/api/placeholder/400/300',
    timeNeeded: '20m prep•15m cook',
    servings: 4,
    slug: 'chocolate-souffle'
  },
  {
    id: '3',
    title: 'Artisan Croissants',
    description: 'Flaky, buttery croissants made from scratch. The ultimate French breakfast pastry.',
    prepTime: '45m',
    cookTime: '25m',
    difficulty: 'Hard',
    category: 'Breads',
    image: '/api/placeholder/400/300',
    timeNeeded: '45m prep•25m cook',
    servings: 8,
    slug: 'artisan-croissants'
  },
];

export default function Recipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  // Fetch recipes from API or use fallback data
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Prepare query parameters
        const params: any = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (selectedDifficulty !== 'All') params.difficulty = selectedDifficulty;
        
        // Fetch recipes from API
        const response = await recipeService.getRecipes(params);
        
        // Process API data to ensure timeNeeded is available
        const processedRecipes = response.data.data.map((recipe: any) => ({
          ...recipe,
          timeNeeded: recipe.timeNeeded || `${recipe.prepTime} prep•${recipe.cookTime} cook`
        })) as Recipe[];
        
        setRecipes(processedRecipes);
        setUsingFallbackData(false);
      } catch (err: any) {
        console.error('Failed to fetch recipes:', err);
        setError('Failed to load recipes from server. Showing sample data instead.');
        setRecipes(fallbackRecipes);
        setUsingFallbackData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedCategory, selectedDifficulty]);

  // Function to handle search
  const handleSearch = () => {
    // If using fallback data, filter locally
    if (usingFallbackData) {
      // No action needed as we're filtering in the render method
    } else {
      // Fetch from API with search parameter
      const fetchWithSearch = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const params: any = {};
          if (selectedCategory !== 'All') params.category = selectedCategory;
          if (selectedDifficulty !== 'All') params.difficulty = selectedDifficulty;
          if (searchQuery) params.search = searchQuery;
          
          const response = await recipeService.getRecipes(params);
          
          // Process API data to ensure timeNeeded is available
          const processedRecipes = response.data.data.map((recipe: any) => ({
            ...recipe,
            timeNeeded: recipe.timeNeeded || `${recipe.prepTime} prep•${recipe.cookTime} cook`
          })) as Recipe[];
          
          setRecipes(processedRecipes);
        } catch (err: any) {
          console.error('Failed to search recipes:', err);
          setError('Failed to search recipes. Please try again.');
          // Keep using current recipes
        } finally {
          setLoading(false);
        }
      };
      
      fetchWithSearch();
    }
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

  // Filter recipes locally if using fallback data
  const filteredRecipes = usingFallbackData
    ? recipes.filter(recipe => {
        const matchesSearch = searchQuery === '' || 
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
      })
    : recipes;

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

        {/* Error Message with Fallback Notice */}
        {error && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

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