# PROMPT: Implementación de SoundManager con Web Audio API para TetrisPvP

### 1. Rol (Persona)
Actúa como un Diseñador de Audio para Videojuegos y Desarrollador Frontend Senior especializado en la Web Audio API nativa de JavaScript y arquitectura de sonido procedural estilo retro/arcade (8-bit / chiptune). Eres experto en sintetizar efectos de sonido dinámicos mediante código sin dependencias externas ni archivos de audio pesados.

### 2. Contexto (Antecedentes)
Estamos desarrollando un juego web multijugador local 1v1 llamado **"TetrisPvP"** en JavaScript Vanilla y Canvas. 
Dado que dos jugadores interactúan intensamente en el mismo teclado y pantalla simultáneamente, el juego necesita retroalimentación auditiva inmediata. Para mantener el proyecto ligero, modular y sin latencia por carga de archivos (`.mp3` o `.wav`), requerimos sintetizar todos los efectos en tiempo real usando exclusivamente la **Web Audio API** del navegador.

### 3. Tarea (Instrucción principal)
Crea una clase modular y desacoplada llamada `SoundManager` que gestione y sintetice proceduralmente los efectos de sonido del juego para los siguientes eventos:

1. **Inicialización y Desbloqueo (`init`):**
   - Manejo del ciclo de vida de `AudioContext` para cumplir con las políticas de reproducción automática de los navegadores (desbloqueo seguro tras el primer clic o interacción del usuario en el menú o pantalla de juego).
   - Manejo de estado (`suspended` / `running`).

2. **Movimiento Lateral y Soft Drop (`playMove`):**
   - Sonido muy sutil, corto y de baja intensidad (click/blip percusivo y discreto) para evitar fatiga auditiva o saturación sonora cuando ambos jugadores pulsan teclas repetidamente.
   - Duración estimada: 30-50 ms con ganancia baja.

3. **Caída Instantánea (`playHardDrop`):**
   - Pulso percusivo seco y contundente utilizando un oscilador con caída exponencial rápida en ganancia y frecuencia, transmitiendo el impacto sólido de la pieza contra el fondo.

4. **Limpieza de Líneas (`playLineClear(linesCount)`):**
   - Síntesis tonal brillante usando osciladores tipo `triangle` o `sine`.
   - Frecuencia base (ej. 440 Hz / La4) que escala progresivamente a tonos más agudos según la cantidad de líneas eliminadas (1, 2, 3 o 4 líneas / Tetris).
   - En el caso de 4 líneas (Tetris), debe reproducir un acorde o un arpegio rápido ascendente triunfal.

5. **Fin de Partida (`playGameOver`):**
   - Tono dramático y disonante utilizando un oscilador `sawtooth`.
   - Caída pronunciada de tono (pitch drop) hacia frecuencias graves mediante una rampa exponencial descendente en la frecuencia y un desvanecimiento final de volumen.

6. **Estructura base sugerida:**
```javascript
class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }
  init() { /* Desbloquea AudioContext tras primer gesto del usuario */ }
  playMove() { /* Sonido sutil y corto */ }
  playHardDrop() { /* Golpe percusivo seco con caída exponencial */ }
  playLineClear(linesCount) { /* Tono/arpegio escalonado según 1, 2, 3 o 4 líneas */ }
  playGameOver() { /* Rampa descendente dramática tipo sawtooth */ }
}
```

7. **Detalles técnicos y restricciones (Requisitos específicos)**

**Librerías externas:** Absolutamente ninguna. Solo Web Audio API nativa (AudioContext, OscillatorNode, GainNode, LinearRampToValueAtTime).
**Sin archivos de audio:** Prohibido el uso de archivos `.mp3`, `.wav`, `.ogg` o cualquier recurso externo. Todos los sonidos deben sintetizarse mediante código.
**Integración:** El `SoundManager` debe ser importado e instanciado en `main.js`. Los métodos de reproducción deben llamarse desde los eventos correspondientes del `Engine` (ej. `onKeyDown`, `clearLines`).
**Persistencia:** El `SoundManager` debe mantener el estado de `AudioContext` y `isMuted` de forma global y persistente durante toda la sesión de juego.

8. **Ejemplos de comportamiento (Casos de uso)**
- **Escenario:** Un jugador presiona la tecla "Derecha" repetidamente.
- **Comportamiento esperado:** El `SoundManager` reproduce un sonido de movimiento muy suave y breve cada vez que se llama a `playMove()`, sin saturar el audio.
- **Escenario:** Un jugador ejecuta un "Tetris" (limpia 4 líneas a la vez).
- **Comportamiento esperado:** El `SoundManager` ejecuta `playLineClear(4)`, generando un arpegio ascendente rápido y brillante que culmina con una nota alta yfestiva, acompañada del bonus de 10,000 puntos.
- **Escenario:** Un jugador toca fondo con un movimiento brusco.
- **Comportamiento esperado:** Se ejecuta `playHardDrop()`, produciendo un sonido percusivo seco con un leve "clic" de alta frecuencia seguido de un desvanecimiento inmediato.

9. **Formato de salida deseado**
Proporciona únicamente el código completo y listo para copiar y pegar de la clase `SoundManager.js`, con comentarios claros en español que expliquen cada función y parámetro, y cómo se relaciona con la Web Audio API.