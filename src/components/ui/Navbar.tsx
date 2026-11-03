import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, FileText } from 'lucide-react';
import { sound } from '../../utils/audio';
import type { ThemeMode } from '../../types';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  onOpenResume
}) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const themes: { id: ThemeMode; label: string; iconColor: string }[] = [
    { id: 'cyberpunk', label: 'Cyberpunk', iconColor: 'bg-cyan-400' },
    { id: 'matrix', label: 'Matrix', iconColor: 'bg-emerald-400' },
    { id: 'synthwave', label: 'Synthwave', iconColor: 'bg-pink-500' },
    { id: 'minimal', label: 'Obsidian', iconColor: 'bg-slate-300' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-xl shadow-cyan-950/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Avatar */}
          <a
            href="#"
            onClick={() => sound.playBlip(1040, 0.03)}
            className="group flex items-center gap-2.5 text-slate-100 font-mono font-bold tracking-wider text-base sm:text-lg"
          >
            <div className="relative w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-cyan-400 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img
                src={`${import.meta.env.BASE_URL}sathish-portrait.png`}
                alt="Sathish"
                className="w-full h-full rounded-full object-cover object-right"
              />
            </div>
            <span>
              {PERSONAL_INFO.shortName}
              <span className="text-cyan-400">.ai</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sound.playBlip(700, 0.02)}
                className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              aria-label="Toggle sound"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <div className="relative flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
              )}
            </button>

            {/* Theme Selector Pills */}
            <div className="hidden lg:flex items-center p-1 rounded-lg bg-slate-900/80 border border-slate-800 gap-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playGlitch();
                    onThemeChange(t.id);
                  }}
                  title={`Switch to ${t.label} theme`}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all duration-200 ${
                    currentTheme === t.id
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${t.iconColor}`} />
                  <span className="hidden xl:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Resume Button */}
            <button
              onClick={() => {
                sound.playBlip(880, 0.04);
                onOpenResume();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-cyan-500/20 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => {
                sound.playBlip(600, 0.02);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 md:hidden rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playBlip(700, 0.02);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900 font-medium text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Theme:</span>
              <div className="flex items-center gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      sound.playGlitch();
                      onThemeChange(t.id);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono ${
                      currentTheme === t.id
                        ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
