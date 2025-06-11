import React from 'react';
import { PlusCircle, Shuffle, Heart, MessageCircle, Users, Sparkles } from 'lucide-react';

interface MainMenuProps {
  onAddConfession: () => void;
  onViewRandomConfession: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onAddConfession,
  onViewRandomConfession,
}) => {
  return (
    <div className="max-w-lg mx-auto space-y-8">
      {/* Welcome section */}
      <div className="text-center mb-12 animate-slide-up">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-full blur-lg opacity-30 animate-pulse-soft"></div>
          {/* <div className="relative bg-white rounded-full p-4 shadow-lg">
            <MessageCircle className="h-8 w-8 text-emerald-600" />
          </div> */}
        </div>
        
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-4 gradient-text">
          Apa yang ingin kamu lakukan?
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
          Bagikan ceritamu secara anonim atau temukan inspirasi dari pengakuan orang lain
        </p> */}
      </div>

      {/* Action buttons */}
      <div className="space-y-6">
        <button
          onClick={onAddConfession}
          className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white font-bold py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-4 btn-primary card-hover animate-glow"
        >
          <div className="relative">
            <PlusCircle className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-lg">Tambah Pengakuan</span>
        </button>

        <button
          onClick={onViewRandomConfession}
          className="group w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-900 text-white font-bold py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-4 btn-primary card-hover"
        >
          <div className="relative">
            <Shuffle className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-lg">Lihat Pengakuan Acak</span>
        </button>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-2 gap-4 mt-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
          <Users className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Komunitas</p>
          <p className="font-bold text-emerald-700">Anonim</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
          <Heart className="h-6 w-6 text-orange-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Berbagi</p>
          <p className="font-bold text-orange-600">Dengan Hati</p>
        </div>
      </div>

      {/* Footer message */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-100 to-orange-100 rounded-full px-6 py-3 shadow-lg">
          <Heart className="h-5 w-5 text-red-500 animate-bounce-gentle" />
          <span className="text-sm font-medium text-gray-700">Dibuat dengan cinta untuk berbagi</span>
          <Heart className="h-5 w-5 text-red-500 animate-bounce-gentle" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  );
};