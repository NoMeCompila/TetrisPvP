# [BUG] Disparo indebido de "Garbage Attack" al completar líneas con piezas estándar sobre bloques multicolores

## 1. Identificación del Defecto
* **ID:** 01
* **Módulo:** Gameplay Engine / PvP Mechanics / Attack System (`GarbageAttackController`)
* **Severidad:** Major (Afecta la balanceabilidad y mecánica competitiva del modo PvP)
* **Prioridad:** High
* **Tipo:** Lógica de Negocio / Balance de Juego
* **Estado:** Open
* **Entorno:** PvP Multiplayer / Local & Online Match

---

## 2. Descripción General
En el modo competitivo (PvP), el mecanismo de contraataque o envío de líneas basura (**Garbage Attack**) se está activando incorrectamente cuando el jugador completa una línea (**Line Clear**) utilizando un tetromino estándar sobre una fila que contiene al menos un bloque o celda multicolor remanente (proveniente de figuras especiales).

Esta activación prematura rompe el ritmo y balance competitivo de la partida, ya que permite castigar al oponente sin cumplir con la condición estratégica de haber jugado un tetromino multicolor ni haber consolidado una línea compuesta íntegramente por bloques especiales.

---

## 3. Pasos para Reproducir (Reproduction Steps)
1. Iniciar una partida competitiva 1v1 (PvP).
2. Construir la matriz de juego hasta recibir un tetromino especial con bloques multicolores.
3. Colocar el tetromino especial en la base o estructura sin llegar a limpiar la fila (dejando bloques multicolores expuestos o combinados con bloques regulares).
4. Continuar rotando y posicionando piezas estándar (p. ej., ciclo de hasta 5-6 piezas estándar).
5. Posicionar una pieza estándar (ej. pieza I, T o L) de modo que complete de forma horizontal una línea que contenga al menos un bloque multicolor remanente.
6. Observar el evento de resolución de línea y el envío de ataque al rival.

---

## 4. Comportamiento Actual (Actual Result)
El sistema dispara el evento de ataque y envía líneas de basura (**garbage lines**) al rival, a pesar de que el trigger fue una pieza estándar completando una línea mixta (estándar + multicolor).

---

## 5. Comportamiento Esperado (Expected Result)
**NO SE DEBE** enviar ataque de líneas basura (**garbage lines**) al oponente bajo ese escenario. 
El completado de líneas mixtas disparado por piezas convencionales debe limitarse a la limpieza regular de la matriz y suma de puntuación local, sin proyectar daño o basura al tablero rival.

---

## 6. Criterios de Aceptación / Fix Sugerido

### Condiciones Exclusivas de Activación de Garbage Attack:
El mecanismo de envío de líneas basura únicamente debe entrar en cola de ataque si se cumple al menos una de las siguientes condiciones:

1. **Trigger por Tetromino Especial:** El *Line Clear* (simple o múltiple) es ejecutado directamente mediante el encastre y fijado de un **tetromino multicolor**.
2. **Línea Especial Homogénea:** Se completa y limpia una fila que está **100% compuesta por bloques multicolores** (previamente consolidados de figuras especiales), independientemente de la pieza de cierre.

### Restricción / Invariante:
* Queda expresamente **bloqueado** el disparo de *Garbage Attack* si el evento de *Line Clear* es detonado por un **tetromino normal/estándar** sobre una fila heterogénea (que contenga uno o más bloques multicolores mezclados con bloques estándar).

---

## 7. Justificación de Game Design & Gameplay Flow
* **Pacing y Fluidez:** Evita el acoso constante o "spam" desproporcionado de líneas basura simplemente por acumular bloques especiales fragmentados en la matriz.
* **Profundidad Estratégica:** Obliga al jugador a ejecutar jugadas calculadas (usar activamente el tetromino multicolor para rematar o construir pacientemente una línea puramente especial) en lugar de beneficiarse accidentalmente por un despeje básico.