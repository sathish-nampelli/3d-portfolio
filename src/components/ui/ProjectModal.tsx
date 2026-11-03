import React from 'react';
import { X, ExternalLink, CheckCircle, Cpu, Award } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../../types';
import { sound } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playBlip(600, 0.02);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/40 mb-2">
            {project.category}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h3>
          <p className="text-cyan-300 font-medium text-sm mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Project Image Preview */}
        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-slate-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        </div>

        {/* Main Description */}
        <div className="mb-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
            Project Overview
          </h4>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Metrics & Impact */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4" />
              Verified Production Metrics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architectural Highlights */}
        {project.architectureNotes && (
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5 font-bold">
              <Cpu className="w-4 h-4" />
              Engineering & Architecture Highlights
            </h4>
            <ul className="space-y-2">
              {project.architectureNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playBlip(1000, 0.03)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playBlip(800, 0.02)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
