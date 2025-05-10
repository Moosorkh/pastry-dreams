import { Recipe } from '@prisma/client';

export const recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
      title: 'Classic French Macarons',
      slug: 'classic-french-macarons',
      description: 'Delicate almond meringue cookies with a smooth ganache filling. Perfect for special occasions or afternoon tea.',
      prepTime: '30m',
      cookTime: '20m',
      servings: 12,
      difficulty: 'Hard',
      category: 'Cookies',
      image: '/api/placeholder/400/300',
      ingredients: [
          '100g ground almonds',
          '100g icing sugar',
          '2 large egg whites (about 60g)',
          '50g caster sugar',
          'Food coloring (optional)',
          '100g dark chocolate',
          '80ml heavy cream',
          '20g unsalted butter'
      ],
      instructions: [
          'Sift ground almonds and icing sugar together in a bowl.',
          'In a separate bowl, whisk egg whites until foamy, then gradually add caster sugar until stiff peaks form.',
          'Gently fold the almond mixture into the egg whites until fully incorporated.',
          'Pipe small circles onto a parchment-lined baking sheet.',
          'Let sit at room temperature for 30 minutes until a skin forms on top.',
          'Bake at 150°C (300°F) for 15-18 minutes.',
          'For the ganache, heat cream until almost boiling, pour over chopped chocolate, add butter, and stir until smooth.',
          'Once macarons are cooled, sandwich them together with the ganache.'
      ],
      tips: [
          'Ensure all ingredients are at room temperature before starting.',
          'The macaronage (folding) technique is crucial - don\'t overmix or undermix.',
          'Using an oven thermometer is recommended as precise temperature is key.',
          'Let the filled macarons mature in the refrigerator for 24 hours for the best texture.'
      ],
      authorId: ''
  },
  {
      title: 'Chocolate Soufflé',
      slug: 'chocolate-souffle',
      description: 'Light and airy chocolate soufflé that rises to perfection. A classic French dessert that never fails to impress.',
      prepTime: '20m',
      cookTime: '15m',
      servings: 4,
      difficulty: 'Medium',
      category: 'Desserts',
      image: '/api/placeholder/400/300',
      ingredients: [
          '50g unsalted butter, plus extra for greasing',
          '4 tbsp caster sugar, plus extra for dusting',
          '150g dark chocolate (70% cocoa)',
          '4 egg yolks',
          '6 egg whites',
          'Pinch of salt',
          'Icing sugar for dusting'
      ],
      instructions: [
          'Preheat oven to 180°C (350°F) and place a baking sheet inside.',
          'Butter four ramekins and dust with caster sugar.',
          'Melt chocolate and butter together in a bowl over simmering water.',
          'Remove from heat and stir in egg yolks one at a time.',
          'In a separate bowl, whisk egg whites with salt until soft peaks form, then gradually add sugar until stiff and glossy.',
          'Gently fold the egg whites into the chocolate mixture in three additions.',
          'Fill the ramekins to the top and level with a palette knife.',
          'Run your thumb around the edge to create a slight channel.',
          'Bake for 12-15 minutes until risen but still slightly wobbly in the center.',
          'Dust with icing sugar and serve immediately.'
      ],
      tips: [
          'Ensure all ingredients are at room temperature.',
          'Be careful not to get any egg yolk in the whites as this will prevent them from whipping properly.',
          'Don\'t open the oven door during baking or your soufflés may collapse.',
          'Serve immediately as soufflés begin to deflate shortly after coming out of the oven.'
      ],
      authorId: ''
  },
  {
      title: 'Artisan Croissants',
      slug: 'artisan-croissants',
      description: 'Flaky, buttery croissants made from scratch. The ultimate French breakfast pastry.',
      prepTime: '45m',
      cookTime: '25m',
      servings: 8,
      difficulty: 'Hard',
      category: 'Breads',
      image: '/api/placeholder/400/300',
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
          'Keep all ingredients and equipment as cold as possible.',
          'Be patient with the lamination process - this is what creates the flaky layers.',
          'If the butter starts to melt during rolling, return it to the refrigerator immediately.',
          'For the best rise, proof the croissants in a slightly warm, humid environment.'
      ],
      authorId: ''
  },
  {
      title: 'Opera Cake',
      slug: 'opera-cake',
      description: 'Elegant French cake consisting of almond sponge soaked in coffee syrup, layered with coffee buttercream and chocolate ganache.',
      prepTime: '60m',
      cookTime: '30m',
      servings: 12,
      difficulty: 'Hard',
      category: 'Cakes',
      image: '/api/placeholder/400/300',
      ingredients: [
          '6 large eggs, separated',
          '180g ground almonds',
          '180g icing sugar',
          '150g unsalted butter, melted and cooled',
          '50g plain flour',
          '6 egg whites',
          '30g caster sugar',
          '200g good quality dark chocolate',
          '200ml strong coffee',
          '300g unsalted butter, softened',
          '300g icing sugar, sifted',
          '2 tbsp instant coffee powder'
      ],
      instructions: [
          'Preheat oven to 180°C (350°F) and line two baking sheets with parchment paper.',
          'Whisk the egg yolks with ground almonds and icing sugar until pale and thick.',
          'Fold in the melted butter and flour.',
          'In a separate bowl, whisk the egg whites with caster sugar until stiff peaks form.',
          'Gently fold the egg whites into the almond mixture.',
          'Spread the batter evenly onto the prepared baking sheets.',
          'Bake for 10-12 minutes until lightly golden.',
          'For the coffee syrup, dissolve sugar in hot coffee.',
          'For the buttercream, beat butter and icing sugar until light and fluffy, then add coffee.',
          'For the ganache, melt chocolate and cream together, stirring until smooth.',
          'To assemble, place a layer of sponge, brush with coffee syrup, spread with buttercream, top with another layer of sponge, and repeat.',
          'Finish with a layer of ganache on top and refrigerate until set.',
          'Trim the edges and slice into neat rectangles.'
      ],
      tips: [
          'Make this cake a day ahead to allow the flavors to develop.',
          'Keep the cake refrigerated but bring to room temperature before serving.',
          'Use a sharp knife dipped in hot water to get clean cuts.',
          'For a professional finish, use a ruler to mark cutting lines.'
      ],
      authorId: ''
  },
  {
      title: 'Lemon Tart',
      slug: 'lemon-tart',
      description: 'A classic French dessert featuring a buttery pastry crust filled with tangy lemon curd. Perfectly balanced between sweet and tart.',
      prepTime: '40m',
      cookTime: '45m',
      servings: 8,
      difficulty: 'Medium',
      category: 'Pastries',
      image: '/api/placeholder/400/300',
      ingredients: [
          '200g plain flour',
          '100g cold butter, cubed',
          '3 tbsp icing sugar',
          '1 large egg yolk',
          '2-3 tbsp cold water',
          '5 eggs',
          '150g caster sugar',
          '2 lemons, zested and juiced',
          '150ml double cream',
          'Icing sugar, for dusting'
      ],
      instructions: [
          'For the pastry, rub butter into flour until it resembles breadcrumbs.',
          'Stir in the icing sugar, then add the egg yolk and enough water to form a dough.',
          'Wrap and chill for 30 minutes.',
          'Roll out the pastry and line a 23cm tart tin. Chill for 15 minutes.',
          'Prick the base, line with baking paper and beans, and blind bake at 180°C (350°F) for 15 minutes.',
          'Remove the paper and beans and bake for another 5-10 minutes until golden.',
          'For the filling, whisk together eggs, sugar, lemon zest, and juice.',
          'Stir in the cream, then strain the mixture into the tart case.',
          'Bake for 25-30 minutes until just set with a slight wobble.',
          'Cool completely, then dust with icing sugar before serving.'
      ],
      tips: [
          'Keep all pastry ingredients as cold as possible for the best results.',
          'If the pastry starts to soften while you\'re working with it, return it to the refrigerator to chill.',
          'The filling should be just set but still have a slight wobble when it comes out of the oven - it will continue to set as it cools.',
          'For an extra professional touch, use a kitchen blowtorch to caramelize the top.'
      ],
      authorId: ''
  }
];