import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  CardActionArea,
} from '@mui/material';
import { AccessTime as AccessTimeIcon } from '@mui/icons-material';

interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  image: string;
  timeNeeded: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const difficultyColors = {
  Easy: '#4caf50',
  Medium: '#ff9800',
  Hard: '#f44336',
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="200"
          image={recipe.image}
          alt={recipe.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Chip
              label={recipe.difficulty}
              size="small"
              sx={{
                backgroundColor: difficultyColors[recipe.difficulty],
                color: 'white',
                mr: 1,
              }}
            />
            <Chip
              label={recipe.category}
              size="small"
              variant="outlined"
            />
          </Box>
          
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2"
            sx={{ 
              fontFamily: 'Playfair Display',
              minHeight: 64,
            }}
          >
            {recipe.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {recipe.description}
          </Typography>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary',
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption">
              {recipe.timeNeeded}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}