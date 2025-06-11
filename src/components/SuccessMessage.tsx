import React, { useEffect } from 'react';
import { CheckCircle, Home, Sparkles, Heart } from 'lucide-react';

interface SuccessMessageProps {
  onHome: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onHome }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHome();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onHome]);

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center border border-white/20 animate-fade-in">
        {/* Success icon with animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse-soft"></div>
          <div className="relative bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-6 shadow-2xl mx-auto w-fit">
            <CheckCircle className="h-16 w-16 text-white animate-bounce-gentle" />
            <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse-soft" />
            <Sparkles className="h-4 w-4 text-yellow-300 absolute -bottom-1 -left-1 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Success message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 gradient-text">
            Pengakuan Terkirim! 🎉
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Terima kasih telah berbagi ceritamu dengan keberanian. 
          </p>
          <p className="text-gray-500 text-sm">
            Pengakuanmu kini dapat memberikan inspirasi dan kekuatan kepada orang lain secara anonim.
          </p>
        </div>

        {/* Celebration elements */}
        <div className="flex justify-center space-x-4 mb-8">
          <Heart className="h-6 w-6 text-red-500 animate-bounce-gentle" />
          <Heart className="h-8 w-8 text-red-400 animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
          <Heart className="h-6 w-6 text-red-500 animate-bounce-gentle" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Action button */}
        <button
          onClick={onHome}
          className="group w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-600 hover:from-emerald-700 hover:via-emerald-800 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-3 btn-primary"
        >
          <Home className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-lg">Kembali ke Beranda</span>
        </button>

        {/* Auto redirect info */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <p className="text-blue-700 text-sm font-medium">
            ⏰ Otomatis kembali dalam 4 detik...
          </p>
        </div>

        {/* Appreciation note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            Setiap cerita yang dibagikan memiliki kekuatan untuk menyembuhkan dan menginspirasi. 
            Kamu telah menjadi bagian dari komunitas yang saling mendukung. ❤️
          </p>
        </div>
      </div>
    </div>
  );
};