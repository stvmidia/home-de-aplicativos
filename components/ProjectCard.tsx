import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group relative">
      {/* Decorative Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-accent-600 opacity-0 group-hover:opacity-20 transition duration-500 blur-xl"></div>
      
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden bg-slate-800">
        <img 
          src={project.imageUrl || `https://picsum.photos/seed/${project.id}/800/600`} 
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80"></div>
        
        {/* Floating Tags */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-white shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col relative z-10">
        <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-brand-300 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>

        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-brand-900/20 group-hover:shadow-brand-500/20 transform group-hover:translate-y-[-2px]"
        >
          <span>Acessar App</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};