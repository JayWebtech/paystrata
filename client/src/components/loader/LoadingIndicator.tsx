import { motion } from 'framer-motion';
import React from 'react';

/**
 * LoadingIndicator Component
 * Animated progress bar with gradient effect
 * Used to indicate loading state during API calls
 */
const LoadingIndicator: React.FC = () => {
  return (
    <div className="max-w-2xl h-1 bg-surface-light rounded-t-2xl overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-[#00A8E8] to-primary rounded-full"
        style={{ width: '40%' }}
        initial={{ x: '-100%' }}
        animate={{ x: '250%' }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default LoadingIndicator;
