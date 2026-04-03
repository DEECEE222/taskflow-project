import { Task, TaskId } from '../models/task.model';
import { CreateTaskDto, UpdateTaskDto } from '../validators/task.validator';

let tasks: Task[] = [];

function generateId(): TaskId {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function now(): string {
  return new Date().toISOString();
}

export const taskService = {
  getAll(): Task[] {
    return tasks;
  },

  getById(id: TaskId): Task | undefined {
    return tasks.find(t => t.id === id);
  },

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: generateId(),
      text: dto.text,
      completed: dto.completed ?? false,
      priority: dto.priority ?? 'medium',
      category: dto.category,
      createdAt: now(),
      reminder: dto.reminder ?? undefined,
    };
    tasks.push(task);
    return task;
  },

  update(id: TaskId, dto: UpdateTaskDto): Task | undefined {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return undefined;

    const existing = tasks[index];
    const updated: Task = { ...existing, ...dto, reminder: dto.reminder ?? undefined };

    if (dto.completed === true && !existing.completed) {
      updated.completedAt = now();
    }
    if (dto.completed === false) {
      delete updated.completedAt;
    }

    tasks[index] = updated;
    return updated;
  },

  toggle(id: TaskId): Task | undefined {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;
    return taskService.update(id, { completed: !task.completed });
  },

  delete(id: TaskId): boolean {
    const before = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    return tasks.length < before;
  },
};
