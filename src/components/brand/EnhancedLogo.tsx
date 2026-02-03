'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface EnhancedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'full';
  showTagline?: boolean;
  className?: string;
}

const EnhancedLogo: React.FC<EnhancedLogoProps> = ({ 
  size = 'md', 
  variant = 'default',
  showTagline = false,
  className = ''
}) => {
  const sizeConfig = {
    sm: { container: 'w-8 h-8', text: 'text-lg', icon: 'w-5 h-5' },
    md: { container: 'w-10 h-10', text: 'text-xl', icon: 'w-6 h-6' },
    lg: { container: 'w-12 h-12', text: 'text-2xl', icon: 'w-7 h-7' },
    xl: { container: 'w-16 h-16', text: 'text-3xl', icon: 'w-9 h-9' }
  };

  const config = sizeConfig[size];

  const logoIcon = (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={`${config.icon} text-white`}
    >
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" 
            fill="url(#gradient)" opacity="0.8"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (variant === 'minimal') {
    return (
      <Link href="/" className={`flex items-center gap-2 group ${className}`}>
        <div className={`relative ${config.container} bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105`}>
          {logoIcon}
        </div>
        <span className={`${config.text} font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300`}>
          LUMO
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={`group ${className}`}>
      <div className="relative inline-flex items-center gap-3">
        {/* Background Glow Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Logo Container */}
        <motion.div 
          className={`relative ${config.container} bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
        >
          {logoIcon}
          
          {/* Status Dot */}
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Logo Text */}
        <div className="flex flex-col">
          <motion.span 
            className={`${config.text} font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            LUMO
          </motion.span>
          {showTagline && (
            <motion.span 
              className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Learning Platform
            </motion.span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EnhancedLogo;
