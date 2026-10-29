import { useLayoutEffect, useRef, useState } from 'react';
import styles from './NoteEditor.module.css';
import Icon from './Icon';
import { CATEGORIES, INKS, inkById, uid } from '../state/model';
import { useNotes } from '../state/notesContext';
import { noteTransitionName } from '../state/transition';

const isEmpty = (note) => !note.title.trim() && !note.body.trim() && note.tasks.length === 0;

export default function NoteEditor() {
  const { notes, editingId, closeEditor } = useNotes();
  const dialogRef = useRef(null);
  const note = notes.find((n) => n.id === editingId) ?? null;

  // Abrir y cerrar en layout effect: así ocurre dentro de la View Transition
  // y la ficha se transforma en la hoja (y de vuelta).
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (note && !dialog.open) dialog.showModal();
    if (!note && dialog.open) dialog.close();
  }, [note]);

  // Una nota que se abrió y se cerró sin escribir nada no deja rastro.
  const requestClose = () => closeEditor(note && isEmpty(note) ? note.id : null);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="editor-title"
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      {note && <EditorBody key={note.id} note={note} onDone={requestClose} />}
    </dialog>
  );
}

function EditorBody({ note, onDone }) {
  const { updateNote, removeNote, notes } = useNotes();
  const [newTask, setNewTask] = useState('');
  const ink = inkById(note.ink);
  const set = (changes) => updateNote(note.id, changes);

  const setTask = (taskId, changes) =>
    set({ tasks: note.tasks.map((t) => (t.id === taskId ? { ...t, ...changes } : t)) });

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    set({ tasks: [...note.tasks, { id: uid(), text, done: false }], done: false });
    setNewTask('');
  };

  return (
    <form
      method="dialog"
      className={styles.panel}
      style={{ '--tint': ink.tint, '--dot': ink.dot, '--tone': ink.text, viewTransitionName: noteTransitionName(note.id) }}
      onSubmit={(e) => {
        e.preventDefault();
        onDone();
      }}
    >
      <div className={styles.sheet}>
        <div className={styles.topRow}>
          <fieldset className={styles.inks}>
            <legend className="visually-hidden">Color</legend>
            {INKS.map((option) => (
              <label key={option.id} className={styles.inkOption} title={option.label}>
                <input
                  type="radio"
                  name="editor-ink"
                  checked={note.ink === option.id}
                  onChange={() => set({ ink: option.id })}
                />
                <span style={{ background: option.dot }} />
                <span className="visually-hidden">{option.label}</span>
              </label>
            ))}
          </fieldset>
          <button type="button" className={styles.close} onClick={onDone} aria-label="Cerrar editor">
            <Icon name="x" size={16} strokeWidth={2.2} />
          </button>
        </div>

        <label htmlFor="editor-title" className="visually-hidden">
          Título
        </label>
        <input
          id="editor-title"
          className={styles.title}
          value={note.title}
          placeholder="Título"
          onChange={(e) => set({ title: e.target.value })}
          autoFocus={!note.title}
          autoComplete="off"
        />

        <label htmlFor="editor-body" className="visually-hidden">
          Contenido
        </label>
        <textarea
          id="editor-body"
          className={styles.body}
          value={note.body}
          placeholder="Notas"
          rows={3}
          onChange={(e) => set({ body: e.target.value })}
        />

        <div className={styles.tasks}>
          <h3 className={styles.tasksTitle}>
            Tareas
            {note.tasks.length > 0 && (
              <span>
                {note.tasks.filter((t) => t.done).length} de {note.tasks.length}
              </span>
            )}
          </h3>
          <ul>
            {note.tasks.map((task) => (
              <li key={task.id} className={styles.taskRow}>
                <label className={styles.check}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => {
                      const tasks = note.tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t));
                      set({ tasks, done: tasks.every((t) => t.done) });
                    }}
                  />
                  <span aria-hidden="true">
                    <Icon name="check" size={12} strokeWidth={3.2} />
                  </span>
                  <span className="visually-hidden">Completada</span>
                </label>
                <input
                  className={`${styles.taskText} ${task.done ? styles.taskDone : ''}`}
                  value={task.text}
                  aria-label="Texto de la tarea"
                  onChange={(e) => setTask(task.id, { text: e.target.value })}
                />
                <button
                  type="button"
                  className={styles.taskRemove}
                  onClick={() => set({ tasks: note.tasks.filter((t) => t.id !== task.id) })}
                  aria-label={`Quitar tarea ${task.text}`}
                >
                  <Icon name="x" size={14} strokeWidth={2.2} />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.addTask}>
            <span className={styles.addIcon} aria-hidden="true">
              <Icon name="plus" size={14} strokeWidth={2.4} />
            </span>
            <input
              value={newTask}
              placeholder="Nueva tarea"
              aria-label="Nueva tarea"
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTask();
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.props}>
        <label className={styles.prop}>
          <span>Categoría</span>
          <select value={note.category} onChange={(e) => set({ category: e.target.value })}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.prop}>
          <span>Etiqueta</span>
          <input
            value={note.tag}
            placeholder="Ninguna"
            onChange={(e) => set({ tag: e.target.value.replace(/^#/, '').replace(/\s+/g, '') })}
          />
        </label>
        <label className={styles.prop}>
          <span>Fecha límite</span>
          <input type="date" value={note.due ?? ''} onChange={(e) => set({ due: e.target.value || null })} />
        </label>
        <div className={styles.toggles}>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={note.priority === 'alta'}
            onClick={() => set({ priority: note.priority === 'alta' ? 'normal' : 'alta' })}
          >
            <Icon name="flag" size={15} /> Prioridad alta
          </button>
          <button type="button" className={styles.toggle} aria-pressed={note.pinned} onClick={() => set({ pinned: !note.pinned })}>
            <Icon name="pin" size={15} /> Fijada
          </button>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={note.done}
            onClick={() =>
              set(note.done ? { done: false } : { done: true, tasks: note.tasks.map((t) => ({ ...t, done: true })) })
            }
          >
            <Icon name="check" size={15} /> Completada
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.delete} onClick={() => removeNote(note, notes.indexOf(note))}>
          <Icon name="trash" size={15} /> Eliminar
        </button>
        <span className={styles.saved}>Se guarda automáticamente</span>
        <button type="submit" className={styles.doneBtn}>
          Listo
        </button>
      </div>
    </form>
  );
}
