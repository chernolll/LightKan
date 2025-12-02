import React from 'react';
import { Project } from '../types';
import { Layout, Settings, Users, PlusCircle, Command, X } from 'lucide-react';

interface SidebarProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ projects, activeProjectId, onSelectProject, onCloseMobile }) => {
  return (
    <aside className="bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 w-full">
      {/* Brand & Mobile Close */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <div className="bg-indigo-500 p-1.5 rounded-lg">
            <Layout size={18} className="text-white" />
          </div>
          <span className="tracking-tight">KanbanFlow AI</span>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onCloseMobile}
          className="md:hidden text-slate-400 hover:text-white p-1"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
        
        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">我的项目</h3>
            <button className="text-slate-500 hover:text-white transition-colors">
              <PlusCircle size={14} />
            </button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  onSelectProject(project.id);
                  onCloseMobile?.();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeProjectId === project.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
                }`}
              >
                <span>{project.icon}</span>
                <span className="truncate">{project.name}</span>
                {activeProjectId === project.id && (
                    <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Section */}
        <div>
          <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">工作区</h3>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-colors">
              <Users size={18} />
              <span>团队成员</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-colors">
              <Settings size={18} />
              <span>设置</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <img 
            src="https://picsum.photos/100/100?random=user" 
            alt="User" 
            className="w-8 h-8 rounded-full ring-2 ring-slate-700" 
          />
          <div className="flex-1 text-left overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Demo User</p>
            <p className="text-xs text-slate-500 truncate">Pro Plan</p>
          </div>
          <Command size={14} className="text-slate-500 hidden sm:block" />
        </button>
      </div>
    </aside>
  );
};