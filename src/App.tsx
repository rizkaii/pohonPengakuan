import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { AddConfessionForm } from './components/AddConfessionForm';
import { RandomConfession } from './components/RandomConfession';
import { SuccessMessage } from './components/SuccessMessage';
import { FloatingElements } from './components/FloatingElements';

type View = 'home' | 'add' | 'view' | 'success';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleAddConfession = () => setCurrentView('add');
  const handleViewRandomConfession = () => setCurrentView('view');
  const handleBack = () => setCurrentView('home');
  const handleSuccess = () => setCurrentView('success');
  const handleHome = () => setCurrentView('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'add':
        return (
          <AddConfessionForm
            onBack={handleBack}
            onSuccess={handleSuccess}
          />
        );
      case 'view':
        return (
          <RandomConfession onBack={handleBack} />
        );
      case 'success':
        return (
          <SuccessMessage onHome={handleHome} />
        );
      default:
        return (
          <MainMenu
            onAddConfession={handleAddConfession}
            onViewRandomConfession={handleViewRandomConfession}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-orange-50 to-emerald-100 bg-pattern relative overflow-hidden">
      <FloatingElements />
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="animate-fade-in">
          {renderCurrentView()}
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500 text-sm relative z-10">
        <div className="max-w-md mx-auto">
          <p className="mb-2">&copy; 2025 Pohon Pengakuan</p>
          <p className="text-xs opacity-75">Dibuat dengan ❤️ untuk berbagi cerita dan menciptakan koneksi manusiawi</p>
        </div>
      </footer>
    </div>
  );
}

export default App;