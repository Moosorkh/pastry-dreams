import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  image: string;
  slug: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/recipes/${recipe.slug}`}>
        <div className="relative h-48">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary-600 font-medium">
              {recipe.category}
            </span>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{recipe.prepTime} prep</span>
              <span>•</span>
              <span>{recipe.cookTime} cook</span>
            </div>
          </div>
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {recipe.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;