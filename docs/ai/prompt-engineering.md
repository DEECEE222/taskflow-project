# Prompt Engineering aplicado al desarrollo

En este documento recojo los prompts más útiles que he usado durante el desarrollo de TaskFlow, con una explicación de por qué funcionan bien.

---

## Prompts por categoría

### Definición de rol

**Prompt 1**
> "Actúa como desarrollador senior de JavaScript. Revisa este código y dime qué mejorarías antes de llevarlo a producción."

Por qué funciona: definir un rol orienta a la IA hacia un tipo específico de respuesta. "Desarrollador senior" implica que espero feedback sobre legibilidad, mantenibilidad y robustez, no solo que funcione.

---

**Prompt 2**
> "Eres un profesor de programación explicando a un estudiante de primer año. Explica qué es un closure con un ejemplo del mundo real."

Por qué funciona: el rol de "profesor para principiantes" hace que la IA evite jerga técnica innecesaria y use analogías más accesibles.

---

### Razonamiento paso a paso

**Prompt 3**
> "Explica paso a paso qué hace este código, línea por línea."

Por qué funciona: pedir razonamiento explícito obliga a la IA a no saltarse pasos. Útil cuando el código es denso o usa patrones poco comunes.

---

**Prompt 4**
> "Antes de generar código, explica qué enfoque vas a usar y por qué."

Por qué funciona: hace que la IA razone antes de escribir, lo que reduce errores lógicos y permite evaluar si el enfoque es correcto antes de ver la implementación.

---

### Detección de errores

**Prompt 5**
> "Encuentra todos los errores en este código. Para cada uno, explica qué está mal y cómo corregirlo."

Por qué funciona: pedir que liste *todos* los errores y explique cada uno por separado evita respuestas vagas como "hay un error en la línea X".

---

**Prompt 6**
> "Este código debería hacer X, pero hace Y. ¿Por qué?"

Por qué funciona: dar contexto sobre el comportamiento esperado vs real ayuda a la IA a identificar la causa raíz, no solo síntomas.

---

### Generación de código con restricciones

**Prompt 7**
> "Genera una función que filtre tareas completadas. Usa solo JavaScript vanilla, sin librerías. Máximo 10 líneas."

Por qué funciona: las restricciones explícitas (vanilla JS, límite de líneas) evitan que la IA sobrediseñe la solución o use herramientas que no corresponden al proyecto.

---

**Prompt 8**
> "Genera esta función siguiendo el mismo patrón que el código que te paso a continuación: [código de ejemplo]"

Por qué funciona: es few-shot prompting — dar un ejemplo del estilo esperado hace que el código generado sea consistente con el resto del proyecto.

---

### Refactorización y documentación

**Prompt 9**
> "Refactoriza esta función para eliminar código repetido, sin cambiar su comportamiento externo. Explica qué cambiaste y por qué."

Por qué funciona: pedir que explique los cambios permite verificar que la refactorización es correcta y entender las decisiones tomadas.

---

**Prompt 10**
> "Escribe comentarios JSDoc para esta función. Incluye @param, @returns y un ejemplo de uso."

Por qué funciona: especificar el formato (JSDoc) y el contenido esperado (@param, @returns, ejemplo) produce documentación más completa que si solo pides "documenta esto".

---

## Conclusión

Los mejores prompts comparten tres características:

1. **Contexto claro** — la IA sabe qué está haciendo y para qué
2. **Restricciones explícitas** — evita soluciones genéricas que no encajan en el proyecto
3. **Salida esperada definida** — "explica cada error por separado" vs "encuentra errores"

El prompt engineering no es magia — es simplemente comunicar bien lo que necesitas, igual que harías con otra persona.
