import { useMemo } from 'react';
import styles from './Filters.module.css';
import { INKS } from '../state/model';
import { useNotes } from '../state/notesContext';

// Filtros de la barra lateral: etiquetas reales de las notas y tintas.
export default function SearchFilters() {
  const { notes, filters, setTag, setInk } = useNotes();

  const tags = useMemo(() => {
    const counts = new Map();
    for (const note of notes) {
      if (note.tag) counts.set(note.tag, (counts.get(note.tag) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 10);
  }, [notes]);

  const inkCounts = useMemo(() => {
    const counts = {};
    for (const note of notes) counts[note.ink] = (counts[note.ink] ?? 0) + 1;
    return counts;
  }, [notes]);

  return (
    <div className={styles.filtersSection}>
      <section className={styles.group} aria-labelledby="filter-tags">
        <div className={styles.groupHead}>
          <h2 id="filter-tags" className={styles.sectionTitle}>Etiquetas</h2>
          {filters.tag && (
            <button type="button" className={styles.clear} onClick={() => setTag(null)}>
              Quitar
            </button>
          )}
        </div>
        {tags.length === 0 ? (
          <p className={styles.hint}>Escribe #etiqueta en una nota para agruparla aquí.</p>
        ) : (
          <ul className={styles.tagList}>
            {tags.map(([tag, count]) => {
              const active = filters.tag === tag;
              return (
                <li key={tag}>
                  <button
                    type="button"
                    className={`${styles.tagBtn} ${active ? styles.activeTag : ''}`}
                    aria-pressed={active}
                    onClick={() => setTag(active ? null : tag)}
                  >
                    <span className={styles.hash} aria-hidden="true">#</span>
                    <span className={styles.tagName}>{tag}</span>
                    <span className={styles.tagCount}>{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className={styles.group} aria-labelledby="filter-inks">
        <div className={styles.groupHead}>
          <h2 id="filter-inks" className={styles.sectionTitle}>Colores</h2>
          {filters.ink && (
            <button type="button" className={styles.clear} onClick={() => setInk(null)}>
              Quitar
            </button>
          )}
        </div>
        <div className={styles.colorPalette}>
          {INKS.map((ink) => {
            const active = filters.ink === ink.id;
            return (
              <button
                key={ink.id}
                type="button"
                className={`${styles.colorDot} ${active ? styles.activeColor : ''}`}
                style={{ '--dot': ink.dot }}
                aria-pressed={active}
                aria-label={`Filtrar por color ${ink.label} (${inkCounts[ink.id] ?? 0})`}
                title={`${ink.label} · ${inkCounts[ink.id] ?? 0}`}
                onClick={() => setInk(active ? null : ink.id)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
