import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { AdminPanel } from './components/AdminPanel';
import { Project, ViewState, Theme, AppConfig } from './types';
import { Rocket, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'stanismar-apps-data';
const THEME_KEY = 'stanismar-theme';
const CONFIG_KEY = 'stanismar-config';

// Default initial data if storage is empty
const INITIAL_DATA: Project[] = [
  {
    id: '1',
    title: 'Gerador de Poemas Épicos',
    description: 'Uma aplicação que utiliza a API Gemini Pro para criar poemas no estilo camoniano sobre temas modernos.',
    url: 'https://aistudio.google.com/',
    imageUrl: 'https://picsum.photos/id/1/800/600',
    tags: ['Gemini Pro', 'Criativo', 'Literatura'],
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Analisador de Sentimentos',
    description: 'Dashboard analítico que processa comentários de clientes e classifica sentimentos em tempo real.',
    url: 'https://github.com/',
    imageUrl: 'https://picsum.photos/id/20/800/600',
    tags: ['NLP', 'Analytics', 'Business'],
    createdAt: Date.now() - 1000
  },
  {
    id: '3',
    title: 'Assistente de Código React',
    description: 'Ferramenta para ajudar desenvolvedores a refatorar componentes React legado para Hooks modernos.',
    url: 'https://google.com',
    imageUrl: 'https://picsum.photos/id/60/800/600',
    tags: ['DevTools', 'Produtividade'],
    createdAt: Date.now() - 2000
  }
];

const DEFAULT_CONFIG: AppConfig = {
  heroTitle: 'Hub de Inovação',
  heroHighlight: 'Stanismar',
  heroDescription: 'Explore uma coleção curada de aplicações inteligentes e experimentos criativos desenvolvidos com a tecnologia Google AI Studio.'
};

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  // Change default state to 'light'
  const [theme, setTheme] = useState<Theme>('light');
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);

  // Load data, theme and config
  useEffect(() => {
    // Load Projects
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Failed to parse saved projects", e);
        setProjects(INITIAL_DATA);
      }
    } else {
      setProjects(INITIAL_DATA);
    }

    // Load Config
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse saved config", e);
        setConfig(DEFAULT_CONFIG);
      }
    }

    // Load Theme
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to light if no saved preference
      setTheme('light');
    }

    setLoading(false);
  }, []);

  // Save projects
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects, loading]);

  // Save Config
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    }
  }, [config, loading]);

  // Apply Theme
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleAddProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este aplicativo?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-500/30 selection:text-brand-700 dark:selection:text-brand-200 transition-colors duration-300">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400/20 dark:bg-brand-600/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-400/20 dark:bg-accent-600/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <Header currentView={view} onNavigate={setView} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {view === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm dark:shadow-none">
                <Sparkles className="w-3 h-3" /> Portfolio de IA
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                {config.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-400 dark:to-accent-500">{config.heroHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {config.heroDescription}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.length > 0 ? (
                projects.map((project, idx) => (
                  <div key={project.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    <ProjectCard project={project} />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 shadow-sm dark:shadow-none">
                  <Rocket className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" />
                  <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Nenhum aplicativo encontrado.</p>
                  <button 
                    onClick={() => setView('admin')}
                    className="mt-4 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium underline underline-offset-4"
                  >
                    Adicionar seu primeiro app
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'admin' && (
          <AdminPanel 
            projects={projects}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
            currentTheme={theme}
            onToggleTheme={setTheme}
            config={config}
            onUpdateConfig={setConfig}
          />
        )}

      </main>

      <footer className="relative z-10 border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Aplicativos Stanismar. Desenvolvido com React, Tailwind e <span className="text-red-500 dark:text-red-400">♥</span>
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;