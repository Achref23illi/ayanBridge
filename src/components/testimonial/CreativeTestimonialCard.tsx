import React from 'react';
import { motion } from 'framer-motion';
import type { Testimonial } from '../../types';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const CreativeTestimonialCard: React.FC<{ testimonial: Testimonial, index: number }> = ({ testimonial, index }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={cardVariants}
      className="bg-secondary/50 p-6 rounded-lg shadow-lg border border-white/10"
    >
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary"
        />
        <div>
          <h4 className="font-bold text-white">{testimonial.name}</h4>
          <p className="text-sm text-white/60">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-white/80 italic">"{testimonial.testimonial}"</p>
    </motion.div>
  );
};

export default CreativeTestimonialCard; 