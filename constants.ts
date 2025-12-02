import { Project, Task, Status, User } from './types';

export const USERS: User[] = [
  { id: 'u1', name: 'Alex', avatar: 'https://picsum.photos/100/100?random=1' },
  { id: 'u2', name: 'Sarah', avatar: 'https://picsum.photos/100/100?random=2' },
  { id: 'u3', name: 'Mike', avatar: 'https://picsum.photos/100/100?random=3' },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'SaaS Platform V2',
    description: '核心产品重构与AI功能集成',
    icon: '🚀',
  },
  {
    id: 'p2',
    name: 'Q4 Marketing',
    description: '年底市场营销活动与物料准备',
    icon: '📈',
  },
  {
    id: 'p3',
    name: 'Design System',
    description: '统一公司UI组件库',
    icon: '🎨',
  }
];

export const COLUMNS: { id: Status; title: string; color: string }[] = [
  { id: 'TODO', title: '待处理', color: 'bg-slate-100' },
  { id: 'IN_PROGRESS', title: '进行中', color: 'bg-blue-50' },
  { id: 'REVIEW', title: '审核中', color: 'bg-yellow-50' },
  { id: 'DONE', title: '已完成', color: 'bg-green-50' },
];

export const INITIAL_TASKS: Task[] = [
  // Project 1 Tasks
  {
    id: 't1',
    projectId: 'p1',
    title: '集成 Gemini API',
    description: '使用 Google GenAI SDK 实现智能文本摘要功能。',
    status: 'IN_PROGRESS',
    priority: 'High',
    assignees: [USERS[0]],
    dueDate: '2023-11-20',
    tags: ['AI', 'Backend'],
  },
  {
    id: 't2',
    projectId: 'p1',
    title: '设计新版登录页',
    description: '根据新的品牌指南更新登录和注册流程UI。',
    status: 'TODO',
    priority: 'Medium',
    assignees: [USERS[1]],
    dueDate: '2023-11-25',
    tags: ['UI/UX', 'Frontend'],
  },
  {
    id: 't3',
    projectId: 'p1',
    title: '修复 WebSocket 连接断开问题',
    status: 'REVIEW',
    priority: 'High',
    assignees: [USERS[0], USERS[2]],
    tags: ['Bug', 'Network'],
  },
  {
    id: 't4',
    projectId: 'p1',
    title: '部署 V2 到预发布环境',
    status: 'DONE',
    priority: 'Low',
    assignees: [USERS[2]],
    tags: ['DevOps'],
  },
  
  // Project 2 Tasks
  {
    id: 't5',
    projectId: 'p2',
    title: '撰写双十一活动文案',
    status: 'IN_PROGRESS',
    priority: 'High',
    assignees: [USERS[1]],
    tags: ['Copywriting'],
  },
  {
    id: 't6',
    projectId: 'p2',
    title: '制作社交媒体海报',
    status: 'TODO',
    priority: 'Medium',
    assignees: [USERS[1]],
    tags: ['Design'],
  },
];