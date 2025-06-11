import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shuffle, Loader2, MessageCircle, Calendar, Heart, Quote } from 'lucide-react';
import { supabase, Confession } from '../lib/supabase';

interface RandomConfessionProps {
  onBack: () => void;
}

export const RandomConfession: React.FC<RandomConfessionProps> = ({ onBack }) => {
  const [confession, setConfession] = useState<Confession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomConfession = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get total count first
      const { count } = await supabase
        .from('confessions')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      if (!count || count === 0) {
        setError('Belum ada pengakuan yang tersedia. Jadilah yang pertama!');
        setConfession(null);
        return;
      }

      // Get random offset
      const randomOffset = Math.floor(Math.random() * count);

      // Fetch one confession with random offset
      const { data, error: fetchError } = await supabase
        .from('confessions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .range(randomOffset, randomOffset)
        .limit(1);

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setConfession(data[0]);
      } else {
        setError('Tidak ada pengakuan yang ditemukan');
      }
    } catch (err) {
      setError('Gagal mengambil pengakuan. Silakan coba lagi.');
      console.error('Error fetching random confession:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomConfession();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-lg opacity-30 animate-pulse-soft"></div>
              <div className="relative bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full p-4 shadow-lg">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 gradient-text">
                Pengakuan Anonim
              </h2>
              <p className="text-gray-600">Cerita dari hati seseorang</p>
            </div>
          </div>
          
          <button
            onClick={fetchRandomConfession}
            disabled={isLoading}
            className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-3 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Shuffle className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            )}
            <span>{isLoading ? 'Memuat...' : 'Acak Lagi'}</span>
          </button>
        </div>

        {isLoading && !confession && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-lg opacity-30 animate-pulse-soft"></div>
                <div className="relative bg-white rounded-full p-6 shadow-lg">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto" />
                </div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Mengambil pengakuan acak...</p>
              <p className="text-gray-500 text-sm mt-2">Sedang mencari cerita yang tepat untukmu</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 text-center animate-slide-up">
            <div className="mb-4">
              <MessageCircle className="h-12 w-12 text-yellow-600 mx-auto" />
            </div>
            <p className="text-yellow-800 text-lg font-medium mb-4">{error}</p>
            <button
              onClick={fetchRandomConfession}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {confession && !isLoading && (
          <div className="space-y-8 animate-fade-in">
            {/* Quote decoration */}
            <div className="relative">
              <Quote className="h-12 w-12 text-emerald-200 absolute -top-4 -left-2" />
              <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-2xl p-8 border-l-4 border-emerald-500 shadow-inner relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
                  }}></div>
                </div>
                
                <p className="text-gray-800 leading-relaxed text-xl font-medium whitespace-pre-wrap relative z-10 italic">
                  "{confession.content}"
                </p>
              </div>
              <Quote className="h-12 w-12 text-emerald-200 absolute -bottom-4 -right-2 rotate-180" />
            </div>

            {/* Metadata */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600 font-medium">{formatDate(confession.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse-soft"></div>
                <span className="text-emerald-700 font-semibold">Anonim</span>
              </div>
            </div>

            {/* Appreciation message */}
            {/* <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Heart className="h-6 w-6 text-red-500 animate-bounce-gentle" />
                <span className="text-orange-800 font-semibold text-lg">Terima Kasih</span>
                <Heart className="h-6 w-6 text-red-500 animate-bounce-gentle" style={{ animationDelay: '0.5s' }} />
              </div>
              <p className="text-orange-700 text-center leading-relaxed">
                Setiap pengakuan adalah keberanian seseorang untuk berbagi. Terima kasih telah membaca dengan empati dan menghargai cerita ini.
              </p>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};