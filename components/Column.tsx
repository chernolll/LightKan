import React from 'react';
import { Status, Task } from '../types';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

interface ColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onDrop: (e: React.DragEvent, status: Status) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onAddClick: (status: Status) => void;
  onDeleteTask: (id: string) => void;
  colorClass: string;
}

export const Column: React.FC<ColumnProps> = ({ 
  title, 
  status, 
  tasks, 
  onDrop, 
  onDragStart,
  onAddClick,
  onDeleteTask,
  colorClass
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-slate-100/50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-slate-100/50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-slate-100/50');
    onDrop(e, status);
  };

  return (
    // Mobile: calc(100vw - 3rem) leaves 1.5rem gap on each side when centered, perfect for "peeking"
    <div className="flex flex-col h-full w-[calc(100vw-3rem)] md:w-80 shrink-0 snap-center first:ml-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
          <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-slate-500 bg-slate-200/60 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
           <button 
             onClick={() => onAddClick(status)}
             className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-indigo-600 transition-colors"
             title="添加任务"
            >
             <Plus size={16} />
           </button>
        </div>
      </div>

      {/* Droppable Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-1 rounded-xl p-2 transition-colors duration-200 border border-transparent flex flex-col overflow-hidden ${colorClass}`}
      >
        <div className="flex-1 overflow-y-auto pr-1 pb-16 scrollbar-hide min-h-0">
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onDragStart={onDragStart} 
              onDelete={onDeleteTask}
            />
          ))}
          
          {/* Empty State / Add Placeholder */}
          {tasks.length === 0 && (
            <button 
              onClick={() => onAddClick(status)}
              className="w-full h-24 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors group cursor-pointer"
            >
              <Plus className="mb-1 opacity-50 group-hover:opacity-100" size={20} />
              <span className="text-xs">添加新任务</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};