'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../form/Button';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

/**
 * Hero Component
 * Main landing section with crypto-themed visual elements
 * Features animated gradient orbs and clear CTA
 */
const Hero: React.FC = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  // Stats data
  const stats = [
    { value: '50K+', label: 'Transactions' },
    { value: '<2s', label: 'Avg. Speed' },
    { value: '0.1%', label: 'Low Fees' },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-16 relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00A8E8]/15 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column - Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Powered by Starknet
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-syne text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
          >
            Pay Bills with{' '}
            <span className="text-gradient">Crypto</span>
            Instantly
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-lg leading-relaxed mb-8"
          >
            Experience seamless utility payments on Starknet. Buy airtime, data, 
            pay for cable TV and electricity—all with lightning-fast blockchain 
            transactions and minimal fees.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
            <Link href="/pay-bill">
              <Button size="lg" className="flex items-center gap-2 group">
                Launch App
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="font-syne text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-text-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          {/* SVG Illustration Container */}
          <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
            {/* Animated SVG Illustration */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Circle */}
              <motion.circle
                cx="200"
                cy="200"
                r="180"
                stroke="url(#gradient1)"
                strokeWidth="1"
                strokeDasharray="8 4"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              />
              
              {/* Middle Circle */}
              <motion.circle
                cx="200"
                cy="200"
                r="140"
                stroke="url(#gradient2)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                initial={{ rotate: 360 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              />

              {/* Inner Circle */}
              <motion.circle
                cx="200"
                cy="200"
                r="100"
                stroke="url(#gradient1)"
                strokeWidth="2"
                strokeDasharray="4 8"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              />

              {/* Central Hexagon */}
              <motion.path
                d="M200 100 L270 145 L270 235 L200 280 L130 235 L130 145 Z"
                fill="url(#gradient3)"
                fillOpacity="0.15"
                stroke="url(#gradient1)"
                strokeWidth="2"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                style={{ transformOrigin: '200px 190px' }}
              />

              {/* Inner Hexagon */}
              <motion.path
                d="M200 140 L240 162 L240 218 L200 240 L160 218 L160 162 Z"
                fill="url(#gradient3)"
                fillOpacity="0.1"
                stroke="url(#gradient2)"
                strokeWidth="1.5"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 0.95, opacity: 0.8 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                style={{ transformOrigin: '200px 190px' }}
              />

              {/* Starknet Logo - Center */}
              <motion.g
                initial={{ y: 5, scale: 0.95 }}
                animate={{ y: -5, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              >
                <image
                  href="https://www.starknet-ecosystem.com/starknet-logo.png"
                  x="160"
                  y="150"
                  width="80"
                  height="80"
                />
              </motion.g>

              {/* Orbiting Dots - Outer */}
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              >
                <circle cx="200" cy="20" r="8" fill="#00D4AA" />
                <circle cx="200" cy="20" r="14" fill="#00D4AA" fillOpacity="0.2" />
              </motion.g>

              <motion.g
                initial={{ rotate: 90 }}
                animate={{ rotate: 450 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              >
                <circle cx="200" cy="20" r="6" fill="#00A8E8" />
                <circle cx="200" cy="20" r="11" fill="#00A8E8" fillOpacity="0.2" />
              </motion.g>

              <motion.g
                initial={{ rotate: 180 }}
                animate={{ rotate: 540 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              >
                <circle cx="200" cy="20" r="5" fill="#F5A623" />
                <circle cx="200" cy="20" r="9" fill="#F5A623" fillOpacity="0.2" />
              </motion.g>

              <motion.g
                initial={{ rotate: 270 }}
                animate={{ rotate: 630 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '200px 200px' }}
              >
                <circle cx="200" cy="20" r="4" fill="#00D4AA" />
                <circle cx="200" cy="20" r="7" fill="#00D4AA" fillOpacity="0.2" />
              </motion.g>

              {/* Connection Lines */}
              <g strokeWidth="1" stroke="url(#gradient1)" strokeOpacity="0.3">
                <line x1="130" y1="145" x2="60" y2="80" />
                <line x1="270" y1="145" x2="340" y2="80" />
                <line x1="130" y1="235" x2="60" y2="300" />
                <line x1="270" y1="235" x2="340" y2="300" />
                <line x1="200" y1="100" x2="200" y2="40" />
                <line x1="200" y1="280" x2="200" y2="340" />
              </g>

              {/* Corner Nodes */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <circle cx="60" cy="80" r="10" fill="#0a0e17" stroke="#00D4AA" strokeWidth="2" />
                <circle cx="340" cy="80" r="10" fill="#0a0e17" stroke="#00A8E8" strokeWidth="2" />
                <circle cx="60" cy="300" r="10" fill="#0a0e17" stroke="#F5A623" strokeWidth="2" />
                <circle cx="340" cy="300" r="10" fill="#0a0e17" stroke="#00D4AA" strokeWidth="2" />
                <circle cx="200" cy="40" r="10" fill="#0a0e17" stroke="#00A8E8" strokeWidth="2" />
                <circle cx="200" cy="340" r="10" fill="#0a0e17" stroke="#F5A623" strokeWidth="2" />
              </motion.g>

              {/* Small decorative dots */}
              <g fill="#00D4AA" fillOpacity="0.5">
                <circle cx="100" cy="120" r="2" />
                <circle cx="300" cy="120" r="2" />
                <circle cx="100" cy="260" r="2" />
                <circle cx="300" cy="260" r="2" />
                <circle cx="140" cy="200" r="2" />
                <circle cx="260" cy="200" r="2" />
              </g>

              {/* Network Grid Pattern */}
              <g opacity="0.08" stroke="#00D4AA" strokeWidth="0.5">
                <line x1="0" y1="100" x2="400" y2="100" />
                <line x1="0" y1="200" x2="400" y2="200" />
                <line x1="0" y1="300" x2="400" y2="300" />
                <line x1="100" y1="0" x2="100" y2="400" />
                <line x1="200" y1="0" x2="200" y2="400" />
                <line x1="300" y1="0" x2="300" y2="400" />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4AA" />
                  <stop offset="100%" stopColor="#00A8E8" />
                </linearGradient>
                <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00A8E8" />
                  <stop offset="100%" stopColor="#F5A623" />
                </linearGradient>
                <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
