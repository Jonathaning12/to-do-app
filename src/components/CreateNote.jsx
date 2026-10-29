import { useId, useLayoutEffect, useRef, useState } from 'react';
import styles from './CreateNote.module.css';
import Icon from './Icon';
import { CATEGORIES, INKS, inkById, parseQuickText } from '../state/model';
import { useNotes } from '../state/notesContext';

// El compositor ya es la ficha: toma la tinta elegida mientras escribes.
export default function CreateNote({ category = 'personal', lockCategory = false, defaultDue = null }) {
  const { addNote } = useNotes();
  const [text, setText] = useState('');
  const [ink, setInk] = useState('amarillo');
  const [cat, setCat] = useState(category);
  const [due, setDue] = useState(defaultDue ?? '');
  const [high, setHigh] = useState(false);
  const textRef = useRef(null);
  const id = useId();
  const color = inkById(ink);
  const canSubmit = text.trim().length > 0;

  // Crece con el texto, sin barra de desplazamiento interna.
  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = '';
    // Vacío no se mide: el placeholder envuelto inflaría la altura.
    if (text) el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  const submit = (e) => {
    e?.preventDefault();
    if (!canSubmit) {
      textRef.current?.focus();
      return;
    }
    const parsed = parseQuickText(text);
    addNote({
      ...parsed,
      title: parsed.title || parsed.tasks[0]?.text || 'Nota rápida',
      ink,
      category: lockCategory ? category : cat,
      due: due || null,
      priority: high ? 'alta' : 'normal',
    });
    setText('');
    setDue(defaultDue ?? '');
    setHigh(false);
    // La siguiente nota toma la tinta siguiente: el tablero se mantiene variado sin pensarlo.
    setInk(INKS[(INKS.findIndex((i) => i.id === ink) + 1) % INKS.length].id);
    textRef.current?.focus();
  };

  return (
    <form
      className={styles.createNoteCard}
      style={{ '--tint': color.tint, '--dot': color.dot, '--tone': color.text }}
      onSubmit={submit}
      aria-label="Nueva nota rápida"
    >
      <label htmlFor="quick-note" className="visually-hidden">
        Nota rápida
      </label>
      <textarea
        id="quick-note"
        ref={textRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) submit(e);
          if (e.key === 'Escape') e.currentTarget.blur();
        }}
        placeholder="Nueva nota"
        className={styles.noteInput}
        aria-describedby={`${id}-hint`}
      />
      <p id={`${id}-hint`} className={styles.hint}>
        <span>
          <kbd>Enter</kbd> para guardar · <kbd>⇧ Enter</kbd> nueva línea · <b>- texto</b> crea una tarea · <b>#etiqueta</b> agrupa
        </span>
      </p>

      <div className={styles.toolbar}>
        <fieldset className={styles.inks}>
          <legend className="visually-hidden">Tinta</legend>
          {INKS.map((option) => (
            <label key={option.id} className={styles.inkOption} title={option.label}>
              <input
                type="radio"
                name={`${id}-ink`}
                value={option.id}
                checked={ink === option.id}
                onChange={() => setInk(option.id)}
              />
              <span style={{ background: option.dot, color: option.dot }} />
              <span className="visually-hidden">{option.label}</span>
            </label>
          ))}
        </fieldset>

        <div className={styles.actionsGroup}>
          {!lockCategory && (
            <label className={styles.field}>
              <span className="visually-hidden">Categoría</span>
              <select value={cat} onChange={(e) => setCat(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className={styles.field}>
            <Icon name="calendar" size={16} />
            <span className="visually-hidden">Fecha límite</span>
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          </label>

          <button
            type="button"
            className={`${styles.priorityBtn} ${high ? styles.on : ''}`}
            aria-pressed={high}
            onClick={() => setHigh((v) => !v)}
          >
            <Icon name="flag" size={16} />
            <span>{high ? 'Prioridad alta' : 'Prioridad'}</span>
          </button>

          <button type="submit" className={styles.addBtn} disabled={!canSubmit}>
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </form>
  );
}
