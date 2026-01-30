"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function AnimatedCard() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'إخفاء' : 'إظهار'} الرسوم المتحركة
      </Button>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 mt-4">
              <h3 className="text-xl font-bold mb-4">بطاقة متحركة</h3>
              <p className="text-gray-600">
                هذه البطاقة تستخدم Framer Motion للرسوم المتحركة السلسة.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <motion.div
                  className="w-16 h-16 bg-blue-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SpringCard() {
  const [isHovered, setIsHovered] = useState(false);
  
  const springProps = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: isHovered ? 'scale(1.05)' : 'scale(1)' },
    config: { tension: 300, friction: 10 }
  });

  return (
    <div className="p-6">
      <animated.div style={springProps}>
        <Card 
          className="p-6 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h3 className="text-xl font-bold mb-4">بطاقة Spring</h3>
          <p className="text-gray-600">
            هذه البطاقة تستخدم React Spring للرسوم المتحركة الطبيعية.
          </p>
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </animated.div>
    </div>
  );
}
