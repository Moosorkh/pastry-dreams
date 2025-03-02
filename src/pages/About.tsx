import { motion } from 'framer-motion';
import TimelineSection from '../components/features/about/TimelineSection';
import CertificationsSection from '../components/features/about/CertificationsSection';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <motion.div
              className="h-96 lg:h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="h-full w-full object-cover rounded-2xl"
                src="/api/placeholder/800/600"
                alt="Mary in her kitchen"
              />
            </motion.div>
            <motion.div 
              className="max-w-xl lg:max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-6xl">
                Mary Karimzadeh
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                With over a decade of experience in pastry arts, I've dedicated my life to creating moments of joy through the art of baking. My journey began in the historic kitchens of Paris and has led me to create Sweet Creations, where every pastry tells a story.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                My philosophy is simple: use the finest ingredients, honor traditional techniques, and add a touch of innovation to create memorable desserts that delight both the eye and the palate.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <motion.div
        className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">My Approach</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Quality Ingredients',
              description: 'I source only the finest ingredients, working with local farmers and premium suppliers to ensure exceptional quality in every creation.'
            },
            {
              title: 'Traditional Techniques',
              description: 'Every pastry is crafted using time-honored French techniques, ensuring authentic flavor and perfect texture.'
            },
            {
              title: 'Creative Innovation',
              description: 'While respecting tradition, I love to experiment with new flavors and modern presentations to create unique experiences.'
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              className="relative p-6 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <TimelineSection />
      </div>

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Call to Action */}
      <div className="bg-primary-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Let's Create Something Special
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether it's a wedding cake, special celebration, or corporate event, I'd love to bring your vision to life.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}