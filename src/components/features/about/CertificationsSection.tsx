import { motion } from 'framer-motion';
import { AcademicCapIcon, TrophyIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

const certifications = [
  {
    icon: AcademicCapIcon,
    title: 'Diplôme de Pâtisserie',
    issuer: 'Le Cordon Bleu Paris',
    year: '2015'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Master Chocolatier Certification',
    issuer: 'International Chocolate Academy',
    year: '2017'
  },
  {
    icon: TrophyIcon,
    title: 'Advanced Wedding Cake Design',
    issuer: 'International Cake Decoration Federation',
    year: '2019'
  }
];

export default function CertificationsSection() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
          Certifications & Training
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="bg-white rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg p-2 mb-4">
                <cert.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {cert.title}
              </h3>
              <p className="text-gray-600 mb-2">{cert.issuer}</p>
              <p className="text-sm text-gray-500">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}