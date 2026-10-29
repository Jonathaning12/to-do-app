import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './NoteBoard.module.css';
import Card from './Card';
import Icon from './Icon';
import { inkById, matchesQuery } from '../state/model';
import { useNotes } from '../state/notesContext';

const STATUSES = [
  { id: 'todas', label: 'Todas' },
  { id: 'pendientes', label: 'Pendientes' },
  { id: 'hechas', label: 'Hechas' },
];

// Orden: atrasadas y con fecha más cercana primero; las hechas al final.
const byUrgency = (a, b) => {
  if (a.done !== b.done) return a.done ? 1 : -1;
  if (a.due && b.due) return a.due.localeCompare(b.due);
  if (a.due || b.due) return a.due ? -1 : 1;
  return b.updatedAt.localeCompare(a.updatedAt);
};

export default function NoteBoard({ category = null, emptyTitle, emptyText }) {
  const { notes, filters, setStatus, setTag, setInk, setQuery } = useNotes();

  const scoped = useMemo(
    () => (category ? notes.filter((n) => n.category === category) : notes),
    [notes, category],
  );

  const counts = useMemo(
    () => ({
      todas: scoped.length,
      pendientes: scoped.filter((n) => !n.done).length,
      hechas: scoped.filter((n) => n.done).length,
    }),
    [scoped],
  );

  const visible = useMemo(
    () =>
      scoped
        .filter((n) => (filters.status === 'pendientes' ? !n.done : filters.status === 'hechas' ? n.done : true))
        .filter((n) => !filters.tag || n.tag === filters.tag)
        .filter((n) => !filters.ink || n.ink === filters.ink)
        .filter((n) => matchesQuery(n, filters.query))
        .sort(byUrgency),
    [scoped, filters],
  );

  const pinned = visible.filter((n) => n.pinned);
  const rest = visible.filter((n) => !n.pinned);
  const hasFilters = Boolean(filters.query || filters.tag || filters.ink || filters.status !== 'todas');

  const clearAll = () => {
    setQuery('');
    setTag(null);
    setInk(null);
    setStatus('todas');
  };

  const renderGrid = (list) => (
    <div className={styles.grid}>
      {list.map((note) => (
        <Card key={note.id} note={note} index={notes.indexOf(note)} />
      ))}
    </div>
  );

  return (
    <section className={styles.board} aria-label="Notas">
      <div className={styles.toolbar}>
        <Segmented value={filters.status} onChange={setStatus} counts={counts} />

        <div className={styles.chips}>
          {filters.query && (
            <button type="button" className={styles.chip} onClick={() => setQuery('')}>
              «{filters.query}» <Icon name="x" size={14} strokeWidth={2.2} />
              <span className="visually-hidden">Quitar búsqueda</span>
            </button>
          )}
          {filters.tag && (
            <button type="button" className={styles.chip} onClick={() => setTag(null)}>
              #{filters.tag} <Icon name="x" size={14} strokeWidth={2.2} />
              <span className="visually-hidden">Quitar etiqueta</span>
            </button>
          )}
          {filters.ink && (
            <button type="button" className={styles.chip} onClick={() => setInk(null)}>
              <span className={styles.chipInk} style={{ background: inkById(filters.ink).dot }} />
              {inkById(filters.ink).label} <Icon name="x" size={14} strokeWidth={2.2} />
              <span className="visually-hidden">Quitar tinta</span>
            </button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyArt} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          {hasFilters && scoped.length > 0 ? (
            <>
              <h2>Nada coincide con estos filtros</h2>
              <p>Prueba con otra palabra o quita algún filtro para ver el resto de tus notas.</p>
              <button type="button" className={styles.emptyBtn} onClick={clearAll}>
                Quitar filtros
              </button>
            </>
          ) : (
            <>
              <h2>{emptyTitle ?? 'Tu tablero está vacío'}</h2>
              <p>{emptyText ?? 'Escribe arriba tu primera nota. Pulsa N desde cualquier parte para empezar a escribir.'}</p>
              <button type="button" className={styles.emptyBtn} onClick={() => document.getElementById('quick-note')?.focus()}>
                Escribir una nota
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {pinned.length > 0 && (
            <div className={styles.group}>
              <h2 className={styles.groupTitle}>
                <Icon name="pin" size={16} /> Fijadas
              </h2>
              {renderGrid(pinned)}
            </div>
          )}
          {rest.length > 0 && (
            <div className={styles.group}>
              {pinned.length > 0 && <h2 className={styles.groupTitle}>El resto</h2>}
              {renderGrid(rest)}
            </div>
          )}
        </>
      )}
    </section>
  );
}

// Control segmentado: el indicador se desliza al segmento elegido con un resorte.
function Segmented({ value, onChange, counts }) {
  const refs = useRef({});
  const [thumb, setThumb] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[value];
      if (el) setThumb({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [value, counts]);

  return (
    <div className={styles.segmented} role="group" aria-label="Filtrar por estado">
      {thumb && (
        <span
          className={styles.thumb}
          aria-hidden="true"
          style={{ transform: `translateX(${thumb.x}px)`, width: thumb.w }}
        />
      )}
      {STATUSES.map((s) => (
        <button
          key={s.id}
          ref={(el) => {
            refs.current[s.id] = el;
          }}
          type="button"
          className={styles.segment}
          aria-pressed={value === s.id}
          onClick={() => onChange(s.id)}
        >
          {s.label}
          <span className={styles.segCount}>{counts[s.id]}</span>
        </button>
      ))}
    </div>
  );
}
