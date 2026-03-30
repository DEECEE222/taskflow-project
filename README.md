# TASKFLOW

Aplicación web de gestión de tareas con interfaz limpia, modo oscuro/claro, categorías, prioridades y recordatorios. Construida con HTML, CSS y JavaScript vanilla — sin dependencias externas.

---

## Características

- **Añadir tareas** con texto, fecha/hora de recordatorio, prioridad y categoría
- **Prioridades** — Alta, Media y Baja con etiquetas de color
- **Categorías** — Trabajo, Personal y Estudio
- **Filtrar** por estado (todas, pendientes, completadas) y por categoría
- **Ordenar** por prioridad o por fecha de recordatorio
- **Buscar** tareas en tiempo real
- **Completar o eliminar** tareas individualmente, o en bloque
- **Modo oscuro / claro** con persistencia en `localStorage`
- **Guardado automático** — todas las tareas se guardan en el navegador
- **Diseño responsive** con sidebar colapsable en móvil

---

## Estructura del proyecto

```
taskflow/
├── index.html      # Estructura HTML y secciones de la app
├── styles.css      # Estilos, variables CSS y responsive
└── app.js          # Lógica, store de tareas y manipulación del DOM
```

---

## Cómo usarlo

No requiere instalación ni servidor. Abre directamente en el navegador:

```bash
# Opción 1 — abrir el archivo directamente
open index.html

# Opción 2 — servidor local con Python
python -m http.server 3000
# Luego visita http://localhost:3000
```

---

## Arquitectura del JavaScript

El código está organizado en tres capas:

### `createTasksStore`
Store centralizado que gestiona el array de tareas, la persistencia en `localStorage` y la sincronización del contador.

```
createTasksStore({ storageKey, onSync })
  ├── load()             — carga tareas guardadas al iniciar
  ├── add(task)          — añade una tarea nueva
  ├── deleteTask(id)     — elimina por ID
  ├── setCompleted(id)   — marca como completada/pendiente
  ├── completeAll()      — completa todas
  ├── deleteCompleted()  — elimina las completadas
  ├── sortByPriority()   — ordena high → medium → low
  └── sortByDate()       — ordena por fecha de recordatorio
```

### `createTaskView`
Gestiona la creación y renderizado de elementos del DOM para cada tarea.

```
createTaskView({ dom, categoryEmojis, onToggleCompleted, onDeleteTask })
  ├── appendTask(task)   — añade un elemento al final de la lista
  └── renderTasks(tasks) — limpia y re-renderiza toda la lista
```

### `setupEvents`
Registra todos los event listeners: formulario, búsqueda, tema y menú móvil.

---

## Cómo añadir una categoría nueva

1. En `index.html`, añade un `<option>` en el select `#task-category` y un `<li>` en el sidebar:

```html
<option value="salud">🏃 Salud</option>
```

```html
<li onclick="filterCategory('salud')">🏃 Salud</li>
```

2. En `app.js`, añade el emoji al objeto `CATEGORY_EMOJIS`:

```js
const CATEGORY_EMOJIS = { trabajo: "💼", personal: "👤", estudio: "📚", salud: "🏃" };
```

---

## Personalización de colores

Todos los colores están definidos como variables CSS en `:root` dentro de `styles.css`. Para cambiar el tema oscuro o claro, edita estas variables:

```css
:root {
  --bg: #0d1117;
  --accent: #58a6ff;
  /* ... */
}

body.light {
  --bg: #f6f8fa;
  --accent: #0969da;
  /* ... */
}
```

---

## Compatibilidad

Funciona en cualquier navegador moderno (Chrome, Firefox, Safari, Edge). No requiere Node.js, npm ni ningún framework.

Los datos se guardan en `localStorage` del navegador — son locales al dispositivo y no se sincronizan entre dispositivos.

---

## Licencia

Proyecto personal de uso libre.
