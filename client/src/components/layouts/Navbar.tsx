'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ConnectWalletButton from '../form/ConnectWalletButton';
import { useAccount } from '@starknet-react/core';

/**
 * Navbar Component
 * Modern crypto-style navigation with glass morphism effect
 * Features animated logo and responsive wallet connection
 */
const Navbar: React.FC = () => {
  const { address } = useAccount();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <motion.nav
        className="flex glass-card justify-between items-center py-3 px-4 rounded-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/img/logo.png" alt="Paystrata Logo" className="w-6 h-6" />
            {/* Logo Text */}
            <h1 className="font-syne text-xl font-bold text-white tracking-tight">
              Pay<span className="text-gradient">strata</span>
            </h1>
          </Link>
        </motion.div>

        {/* Navigation Actions */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Network Indicator */}
          {address && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium">Mainnet</span>
            </div>
          )}

          <ConnectWalletButton />
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
