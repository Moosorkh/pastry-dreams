import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard, { Recipe } from '../components/features/recipes/RecipeCard';
import Button from '../components/ui/Button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Sample data - would typically come from an API
const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic French Macarons',
    description: 'Delicate almond meringue cookies with a smooth ganache filling. Perfect for special occasions or afternoon tea.',
    prepTime: '30m',
    cookTime: '20m',
    difficulty: 'Hard',
    category: 'Cookies',
    image: '/api/placeholder/600/400',
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
    image: '/api/placeholder/600/400',
    slug: 'chocolate-souffle'
  },
  // Add more recipes as needed
];

const categories = ['All', 'Cakes', 'Cookies', 'Breads', 'Desserts', 'Pastries'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

export default function Recipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredRecipes = useMemo(() => {
    return sampleRecipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-serif font-bold text-gray-900 sm:text-5xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Recipes
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover our collection of carefully crafted recipes, from classic French pastries to modern desserts.
        </motion.p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">
            No recipes found. Try adjusting your search or filters.
          </p>
        </motion.div>
      )}
    </div>
  );
}