import { flushSync } from 'react-dom';

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Aplica un cambio de estado dentro de una View Transition: las notas se deslizan
// de su posición actual a la nueva en vez de saltar. Sin soporte, el cambio es inmediato.
export function withTransition(update) {
  if (!document.startViewTransition || reduceMotion()) {
    update();
    return;
  }
  // Marca la transición como "de estado": solo se mueven las notas, no la página entera.
  const root = document.documentElement;
  root.dataset.vt = 'state';
  const transition = document.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => {
    if (root.dataset.vt === 'state') delete root.dataset.vt;
  });
}

// Nombre de transición estable para cada nota (debe empezar con letra).
export const noteTransitionName = (id) => `note-${id}`;
