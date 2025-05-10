import { PrismaClient, Difficulty, MessageStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@sweetcreations.com' },
      update: {},
      create: {
        name: 'Mary Admin',
        email: 'admin@sweetcreations.com',
        password: adminPassword,
        role: 'ADMIN'
      }
    });
    
    console.log('Admin user created:', admin.email);
    
    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        name: 'Regular User',
        email: 'user@example.com',
        password: userPassword,
        role: 'USER'
      }
    });
    
    console.log('Regular user created:', user.email);
    
    // Create sample recipes
    const recipes = [
      {
        title: 'Classic French Macarons',
        slug: 'classic-french-macarons',
        description: 'Delicate almond meringue cookies with a smooth ganache filling. Perfect for special occasions or afternoon tea.',
        difficulty: Difficulty.Hard, // Using the enum value
        category: 'Cookies',
        prepTime: '30m',
        cookTime: '20m',
        servings: 24,
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
        image: '/api/placeholder/400/300',
        authorId: admin.id
      },
      {
        title: 'Chocolate Soufflé',
        slug: 'chocolate-souffle',
        description: 'Light and airy chocolate soufflé that rises to perfection. A classic French dessert that never fails to impress.',
        difficulty: Difficulty.Medium, // Using the enum value
        category: 'Desserts',
        prepTime: '20m',
        cookTime: '15m',
        servings: 4,
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
        image: '/api/placeholder/400/300',
        authorId: admin.id
      }
    ];
    
    for (const recipe of recipes) {
      await prisma.recipe.upsert({
        where: { slug: recipe.slug },
        update: {},
        create: recipe
      });
    }
    
    console.log('Sample recipes created');
    
    // Create sample gallery items
    const galleryItems = [
      {
        title: 'Wedding Cake with Roses',
        category: 'Cakes',
        image: '/api/placeholder/400/300',
        featured: true,
        uploaderId: admin.id
      },
      {
        title: 'French Macarons',
        category: 'Pastries',
        image: '/api/placeholder/400/300',
        featured: false,
        uploaderId: admin.id
      },
      {
        title: 'Birthday Cake',
        category: 'Cakes',
        image: '/api/placeholder/400/300',
        featured: true,
        uploaderId: admin.id
      }
    ];
    
    // Clear existing gallery items to avoid unique constraint conflicts
    await prisma.galleryItem.deleteMany({});
    
    // Create new gallery items
    for (const item of galleryItems) {
      await prisma.galleryItem.create({
        data: item
      });
    }
    
    console.log('Sample gallery items created');
    
    // Create sample contact messages
    const contactMessages = [
      {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '123-456-7890',
        subject: 'Wedding Inquiry',
        message: 'I would like to inquire about a wedding cake for my upcoming wedding on June 15th.',
        eventDate: new Date('2023-06-15'),
        eventType: 'Wedding',
        status: MessageStatus.NEW // Using the enum value
      },
      {
        name: 'Emily Johnson',
        email: 'emily@example.com',
        phone: '987-654-3210',
        subject: 'General Inquiry',
        message: 'Do you offer gluten-free options for your pastries?',
        status: MessageStatus.READ // Using the enum value
      }
    ];
    
    // Clear existing contact messages to avoid conflicts
    await prisma.contactMessage.deleteMany({});
    
    // Create new contact messages
    for (const message of contactMessages) {
      await prisma.contactMessage.create({
        data: message
      });
    }
    
    console.log('Sample contact messages created');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => console.log('Database seeded successfully'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });