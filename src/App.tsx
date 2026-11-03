import { useState, useEffect } from 'react';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { AboutSection } from './components/ui/AboutSection';
import { SkillsSection } from './components/ui/SkillsSection';
import { ProjectsSection } from './components/ui/ProjectsSection';
import { ExperienceSection } from './components/ui/ExperienceSection';
import { ContactSection } from './components/ui/ContactSection';
import { Footer } from './components/ui/Footer';
import { ResumeModal } from './components/ui/ResumeModal';
import type { ThemeMode } from './types';

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme') as ThemeMode;
      return saved || 'cyberpunk';
    } catch {
      return 'cyberpunk';
    }
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('portfolio_theme', newTheme);
    } catch {
      // ignore
    }
  };

  // Set data-theme attribute on root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation */}
      <Navbar
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          theme={theme}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
