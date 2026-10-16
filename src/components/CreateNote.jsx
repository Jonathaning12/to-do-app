import { useState } from 'react';
import styles from './CreateNote.module.css';

export default function CreateNote() {
  const [selectedColor, setSelectedColor] = useState('yellow');

  const paperColors = [
    { id: 'yellow', color: '#fef3c7' },
    { id: 'green', color: '#d1fae5' },
    { id: 'pink', color: '#fce7f3' },
    { id: 'blue', color: '#e0f2fe' },
  ];

  return (
    <div className={styles.createNoteCard}>
      {/* 1. Área de entrada de texto */}
      <div className={styles.inputSection}>
        <span className={styles.iconNote}>
            <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24" 
            fill="none" stroke="currentColor"
            strokeWidth="1" strokeLinecap="round" 
            strokeLinejoin="round" 
            className={styles.iconNote}>
            <path stroke="none" d="M0 0h24v24H0z" 
            fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path 
            d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" />
            <path d="M16 5l3 3" />
            </svg>
          </span>
        <input 
          type="text" 
          placeholder="Escribe una nota rápida o tarea pendiente... (Presiona Enter para pegar al tablero)" 
          className={styles.noteInput}
        />
      </div>

      {/* 2. Barra de herramientas inferior */}
      <div className={styles.toolbar}>
        {/* Selector de textura / color de papel */}
        <div className={styles.colorSelector}>
          <span className={styles.label}>Tono Papel:</span>
          <div className={styles.colorOptions}>
            {paperColors.map((paper) => (
              <button
                key={paper.id}
                type="button"
                className={`${styles.colorDot} ${selectedColor === paper.id ? styles.activeColor : ''}`}
                style={{ backgroundColor: paper.color }}
                onClick={() => setSelectedColor(paper.id)}
                aria-label={`Color ${paper.id}`}
              />
            ))}
          </div>
        </div>

        {/* Opciones de prioridad y botón de acción */}
        <div className={styles.actionsGroup}>
          <button type="button" className={styles.priorityBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <span>Normal</span>
          </button>

          <button type="button" className={styles.addBtn}>
            <span>+ Fijar Nota</span>
          </button>
        </div>
      </div>
    </div>
  );
}