import React, { useState, useEffect } from 'react';
import { Task, Priority } from '../types';
import { Calendar, MoreHorizontal, Sparkles, Pencil, Link2, Trash2, ArrowDownToLine, Copy } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDelete: (id: string) => void;
}

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  const styles = {
    High: 'bg-red-50 text-red-600 ring-red-500/10',
    Medium: 'bg-orange-50 text-orange-600 ring-orange-500/10',
    Low: 'bg-slate-50 text-slate-600 ring-slate-500/10',
  };

  const labels = {
    High: '高优先级',
    Medium: '中优先级',
    Low: '低优先级',
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[priority]}`}>
      {labels[priority]}
    </span>
  );
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState<{top: number, left: number} | null>(null);

  // Toggle menu with fixed positioning to avoid clipping by parent overflow
  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (showMenu) {
      setShowMenu(false);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    // Position menu: aligned to the right of the button, below it
    setMenuPos({
      top: rect.bottom + 4,
      left: rect.right - 160 // 160px is the width of the menu (w-40)
    });
    setShowMenu(true);
  };

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleClose = () => setShowMenu(false);
    
    if (showMenu) {
      window.addEventListener('click', handleClose);
      window.addEventListener('resize', handleClose);
      window.addEventListener('scroll', handleClose, true); // Capture scroll in any container
    }
    return () => {
      window.removeEventListener('click', handleClose);
      window.removeEventListener('resize', handleClose);
      window.removeEventListener('scroll', handleClose, true);
    };
  }, [showMenu]);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="group relative bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-grab active:cursor-grabbing mb-3"
    >
      {/* Header: Priority & Options */}
      <div className="flex justify-between items-start mb-2">
        <PriorityBadge priority={task.priority} />
        
        <div>
          <button 
            onClick={toggleMenu}
            className={`text-slate-400 hover:text-slate-600 p-1 rounded transition-colors ${showMenu ? 'bg-slate-100 text-slate-600' : 'hover:bg-slate-100'}`}
          >
            <MoreHorizontal size={16} />
          </button>

          {/* Context Menu (Fixed Position) */}
          {showMenu && menuPos && (
            <div 
              className="fixed bg-white rounded-lg shadow-xl border border-slate-100 z-[9999] py-1 animate-in fade-in zoom-in-95 duration-100 w-40"
              style={{ top: menuPos.top, left: menuPos.left }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
            >
               <button 
                className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                onClick={() => {
                  alert("功能开发中：编辑任务");
                  setShowMenu(false);
                }}
              >
                <Pencil size={12} />
                编辑任务
              </button>
              <button 
                className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(`Task ID: ${task.id}`);
                  setShowMenu(false);
                }}
              >
                <Copy size={12} />
                复制ID
              </button>
              <button 
                className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                onClick={() => setShowMenu(false)}
              >
                <ArrowDownToLine size={12} />
                移动到底部
              </button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button 
                className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                onClick={(e) => {
                    setShowMenu(false);
                    onDelete(task.id);
                }}
              >
                <Trash2 size={12} />
                删除任务
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-800 mb-1 leading-snug">
        {task.title}
      </h3>

      {/* Description Preview */}
      {task.description && (
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag) => (
          <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer: Meta & Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="flex items-center space-x-3">
          {/* Avatar Stack */}
          <div className="flex -space-x-2 overflow-hidden">
            {task.assignees.map((user) => (
              <img
                key={user.id}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src={user.avatar}
                alt={user.name}
              />
            ))}
          </div>
          
          {task.dueDate && (
            <div className="flex items-center text-xs text-slate-400">
              <Calendar size={12} className="mr-1" />
              <span>11/20</span>
            </div>
          )}
        </div>

        {/* AI Action Placeholder */}
        <button 
          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full hover:bg-indigo-100"
          title="AI 智能建议"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent drag start if clicking this
            alert("AI 功能即将上线：自动生成任务摘要和下一步建议");
          }}
        >
          <Sparkles size={12} className="mr-1" />
          <span>建议</span>
        </button>
      </div>
    </div>
  );
};