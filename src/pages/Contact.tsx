import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import ContactForm from '../components/features/contact/ContactForm';

const contactInfo = {
  address: '123 Bakery Street, Sweetville, CA 90210',
  phone: '+1 (555) 123-4567',
  email: 'hello@sweetcreations.com',
  hours: [
    { days: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { days: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { days: 'Sunday', time: 'Closed' }
  ]
};

export default function Contact() {
  return (
    <div className="bg-white">
      <div className="relative isolate">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg"
            >
              <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900">
                Get in Touch
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Whether you're planning a special event or just want to say hello, I'd love to hear from you. 
                Feel free to reach out with any questions about custom orders or collaborations.
              </p>
              
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <motion.div
                  className="flex gap-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <MapPinIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>{contactInfo.address}</dd>
                </motion.div>
                
                <motion.div
                  className="flex gap-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <dt className="flex-none">
                    <span className="sr-only">Phone</span>
                    <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-primary-600" href={`tel:${contactInfo.phone}`}>
                      {contactInfo.phone}
                    </a>
                  </dd>
                </motion.div>
                
                <motion.div
                  className="flex gap-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-primary-600" href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                  </dd>
                </motion.div>

                <motion.div
                  className="flex gap-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <dt className="flex-none">
                    <span className="sr-only">Hours</span>
                    <ClockIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <ul className="space-y-1">
                      {contactInfo.hours.map((schedule, index) => (
                        <li key={index}>
                          <span className="font-medium">{schedule.days}:</span> {schedule.time}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </motion.div>
              </dl>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}