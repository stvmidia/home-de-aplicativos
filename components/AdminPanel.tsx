import React, { useState } from 'react';
import { Project, Theme, AppConfig } from '../types';
import { Plus, Trash2, Save, X, Image as ImageIcon, Link as LinkIcon, Tag as TagIcon, Moon, Sun, LayoutTemplate, Type } from 'lucide-react';

interface AdminPanelProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  currentTheme: Theme;
  onToggleTheme: (theme: Theme) => void;
  config: AppConfig;
  onUpdateConfig: (config: AppConfig) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  projects, 
  onAddProject, 
  onDeleteProject,
  currentTheme,
  onToggleTheme,
  config,
  onUpdateConfig
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    imageUrl: '',
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url) return;

    const newProject: Project = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      url: formData.url,
      imageUrl: formData.imageUrl || undefined,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0),
      createdAt: Date.now()
    };

    onAddProject(newProject);
    setFormData({ title: '', description: '', url: '', imageUrl: '', tags: '' });
    setIsAdding(false);
  };

  const handleConfigChange = (key: keyof AppConfig, value: string) => {
    onUpdateConfig({
      ...config,
      [key]: value
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Settings Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Configurações</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie a aparência e o conteúdo da página.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Theme Selection */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-brand-500">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-brand-500" /> Tema
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => onToggleTheme('light')}
              className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                currentTheme === 'light'
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Sun className="w-5 h-5" />
              <span className="font-medium">Claro</span>
            </button>
            
            <button
              onClick={() => onToggleTheme('dark')}
              className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                currentTheme === 'dark'
                  ? 'border-accent-500 bg-slate-800 text-accent-300'
                  : 'border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span className="font-medium">Escuro</span>
            </button>
          </div>
        </div>

        {/* Home Page Content Configuration */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-accent-500">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-accent-500" /> Cabeçalho (Hero)
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Título</label>
                <input
                  type="text"
                  value={config.heroTitle}
                  onChange={(e) => handleConfigChange('heroTitle', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-brand-600 dark:text-brand-400">Destaque</label>
                <input
                  type="text"
                  value={config.heroHighlight}
                  onChange={(e) => handleConfigChange('heroHighlight', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Descrição Principal</label>
              <textarea
                rows={2}
                value={config.heroDescription}
                onChange={(e) => handleConfigChange('heroDescription', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-700"></div>

      {/* Projects Management Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Seus Aplicativos</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
            isAdding 
              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600' 
              : 'bg-gradient-to-r from-accent-600 to-brand-600 text-white hover:brightness-110 shadow-brand-900/50'
          }`}
        >
          {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {isAdding ? 'Cancelar' : 'Novo Aplicativo'}
        </button>
      </div>

      {/* Add New Form */}
      {isAdding && (
        <div className="glass-panel p-6 rounded-2xl animate-slide-up border-l-4 border-accent-500">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="p-1 bg-accent-500/20 text-accent-600 dark:text-accent-300 rounded">✨</span> Novo Projeto
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Título do Projeto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: ChatBot Gemini"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <LinkIcon className="w-3 h-3" /> URL do Aplicativo *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Descrição</label>
              <textarea
                rows={3}
                placeholder="Uma breve descrição sobre o que o aplicativo faz..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" /> URL da Imagem (Opcional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <TagIcon className="w-3 h-3" /> Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  placeholder="IA, Chat, Ferramentas"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-accent-600 hover:bg-accent-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-accent-900/40"
              >
                <Save className="w-4 h-4" />
                Salvar Projeto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List of Existing Projects */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-2">
          Projetos Ativos ({projects.length})
        </h3>
        
        {projects.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500">Nenhum aplicativo cadastrado ainda.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="flex items-center gap-4 bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-brand-300 dark:hover:border-slate-600 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                  <img 
                    src={project.imageUrl || `https://picsum.photos/seed/${project.id}/200`} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate">{project.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{project.url}</p>
                </div>

                <div className="flex items-center gap-2">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-400/10 rounded-lg transition-colors"
                    title="Testar Link"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Remover"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};