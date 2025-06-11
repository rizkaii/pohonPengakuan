import React from 'react';
import { TreePine, Heart, Star, Sparkles } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating trees */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <TreePine className="h-8 w-8 text-emerald-600" />
      </div>
      <div className="absolute top-40 right-20 animate-float opacity-15" style={{ animationDelay: '2s' }}>
        <TreePine className="h-6 w-6 text-emerald-500" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float opacity-10" style={{ animationDelay: '4s' }}>
        <TreePine className="h-10 w-10 text-emerald-700" />
      </div>
      
      {/* Floating hearts */}
      <div className="absolute top-60 right-10 animate-bounce-gentle opacity-20" style={{ animationDelay: '1s' }}>
        <Heart className="h-5 w-5 text-orange-400" />
      </div>
      <div className="absolute bottom-60 right-40 animate-bounce-gentle opacity-15" style={{ animationDelay: '3s' }}>
        <Heart className="h-4 w-4 text-orange-500" />
      </div>
      
      {/* Floating stars */}
      <div className="absolute top-32 left-1/3 animate-pulse-soft opacity-25">
        <Star className="h-4 w-4 text-yellow-400" />
      </div>
      <div className="absolute bottom-32 right-1/3 animate-pulse-soft opacity-20" style={{ animationDelay: '2s' }}>
        <Sparkles className="h-5 w-5 text-purple-400" />
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-emerald-200 to-transparent rounded-full blur-xl opacity-30 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-orange-200 to-transparent rounded-full blur-xl opacity-25 animate-float" style={{ animationDelay: '3s' }}></div>
      
      {/* Dots pattern overlay */}
      <div className="absolute inset-0 bg-dots opacity-30"></div>
    </div>
  );
};