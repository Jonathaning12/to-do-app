import { useMemo, useState } from 'react';
import styles from './Calendar.module.css';
import PageHeader from '../components/PageHeader';
import CreateNote from '../components/CreateNote';
import Card from '../components/Card';
import Icon from '../components/Icon';
import { addDays, fromISODate, inkById, todayISO, toISODate } from '../state/model';
import { useNotes } from '../state/notesContext';
import { withTransition } from '../state/transition';

const monthName = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' });
const longDay = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long' });
const WEEKDAYS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
const MAX_CHIPS = 3;

function monthGrid(year, month) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // semana empieza en lunes
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(start, i);
    return { iso: toISODate(date), day: date.getDate(), inMonth: date.getMonth() === month };
  });
}

export default function Calendar() {
  const { notes } = useNotes();
  const today = todayISO();
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selected, setSelected] = useState(today);

  const cells = useMemo(() => monthGrid(cursor.year, cursor.month), [cursor]);

  const byDay = useMemo(() => {
    const map = new Map();
    for (const note of notes) {
      if (!note.due) continue;
      if (!map.has(note.due)) map.set(note.due, []);
      map.get(note.due).push(note);
    }
    for (const list of map.values()) list.sort((a, b) => Number(a.done) - Number(b.done));
    return map;
  }, [notes]);

  const undated = notes.filter((n) => !n.due && !n.done).length;
  const selectedNotes = byDay.get(selected) ?? [];

  const shiftMonth = (delta) =>
    setCursor(({ year, month }) => {
      const d = new Date(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const goToday = () => {
    const d = new Date();
    setCursor({ year: d.getFullYear(), month: d.getMonth() });
    setSelected(today);
  };

  return (
    <>
      <PageHeader title="Calendario" description="Cada nota con fecha límite aparece en su día. Elige un día para ver o añadir notas.">
        <div className={styles.nav}>
          <button type="button" className={styles.navBtn} onClick={() => shiftMonth(-1)} aria-label="Mes anterior">
            <Icon name="chevronLeft" size={18} />
          </button>
          <h2 className={styles.month} aria-live="polite">
            {monthName.format(new Date(cursor.year, cursor.month, 1))}
          </h2>
          <button type="button" className={styles.navBtn} onClick={() => shiftMonth(1)} aria-label="Mes siguiente">
            <Icon name="chevronRight" size={18} />
          </button>
          <button type="button" className={styles.todayBtn} onClick={goToday}>
            Hoy
          </button>
        </div>
      </PageHeader>

      <div className={styles.layout}>
        <div className={styles.calendar}>
          <div className={styles.weekdays} aria-hidden="true">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className={styles.grid} role="grid" aria-label="Días del mes">
            {cells.map((cell) => {
              const list = byDay.get(cell.iso) ?? [];
              const extra = list.length - MAX_CHIPS;
              const isSelected = cell.iso === selected;
              return (
                <button
                  key={cell.iso}
                  type="button"
                  role="gridcell"
                  aria-selected={isSelected}
                  aria-label={`${longDay.format(fromISODate(cell.iso))}, ${list.length} ${list.length === 1 ? 'nota' : 'notas'}`}
                  className={[
                    styles.cell,
                    !cell.inMonth && styles.outside,
                    cell.iso === today && styles.today,
                    isSelected && styles.selected,
                    cell.iso < today && styles.past,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => withTransition(() => setSelected(cell.iso))}
                >
                  <span className={styles.dayNum}>{cell.day}</span>
                  <span className={styles.chips}>
                    {list.slice(0, MAX_CHIPS).map((note) => {
                      const ink = inkById(note.ink);
                      return (
                        <span
                          key={note.id}
                          className={`${styles.chip} ${note.done ? styles.chipDone : ''}`}
                          style={{ '--tint': ink.tint, '--dot': ink.dot, '--tone': ink.text }}
                        >
                          {note.title || 'Sin título'}
                        </span>
                      );
                    })}
                    {extra > 0 && <span className={styles.more}>+{extra} más</span>}
                  </span>
                </button>
              );
            })}
          </div>
          {undated > 0 && (
            <p className={styles.undated}>
              {undated} {undated === 1 ? 'nota pendiente no tiene' : 'notas pendientes no tienen'} fecha y no aparecen aquí.
            </p>
          )}
        </div>

        <aside className={styles.side} aria-labelledby="day-title">
          <h2 id="day-title" className={styles.dayTitle}>
            {selected === today ? 'Hoy, ' : ''}
            {longDay.format(fromISODate(selected))}
          </h2>
          <CreateNote key={selected} defaultDue={selected} />
          {selectedNotes.length === 0 ? (
            <p className={styles.noNotes}>No hay notas para este día.</p>
          ) : (
            <div className={styles.dayList}>
              {selectedNotes.map((note) => (
                <Card key={note.id} note={note} index={notes.indexOf(note)} />
              ))}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
