import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { AdminPanel } from './components/AdminPanel';
import { Project, ViewState } from './types';
import { Rocket, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'stanismar-apps-data';

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

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved projects", e);
        setProjects(INITIAL_DATA);
      }
    } else {
      setProjects(INITIAL_DATA);
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects, loading]);

  const handleAddProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este aplicativo?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-brand-500/30 selection:text-brand-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-600/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <Header currentView={view} onNavigate={setView} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {view === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-widest mb-4">
                <Sparkles className="w-3 h-3" /> Portfolio de IA
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                Hub de Inovação <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-500">Stanismar</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Explore uma coleção curada de aplicações inteligentes e experimentos criativos desenvolvidos com a tecnologia Google AI Studio.
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
                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <Rocket className="w-16 h-16 text-slate-600 mb-4" />
                  <p className="text-xl text-slate-400 font-medium">Nenhum aplicativo encontrado.</p>
                  <button 
                    onClick={() => setView('admin')}
                    className="mt-4 text-brand-400 hover:text-brand-300 font-medium underline underline-offset-4"
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
          />
        )}

      </main>

      <footer className="relative z-10 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Aplicativos Stanismar. Desenvolvido com React, Tailwind e <span className="text-red-400">♥</span>
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;