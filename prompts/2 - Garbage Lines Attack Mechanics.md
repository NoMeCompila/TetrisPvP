# PROMPT: Implementación de Tetromino Especial y Mecánica de Ataque (Garbage Lines) en TetrisPvP

### 1. Rol (Persona)
Actúa como un Desarrollador Senior de Videojuegos Web y Arquitecto Frontend especializado en HTML5 Canvas, JavaScript Vanilla orientado a objetos (OOP) y diseño de sistemas de juego competitivos. Posees amplia experiencia en balance de mecánicas arcade, manipulación de matrices bidimensionales y extensión modular de bases de código existentes.

### 2. Contexto (Antecedentes)
El proyecto es **TetrisPvP**, un juego web arcade multijugador local 1v1 en pantalla dividida que utiliza JavaScript Vanilla y `<canvas>`. Hasta ahora, cada jugador operaba en su tablero de forma aislada compitiendo solo por puntuación y supervivencia. 
Para elevar la competitividad directa, se requiere implementar una mecánica de ataque basada en una pieza especial ("Special Tetromino") que castigue al oponente enviándole líneas de interferencia (líneas grises/garbage) desde la base de su tablero.

### 3. Tarea (Instrucción principal)
Refactoriza y amplía la lógica existente integrando la mecánica de **Tetromino Especial Multicolor** y el sistema de **Envío de Líneas Basura (Garbage Lines)** respetando las siguientes reglas de juego:

1. **Aparición y Renderizado del Tetromino Especial:**
   - Contador de piezas por jugador: cada **5 tetrominós** generados en la cola de un jugador, la 5ª pieza debe ser marcada como "Especial".
   - Estética visual: cada bloque o celda (`minó`) que compone este tetrominó debe dibujarse con un color distinto e independiente (aspecto multicolor o arcoíris brillante con bordes neón), distinguiéndose claramente de las piezas estándar monocromáticas. La previsualización ("Next Piece") debe reflejar esta apariencia multicolor cuando corresponda.

2. **Mecánica de Activación de Ataque:**
   - El ataque solo se dispara si el jugador completa un "Line Clear" donde **al menos una celda del tetrominó especial participe en la línea eliminada**.
   - Si se limpian líneas normales sin piezas especiales o se limpian líneas grises preexistentes, **no** se activa el envío de basura al contrincante.

3. **Escala de Castigo al Rival (Líneas Grises):**
   - **Single (1 línea) o Double (2 líneas):** Se insertan **2 líneas grises** en la base del tablero del rival.
   - **Triple (3 líneas):** Se insertan **3 líneas grises** en la base del rival.
   - **Tetris (4 líneas):** Se insertan **4 líneas grises** en la base del rival Y el atacante recibe un bono directo de **+10.000 puntos** adicionales a su puntuación estándar.
   - **Inserción física:** Las líneas basura empujan hacia arriba toda la matriz actual del tablero rival desde el fondo.
   - **Estructura de la línea gris:** Cada fila debe ser de color gris opaco (`#555555` o similar) con exactamente **1 celda vacía aleatoria (hueco)** por fila (ej. `[◻, _, ◻, ◻, ◻, ◻, ◻, ◻, ◻, ◻]`), permitiendo que el rival pueda despejarlas si coloca piezas estratégicamente.

4. **Límites, Acumulación y Regla de Saturación:**
   - Las líneas grises pueden acumularse consecutivamente si se reciben múltiples ataques.
   - **Límite de altura:** Las líneas grises solo pueden crecer hasta un máximo de **16 filas de altura** (medidas desde la base inferior del tablero de 20 filas estándar). Ningún ataque puede generar líneas grises por encima de la fila 16.
   - **Regla de tope máximo:** Si el tablero del rival ya alcanzó el límite de 16 filas de líneas grises y el atacante vuelve a realizar un *Line Clear* con una pieza especial:
     - **No** se agregan más líneas grises al rival.
     - En su lugar, el atacante recibe el **doble de los puntos** que le correspondían por esa jugada (puntuación base del clear duplicada).

### 4. Restricciones y Formato
- **Compatibilidad y Arquitectura OOP:**
  - Integrar la funcionalidad desacoplada dentro de las clases ya definidas (ej. `Board.receiveGarbageLines(count)`, `Piece.isSpecial`, `Player.attack(opponent)`).
  - Mantener la simetría: las reglas y penalizaciones deben funcionar idénticamente tanto si P1 ataca a P2 como si P2 ataca a P1.
  - Cero dependencias externas; continuar estrictamente con JavaScript Vanilla y HTML5 Canvas.
- **Formato de Entrega:**
  - Código completo actualizado o módulos modificados con comentarios técnicos claros que expliquen la lógica de empuje de matrices (`push`/`unshift` en la cuadrícula).
  - Listar los métodos nuevos o modificados para facilitar su integración directa.

### 5. Objetivo (Resultado deseado)
Lograr una mecánica de contraataque fluida, equilibrada y visualmente evidente, donde los jugadores deban alternar entre atacar estratégicamente con piezas especiales y defenderse limpiando las líneas de interferencia antes de alcanzar el desborde superior.