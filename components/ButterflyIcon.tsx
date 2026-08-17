
import React from 'react';

export const ButterflyIcon = ({ size = 60, className = "", opacity = 1 }: { size?: number; className?: string; opacity?: number }) => (
  <div 
    className={`select-none pointer-events-none ${className}`}
    style={{ 
      opacity, 
      width: size, 
      height: size,
      backgroundImage: 'url(https://i.postimg.cc/KvvnHCkc/Whats-App-Image-2026-01-18-at-10-45-06.jpg)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      mixBlendMode: 'multiply',
      transform: 'translateZ(0)', // Force hardware acceleration to fix Safari rendering bugs
      willChange: 'transform'
    }}
    role="presentation"
  />
);
