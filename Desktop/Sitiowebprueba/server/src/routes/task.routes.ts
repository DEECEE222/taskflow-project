import { Router } from 'express';
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from '../controllers/task.controller';

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);

export default router;

