export type Priority = 'High' | 'Medium' | 'Low';

export type Status = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignees: User[];
  dueDate?: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon name
}

export interface DragItem {
  id: string;
  fromStatus: Status;
}