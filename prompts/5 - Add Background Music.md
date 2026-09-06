# PROMPT: Integración de Música de Fondo y Control de Audio Global para TetrisPvP

### 1. Rol (Persona)
Actúa como un Desarrollador Frontend Senior y Diseñador de Audio para Videojuegos Web, experto en JavaScript Vanilla, Web Audio API y gestión de estados multimedia en juegos arcade para navegador.

### 2. Contexto (Antecedentes)
En el proyecto **TetrisPvP**, ya contamos con una clase `SoundManager` encargada de reproducir los efectos de sonido procedimentales (SFX) durante la partida. La interfaz ya dispone de un botón para gestionar el estado de sonido (mute/unmute). Para completar la ambientación arcade, se requiere sumar una pista de audio musical almacenada de forma local en la raíz del proyecto (`./tetris-main-theme.mp3`), garantizando una transición sonora limpia entre los estados del juego (menú, partida activa y fin de juego).

### 3. Tarea (Instrucción principal)
Actualiza e integra en la clase `SoundManager` y en el ciclo de vida del juego (`GameEngine` / UI) la reproducción del tema musical principal con las siguientes especificaciones:

1. **Carga y Reproducción de la Música:**
   - Cargar y gestionar el archivo `tetris-main-theme.mp3` ubicado en la raíz del proyecto.
   - Configurar la pista en bucle continuo (`loop = true`) mientras la partida esté en curso.
   - Nivel de volumen: fijar un volumen base moderado y no intrusivo (aproximadamente entre 20% y 30%, ej. `volume = 0.25`) para evitar saturación y permitir que los efectos sonoros (SFX) se distingan con total claridad.

2. **Control por Estados del Juego:**
   - **Menú Principal (Home):** La música **no** debe sonar en el menú de inicio ni en las pantallas de instrucciones.
   - **Inicio de Partida:** La pista debe comenzar a reproducirse automáticamente al pulsar el botón "Iniciar Juego" (o "Revancha"), respetando las políticas de desbloqueo de audio del navegador tras el gesto del usuario.
   - **Fin de Partida (Game Over / Victoria):** Detener la reproducción de la música inmediatamente cuando ocurra el Game Over, pausándola y reiniciando su tiempo al inicio (`currentTime = 0`) para dar protagonismo al efecto sonoro de derrota/victoria y mantener silencio en la pantalla de resultados.

3. **Sincronización con el Botón de Sonido Existente:**
   - Vincular el estado de la música al botón de sonido (mute/unmute) ya presente en la interfaz.
   - Al activar el modo silencio (Mute), se debe silenciar tanto la música de fondo como todos los efectos sonoros de forma simultánea.
   - Al desactivar el modo silencio (Unmute), la música debe reanudar su volumen configurado si la partida está en curso.

### 4. Restricciones y Formato
- **Compatibilidad Técnica:** Utilizar JavaScript Vanilla sin librerías de audio externas. La música puede integrarse mediante el elemento nativo `Audio` o conectarse al grafo del `AudioContext` existente mediante `MediaElementAudioSourceNode` para un control centralizado de ganancia.
- **Manejo de Errores y Promesas:** Gestionar adecuadamente la promesa devuelta por `.play()` (capturando excepciones con `.catch()`) para evitar errores en consola en caso de bloqueos por directivas de autoplay del navegador.
- **Formato de Entrega:**
  - Código completo actualizado del módulo `SoundManager` con los métodos correspondientes (ej. `startBGM()`, `stopBGM()`, `toggleMute()`).
  - Fragmento de integración en los controladores de eventos (evento de inicio de juego, fin de juego y click del botón de sonido).
  - Breve explicación paso a paso de los cambios aplicados.

### 5. Objetivo (Resultado deseado)
Lograr una ambientación musical fluida y con volumen equilibrado que acompañe la intensidad del enfrentamiento durante el juego activo, sin interferir con la claridad de los efectos de sonido ni sonar fuera de la partida.