import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();

  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Datos inválidos', details: err.flatten(), timestamp });
    return;
  }

  const message = err instanceof Error ? err.message : 'Error interno del servidor';
  console.error(err);
  res.status(500).json({ error: message, timestamp });
}
