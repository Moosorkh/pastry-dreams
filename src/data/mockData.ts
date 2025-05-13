import { Recipe, GalleryItem } from '../types/index';
import strawbwerryCake from '../../public/strawberryCake.jpg';
import frenchMacarons from '../../public/french-macarons.jpg';
import assortedPastries from '../../public/assorted-pastries.jpg';
import birthDayCake from '../../public/chocBdCake.jpg'
import oreaoChocolateCake from '../../public/chocolateOreaoCake.jpg';
import cremeFilledCroissants from '../../public/cremeFilledCroissant.jpg';
import cupCakeTray from '../../public/cupCakeTray.jpg';
import easterCookies from '../../public/easterCookies.jpg';
import lemonTart from '../../public/lemonTart.jpg';
import burgerBuns from '../../public/BurgerBuns.jpg';
import heartShapedMacarons from '../../public/heartShapedMacarons.jpg';
import coolaBdCake from '../../public/coolaBdCake.jpg';
import classicFrenchMacarons from '../../public/classicFrenchMacarons.jpg';
import chocolateSouffle from '../../public/chocolateSouffle.jpg';
import artisanChroissants from '../../public/artisanCriossants.jpg';
import operaCake from '../../public/operaCake.jpg';
import layeredChocolateCake from '../../public/layeredChocolateCake.jpg';
import mermaidBdCake from '../../public/mermaidBdCake.jpg';
import monsterCookieBdCake from '../../public/monsterCookieBdCake.jpg';
import pinkBdCake from '../../public/pinkBdCake.jpg';
import watermelonCake from '../../public/watermelonCake.jpg';
import weddingCake from '../../public/wedding-cake1.jpg';
import whiteWideCake from '../../public/whiteWideCake.jpg';


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
      image: classicFrenchMacarons,
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
      image: chocolateSouffle,
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
      image: artisanChroissants,
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
      image: operaCake,
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
      image: lemonTart,
      timeNeeded: '40m prep•45m cook'
    }
  ];
  
  // Gallery items for Gallery component (updated to match GalleryItem interface)
export const galleryItems: GalleryItem[] = [
  { 
    id: '1', 
    src: strawbwerryCake, 
    alt: 'Strawberry Cake', 
    category: 'Cakes', 
    description: 'A delightful strawberry cake with fresh strawberries and whipped cream.',
    featured: true 
  },
  { 
    id: '2', 
    src: frenchMacarons, 
    alt: 'Heart Shaped French Macarons', 
    category: 'Pastries',
    description: 'Beautiful heart-shaped macarons filled with raspberry ganache.',
    featured: false
  },
  { 
    id: '3', 
    src: assortedPastries, 
    alt: 'Assorted Pastries', 
    category: 'Breads',
    featured: false,
    description: 'A selection of flaky pastries including Donuts and Cinnamon rolls.'
  },
  { 
    id: '4', 
    src: birthDayCake, 
    alt: 'Birthday Cake', 
    category: 'Cakes',
    featured: false,
    description: 'A decadent chocolate drip cake adorned with rich rosette piping and elegant golden "Happy 80th" toppers, perfect for celebrating a milestone birthday in style.'
  },
  { 
    id: '5', 
    src: oreaoChocolateCake, 
    alt: 'Oreao Chocolate Cake', 
    category: 'Cakes',
    featured: false 
  },
  { 
    id: '6', 
    src: cremeFilledCroissants, 
    alt: 'Creme Filled Croissants', 
    category: 'Custom Orders',
    featured: true 
  },
  { 
    id: '7', 
    src: cupCakeTray, 
    alt: 'Cupcakes Tray', 
    category: 'Pastries',
    featured: false 
  },
  { 
    id: '8', 
    src: easterCookies, 
    alt: 'Easter Cookies', 
    category: 'Custom Orders',
    description: 'Beautifully decorated Easter-themed cookies, perfect for celebrations.',
    featured: true 
  },
  { 
    id: '9', 
    src: lemonTart, 
    alt: 'Lemon Tart', 
    category: 'Pastries',
    featured: false 
  },
  { 
    id: '10', 
    src: burgerBuns, 
    alt: 'Burger Buns', 
    category: 'Breads',
    featured: false 
  },
  { 
    id: '11', 
    src: heartShapedMacarons, 
    alt: 'Heart Shaped Macarons', 
    category: 'Pastries',
    description: 'Delicate heart-shaped macarons filled with premium ganache.',
    featured: true 
  },
  { 
    id: '12', 
    src: coolaBdCake, 
    alt: 'Coola Birthday Cake', 
    category: 'Cakes',
    featured: false 
  },
  { 
    id: '13', 
    src: classicFrenchMacarons, 
    alt: 'Classic French Macarons', 
    category: 'Pastries',
    description: 'Traditional French macarons with a variety of fillings.',
    featured: true 
  },
  { 
    id: '14', 
    src: chocolateSouffle, 
    alt: 'Chocolate Souffle', 
    category: 'Desserts',
    featured: false 
  },
  { 
    id: '15', 
    src: artisanChroissants, 
    alt: 'Artisan Croissants', 
    category: 'Breads',
    description: 'Flaky, buttery croissants made from scratch using traditional techniques.',
    featured: true 
  },
  { 
    id: '16', 
    src: operaCake, 
    alt: 'Opera Cake', 
    category: 'Cakes',
    featured: false 
  },
  { 
    id: '17', 
    src: layeredChocolateCake, 
    alt: 'Layered Chocolate Cake', 
    category: 'Cakes',
    featured: false 
  },
  { 
    id: '18', 
    src: mermaidBdCake, 
    alt: 'Mermaid Birthday Cake', 
    category: 'Cakes',
    featured: false 
  },
  { 
    id: '19', 
    src: monsterCookieBdCake, 
    alt: 'Monster Cookie Birthday Cake', 
    category: 'Cakes',
    featured: false 
  },
  { 
    id: '20', 
    src: pinkBdCake, 
    alt: 'Pink Birthday Cake', 
    category: 'Cakes',
    featured: false 
  },
  { 
    id: '21', 
    src: watermelonCake, 
    alt: 'Watermelon Cake', 
    category: 'Cakes',
    featured: false 
  },
  { 
    id: '22', 
    src: weddingCake, 
    alt: 'Wedding Cake', 
    category: 'Cakes',
    description: 'Elegant multi-tiered wedding cake with intricate decorations.',
    featured: true 
  },
  { 
    id: '23', 
    src: whiteWideCake, 
    alt: 'White Wide Cake', 
    category: 'Cakes',
    featured: false 
  }
];
  // Featured creations for Home component
  export const featuredCreations = [
    {
      id: 1,
      title: 'French Macarons',
      image: heartShapedMacarons,
      category: 'Pastries',
      description: 'Delicate almond meringue cookies with smooth ganache filling',
    },
    {
      id: 2,
      title: 'Wedding Cake',
      image: coolaBdCake,
      category: 'Cakes',
      description: 'Elegant multi-tiered cakes for your special day',
    },
    {
      id: 3,
      title: 'Assorted Pastries',
      image: assortedPastries,
      category: 'Breads',
      description: 'Flaky, buttery croissants made from scratch',
    },
  ];