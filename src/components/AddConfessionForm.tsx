import React, { useState } from 'react';
import { ArrowLeft, Send, Loader2, Heart, Shield, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AddConfessionFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const AddConfessionForm: React.FC<AddConfessionFormProps> = ({
  onBack,
  onSuccess,
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim().length < 10) {
      setError('Pengakuan harus minimal 10 karakter');
      return;
    }

    if (content.trim().length > 1000) {
      setError('Pengakuan tidak boleh lebih dari 1000 karakter');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('confessions')
        .insert([{ content: content.trim() }]);

      if (insertError) throw insertError;

      setContent('');
      onSuccess();
    } catch (err) {
      setError('Gagal mengirim pengakuan. Silakan coba lagi.');
      console.error('Error inserting confession:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const characterCount = content.length;
  const maxCharacters = 1000;
  const minCharacters = 10;
  const progress = Math.min((characterCount / maxCharacters) * 100, 100);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 animate-slide-up">
        <button
          onClick={onBack}
          className="group flex items-center space-x-3 text-gray-600 hover:text-gray-800 transition-all duration-200 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Kembali</span>
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-lg opacity-30 animate-pulse-soft"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-4 shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          
          {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 gradient-text">
            Bagikan Pengakuanmu
          </h2> */}
          {/* <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
            Tuliskan apa yang ada di hatimu. Identitasmu akan tetap anonim dan aman.
          </p> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ceritakan pengakuanmu di sini... Apa yang ingin kamu bagikan dengan dunia?"
              className="w-full h-48 p-6 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 text-lg leading-relaxed shadow-inner bg-gradient-to-br from-white to-gray-50"
              disabled={isSubmitting}
            />
            
            {/* Progress bar */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    progress < 30 ? 'bg-red-400' : 
                    progress < 70 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Character count */}
          {/* <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-emerald-600">
                <Shield className="h-4 w-4" />
                <span className="font-medium">100% Anonim</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Eye className="h-4 w-4" />
                <span className="font-medium">Dapat dibaca semua orang</span>
              </div>
            </div>
            
            <span className={`font-medium ${
              characterCount < minCharacters ? 'text-red-500' : 
              characterCount > maxCharacters ? 'text-red-500' : 'text-gray-500'
            }`}>
              {characterCount < minCharacters 
                ? `Minimal ${minCharacters} karakter (${minCharacters - characterCount} lagi)`
                : `${characterCount}/${maxCharacters} karakter`
              }
            </span>
          </div> */}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-slide-up">
              <p className="text-red-700 font-medium text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || content.trim().length < minCharacters || content.length > maxCharacters}
            className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-orange-700 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl disabled:shadow-none transform hover:scale-[1.02] disabled:scale-100 transition-all duration-300 flex items-center justify-center space-x-4 disabled:cursor-not-allowed btn-primary"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-lg">Mengirim Pengakuan...</span>
              </>
            ) : (
              <>
                <Send className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-lg">Kirim Pengakuan</span>
              </>
            )}
          </button>
        </form>

        {/* Info cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              <span className="font-semibold text-emerald-800">Privasi Terjamin</span>
            </div>
            <p className="text-emerald-700 text-sm">
              Tidak ada data pribadi yang disimpan. Pengakuanmu benar-benar anonim.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-800">Berbagi Dengan Hati</span>
            </div>
            <p className="text-orange-700 text-sm">
              Pengakuanmu akan langsung tersedia untuk memberikan inspirasi kepada orang lain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};