import { useEffect, useRef, useState } from 'react';
import styles from './Card.module.css';
import Icon from './Icon';
import { describeDue, inkById, taskProgress } from '../state/model';
import { useNotes } from '../state/notesContext';
import { noteTransitionName } from '../state/transition';

const MAX_TASKS = 4;

export default function Card({ note, index }) {
  const { toggleTask, toggleDone, togglePin, duplicateNote, removeNote, openEditor, editingId } = useNotes();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const ink = inkById(note.ink);
  const due = note.done ? null : describeDue(note.due);
  const progress = taskProgress(note);
  const hidden = note.tasks.length - MAX_TASKS;
  // Mientras su hoja está abierta, la ficha cede su nombre de transición al editor.
  const transitionName = editingId === note.id ? 'none' : noteTransitionName(note.id);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      if (e.type === 'pointerdown' && menuRef.current?.contains(e.target)) return;
      setMenuOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [menuOpen]);

  const menuAction = (fn) => () => {
    setMenuOpen(false);
    fn();
  };

  return (
    <article
      className={`${styles.card} ${note.done ? styles.done : ''} ${menuOpen ? styles.raised : ''}`}
      style={{ '--tint': ink.tint, '--dot': ink.dot, '--tone': ink.text, viewTransitionName: transitionName }}
      aria-label={note.title || 'Nota sin título'}
    >
      <div className={styles.cardHeader}>
        <span className={styles.tag}>
          <span className={styles.tagDot} aria-hidden="true" />
          {note.tag || ink.label}
        </span>

        <div className={styles.actions} ref={menuRef}>
          {note.pinned && (
            <span className={styles.pinned} title="Fijada">
              <Icon name="pin" size={15} />
              <span className="visually-hidden">Fijada</span>
            </span>
          )}
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Opciones de la nota"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name="dots" size={17} strokeWidth={2.4} />
          </button>

          {menuOpen && (
            <div className={styles.menu} role="menu">
              <button type="button" role="menuitem" onClick={menuAction(() => openEditor(note.id))}>
                <Icon name="edit" size={15} /> Editar
              </button>
              <button type="button" role="menuitem" onClick={menuAction(() => togglePin(note))}>
                <Icon name="pin" size={15} /> {note.pinned ? 'Desfijar' : 'Fijar arriba'}
              </button>
              <button type="button" role="menuitem" onClick={menuAction(() => duplicateNote(note))}>
                <Icon name="copy" size={15} /> Duplicar
              </button>
              <span className={styles.menuSep} role="separator" />
              <button type="button" role="menuitem" className={styles.danger} onClick={menuAction(() => removeNote(note, index))}>
                <Icon name="trash" size={15} /> Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <button type="button" className={styles.titleBtn} onClick={() => openEditor(note.id)}>
            {note.title || <span className={styles.untitled}>Sin título</span>}
          </button>
        </h3>

        {note.body && <p className={styles.body}>{note.body}</p>}

        {note.tasks.length > 0 && (
          <ul className={styles.taskList}>
            {note.tasks.slice(0, MAX_TASKS).map((task) => (
              <li key={task.id}>
                <label className={styles.taskItem}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(note.id, task.id)}
                    className={styles.checkbox}
                  />
                  <span className={styles.box} aria-hidden="true">
                    <Icon name="check" size={11} strokeWidth={3.4} />
                  </span>
                  <span className={task.done ? styles.completedTask : ''}>{task.text}</span>
                </label>
              </li>
            ))}
            {hidden > 0 && (
              <li>
                <button type="button" className={styles.more} onClick={() => openEditor(note.id)}>
                  {hidden} {hidden === 1 ? 'tarea más' : 'tareas más'}
                </button>
              </li>
            )}
          </ul>
        )}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.meta}>
          {note.done && (
            <span className={styles.completed}>
              <Icon name="check" size={13} strokeWidth={2.6} /> Completada
            </span>
          )}
          {due && (
            <span className={`${styles.due} ${styles[due.tone]}`}>
              <Icon name={due.tone === 'late' ? 'alert' : 'clock'} size={13} strokeWidth={2} />
              {due.text}
            </span>
          )}
          {note.priority === 'alta' && !note.done && (
            <span className={styles.priority}>
              <Icon name="flag" size={13} strokeWidth={2} /> Alta
            </span>
          )}
          {progress.total > 0 && !note.done && (
            <span className={styles.progress} aria-label={`${progress.done} de ${progress.total} tareas`}>
              <svg viewBox="0 0 20 20" className={styles.ring} aria-hidden="true">
                <circle cx="10" cy="10" r="8" />
                <circle cx="10" cy="10" r="8" pathLength="100" style={{ strokeDashoffset: 100 - progress.ratio * 100 }} />
              </svg>
              {progress.done}/{progress.total}
            </span>
          )}
        </div>

        <button
          type="button"
          className={styles.doneBtn}
          onClick={() => toggleDone(note.id)}
          aria-pressed={note.done}
          aria-label={note.done ? 'Marcar como pendiente' : 'Marcar como completada'}
          title={note.done ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          <Icon name="check" size={15} strokeWidth={2.8} />
        </button>
      </div>
    </article>
  );
}
