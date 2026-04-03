# Comparativa entre asistentes de IA

En este documento comparo ChatGPT y Claude en tres tipos de tareas: explicación de conceptos, detección de errores y generación de código.

---

## 1. Explicación de conceptos técnicos

### Closures

**ChatGPT:** Genera una definición directa seguida de un ejemplo corto, luego propone un caso práctico (por ejemplo, un contador con estado privado). Al final ofrece ejercicios y un pequeño cuestionario para reforzar el concepto. El tono es didáctico y accesible.

**Claude:** Empieza con una explicación más conceptual antes de mostrar código. Los ejemplos están más desarrollados y suelen incluir variaciones del mismo patrón para mostrar diferentes usos. No propone ejercicios, pero conecta el concepto con situaciones reales de forma más directa.

**Conclusión:** Para closures, Claude explica mejor el *por qué*, ChatGPT es más útil si quieres practicar con ejercicios guiados.

---

### Event Loop

**ChatGPT:** Explica el call stack, la cola de tareas y el bucle de eventos de forma textual. Los ejemplos usan `setTimeout` para ilustrar la asincronía.

**Claude:** Además de la explicación textual, generó un diagrama ASCII mostrando cómo fluyen las tareas entre el call stack y la task queue. Esto hizo la explicación mucho más visual y fácil de seguir.

**Conclusión:** Claude ganó en este caso por el apoyo visual. Entender el Event Loop sin un diagrama es bastante más difícil.

---

### DOM

**ChatGPT:** Explica qué es el árbol DOM, cómo seleccionar elementos y cómo modificarlos, con ejemplos de `querySelector`, `innerHTML` y `addEventListener`.

**Claude:** Estructura la explicación en tres bloques (qué es, cómo acceder, cómo manipular) y al final añade un párrafo explicando la relación entre los tres conceptos vistos (closures, event loop y DOM), lo que ayuda a tener una visión más integrada.

**Conclusión:** Ese párrafo de conexión entre conceptos es lo más valioso de la respuesta de Claude — da contexto que ChatGPT no ofrece por defecto.

---

## 2. Detección de errores

Usé tres funciones con errores intencionales para probar ambos asistentes.

### Función 1

```js
function suma(a, b) {
  return a + c; // error: variable 'c' no definida
}
```

**ChatGPT:** Identificó el error (`c` no está definida), explicó que debería ser `b` y sugirió añadir validación de tipos.

**Claude:** Detectó el mismo error, pero además señaló que la función no tiene ningún guard ante valores no numéricos, y propuso una versión más robusta con comprobación de tipos.

---

### Función 2

```js
function getUser(id) {
  const users = [{ id: 1, name: 'Ana' }];
  return users.find(u => u.id = id); // error: asignación en lugar de comparación
}
```

**ChatGPT:** Detectó el `=` vs `===` inmediatamente y explicó la diferencia entre asignación y comparación.

**Claude:** Detectó el mismo error y además señaló que `.find()` devuelve `undefined` si no encuentra nada, sugiriendo manejar ese caso.

---

### Función 3

```js
async function fetchData() {
  const data = await fetch('https://api.example.com/tasks');
  return data.json; // error: falta llamar json()
}
```

**ChatGPT:** Identificó que `.json` es una propiedad (la función), no una llamada. Corrección: `data.json()`.

**Claude:** Mismo diagnóstico, y además indicó que hay que añadir `try/catch` porque tanto `fetch` como `.json()` pueden lanzar errores.

**Conclusión:** Ambos detectan errores básicos bien. Claude tiende a ir un paso más allá sugiriendo mejoras de robustez, lo que es útil pero puede ser excesivo si solo quieres corregir el bug.

---

## 3. Generación de código a partir de descripción en lenguaje natural

### Tarea 1: "Función que filtre tareas completadas de un array"

**ChatGPT:**
```js
function filterCompleted(tasks) {
  return tasks.filter(task => task.completed === true);
}
```
Código correcto, limpio y directo.

**Claude:**
```js
/**
 * Filtra las tareas completadas de un array.
 * @param {Array} tasks - Array de objetos tarea
 * @returns {Array} Tareas con completed === true
 */
function filterCompleted(tasks) {
  return tasks.filter(task => task.completed);
}
```
Añadió JSDoc automáticamente y usó la forma más corta (`task.completed` en lugar de `=== true`).

---

### Tarea 2: "Función que ordene tareas por prioridad (high > medium > low)"

**ChatGPT:** Generó la función con un objeto de orden y `.sort()`. Funcionó correctamente.

**Claude:** Generó la misma lógica pero extrajo el objeto de prioridades como constante separada, haciendo el código más fácil de modificar si se añaden nuevas prioridades.

---

### Tarea 3: "Función que guarde y recupere tareas de localStorage"

Ambos generaron código equivalente usando `JSON.stringify` y `JSON.parse`. La diferencia fue que Claude envolvió la recuperación en un `try/catch` para manejar JSON malformado, lo cual está implementado así en el proyecto final.

---

## Conclusión general

| Criterio | ChatGPT | Claude |
|---|---|---|
| Explicaciones didácticas | ✅ Con ejercicios | ✅ Más conciso |
| Soporte visual | ❌ Solo texto | ✅ Diagramas ocasionales |
| Detección de errores | ✅ Preciso | ✅ Más exhaustivo |
| Generación de código | ✅ Directo | ✅ Más documentado |
| Conexión entre conceptos | ❌ | ✅ |

Ninguno es mejor en absoluto. ChatGPT es más útil cuando quiero aprender con ejercicios. Claude es mejor cuando quiero entender la lógica más profunda o necesito código listo para producción.
