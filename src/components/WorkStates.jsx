import { useMemo } from 'react';
import styles from './WorkStates.module.css';
import { addDays, inkById, isOverdue, toISODate } from '../state/model';
import { useNotes } from '../state/notesContext';

const dayName = new Intl.DateTimeFormat('es', { weekday: 'short' });

// La semana de trabajo como una franja de días: cada entrega es su ficha de color.
export default function WorkStates() {
  const { notes, openEditor } = useNotes();

  const { days, overdue, taskDone, taskTotal } = useMemo(() => {
    const work = notes.filter((n) => n.category === 'trabajo');
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(today, i);
      const iso = toISODate(date);
      return {
        iso,
        label: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : dayName.format(date).replace('.', ''),
        num: date.getDate(),
        weekend: date.getDay() === 0 || date.getDay() === 6,
        notes: work.filter((n) => !n.done && n.due === iso),
      };
    });
    const tasks = work.flatMap((n) => n.tasks);
    return {
      days,
      overdue: work.filter(isOverdue),
      taskDone: tasks.filter((t) => t.done).length,
      taskTotal: tasks.length,
    };
  }, [notes]);

  const pct = taskTotal ? Math.round((taskDone / taskTotal) * 100) : 0;

  return (
    <section className={styles.week} aria-labelledby="week-title">
      <div className={styles.head}>
        <h2 id="week-title">Próximos 7 días</h2>
        <p className={styles.summary}>
          <span>
            <b>{taskDone}</b> de {taskTotal} tareas completas ({pct}%)
          </span>
          <span className={styles.meter} aria-hidden="true">
            <span style={{ transform: `scaleX(${taskTotal ? taskDone / taskTotal : 0})` }} />
          </span>
        </p>
      </div>

      <ol className={styles.days}>
        {overdue.length > 0 && (
          <li className={`${styles.day} ${styles.overdue}`}>
            <span className={styles.dayLabel}>Atrasadas</span>
            <span className={styles.dayNum}>{overdue.length}</span>
            <Chips notes={overdue} onOpen={openEditor} />
          </li>
        )}
        {days.map((day, i) => (
          <li key={day.iso} className={`${styles.day} ${i === 0 ? styles.today : ''} ${day.weekend ? styles.weekend : ''}`}>
            <span className={styles.dayLabel}>{day.label}</span>
            <span className={styles.dayNum}>{day.num}</span>
            {day.notes.length > 0 ? (
              <Chips notes={day.notes} onOpen={openEditor} />
            ) : (
              <span className={styles.free}>Libre</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Chips({ notes, onOpen }) {
  return (
    <ul className={styles.chips}>
      {notes.map((note) => {
        const ink = inkById(note.ink);
        return (
          <li key={note.id}>
            <button
              type="button"
              className={styles.chip}
              style={{ '--tint': ink.tint, '--dot': ink.dot, '--tone': ink.text }}
              onClick={() => onOpen(note.id)}
              title={note.title}
            >
              {note.title || 'Sin título'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
