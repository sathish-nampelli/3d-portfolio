import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Code, Mail, Monitor, Video } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { SceneHero } from '../3d/SceneHero';
import { HolographicPortrait3D } from '../3d/HolographicPortrait3D';
import { PERSONAL_INFO } from '../../data/portfolioData';
import type { ThemeMode } from '../../types';
import { sound } from '../../utils/audio';

interface HeroSectionProps {
  theme: ThemeMode;
  onOpenResume: () => void;
}

const ROLES = [
  'Production GenAI & Agentic Systems Engineer',
  'Multi-Agent Architect (LangGraph & Google ADK)',
  'Enterprise RAG Pipeline Engineer (Azure AI & Vertex AI)',
  'Cloud LLM Infrastructure (Azure · GCP · AWS Bedrock)'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [active3DView, setActive3DView] = useState<'portrait' | 'workstation'>('portrait');

  // Typewriter effect
  useEffect(() => {
    const currentFullText = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-grid-pattern">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wide mb-6 shadow-md shadow-emerald-950/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{PERSONAL_INFO.status}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Typewriter Dynamic Subtitle */}
            <div className="h-8 sm:h-9 flex items-center mb-6">
              <span className="text-lg sm:text-xl font-mono text-cyan-300 font-medium">
                &gt; {displayText}
                <span className="animate-pulse">_</span>
              </span>
            </div>

            {/* Bio paragraph */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {PERSONAL_INFO.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={() => sound.playBlip(800, 0.03)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  sound.playBlip(880, 0.04);
                  onOpenResume();
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Social Links Quick Access */}
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mr-2">
                Connect:
              </span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playBlip(900, 0.02)}
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playBlip(900, 0.02)}
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playBlip(900, 0.02)}
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="LeetCode Profile"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => sound.playBlip(900, 0.02)}
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Showcase with Switcher */}
          <div className="lg:col-span-7 relative flex flex-col gap-3">
            {/* View Switcher Pills */}
            <div className="self-end z-20 flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg gap-1">
              <button
                onClick={() => {
                  sound.playGlitch();
                  setActive3DView('portrait');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  active3DView === 'portrait'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>3D Video Portrait</span>
              </button>
              <button
                onClick={() => {
                  sound.playGlitch();
                  setActive3DView('workstation');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  active3DView === 'workstation'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>3D Cyber Workstation</span>
              </button>
            </div>

            {/* Active 3D Component */}
            {active3DView === 'portrait' ? (
              <HolographicPortrait3D theme={theme} />
            ) : (
              <SceneHero theme={theme} />
            )}
          </div>
        </div>

        {/* Stats Highlight Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tracking-tight group-hover:scale-105 transition-transform duration-200">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
