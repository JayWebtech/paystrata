import React, { useEffect } from 'react';
import Button from '../form/Button';

interface TimeoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeoutModal: React.FC<TimeoutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="hero-card p-6 rounded-lg max-w-md w-full mx-4 border border-primary">
        <h2 className="text-white text-xl font-bold mb-4">Price Update Required</h2>
        <p className="text-white mb-6">
          The current price rate has expired. The page will refresh in 5 seconds to get the latest
          price rate.
        </p>
        <div className="flex justify-end">
          <Button className="py-5 w-full" onClick={onClose}>
            Refresh Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeoutModal;
