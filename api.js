const API_URL = 'http://localhost:3001/api';

async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error('Error al obtener tareas');
  const body = await res.json();
  return body.data;
}

async function createTask(task) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Error al crear tarea');
  const body = await res.json();
  return body.data;
}

async function updateTask(id, changes) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  if (!res.ok) throw new Error('Error al actualizar tarea');
  const body = await res.json();
  return body.data;
}

async function toggleTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Error al cambiar estado');
  const body = await res.json();
  return body.data;
}

async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar tarea');
}