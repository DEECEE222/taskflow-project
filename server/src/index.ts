import express from 'express';
import cors from 'cors';
import { config } from './config';
import { logger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());
app.use(logger);

app.get('/', (_req, res) => {
  res.json({ name: 'TaskFlow API', version: '1.0.0', status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`✓ Servidor corriendo en http://localhost:${config.port}`);
});

