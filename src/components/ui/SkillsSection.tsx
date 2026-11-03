import React, { useState } from 'react';
import { Layout, Server, Database, Cpu, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { TechSphere3D } from '../3d/TechSphere3D';
import { sound } from '../../utils/audio';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-4 h-4" />;
      case 'Server':
        return <Server className="w-4 h-4" />;
      case 'Database':
        return <Database className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  const currentCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <span>&lt;Capabilities /&gt;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Stack & Expertise
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            A comprehensive overview of tools, frameworks, and low-level competencies.
          </p>
        </div>

        {/* Two-Column Grid: Skills Matrix + 3D Tag Sphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Category Tabs & Proficiency Bars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    sound.playBlip(750, 0.02);
                    setActiveCategoryIndex(idx);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeCategoryIndex === idx
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {getIcon(cat.icon)}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Category Skill Bars */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  {getIcon(currentCategory.icon)}
                  {currentCategory.name} Overview
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  {currentCategory.skills.length} Core Proficiencies
                </span>
              </div>

              <div className="space-y-4">
                {currentCategory.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-slate-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs font-mono hidden sm:inline">
                          {skill.experience}
                        </span>
                        <span className="font-mono text-cyan-300 font-semibold text-xs">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar with glowing fill */}
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 shadow-sm shadow-cyan-500/50 transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Tech Sphere */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <TechSphere3D />
          </div>
        </div>
      </div>
    </section>
  );
};
