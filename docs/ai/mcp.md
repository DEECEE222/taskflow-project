# Servidores MCP (Model Context Protocol)

En este documento explico qué es MCP, cómo lo configuré en Cursor y qué consultas hice usando el servidor.

---

## ¿Qué es MCP?

MCP (Model Context Protocol) es un protocolo abierto desarrollado por Anthropic que permite a los modelos de lenguaje conectarse con herramientas y fuentes de datos externas de forma estandarizada. En lugar de que cada herramienta tenga su propia integración personalizada, MCP define un formato común para que la IA pueda interactuar con sistemas como el sistema de archivos, bases de datos, APIs o repositorios de código.

En términos prácticos: MCP permite que la IA "vea" y "actúe sobre" contexto externo real, no solo el texto que le escribes en el chat.

---

## Configuración del servidor MCP en Cursor

Instalé el servidor MCP de filesystem, que permite a Cursor leer y escribir archivos del proyecto directamente.

### Pasos de instalación

1. Abrí la configuración de Cursor (`Ctrl+,` → buscar "MCP")
2. En el archivo de configuración MCP (`~/.cursor/mcp.json`), añadí:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/ruta/al/proyecto/taskflow"
      ]
    }
  }
}
```

3. Reinicié Cursor para que cargara la configuración
4. Verifiqué que el servidor aparecía activo en el panel de MCP

---

## Consultas realizadas con el servidor MCP

### Consulta 1 — Listar archivos del proyecto

> "¿Qué archivos tiene el proyecto taskflow?"

La IA usó el servidor MCP para listar el contenido del directorio y respondió con la estructura real del proyecto, no con una suposición basada en su entrenamiento.

---

### Consulta 2 — Leer el contenido de app.js

> "Lee el archivo app.js y dime cuántas funciones tiene definidas."

El servidor leyó el archivo y la IA contó e identificó cada función: `syncStatus`, `createTasksStore`, `createTaskView`, `setupEvents`, `filterTasks`, `filterCategory`, `sortByPriority`, `sortByDate`, `completeAll` y `deleteCompleted`.

---

### Consulta 3 — Detectar código duplicado

> "Analiza app.js y dime si hay lógica repetida que podría refactorizarse."

La IA leyó el archivo real y señaló que `filterTasks` y `filterCategory` comparten la misma estructura de iteración sobre los `<li>` del DOM. Sugirió una función genérica que aceptara un predicado.

---

### Consulta 4 — Comparar HTML con JS

> "Comprueba que todos los IDs referenciados en app.js existen en index.html."

El servidor leyó ambos archivos y cruzó las referencias. Confirmó que todos los `getElementById` de `app.js` tenían su correspondiente elemento en el HTML.

---

### Consulta 5 — Revisar consistencia de variables CSS

> "Lee styles.css y dime si hay propiedades de color que no usen las variables de :root."

La IA analizó el CSS y encontró un par de valores hexadecimales directos en las clases `.priority-high`, `.priority-medium` y `.priority-low` que podrían extraerse a variables CSS para mantener consistencia con el resto del diseño.

---

## ¿Para qué es útil MCP en proyectos reales?

- **Revisión de código en contexto real:** la IA trabaja con los archivos actuales, no con copias que pegas en el chat
- **Consistencia entre archivos:** puede cruzar información entre varios archivos a la vez (HTML, JS, CSS)
- **Automatización de tareas repetitivas:** renombrar variables en múltiples archivos, verificar que los IDs coinciden, etc.
- **Onboarding a proyectos nuevos:** puedes pedirle que entienda la estructura de un proyecto desconocido leyendo los archivos directamente

La principal ventaja frente al chat normal es que no tienes que copiar y pegar código manualmente — la IA accede al contexto real del proyecto.
