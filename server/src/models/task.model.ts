export type Priority = 'low' | 'medium' | 'high';
export type Category = 'trabajo' | 'personal' | 'estudio';
export type TaskId = string;

export interface Task {
  id: TaskId;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: string;
  reminder?: string;
  completedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
}
