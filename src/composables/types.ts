export interface Task {
 id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  estimatedDuration: string;
  isRecurring: boolean;
}

export interface Column {
  date: string;
  tasks: Task[];
}

export interface KanbanBoard {
  title: string;
  description: string;
  columns: Column[];
}

