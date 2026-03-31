# Reflexión sobre el uso de IA en programación

En este documento reflexiono con mis propias palabras sobre lo que ha supuesto integrar herramientas de IA en el desarrollo de TaskFlow.

---

## ¿En qué tareas me ha ayudado más?

La IA ha sido más útil en tres situaciones concretas:

**Casos con edge cases difíciles de anticipar.** El ejemplo más claro fue la función de ordenar por fecha: yo sabía lo que quería hacer, pero tardé bastante en manejar correctamente los casos donde una tarea no tiene fecha. La IA lo resolvió directamente porque ese es un patrón que aparece continuamente en código JavaScript.

**Refactorización.** Cuando el código funciona pero está mal organizado, describir lo que quiero conseguir y dejar que la IA proponga una estructura es más rápido que reescribirlo yo desde cero. El paso de tener todo en funciones sueltas a la arquitectura de `createTasksStore` y `createTaskView` fue más fácil con ayuda.

**Documentación.** Escribir JSDoc para funciones que ya funcionan es aburrido y fácil de posponer. Pedirle a la IA que lo genere a partir del código existente acelera mucho esa parte.

---

## Casos donde la IA ha fallado o ha generado código incorrecto

No todo ha sido perfecto. Algunos casos donde la IA no ayudó o directamente empeoró las cosas:

**Código correcto pero innecesariamente complejo.** En algún momento pedí una función simple de búsqueda y la IA propuso una solución con expresiones regulares y normalización de caracteres cuando con un simple `.toLowerCase().includes()` era suficiente para el proyecto. Tuve que simplificarlo manualmente.

**Contexto del proyecto.** Cuando le pedía código sin dar suficiente contexto, generaba soluciones que no encajaban con la arquitectura existente — por ejemplo, accediendo directamente a `localStorage` en lugar de usar el store centralizado.

**Explicaciones demasiado genéricas.** Algunas veces, cuando preguntaba sobre un error específico, la respuesta era una explicación general del concepto en lugar de analizar el problema concreto. Aprendí que cuanto más específico es el prompt, más útil es la respuesta.

---

## Riesgos de depender demasiado de la IA

El riesgo más real que he notado es aceptar código que funciona sin entenderlo. Es muy fácil copiar una solución, ver que los tests pasan (o que el comportamiento es el esperado) y seguir adelante sin saber por qué funciona. Eso es un problema porque:

- Si hay un bug más adelante, no sabes por dónde empezar a buscar
- No puedes adaptar el código a un contexto diferente
- Estás construyendo sobre una base que no controlas

También hay un riesgo de perder la capacidad de arrancar sin ayuda. Si siempre empiezo por pedirle a la IA que genere el código, puede que no desarrolle bien la habilidad de diseñar una solución desde cero.

---

## ¿Cuándo prefiero programar sin IA?

Prefiero no usar IA cuando estoy aprendiendo algo nuevo que quiero entender de verdad. Si busco entender cómo funciona `.reduce()`, o cómo estructurar un store de estado, el proceso de equivocarme y corregirlo yo mismo es parte del aprendizaje. La IA lo resuelve, pero me roba esa parte.

También prefiero empezar sin IA cuando el problema es pequeño y claro. Para una función de cinco líneas donde sé exactamente qué necesito, escribirla directamente es más rápido que formular el prompt.

---

## Conclusión

La IA es una herramienta que multiplica la capacidad de alguien que ya sabe programar. No sustituye el conocimiento — lo amplifica. Si no entiendo qué hace el código que genera, no puedo detectar cuándo está mal, y se generará código incorrecto con mucha confianza aparente.

Mi forma de usarla ha evolucionado durante el proyecto: al principio pedía que generara cosas completas, ahora la uso más para revisar, refactorizar o resolver puntos concretos donde me atasco. Eso me parece más sano y más productivo.
