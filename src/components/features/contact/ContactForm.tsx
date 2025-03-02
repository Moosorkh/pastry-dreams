import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  eventDate?: string;
  eventType?: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEventOrder, setIsEventOrder] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      reset();
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      {/* Subject with Order Type Toggle */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <select
          id="subject"
          {...register('subject', { required: 'Please select a subject' })}
          onChange={(e) => setIsEventOrder(e.target.value === 'Event Order')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Event Order">Event Order</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      {/* Conditional Event Fields */}
      {isEventOrder && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              {...register('eventDate', { required: isEventOrder ? 'Event date is required' : false })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            {errors.eventDate && (
              <p className="mt-1 text-sm text-red-600">{errors.eventDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
              Event Type
            </label>
            <select
              id="eventType"
              {...register('eventType', { required: isEventOrder ? 'Event type is required' : false })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Select event type</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Other">Other</option>
            </select>
            {errors.eventType && (
              <p className="mt-1 text-sm text-red-600">{errors.eventType.message}</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message', { required: 'Message is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Send Message
        </Button>
      </div>
    </motion.form>
  );
}