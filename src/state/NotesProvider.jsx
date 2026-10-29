import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { NotesContext, STORAGE_KEY, readUser, writeUser } from './notesContext';
import { createNote, uid } from './model';
import { withTransition } from './transition';
import { seedNotes } from './seed';

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch {
    // Datos corruptos o almacenamiento bloqueado: empezamos con el ejemplo.
  }
  return seedNotes();
}

const touch = (note, changes) => ({ ...note, ...changes, updatedAt: new Date().toISOString() });

function reducer(notes, action) {
  switch (action.type) {
    case 'add':
      return [action.note, ...notes];
    case 'update':
      return notes.map((n) => (n.id === action.id ? touch(n, action.changes) : n));
    case 'toggleTask':
      return notes.map((n) => {
        if (n.id !== action.id) return n;
        const tasks = n.tasks.map((t) => (t.id === action.taskId ? { ...t, done: !t.done } : t));
        // Una nota con lista se marca hecha sola cuando se completan todas sus tareas.
        const done = tasks.length > 0 && tasks.every((t) => t.done);
        return touch(n, { tasks, done });
      });
    case 'toggleDone':
      return notes.map((n) => {
        if (n.id !== action.id) return n;
        const done = !n.done;
        const tasks = done ? n.tasks.map((t) => ({ ...t, done: true })) : n.tasks;
        return touch(n, { done, tasks });
      });
    case 'remove':
      return notes.filter((n) => n.id !== action.id);
    case 'restore': {
      const next = [...notes];
      next.splice(Math.min(action.index, next.length), 0, action.note);
      return next;
    }
    default:
      return notes;
  }
}

export default function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(reducer, undefined, loadNotes);
  const [user, setUserState] = useState(readUser);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('todas'); // todas | pendientes | hechas
  const [tag, setTag] = useState(null);
  const [ink, setInk] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Sin almacenamiento persistente: la app sigue funcionando en memoria.
    }
  }, [notes]);

  const showToast = useCallback((next) => {
    clearTimeout(toastTimer.current);
    setToast({ ...next, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 7000);
  }, []);

  const dismissToast = useCallback(() => {
    clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  // Los cambios que mueven notas de lugar van dentro de una View Transition.
  const actions = useMemo(
    () => ({
      addNote: (fields, { animate = true } = {}) => {
        const note = createNote(fields);
        if (animate) withTransition(() => dispatch({ type: 'add', note }));
        else dispatch({ type: 'add', note });
        return note;
      },
      updateNote: (id, changes) => dispatch({ type: 'update', id, changes }),
      toggleTask: (id, taskId) => withTransition(() => dispatch({ type: 'toggleTask', id, taskId })),
      toggleDone: (id) => withTransition(() => dispatch({ type: 'toggleDone', id })),
      togglePin: (note) =>
        withTransition(() => dispatch({ type: 'update', id: note.id, changes: { pinned: !note.pinned } })),
      duplicateNote: (note) => {
        const fresh = createNote();
        const copy = {
          ...note,
          id: fresh.id,
          title: `${note.title} (copia)`,
          pinned: false,
          tasks: note.tasks.map((t) => ({ ...t, id: uid() })),
          createdAt: fresh.createdAt,
          updatedAt: fresh.updatedAt,
        };
        withTransition(() => dispatch({ type: 'add', note: copy }));
      },
      removeNote: (note, index) => {
        withTransition(() => {
          dispatch({ type: 'remove', id: note.id });
          setEditingId((current) => (current === note.id ? null : current));
        });
        showToast({
          message: `Nota «${note.title || 'sin título'}» eliminada`,
          undo: () => withTransition(() => dispatch({ type: 'restore', note, index })),
        });
      },
      openEditor: (id) => withTransition(() => setEditingId(id)),
      // Cerrar el editor: la hoja vuelve a su ficha. Una nota vacía se descarta en el mismo gesto.
      closeEditor: (discardId = null) =>
        withTransition(() => {
          if (discardId) dispatch({ type: 'remove', id: discardId });
          setEditingId(null);
        }),
      setStatus: (value) => withTransition(() => setStatus(value)),
      setTag: (value) => withTransition(() => setTag(value)),
      setInk: (value) => withTransition(() => setInk(value)),
    }),
    [showToast],
  );

  const setUser = useCallback((next) => {
    writeUser(next);
    setUserState(next);
  }, []);

  const value = useMemo(
    () => ({
      notes,
      ...actions,
      user,
      setUser,
      filters: { query, status, tag, ink },
      setQuery,
      editingId,
      toast,
      dismissToast,
    }),
    [notes, actions, user, setUser, query, status, tag, ink, editingId, toast, dismissToast],
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
