import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../form/Button';
import { RefreshCw, Clock } from 'lucide-react';

interface TimeoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * TimeoutModal Component
 * Displays when price data becomes stale and needs refresh
 * Features countdown timer and auto-refresh
 */
const TimeoutModal: React.FC<TimeoutModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      // Countdown timer
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.location.reload();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-sm glass-card rounded-2xl p-6 shadow-2xl text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-accent" />
          </div>

          {/* Title */}
          <h3 className="font-syne text-xl font-bold text-white mb-2">
            Price Update Required
          </h3>

          {/* Description */}
          <p className="text-text-secondary mb-6">
            The current price rate has expired. Refreshing to get the latest rates.
          </p>

          {/* Countdown */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <RefreshCw className="w-4 h-4 text-accent animate-spin" />
              <span className="text-accent font-medium">
                Refreshing in {countdown}s
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Button onClick={onClose} className="w-full flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Now
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TimeoutModal;
