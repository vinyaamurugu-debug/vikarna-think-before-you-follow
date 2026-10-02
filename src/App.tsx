import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SituationInput } from './components/SituationInput';
import { GameplaySteps } from './components/GameplaySteps';
import { MahabharataLore } from './components/MahabharataLore';
import { InvestigationScreen } from './components/InvestigationScreen';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { ViewState } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [situation, setSituation] = useState<string>('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<'lore' | 'how-it-works'>('lore');

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleInvestigate = () => {
    if (!situation.trim()) return;
    setCurrentView('investigation');
  };

  const handleEditSituation = () => {
    setCurrentView('landing');
  };

  const handleResetToHome = () => {
    setSituation('');
    setCurrentView('landing');
  };

  const openLoreModal = () => {
    setModalTab('lore');
    setIsModalOpen(true);
  };

  const openHowItWorksModal = () => {
    setModalTab('how-it-works');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 relative">
      {/* Top Ambient Glow Banner */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Royal Navigation */}
      <Navbar
        onOpenLoreModal={openLoreModal}
        onOpenHowItWorks={openHowItWorksModal}
        onResetToHome={handleResetToHome}
        currentView={currentView}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <>
            {/* Landing Hero & Interactive Input Box */}
            <SituationInput
              situation={situation}
              setSituation={setSituation}
              onInvestigate={handleInvestigate}
            />

            {/* Core Gameplay Journey (Question → Investigate → Find Evidence → Decide) */}
            <GameplaySteps />

            {/* Mahabharata Vikarna Lore Banner */}
            <MahabharataLore />
          </>
        ) : (
          /* Investigation Screen with "Your Situation" and "Continue Investigation" */
          <InvestigationScreen
            situation={situation}
            onEditSituation={handleEditSituation}
            onReset={handleResetToHome}
          />
        )}
      </main>

      {/* Lore & Philosophy Modal */}
      <AboutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tab={modalTab}
        setTab={setModalTab}
      />

      {/* Footer */}
      <Footer
        onOpenLoreModal={openLoreModal}
        onOpenHowItWorks={openHowItWorksModal}
      />
    </div>
  );
};

export default App;
