import React from 'react';
import { X } from 'lucide-react';
import Button from '../form/Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  txHash: string;
  isMainnet: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, txHash, isMainnet }) => {
  if (!isOpen) return null;

  const handleTxClick = () => {
    if (isMainnet) {
      window.open(`https://voyager.online/tx/${txHash}`, '_blank');
    } else {
      window.open(`https://sepolia.voyager.online/tx/${txHash}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="hero-card border border-primary rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">Transaction Successful!</h3>
          <p className="text-white mb-4">Your payment has been processed successfully.</p>
          
          <div className=" rounded-lg p-4 mb-4">
            <p className="text-sm text-white mb-1">Transaction Hash:</p>
            <button
              onClick={handleTxClick}
              className="text-primary hover:text-primary/80 break-all text-center cursor-pointer"
            >
              {txHash}
            </button>
          </div>
          
          <Button
            onClick={onClose}
            className="w-full"
          >
            Close
        </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 