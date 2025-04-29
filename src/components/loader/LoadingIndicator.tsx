import { motion } from 'framer-motion';
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="max-w-2xl h-2 bg-primary3 rounded-t-lg overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ x: '-70%' }}
        animate={{ x: '90%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 1,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default LoadingIndicator;
