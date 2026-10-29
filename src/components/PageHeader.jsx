import { useMemo } from 'react';
import styles from './PageHeader.module.css';
import { isDueToday, isOverdue } from '../state/model';
import { useNotes } from '../state/notesContext';

// Título de página con el estado real de las notas, escrito como frase.
export default function PageHeader({ title, description, category = null, children }) {
  const { notes } = useNotes();

  const stats = useMemo(() => {
    const scoped = category ? notes.filter((n) => n.category === category) : notes;
    return {
      pending: scoped.filter((n) => !n.done).length,
      today: scoped.filter(isDueToday).length,
      late: scoped.filter(isOverdue).length,
      done: scoped.filter((n) => n.done).length,
    };
  }, [notes, category]);

  return (
    <div className={styles.pageHeader}>
      <div className={styles.titles}>
        <h1>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        <p className={styles.stats}>
          <span>
            <b>{stats.pending}</b> {stats.pending === 1 ? 'pendiente' : 'pendientes'}
          </span>
          {stats.today > 0 && (
            <span className={styles.today}>
              <b>{stats.today}</b> {stats.today === 1 ? 'vence hoy' : 'vencen hoy'}
            </span>
          )}
          {stats.late > 0 && (
            <span className={styles.late}>
              <b>{stats.late}</b> {stats.late === 1 ? 'atrasada' : 'atrasadas'}
            </span>
          )}
          <span>
            <b>{stats.done}</b> {stats.done === 1 ? 'hecha' : 'hechas'}
          </span>
        </p>
      </div>
      {children}
    </div>
  );
}
