import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const PillarCard: React.FC<PillarCardProps> = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [20, -20]);
  const rotateY = useTransform(x, [-150, 150], [-20, 20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/5 p-8 rounded-2xl text-center flex flex-col items-center relative"
    >
      <div style={{ transform: 'translateZ(50px)' }} className="transform-gpu">
        <Icon className="w-12 h-12 text-primary mb-4" />
      </div>
      <h3 style={{ transform: 'translateZ(40px)' }} className="text-xl font-bold text-white mb-2 transform-gpu">
        {title}
      </h3>
      <p style={{ transform: 'translateZ(30px)' }} className="text-white/60 transform-gpu">
        {description}
      </p>
    </motion.div>
  );
};

export default PillarCard; 