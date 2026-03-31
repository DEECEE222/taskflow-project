# Experimentos con IA en programación

En este documento comparo resolver problemas de programación con y sin IA, midiendo tiempo, calidad del resultado y comprensión del problema.

---

## Experimento 1 — Función para eliminar tareas

**Problema:** Implementar una función que elimine una tarea del array por su ID y actualice localStorage.

### Sin IA
Tiempo: ~10 minutos

Proceso: Busqué cómo usar `.filter()` para crear un nuevo array sin el elemento, luego recordé que había que actualizar el DOM y el localStorage manualmente. Cometí un error inicial usando `.splice()` sobre el array original en lugar de reasignarlo.

```js
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
```

### Con IA
Tiempo: ~2 minutos

Le describí el problema y generó una versión que también llamaba a la función de sincronización del contador. Fue más completa que la mía inicial porque consideró el efecto secundario de actualizar la UI.

**Resultado:** La IA fue más rápida y el código generado era más completo. Sin embargo, al hacerlo sin IA primero entendí mejor por qué hay que reasignar el array en lugar de mutarlo.

---

## Experimento 2 — Filtrar tareas por estado

**Problema:** Mostrar solo las tareas pendientes, completadas, o todas, según el filtro seleccionado.

### Sin IA
Tiempo: ~15 minutos

Mi primer enfoque fue filtrar el array y re-renderizar la lista entera. Funcionaba, pero era ineficiente porque destruía y recreaba todos los elementos del DOM en cada cambio de filtro.

### Con IA
Tiempo: ~3 minutos

La IA propuso una alternativa: en lugar de re-renderizar, recorrer los elementos `<li>` existentes y mostrarlos u ocultarlos con `display`. Esto es más eficiente porque no toca el DOM más de lo necesario.

```js
function filterTasks(type) {
  const items = dom.list.querySelectorAll('li');
  items.forEach(item => {
    const task = tasks.find(t => t.id === Number(item.dataset.id));
    if (!task) return;
    if (type === 'all') item.style.display = 'flex';
    else if (type === 'active') item.style.display = task.completed ? 'none' : 'flex';
    else if (type === 'completed') item.style.display = task.completed ? 'flex' : 'none';
  });
}
```

**Resultado:** La IA propuso una solución mejor que la mía. Pero solo pude evaluar que era mejor porque yo había pensado el problema antes.

---

## Experimento 3 — Ordenar tareas por fecha de recordatorio

**Problema:** Ordenar el array de tareas por su campo `reminder`, poniendo las que no tienen fecha al final.

### Sin IA
Tiempo: ~20 minutos

El mayor problema fue manejar las tareas sin fecha (`reminder` vacío o nulo). Mi primera versión las ordenaba al principio por error.

### Con IA
Tiempo: ~4 minutos

La IA generó directamente una función que trata los casos nulos correctamente:

```js
function sortByDate(tasks) {
  return [...tasks].sort((a, b) => {
    if (!a.reminder) return 1;
    if (!b.reminder) return -1;
    return new Date(a.reminder) - new Date(b.reminder);
  });
}
```

**Resultado:** La IA manejó bien los edge cases que yo había tardado en descubrir. Fue el experimento donde más tiempo me ahorró.

---

## Experimentos en el proyecto TaskFlow

### Prioridades

Pedí a la IA que generara el sistema de etiquetas de prioridad con colores diferenciados. Generó las clases CSS y la lógica JS correctamente, pero los colores iniciales no tenían suficiente contraste en modo claro. Tuve que ajustarlos manualmente.

### Filtro por categoría

La IA generó la función de filtrado por categoría siguiendo el mismo patrón que el filtrado por estado. Fue útil porque mantuve la consistencia del código sin tener que pensar en cómo estructurarlo.

### Sistema de recordatorios

Le pedí que añadiera la visualización del recordatorio en cada tarea. Generó el código para crear el elemento `<small>` con el emoji ⏰ y la fecha formateada. Funcionó a la primera.

---

## Conclusión general

| Experimento | Tiempo sin IA | Tiempo con IA | Ventaja principal de la IA |
|---|---|---|---|
| Eliminar tarea | 10 min | 2 min | Consideró los efectos secundarios |
| Filtrar por estado | 15 min | 3 min | Mejor solución (manipular display vs re-render) |
| Ordenar por fecha | 20 min | 4 min | Manejó edge cases automáticamente |

La IA es más útil cuando el problema tiene casos especiales que son fáciles de olvidar (valores nulos, efectos secundarios). En problemas simples y directos, la diferencia de tiempo es menor y programar sin IA ayuda más a afianzar los conceptos.
