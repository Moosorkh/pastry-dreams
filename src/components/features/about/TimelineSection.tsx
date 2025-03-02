import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timeline: TimelineEvent[] = [
  {
    year: '2015',
    title: 'Le Cordon Bleu Paris',
    description: 'Graduated with honors in Pastry Arts. Specialized in French pastry techniques and chocolate work.'
  },
  {
    year: '2016',
    title: 'Apprenticeship at Maison Laurent',
    description: 'Trained under renowned pastry chef Pierre Laurent in his three-star Michelin restaurant.'
  },
  {
    year: '2018',
    title: 'Head Pastry Chef at The Grand Hotel',
    description: 'Led a team of pastry chefs, creating desserts for high-profile events and weddings.'
  },
  {
    year: '2020',
    title: 'Sweet Creations Founded',
    description: 'Launched my own pastry business, focusing on custom cakes and French pastries.'
  },
  {
    year: '2023',
    title: 'Best Local Bakery Award',
    description: "Received city's prestigious culinary award for excellence in pastry arts."
  }
];

export default function TimelineSection() {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Journey</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-200" />

        {/* Timeline events */}
        <div className="space-y-12">
          {timeline.map((event, index) => (
            <motion.div
              key={event.year}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Circle marker */}
              <div className="absolute left-0 top-2 w-8 h-8 bg-primary-100 rounded-full border-4 border-primary-500" />
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <span className="text-primary-600 font-semibold">{event.year}</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">{event.title}</h3>
                <p className="mt-2 text-gray-600">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}