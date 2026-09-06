# PROMPT: Desarrollo de Tetris PvP (Versión Base Modular)

### 1. Rol (Persona)
Actúa como un Desarrollador Senior de Videojuegos Web y Arquitecto Frontend especializado en HTML5 Canvas, CSS moderno y JavaScript Vanilla orientado a objetos (OOP). Eres experto en mecánicas retro fluidas, bucles de juego (`requestAnimationFrame`), gestión de inputs concurrentes en un mismo teclado y diseño de software modular y desacoplado listo para escalar.

### 2. Contexto (Antecedentes)
Estamos desarrollando un juego web arcade multijugador local en el mismo teclado titulado **"TetrisPvP"**. 
Dos jugadores compiten simultáneamente en pantalla dividida en tiempo real. Cada jugador opera en su propia cuadrícula de Tetris independiente, recibiendo piezas aleatorias autónomas. 
El juego concluye cuando un jugador desborda su matriz (Game Over para él, victoria para el rival) o cuando un jugador alcanza la meta predeterminada de puntaje.
Esta entrega corresponde a la **Fase 1 (MVP)**, por lo que el sistema de juego, renderizado y reglas debe quedar completamente desacoplado para permitir en fases posteriores agregar menús de configuración avanzados, ataques/basura entre jugadores y personalización de skins.

### 3. Tarea (Instrucción principal)
Genera el código completo, modular y funcional utilizando **HTML5, CSS3 y JavaScript Vanilla** (usando la API de `<canvas>` para tableros y previsualización):

1. **Pantalla de Inicio (Home):**
   - Título central con estética pixel art: **TetrisPvP**.
   - Botón interactivo "Iniciar Juego" (arranca la partida).
   - Botón interactivo "Instrucciones" (modal con las reglas de victoria y mapeo de controles).

2. **Mecánicas de Juego y Controles:**
   - Caída automática constante por gravedad.
   - Solo dos formas de caída: la gravedad automática y la caída instantánea ("Hard Drop"). No implementar caída suave (soft drop).
   - Controles del Jugador 1 (Tablero Izquierdo):
     - `A`: Mover izquierda
     - `D`: Mover derecha
     - `W`: Rotar pieza (sentido horario)
     - `S`: Caída instantánea (Hard Drop inmediato hasta el fondo)
   - Controles del Jugador 2 (Tablero Derecho):
     - `J`: Mover izquierda
     - `L`: Mover derecha
     - `I`: Rotar pieza (sentido horario)
     - `K`: Caída instantánea (Hard Drop inmediato hasta el fondo)
   - Soporte para pulsación simultánea de teclas (evitar bloqueo de inputs entre jugadores).

3. **Sistema de Puntuación y Meta de Victoria:**
   - Meta de victoria por puntaje: **100.000 puntos** (definida como una constante/variable editable en la clase de configuración para futura parametrización desde la interfaz).
   - Tabla de puntuación adaptada basada en estándares arcade:
     - 1 línea eliminada: 1.000 pts
     - 2 líneas simultáneas: 3.000 pts
     - 3 líneas simultáneas: 6.000 pts
     - 4 líneas simultáneas (Tetris): 12.000 pts
     - Caída instantánea (Hard Drop): +20 pts por celda recorrida al instante.

4. **Interfaz de Partida (Split-Screen):**
   - Pantalla dividida simétricamente (Jugador 1 a la izquierda, Jugador 2 a la derecha).
   - Marcador superior para cada jugador mostrando sus puntos acumulados y el objetivo (ejemplo: `PUNTOS: 14.500 / 100.000`).
   - Panel lateral exterior al lado de cada matriz con la vista previa ("Next Piece") del próximo tetrominó.

5. **Condiciones de Victoria y Fin de Partida:**
   - **Por Desborde:** Si el tablero de un jugador se llena hasta el límite superior, pierde inmediatamente; el contrincante es declarado ganador.
   - **Por Puntaje:** El primer jugador que alcance o supere los 100.000 puntos gana la partida al instante.
   - Mostrar modal de fin de juego anunciando al ganador con opciones: "Revancha" (reinicia partida) y "Volver al Menú".

### 4. Restricciones y Formato
- **Estructura y Arquitectura OOP:**
  - Código desacoplado mediante clases claras (ej.: `Tetromino`, `Board`, `ScoreSystem`, `Player`, `Engine`, `InputManager`).
  - Separación limpia de archivos: `index.html`, `style.css` y `main.js` (o módulos si se requiere), sin dependencias ni bibliotecas externas.
- **Estilo Visual:**
  - Modo oscuro: fondo profundo (`#0d0e15`), tableros en contraste oscuro (`#181a24`), cuadrículas sutiles y piezas con colores neón estilo retro pixel art (`#00f0f0`, `#0000f0`, `#f0a000`, `#f0f000`, `#00f000`, `#a000f0`, `#f00000`).
  - Tipografía tipo arcade/retro (usar fallback legible tipo `monospace` o una fuente pixel art importada de Google Fonts como `Press Start 2P`).
  - Adaptable a pantalla completa (`100vh`, sin barras de desplazamiento vertical u horizontal).
- **Formato de Entrega:**
  - Código fuente completo, comentado y listo para ejecución inmediata en navegador.
  - Breve explicación de cómo está desacoplada la variable de meta de puntaje (`WIN_SCORE`) para su futura edición en menús.

### 5. Objetivo (Resultado deseado)
Proporcionar una versión fundacional 100% jugable, sin interferencias de teclado entre los dos usuarios, con un loop de juego limpio y una arquitectura robusta que permita extender el proyecto con facilidad a fases de personalización visual y mecánicas competitivas adicionales.