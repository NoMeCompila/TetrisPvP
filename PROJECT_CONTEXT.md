# TetrisPvP — Contexto del Proyecto

## 1. Visión General
**TetrisPvP** es un videojuego web arcade retro multijugador local en tiempo real para 2 jugadores en pantalla dividida (*split-screen*), diseñado para ser ejecutado sobre el mismo teclado de forma no bloqueante.

- **Filosofía Técnica**: 100% Vanilla (HTML5 Canvas, CSS3 Vanilla, JavaScript Moderno ES6+ con POO). Sin frameworks, dependencias externas ni librerías de terceros.
- **Objetivo**: Proveer una arquitectura modular, extensible y desacoplada que permita iterar mecánicas de duelo competitivo (como ataques de líneas basura, multiplicadores o personalización visual) sin degradar el bucle principal de renderizado ni la respuesta de los controles.

---

## 2. Pila Tecnológica y Arquitectura

| Componente | Tecnología | Propósito |
|---|---|---|
| **Estructura** | HTML5 semántico | Modales (Instrucciones, Game Over), cabecera, HUD de puntuación y contenedores `<canvas>`. |
| **Estilos** | CSS3 moderno | Modo oscuro profundo arcade, estética neón pixel art, diseño adaptable a pantalla completa (`100vh`) y variables CSS globales. |
| **Lógica y Render** | JavaScript ES6+ (OOP) | Bucle de juego desacoplado (`requestAnimationFrame`), renderizado 2D directo en Canvas y arquitectura basada en entidades independientes. |
| **Gestión de Cambios** | OpenSpec (Spec-driven) | Control estricto de especificaciones, capacidades (`openspec/specs`) y tareas de implementación planificadas. |

---

## 3. Estructura de Directorios

```text
WordsWars/
├── .agent/                             # Workflows y habilidades del agente (OpenSpec)
├── openspec/                           # Sistema de especificaciones y capacidades
│   ├── changes/
│   │   └── archive/                    # Cambios planificados, ejecutados y archivados
│   │       └── 2026-09-06-rebind-controls-add-soft-drop/
│   ├── specs/                          # Especificaciones maestras activas
│   │   └── tetris-pvp-gameplay/
│   │       └── spec.md
│   └── config.yaml
├── prompts/                            # Documentos de requerimientos y diseño de fases
│   ├── MVP Tetris PvP.md               # Requerimientos de la Fase 1 (MVP)
│   └── 2 - Garbage Lines Attack Mechanics.md  # Requerimientos de la Fase 2 (Ataques)
├── index.html                          # Maquetado DOM, vistas Home/Juego y Modales
├── main.js                             # Motor principal del juego y clases desacopladas
├── style.css                           # Paleta de colores arcade, layout split-screen y estilos
└── PROJECT_CONTEXT.md                  # Este documento
```

---

## 4. Módulos y Clases Principales (`main.js`)

1. **`TRANSLATIONS` / `I18n`**:
   - Sistema de internacionalización integrado (Español por defecto e Inglés conmutables en tiempo real mediante botón en la cabecera).
   - Traduce dinámicamente etiquetas del HUD, descripciones de control y textos de modales.

2. **`GameConfig`**:
   - Objeto central de configuración desacoplado.
   - Parámetros: dimensiones de matriz (10 columnas × 20 filas), tamaño de celdas (`BLOCK_SIZE = 28px`, `PREVIEW_BLOCK_SIZE = 20px`), temporizadores de gravedad (`GRAVITY_DELAY = 750ms`), `DAS_DELAY` (160ms), `ARR_INTERVAL` (45ms), paleta de colores neón y meta de puntaje (`WIN_SCORE = 100.000` con setter dinámico `setWinScore`).

3. **`Tetromino`**:
   - Modela las 7 piezas tradicionales (`I`, `J`, `L`, `O`, `S`, `T`, `Z`).
   - Soporta rotación matemática horaria de matrices y clonación profunda.

4. **`Board`**:
   - Matriz 10×20 con detección de colisiones (`isValidPosition`).
   - Sistema de rotación con *wall-kicks* básicos.
   - Fusión de piezas en la cuadrícula (`merge`), limpieza de líneas completas (`clearLines`) y cálculo de la pieza fantasma proyectada al fondo (`getGhostY`).

5. **`ScoreSystem`**:
   - Tabla de puntos clásica adaptada a ritmo arcade:
     - 1 línea: 1.000 pts
     - 2 líneas: 3.000 pts
     - 3 líneas: 6.000 pts
     - 4 líneas (Tetris): 12.000 pts
     - Caída rápida (Hard Drop): +20 pts por celda recorrida.

6. **`InputManager` (Concurrente y No Bloqueante)**:
   - Resuelve el problema clásico de colisión de teclas en el mismo teclado.
   - Soporta acciones continuas mediante **DAS** (*Delayed Auto Shift*) y **ARR** (*Auto Repeat Rate*), así como bloqueos de acción única (*single action locks*) para rotaciones y drops instantáneos.
   - Previene comportamientos nativos de desplazamiento del navegador para teclas como `Space` o `Enter`.

7. **`Player`**:
   - Encapsula el estado individual de cada jugador: matriz, puntaje, pieza activa, próxima pieza en cola, acumulador de gravedad e indicador de desborde (*top-out*).
   - Métodos expuestos: `moveLeft()`, `moveRight()`, `rotate()`, `softDrop()`, `hardDrop()`, `update(deltaTime)`, `render()`, `renderPreview()`.

8. **`Engine`**:
   - Orquestador del bucle de juego continuo (`requestAnimationFrame`).
   - Control de estados: `MENU`, `PLAYING`, `GAME_OVER`.
   - Evaluación en cada cuadro de condiciones de victoria:
     - **Por Desborde**: Si un jugador no puede colocar la pieza entrante en la parte superior, pierde inmediatamente y gana el contrincante.
     - **Por Puntaje**: El primero en alcanzar `WIN_SCORE` (100.000 pts) gana la partida.

9. **`SoundManager` (Web Audio API)**:
   - Motor procedural de sonido retro sin dependencias ni archivos externos.
   - Maneja el desbloqueo de `AudioContext` cumpliendo la política de Autoplay al interactuar con el juego.
   - Métodos de síntesis: `playMove()` (blip sutil de 35ms), `playHardDrop()` (impacto percusivo seco), `playLineClear(linesCount)` (escala tonal y arpegio ascendente para Tetris), `playGameOver()` (rampa descendente con oscilador sawtooth) y `toggleMute()`.

---

## 5. Mapeo de Controles (Mismo Teclado)

| Acción | 🎮 Jugador 1 (Izquierda) | 🕹️ Jugador 2 (Derecha) | Tipo de Input |
|---|---|---|---|
| **Mover Izquierda** | <kbd>A</kbd> | <kbd>J</kbd> | Continuo (DAS / ARR) |
| **Mover Derecha** | <kbd>D</kbd> | <kbd>L</kbd> | Continuo (DAS / ARR) |
| **Rotar (Horario)** | <kbd>W</kbd> | <kbd>I</kbd> | Disparo Único |
| **Caída Suave (Soft Drop)** | <kbd>S</kbd> | <kbd>K</kbd> | Continuo (Paso acelerado) |
| **Caída Rápida (Hard Drop)** | <kbd>F</kbd> o <kbd>Space</kbd> | <kbd>H</kbd> o <kbd>Enter</kbd> | Disparo Único (Instantáneo + Puntos) |

---

## 6. Estado Actual y Próximos Pasos (Roadmap)

### Fase 1: MVP Base (Completado)
- [x] Pantalla de inicio arcade y modal de instrucciones con reglas y controles.
- [x] Arenas simétricas en pantalla dividida con vista previa (*Next Piece*) y marcadores en vivo.
- [x] Soporte de inputs concurrentes sin interferencia de hardware ni bloqueo de teclas.
- [x] Condiciones de victoria duales (Supervivencia por desborde y Meta de 100.000 pts).
- [x] Modal de Game Over con opciones de "Revancha" y "Volver al Menú".
- [x] Asignación ergonómica de controles y soporte de Caída Suave (*Soft Drop*).

### Fase 2: Mecánica de Ataque y Líneas Basura (Próximo Desarrollo)
*Basado en el documento `prompts/2 - Garbage Lines Attack Mechanics.md`:*
- **Tetrominó Especial Multicolor**: Cada 5 piezas generadas en la cola de un jugador, la quinta se genera como pieza especial con minós de colores independientes y borde neón brillante.
- **Activación de Ataque**: Se activa exclusivamente si se cumple una de dos condiciones:
  1. El *Line Clear* es detonado directamente por una pieza especial (`isSpecial`).
  2. Se completa una fila homogénea compuesta al 100% por minós especiales (cualquiera sea la pieza de cierre).
  *Restricción:* Piezas estándar completando filas heterogéneas (mixtas) NO generan ataque ni envían basura al rival.
  - Escala:
    - 1 o 2 líneas eliminadas: Envía 2 líneas grises al rival.
    - 3 líneas eliminadas: Envía 3 líneas grises al rival.
    - 4 líneas eliminadas (Tetris): Envía 4 líneas grises al rival + bono de +10.000 pts para el atacante.
- **Estructura de Líneas Basura (*Garbage*)**:
  - Insertadas desde la base del rival empujando la matriz hacia arriba.
  - Cada fila gris cuenta con exactamente 1 hueco aleatorio para permitir contraataques y defensas.
- **Tope de Saturación (16 filas)**:
  - Límite máximo de 16 filas de basura en el tablero.
  - Si el rival ya tiene 16 filas grises y recibe otro ataque especial, el atacante recibe el doble de puntos de la jugada en lugar de enviar más basura.
