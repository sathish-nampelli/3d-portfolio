import React, { useState, useRef } from 'react';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ProjectModal } from './ProjectModal';
import { sound } from '../../utils/audio';

// 3D Tilt Card Component
interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playBlip(780, 0.02);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
      }}
      className="group relative rounded-3xl overflow-hidden glass-panel border border-slate-800 hover:border-cyan-500/40 transition-colors duration-300 flex flex-col h-full shadow-xl"
    >
      {/* Top Image Preview */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
            {project.category}
          </span>
        </div>

        {/* Featured Star Pill */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/40">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-cyan-400/90 mt-1 mb-3">
            {project.tagline}
          </p>
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Key Metric highlight */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-4 px-3 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 font-mono">
              ⚡ {project.metrics[0]}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 border border-slate-800 text-slate-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 border border-slate-800 text-slate-500">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <button
            onClick={() => {
              sound.playBlip(840, 0.03);
              onSelect(project);
            }}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group-hover:underline"
          >
            <span>Architecture Deep Dive</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playBlip(900, 0.02);
                }}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
                title="View Source"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playBlip(900, 0.02);
                }}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                title="Live Preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', '3D & Creative', 'AI & Cloud', 'Systems'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative bg-slate-950/50">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <span>&lt;Showcase /&gt;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Engineering Work
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            High-performance applications, WebGL simulations, and distributed platforms built for scale.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playBlip(700, 0.02);
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Modal View */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
