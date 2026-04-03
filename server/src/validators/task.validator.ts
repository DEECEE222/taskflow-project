import { z } from 'zod';

const prioritySchema = z.enum(['low', 'medium', 'high']);
const categorySchema = z.enum(['trabajo', 'personal', 'estudio']);

export const createTaskSchema = z.object({
  text: z.string().min(1, 'El texto no puede estar vacío').max(200).trim(),
  completed: z.boolean().default(false),
  priority: prioritySchema.default('medium'),
  category: categorySchema,
  reminder: z.string().datetime().optional(),
});

export const updateTaskSchema = z.object({
  text: z.string().min(1).max(200).trim().optional(),
  completed: z.boolean().optional(),
  priority: prioritySchema.optional(),
  category: categorySchema.optional(),
  reminder: z.string().datetime().optional().nullable(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
