import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClockIcon, UserIcon, ScaleIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';

interface RecipeDetailType {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  tips: string[];
  image: string;
}

// This would typically come from an API
const recipeData: RecipeDetailType = {
  title: 'Classic French Macarons',
  description: 'Delicate almond meringue cookies with a smooth ganache filling. Perfect for special occasions or afternoon tea.',
  prepTime: '30 minutes',
  cookTime: '20 minutes',
  servings: 24,
  difficulty: 'Hard',
  ingredients: [
    '100g ground almonds',
    '100g powdered sugar',
    '2 large egg whites',
    '50g granulated sugar',
    'Food coloring (optional)',
  ],
  instructions: [
    'Sift ground almonds and powdered sugar together in a bowl.',
    'Beat egg whites until foamy, then gradually add granulated sugar until stiff peaks form.',
    'Fold dry ingredients into egg whites carefully until mixture is smooth and flowing.',
    'Pipe small circles onto parchment-lined baking sheets.',
    'Let rest for 30 minutes until a skin forms on top.',
    'Bake at 150°C (300°F) for 15-20 minutes.',
  ],
  tips: [
    'Make sure all ingredients are at room temperature.',
    'Age your egg whites for 24-48 hours for best results.',
    'Tap the baking sheet on the counter to remove air bubbles.',
  ],
  image: '/api/placeholder/800/400'
};

export default function RecipeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [servingMultiplier, setServingMultiplier] = useState(1);

  // In a real app, you would fetch the recipe data based on the slug
  const recipe = recipeData;

  // Function to adjust ingredient quantities based on serving multiplier
  const adjustQuantity = (ingredient: string) => {
    const match = ingredient.match(/^(\d+(?:\.\d+)?)(g|ml|cups?|tbsp|tsp|)(\s.*)/);
    if (match) {
      const [_, quantity, unit, rest] = match;
      const adjustedQuantity = (parseFloat(quantity) * servingMultiplier).toFixed(1);
      return `${adjustedQuantity}${unit}${rest}`;
    }
    return ingredient;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/recipes" className="hover:text-primary-600">Recipes</Link></li>
            <li>•</li>
            <li className="text-gray-900">{recipe.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              <span>Serves: {recipe.servings * servingMultiplier}</span>
            </div>
            <div className="flex items-center">
              <ScaleIcon className="h-5 w-5 mr-2" />
              <span>Difficulty: {recipe.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mb-12">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Servings Adjuster */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Adjust servings</label>
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              onClick={() => setServingMultiplier(prev => Math.max(0.5, prev - 0.5))}
            >
              -
            </Button>
            <span className="text-lg font-medium">{recipe.servings * servingMultiplier} servings</span>
            <Button
              size="sm"
              onClick={() => setServingMultiplier(prev => prev + 0.5)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{adjustQuantity(ingredient)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-4">Tips for Success</h2>
          <div className="bg-primary-50 rounded-lg p-6">
            <ul className="space-y-2">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2 flex-shrink-0">
                    ✓
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}