'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, Maximize, Settings } from 'lucide-react';

interface VideoPlayerProps {
  className?: string;
  videoUrl?: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  className = '', 
  videoUrl = '/videos/intro.mp4',
  title = 'مقدمة في منصة Lumo'
}) => {
  return (
    <div 
      className={`aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center relative overflow-hidden group ${className}`}
      data-testid="video-player"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-16 h-16 bg-blue-600 rounded-full blur-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-purple-600 rounded-full blur-lg" />
      </div>

      {/* Video Content */}
      <div className="relative z-10 text-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl cursor-pointer group-hover:bg-white transition-all duration-300"
        >
          <Play className="w-8 h-8 text-blue-600 mr-1" fill="currentColor" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">شاهد كيف تبدأ رحلتك التعليمية</p>
        </motion.div>
      </div>

      {/* Video Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Play className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div className="h-full w-1/3 bg-blue-500 rounded-full" />
      </div>
    </div>
  );
};

export default VideoPlayer;
