import React from 'react';
import { X, CheckCircle, ExternalLink, Copy, Check } from 'lucide-react';
import Button from '../form/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  txHash: string;
  isMainnet: boolean;
  amount: string;
  starkAmount: number | null;
  phoneNumber?: string;
  iucNumber?: string;
  meterNumber?: string;
  network?: string | null;
  txnType: string;
}

/**
 * SuccessModal Component
 * Displays transaction success with receipt details
 * Features animated entrance and copy functionality
 */
const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  txHash, 
  isMainnet,
  amount,
  starkAmount,
  phoneNumber,
  iucNumber,
  meterNumber,
  network,
  txnType
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  // Open transaction in explorer
  const handleTxClick = () => {
    const baseUrl = isMainnet 
      ? 'https://voyager.online/tx/' 
      : 'https://sepolia.voyager.online/tx/';
    window.open(`${baseUrl}${txHash}`, '_blank');
  };

  // Copy transaction hash
  const copyTxHash = () => {
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md glass-card rounded-2xl p-6 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-syne text-xl font-bold text-white">
              Transaction Successful!
            </h3>
            <p className="text-text-secondary text-sm mt-1">
              Your {txnType.toLowerCase()} purchase was completed
            </p>
          </div>

          {/* Receipt Details */}
          <div className="bg-dark/40 rounded-xl p-4 space-y-3 mb-6">
            {/* Transaction Type */}
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-sm">Type</span>
              <span className="text-white text-sm font-medium">{txnType}</span>
            </div>

            {/* Amount NGN */}
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-sm">Amount (NGN)</span>
              <span className="text-white text-sm font-medium">
                ₦{parseFloat(amount).toLocaleString()}
              </span>
            </div>

            {/* Amount STRK */}
            {starkAmount && (
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-sm">Amount (STRK)</span>
                <span className="text-primary text-sm font-medium">
                  {starkAmount.toFixed(6)} STRK
                </span>
              </div>
            )}

            {/* Phone Number */}
            {phoneNumber && (
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-sm">Phone</span>
                <span className="text-white text-sm">{phoneNumber}</span>
              </div>
            )}

            {/* IUC Number */}
            {iucNumber && (
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-sm">IUC Number</span>
                <span className="text-white text-sm">{iucNumber}</span>
              </div>
            )}

            {/* Meter Number */}
            {meterNumber && (
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-sm">Meter Number</span>
                <span className="text-white text-sm">{meterNumber}</span>
              </div>
            )}

            {/* Network */}
            {network && (
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-sm">Network</span>
                <span className="text-white text-sm">{network}</span>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-surface-border my-2" />

            {/* Transaction Hash */}
            <div className="space-y-2">
              <span className="text-text-muted text-sm">Transaction Hash</span>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs text-text-secondary bg-dark/60 px-3 py-2 rounded-lg truncate">
                  {txHash}
                </code>
                <button
                  onClick={copyTxHash}
                  className="p-2 rounded-lg bg-dark/60 text-text-muted hover:text-primary transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Date/Time */}
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-sm">Date & Time</span>
              <span className="text-white text-sm">
                {new Date().toLocaleString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleTxClick}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Explorer
            </Button>
            <Button onClick={onClose} className="flex-1">
              Done
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-text-muted text-xs mt-4">
            Thank you for using Paystrata
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SuccessModal;
