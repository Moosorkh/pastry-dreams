import { Recipe } from '../types/index';
import IMG_3104 from '../../public/IMG_3104.jpg';


// Recipe data for RecipeDetail and Recipes components
export const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Classic French Macarons',
      slug: 'classic-french-macarons',
      description: 'Delicate almond meringue cookies with a smooth ganache filling. Perfect for special occasions or afternoon tea.',
      difficulty: 'Hard',
      category: 'Cookies',
      prepTime: '30m',
      cookTime: '20m',
      servings: 24,
      rating: 4.8,
      ingredients: [
        '100g ground almonds',
        '100g powdered sugar',
        '2 large egg whites (aged overnight)',
        '50g granulated sugar',
        'Food coloring (optional)',
        '150g heavy cream',
        '150g chocolate (for filling)'
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
        'Once cooled, pipe filling between two macaron shells.'
      ],
      tips: [
        'Make sure all ingredients are at room temperature',
        'Age your egg whites for 24-48 hours for best results',
        'Tap the baking sheet on the counter to remove air bubbles',
        'Use a template under parchment paper for consistent sizes'
      ],
      image: '/api/placeholder/800/400',
      timeNeeded: '30m prep•20m cook'
    },
    {
      id: '2',
      title: 'Chocolate Soufflé',
      slug: 'chocolate-souffle',
      description: 'Light and airy chocolate soufflé that rises to perfection. A classic French dessert that never fails to impress.',
      difficulty: 'Medium',
      category: 'Desserts',
      prepTime: '20m',
      cookTime: '15m',
      servings: 4,
      rating: 4.5,
      ingredients: [
        '50g butter, plus extra for greasing',
        '2 tbsp cocoa powder',
        '100g dark chocolate',
        '1 tsp vanilla extract',
        '3 egg yolks',
        '4 egg whites',
        '50g caster sugar',
        'Icing sugar for dusting'
      ],
      instructions: [
        'Preheat oven to 180°C. Grease ramekins with butter and dust with cocoa powder.',
        'Melt chocolate and butter together over a water bath.',
        'Mix in vanilla and egg yolks, one at a time.',
        'In a separate bowl, whisk egg whites until soft peaks form, then gradually add sugar.',
        'Gently fold egg whites into chocolate mixture, being careful not to deflate.',
        'Pour into prepared ramekins and bake for 12-15 minutes.',
        'Dust with icing sugar and serve immediately.'
      ],
      tips: [
        'Make sure bowls and utensils are completely clean and dry when beating egg whites',
        'Don\'t open the oven while soufflés are baking',
        'Serve immediately for the best rise'
      ],
      image: '/api/placeholder/800/400',
      timeNeeded: '20m prep•15m cook'
    },
    {
      id: '3',
      title: 'Artisan Croissants',
      slug: 'artisan-croissants',
      description: 'Flaky, buttery croissants made from scratch. The ultimate French breakfast pastry.',
      difficulty: 'Hard',
      category: 'Breads',
      prepTime: '45m',
      cookTime: '25m',
      servings: 8,
      rating: 4.9,
      ingredients: [
        '500g strong white bread flour',
        '10g salt',
        '80g caster sugar',
        '10g instant yeast',
        '300ml cold water',
        '300g cold unsalted butter',
        '1 egg, beaten, for glazing'
      ],
      instructions: [
        'Mix flour, salt, sugar, yeast, and water in a bowl until it forms a dough.',
        'Knead for 10 minutes until smooth and elastic.',
        'Rest in the refrigerator for 1 hour.',
        'Roll out to a rectangle and place the butter in the center.',
        'Fold the dough over the butter to enclose it completely.',
        'Roll out and fold three times, resting for 30 minutes in the refrigerator between each fold.',
        'Roll out the dough to 5mm thickness and cut into triangles.',
        'Roll up from the base to the tip and curve into a crescent shape.',
        'Prove for 2 hours until doubled in size.',
        'Brush with beaten egg and bake at 200°C (390°F) for 20-25 minutes until golden.'
      ],
      tips: [
        'Keep all ingredients and equipment as cold as possible',
        'Be patient with the lamination process - this is what creates the flaky layers',
        'If the butter starts to melt during rolling, return it to the refrigerator immediately',
        'For the best rise, proof the croissants in a slightly warm, humid environment'
      ],
      image: '/api/placeholder/800/400',
      timeNeeded: '45m prep•25m cook'
    },
    {
      id: '4',
      title: 'Opera Cake',
      slug: 'opera-cake',
      description: 'Elegant French cake consisting of almond sponge soaked in coffee syrup, layered with coffee buttercream and chocolate ganache.',
      difficulty: 'Hard',
      category: 'Cakes',
      prepTime: '60m',
      cookTime: '30m',
      servings: 12,
      rating: 4.7,
      ingredients: [
        '6 large eggs, separated',
        '180g ground almonds',
        '180g icing sugar',
        '150g unsalted butter, melted and cooled',
        '50g plain flour',
        '6 egg whites',
        '30g caster sugar',
        '200g dark chocolate',
        '200ml strong coffee'
      ],
      instructions: [
        'Preheat oven to 180°C (350°F) and line two baking sheets with parchment paper.',
        'Whisk the egg yolks with ground almonds and icing sugar until pale and thick.',
        'Fold in the melted butter and flour.',
        'In a separate bowl, whisk the egg whites with caster sugar until stiff peaks form.',
        'Gently fold the egg whites into the almond mixture.',
        'Spread the batter evenly onto the prepared baking sheets.',
        'Bake for 10-12 minutes until lightly golden.'
      ],
      tips: [
        'Make this cake a day ahead to allow the flavors to develop',
        'Keep the cake refrigerated but bring to room temperature before serving',
        'Use a sharp knife dipped in hot water to get clean cuts'
      ],
      image: '/api/placeholder/800/400',
      timeNeeded: '60m prep•30m cook'
    },
    {
      id: '5',
      title: 'Lemon Tart',
      slug: 'lemon-tart',
      description: 'A classic French dessert featuring a buttery pastry crust filled with tangy lemon curd. Perfectly balanced between sweet and tart.',
      difficulty: 'Medium',
      category: 'Pastries',
      prepTime: '40m',
      cookTime: '45m',
      servings: 8,
      rating: 4.6,
      ingredients: [
        '200g plain flour',
        '100g cold butter, cubed',
        '3 tbsp icing sugar',
        '1 large egg yolk',
        '2-3 tbsp cold water',
        '5 eggs',
        '150g caster sugar',
        '2 lemons, zested and juiced'
      ],
      instructions: [
        'For the pastry, rub butter into flour until it resembles breadcrumbs.',
        'Stir in the icing sugar, then add the egg yolk and enough water to form a dough.',
        'Wrap and chill for 30 minutes.',
        'Roll out the pastry and line a 23cm tart tin. Chill for 15 minutes.',
        'Prick the base, line with baking paper and beans, and blind bake at 180°C (350°F) for 15 minutes.',
        'Remove the paper and beans and bake for another 5-10 minutes until golden.'
      ],
      tips: [
        'Keep all pastry ingredients as cold as possible for the best results',
        'If the pastry starts to soften while you\'re working with it, return it to the refrigerator to chill',
        'The filling should be just set but still have a slight wobble when it comes out of the oven - it will continue to set as it cools'
      ],
      image: '/api/placeholder/800/400',
      timeNeeded: '40m prep•45m cook'
    }
  ];
  
  // Gallery items for Gallery component
  export const galleryItems = [
    {
      img: IMG_3104,
      title: 'Wedding Cake with Roses',
      category: 'Cakes',
      featured: true,
    },
    {
      img: '/api/placeholder/600/600',
      title: 'French Macarons',
      category: 'Pastries',
    },
    {
      img: '/api/placeholder/600/800',
      title: 'Birthday Cake',
      category: 'Cakes',
    },
    {
      img: '/api/placeholder/600/600',
      title: 'Artisan Croissants',
      category: 'Breads',
    },
    {
      img: '/api/placeholder/800/600',
      title: 'Custom Wedding Cake',
      category: 'Custom Orders',
      featured: true,
    },
    {
      img: '/api/placeholder/600/600',
      title: 'Chocolate Eclairs',
      category: 'Pastries',
    },
    {
      img: '/api/placeholder/600/800',
      title: 'Anniversary Cake',
      category: 'Cakes',
      featured: true,
    },
    {
      img: '/api/placeholder/800/600',
      title: 'Fruit Tarts',
      category: 'Pastries',
    }
  ];
  
  // Featured creations for Home component
  export const featuredCreations = [
    {
      id: 1,
      title: 'French Macarons',
      image: '/api/placeholder/400/300',
      category: 'Pastries',
      description: 'Delicate almond meringue cookies with smooth ganache filling',
    },
    {
      id: 2,
      title: 'Wedding Cake',
      image: '/api/placeholder/400/300',
      category: 'Cakes',
      description: 'Elegant multi-tiered cakes for your special day',
    },
    {
      id: 3,
      title: 'Artisan Croissants',
      image: '/api/placeholder/400/300',
      category: 'Breads',
      description: 'Flaky, buttery croissants made from scratch',
    },
  ];