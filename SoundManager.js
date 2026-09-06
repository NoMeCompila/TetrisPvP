/**
 * SoundManager - Motor de Audio Procedural Retro para TetrisPvP
 * Utiliza exclusivamente la Web Audio API nativa (sin dependencias ni archivos externos).
 */

class SoundManager {
  constructor() {
    /**
     * @type {AudioContext|null} Contexto principal de audio de la Web Audio API.
     */
    this.ctx = null;

    /**
     * @type {GainNode|null} Nodo de ganancia maestro para control global de volumen y evitar saturación.
     */
    this.masterGain = null;

    /**
     * @type {boolean} Estado de silencio global.
     */
    this.isMuted = false;

    /**
     * @type {boolean} Bandera para registrar si ya se realizó el desbloqueo por interacción del usuario.
     */
    this.isUnlocked = false;

    /**
     * @type {HTMLAudioElement|null} Elemento de audio para la música de fondo.
     */
    this.bgm = null;

    /**
     * @type {number} Volumen equilibrado para la música de fondo (~0.25) para no tapar los SFX.
     */
    this.bgmVolume = 0.25;

    /**
     * @type {boolean} Indicador de si hay una partida activa para coordinar la reproducción.
     */
    this.isMatchActive = false;
  }

  /**
   * Asegura que la pista de audio BGM esté instanciada y configurada con loop continuo.
   */
  ensureBGM() {
    if (!this.bgm) {
      this.bgm = new Audio('./tetris-main-theme.mp3');
      this.bgm.loop = true;
      this.bgm.muted = this.isMuted;
      this.bgm.volume = this.isMuted ? 0 : this.bgmVolume;
    }
  }

  /**
   * Inicia o reinicia la música de fondo en loop para la partida activa.
   * Rebobina a tiempo 0 y maneja de forma segura las restricciones de Autoplay del navegador.
   */
  startBGM() {
    this.isMatchActive = true;
    this.ensureBGM();

    if (this.bgm) {
      this.bgm.currentTime = 0;
      this.bgm.muted = this.isMuted;
      this.bgm.volume = this.isMuted ? 0 : this.bgmVolume;

      const playPromise = this.bgm.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Reproducción de BGM en espera o bloqueada por política de Autoplay:', err);
        });
      }
    }
  }

  /**
   * Detiene inmediatamente la música de fondo y restablece su posición de reproducción al inicio.
   */
  stopBGM() {
    this.isMatchActive = false;
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
    }
  }

  /**
   * Inicializa y desbloquea el AudioContext cumpliendo con la política de Autoplay del navegador.
   * Debe ser llamado en respuesta a un gesto del usuario (click, touch o keydown).
   */
  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('Web Audio API no está soportada en este navegador.');
        return;
      }
      this.ctx = new AudioContextClass();

      // Creamos un nodo de ganancia maestro (techo de volumen para mezcla limpia)
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
      }).catch(err => {
        console.warn('No se pudo reanudar el AudioContext:', err);
      });
    } else {
      this.isUnlocked = true;
    }

    this.ensureBGM();
  }

  /**
   * Verifica que el contexto de audio esté disponible y activo antes de sintetizar sonido.
   * @returns {boolean}
   */
  ensureContext() {
    if (this.isMuted) return false;
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return Boolean(this.ctx && this.masterGain);
  }

  /**
   * Alterna el estado de silencio global tanto para SFX procedimentales como para BGM.
   * @returns {boolean} Nuevo estado de isMuted.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }

    if (this.bgm) {
      this.bgm.muted = this.isMuted;
      this.bgm.volume = this.isMuted ? 0 : this.bgmVolume;

      // Si se desmutea durante una partida en curso y el audio estaba en pausa, reanudar
      if (!this.isMuted && this.isMatchActive && this.bgm.paused) {
        const playPromise = this.bgm.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.warn('No se pudo reanudar BGM al desmutear:', err));
        }
      }
    }

    return this.isMuted;
  }

  /**
   * Reproduce un sonido percusivo sutil y ultra-corto para movimientos laterales y caída suave.
   * Diseñado a bajo volumen y corta duración (35 ms) para evitar fatiga acústica.
   */
  playMove() {
    if (!this.ensureContext()) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Forma de onda triangular suave a frecuencia media-alta
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(640, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

    // Envolvente rápida de decaimiento (fade-out exponencial)
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  /**
   * Reproduce un impacto seco, contundente y percusivo para la Caída Rápida (Hard Drop).
   * Simula el golpe sólido de la pieza contra el fondo mediante una rampa de frecuencia descendente.
   */
  playHardDrop() {
    if (!this.ensureContext()) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Rampa de frecuencia que cae rápidamente simulando golpe percusivo retro
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.09);

    // Envolvente con pico inmediato y decaimiento rápido
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  /**
   * Reproduce el sonido de completado de líneas con escala tonal según la cantidad eliminada.
   * Para 4 líneas (Tetris), dispara un arpegio ascendente triunfal festivo.
   * @param {number} linesCount Cantidad de líneas despejadas (1 a 4).
   */
  playLineClear(linesCount = 1) {
    if (!this.ensureContext()) return;

    const count = Math.max(1, Math.min(4, linesCount));

    if (count === 4) {
      // Arpegio ascendente triunfal de 4 notas para Tetris (Do5, Mi5, Sol5, Do6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const stepDuration = 0.065;

      notes.forEach((freq, index) => {
        const startTime = this.ctx.currentTime + (index * stepDuration);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        const noteLength = index === notes.length - 1 ? 0.35 : 0.18;
        gain.gain.setValueAtTime(0.22, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteLength);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + noteLength);
      });
      return;
    }

    // Tonos individuales escalados para 1, 2 o 3 líneas
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // 1 línea: Do5 (523.25 Hz) | 2 líneas: Mi5 (659.25 Hz) | 3 líneas: Sol5 (783.99 Hz)
    const pitchMap = {
      1: 523.25,
      2: 659.25,
      3: 783.99
    };
    const freq = pitchMap[count] || 523.25;
    const duration = 0.18 + (count * 0.03);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + duration);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * Reproduce un sonido dramático y disonante de Game Over.
   * Utiliza un oscilador tipo 'sawtooth' con caída pronunciada de tono (pitch drop).
   */
  playGameOver() {
    if (!this.ensureContext()) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Onda diente de sierra para aspereza arcade retro
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.75);

    // Envolvente con desvanecimiento gradual dramático
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.75);
  }
}

// Instancia global reutilizable para toda la sesión del juego
window.soundManager = new SoundManager();
