import React from 'react';
import { Sparkles, Settings, LayoutGrid } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/50 dark:border-white/10 shadow-sm dark:shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm">
                <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight">
                Stanismar
              </h1>
              <span className="text-xs text-brand-600 dark:text-brand-400 font-medium tracking-wider uppercase">Aplicativos IA</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                currentView === 'home'
                  ? 'bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-600/20 dark:text-brand-300 dark:border-brand-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Galeria</span>
            </button>
            
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                currentView === 'admin'
                  ? 'bg-accent-50 text-accent-700 border border-accent-200 dark:bg-accent-600/20 dark:text-accent-300 dark:border-accent-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Configuração</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};