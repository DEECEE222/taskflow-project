# Uso de Cursor en el desarrollo

En este documento explico cómo he utilizado Cursor para trabajar con el proyecto TaskFlow y cómo ha mejorado mi flujo de desarrollo.

---

## Primer contacto con Cursor

Instalé Cursor y abrí el proyecto TaskFlow. La interfaz es prácticamente idéntica a VS Code, lo que hace que la curva de aprendizaje sea mínima si ya lo conoces. Las diferencias principales están en el panel de chat integrado y en las capacidades de edición con IA directamente en el editor.

Exploré las siguientes partes de la interfaz:
- **Explorador de archivos** — igual que VS Code
- **Editor de código** — con sugerencias de autocompletado más contextuales
- **Terminal integrada** — para ejecutar comandos sin salir del editor
- **Chat con IA** (`Ctrl+L`) — para hacer preguntas sobre el código abierto
- **Edición inline** (`Ctrl+K`) — para modificar una selección con lenguaje natural
- **Composer** (`Ctrl+Shift+I`) — para cambios que afectan a varios archivos

---

## Funcionalidades utilizadas

### Autocompletado con IA

Cuando escribí comentarios describiendo lo que quería, Cursor completó el código automáticamente. Por ejemplo:

```js
// función que ordena las tareas por prioridad de mayor a menor
```

Cursor sugirió directamente:

```js
function sortByPriority(tasks) {
  const order = { high: 1, medium: 2, low: 3 };
  return [...tasks].sort((a, b) => (order[a.priority] ?? 999) - (order[b.priority] ?? 999));
}
```

El código era correcto y coincidía con el patrón que yo habría escrito manualmente.

---

### Chat contextual

Seleccioné la función `createTasksStore` completa y pregunté al chat:

> "¿Por qué usas `persistAndSync` en lugar de llamar a `persist` y `onSync` directamente?"

La respuesta explicó que es una función auxiliar interna que evita repetir la misma secuencia de dos llamadas en cada método del store, reduciendo la posibilidad de olvidarse de sincronizar tras una persistencia. Fue útil para entender decisiones de diseño del propio código.

---

### Edición inline

Seleccioné la función `syncStatus` y pedí:

> "Añade un guard para que no falle si `dom.counter` no existe en el DOM"

Cursor modificó la función directamente en el editor añadiendo la comprobación. El resultado fue equivalente a lo que ya tenía, confirmando que la lógica existente ya era correcta.

---

### Composer (multi-archivo)

Usé Composer para pedir:

> "Añade una nueva categoría 'salud' con emoji 🏃 al proyecto"

Cursor identificó los tres puntos del código que había que modificar:
1. El objeto `CATEGORY_EMOJIS` en `app.js`
2. El `<select>` de categorías en `index.html`
3. La lista de filtros del sidebar en `index.html`

Hizo los tres cambios a la vez, lo cual habría sido fácil de olvidar si lo hacía manualmente.

---

## Atajos de teclado más usados

| Atajo | Acción |
|---|---|
| `Ctrl+L` | Abrir chat con contexto del archivo |
| `Ctrl+K` | Edición inline con IA |
| `Ctrl+Shift+I` | Abrir Composer |
| `Tab` | Aceptar sugerencia de autocompletado |
| `Esc` | Rechazar sugerencia |
| `Ctrl+/` | Comentar/descomentar línea |

---

## Dos ejemplos concretos donde Cursor mejoró el código

### Ejemplo 1 — Refactorización de `renderTasks`

Antes de usar Cursor, la función de renderizado estaba mezclada con la lógica de creación de elementos. Le pedí a Cursor que separara las responsabilidades y propuso la arquitectura de `createTaskView` que separa `renderTasks` de `appendTask`, lo que hace el código más limpio y evita re-renderizar toda la lista al añadir una tarea.

### Ejemplo 2 — Manejo de errores en localStorage

Al revisar la función `load` del store, Cursor detectó que el `JSON.parse` podía fallar si los datos en localStorage estaban corruptos. Sugirió envolver el parse en un `try/catch` con fallback a array vacío, que es exactamente lo que está implementado en la versión final.

---

## Conclusión

Cursor acelera tareas repetitivas y de refactorización. El Composer es especialmente útil para cambios que afectan a varios archivos, donde es fácil olvidarse de actualizar alguno. Sin embargo, siempre hay que revisar el código generado — en algunos casos propuso soluciones correctas pero más complejas de lo necesario para el contexto del proyecto.
