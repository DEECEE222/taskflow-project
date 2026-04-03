import { Request, Response } from 'express';
import { taskService } from '../services/task.service';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';

export function getTasks(req: Request, res: Response): void {
  res.json({ data: taskService.getAll(), timestamp: new Date().toISOString() });
}

export function createTask(req: Request, res: Response): void {
  const result = createTaskSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten() });
    return;
  }
  const task = taskService.create(result.data);
  res.status(201).json({ data: task, timestamp: new Date().toISOString() });
}

export function updateTask(req: Request, res: Response): void {
  const result = updateTaskSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten() });
    return;
  }
  const task = taskService.update(req.params.id as string, result.data);
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    return;
  }
  res.json({ data: task, timestamp: new Date().toISOString() });
}

export function toggleTask(req: Request, res: Response): void {
  const task = taskService.toggle(req.params.id as string);
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    return;
  }
  res.json({ data: task, timestamp: new Date().toISOString() });
}

export function deleteTask(req: Request, res: Response): void {
  const deleted = taskService.delete(req.params.id as string);
  if (!deleted) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    return;
  }
  res.status(204).send();
}
