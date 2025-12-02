import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Column } from './components/Column';
import { AddTaskModal } from './components/AddTaskModal';
import { PROJECTS, COLUMNS, INITIAL_TASKS, USERS } from './constants';
import { Task, Status, Priority } from './types';
import { Search, Bell, Sparkles, Filter, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mobile Sidebar State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add Task Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [targetColumn, setTargetColumn] = useState<Status | null>(null);

  // Drag and Drop State
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const activeProject = PROJECTS.find(p => p.id === activeProjectId);

  // Filter tasks for the current view
  const projectTasks = tasks.filter(t => 
    t.projectId === activeProjectId && 
    (searchQuery === '' || t.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Drag Handlers
  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDraggedTaskId(id);
    // Required for Firefox
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetStatus: Status) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks(prev => prev.map(task => {
      if (task.id === draggedTaskId) {
        return { ...task, status: targetStatus };
      }
      return task;
    }));
    
    setDraggedTaskId(null);
  }, [draggedTaskId]);

  // Task Creation Handlers
  const openAddTaskModal = (status: Status) => {
    setTargetColumn(status);
    setIsAddModalOpen(true);
  };

  const handleAddTask = (taskData: { title: string; description: string; priority: Priority }) => {
    if (!targetColumn) return;

    const newTask: Task = {
      id: Date.now().toString(),
      projectId: activeProjectId,
      status: targetColumn,
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      assignees: [USERS[0]], // Assign to current user for demo
      tags: ['New'], // Default tag
      dueDate: new Date().toISOString().split('T')[0], // Today
    };

    setTasks(prev => [...prev, newTask]);
    setIsAddModalOpen(false);
  };

  // Delete Handler (Passed down to TaskCard)
  const handleDeleteTask = useCallback((taskId: string) => {
    if (window.confirm('确定要删除这个任务吗？')) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  }, []);

  const currentColumnTitle = COLUMNS.find(c => c.id === targetColumn)?.title || '';

  return (
    <div className="flex h-[100dvh] w-full bg-white font-sans text-slate-900 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          projects={PROJECTS} 
          activeProjectId={activeProjectId} 
          onSelectProject={setActiveProjectId} 
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative h-full">
        
        {/* Top Header */}
        <header className="h-16 px-4 md:px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 z-10 gap-3">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-4 flex-1 min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-slate-800 truncate">
              {activeProject?.name}
            </h1>
            <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="搜索任务..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-md text-sm transition-all outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* AI Action Button (Placeholder) */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium transition-colors border border-indigo-200">
              <Sparkles size={16} />
              <span>AI 智能周报</span>
            </button>

            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
             <button className="sm:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Filter size={20} />
            </button>
          </div>
        </header>

        {/* Board Canvas */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50/50 p-4 md:p-6 touch-pan-x snap-x snap-mandatory">
          <div className="flex h-full gap-4 md:gap-6 min-w-max px-2 md:px-0">
            {COLUMNS.map((column) => {
              const columnTasks = projectTasks.filter(t => t.status === column.id);
              return (
                <Column 
                  key={column.id}
                  status={column.id}
                  title={column.title}
                  tasks={columnTasks}
                  colorClass={column.color}
                  onDrop={handleDrop}
                  onDragStart={handleDragStart}
                  onAddClick={openAddTaskModal}
                  onDeleteTask={handleDeleteTask}
                />
              );
            })}
            {/* Spacer for better mobile scrolling at the end */}
            <div className="w-2 md:hidden shrink-0"></div>
          </div>
        </div>
      </main>

      {/* Add Task Modal */}
      <AddTaskModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
        columnTitle={currentColumnTitle}
      />
    </div>
  );
};

export default App;