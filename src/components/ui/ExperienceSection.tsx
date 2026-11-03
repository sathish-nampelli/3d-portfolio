import React from 'react';
import { GraduationCap, Quote, CheckCircle2, MapPin, Calendar, Award, Check } from 'lucide-react';
import { EXPERIENCES, EDUCATION, CERTIFICATIONS, TESTIMONIALS } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <span>&lt;Trajectory /&gt;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Certifications
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Proven record of shipping multi-agent architectures and enterprise GenAI systems.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-36 space-y-12 mb-20">
          {EXPERIENCES.map((item) => (
            <div key={item.id} className="relative pl-6 md:pl-10 group">
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300 shadow-md shadow-cyan-500/50" />

              {/* Date on the left for desktop */}
              <div className="hidden md:block absolute -left-40 top-1 text-right w-32 text-xs font-mono text-cyan-400/90 font-medium">
                {item.period}
              </div>

              {/* Timeline Content Card */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {item.role}
                  </h3>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                    {item.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
                  <span className="md:hidden flex items-center gap-1 text-cyan-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.location}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{item.type}</span>
                </div>

                {/* Achievements List */}
                <ul className="space-y-2 mb-4">
                  {item.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Key Metric highlight */}
                {item.metricHighlight && (
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-cyan-300 font-mono mb-4">
                    🎯 Key Result: {item.metricHighlight}
                  </div>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Cloud Certifications Box */}
          <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border border-cyan-500/20 shadow-xl">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-4 font-mono font-bold text-sm">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Cloud & AI Certifications</span>
            </div>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{cert.title}</div>
                      <div className="text-xs font-mono text-slate-400">
                        {cert.issuer} {cert.year && `• ${cert.year}`}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                    {cert.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Foundation Box */}
          <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border border-slate-800">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-4 font-mono font-bold text-sm">
              <GraduationCap className="w-5 h-5" />
              <span>Academic Foundation</span>
            </div>
            {EDUCATION.map((edu, i) => (
              <div key={i}>
                <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                <div className="text-xs font-mono text-cyan-400 mt-1 mb-2">
                  {edu.institution} • {edu.period}
                </div>
                {edu.honors && (
                  <div className="text-xs text-emerald-400 font-semibold mb-3">
                    ⭐ {edu.honors}
                  </div>
                )}
                <div className="text-xs text-slate-400 mb-2">Core Computational Coursework:</div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Endorsements / Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((test, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-7 h-7 text-cyan-400 shrink-0 opacity-50" />
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{test.text}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-9 h-9 rounded-full object-cover border border-cyan-400/50"
                />
                <div>
                  <div className="text-xs font-bold text-white">{test.name}</div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {test.role} • {test.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
