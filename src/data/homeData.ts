import {
  School as SchoolIcon,
  Restaurant as RestaurantIcon,
  EmojiEvents as AwardIcon,
  StarBorder as StarIcon,
  Cake as CakeIcon,
  Restaurant as KitchenIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';

export const coreSkills = [
  {
    title: 'Cake Decoration',
    description: 'Expert in decorating cakes for special occasions with creative and personalized designs.',
    icon: <CakeIcon color="primary" fontSize="large" />
  },
  {
    title: 'Pastry Preparation',
    description: 'Skilled in preparing a wide variety of pastries from scratch using traditional techniques.',
    icon: <KitchenIcon color="primary" fontSize="large" />
  },
  {
    title: 'Event Planning',
    description: 'Experience in planning and preparing desserts for special events like weddings and celebrations.',
    icon: <CelebrationIcon color="primary" fontSize="large" />
  },
  {
    title: 'Bread Making',
    description: 'Expertise in creating artisanal breads and Italian doughs with authentic techniques.',
    icon: <RestaurantIcon color="primary" fontSize="large" />
  },
];

export const achievements = [
  {
    year: '2024',
    title: 'Sweet Creations Founded',
    description: 'Launched my own pastry business, focusing on custom cakes and specialty desserts.',
    icon: <AwardIcon />,
  },
  {
    year: '2023-Present',
    title: 'Pastry Cook at Lido House',
    description: 'Leading pastry operations at this prestigious Newport Beach establishment. Responsible for presentation, decoration, baking, and special event planning.',
    icon: <StarIcon />,
  },
  {
    year: '2022-2023',
    title: 'Pastry Cook at North Italia',
    description: 'Prepared Italian breads, pastries, puddings and desserts from scratch. Developed expertise in authentic Italian techniques and presentation.',
    icon: <RestaurantIcon />,
  },
  {
    year: '2021-2022',
    title: 'Pastry Diploma from Culinary Lab',
    description: 'Earned Professional Pastry Diploma. Trained in breads, pastries, laminated doughs, chocolates, tiered cakes, and plated desserts. Completed over 1,000 hours of apprenticeship.',
    icon: <SchoolIcon />,
  },
];