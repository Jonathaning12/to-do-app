import { useState } from 'react';
import styles from './Filters.module.css';

export default function SearchFilters({onSelectTag, onSelectColor}) {
    const [activeTag, setActiveTag] = useState(null);
    const [activeColor, setActiveColor] = useState(null);

    const tags = [
        { id: 'urgente', label: 'Urgente', dotColor: '#ef4444', bgColor: '#fef2f2' },
        { id: 'ideas', label: 'Ideas', dotColor: '#f59e0b', bgColor: '#fffbeb' },
        { id: 'proyecto', label: 'Proyecto Q3', dotColor: '#3b82f6', bgColor: '#eff6ff' },
        { id: 'lecturas', label: 'Lecturas', dotColor: '#10b981', bgColor: '#ecfdf5' }
    ]

    const paperColors=[
        {id:'amarillo', color:'#fef3c7'},
        {id:'verde', color:'#d1fae5'},
        {id:'azul', color:'#e0f2fe'},
        {id:'rosado', color:'#fce7f3'},
    ]

    const handleTagClick=(tagId)=>{
        const nextTag = activeTag === tagId ? null : tagId;
        setActiveTag(nextTag);
        if(onSelectTag) onSelectTag(nextTag);
    }

    const handleColorClick=(colorId)=>{
        const nextColor = activeColor === colorId ? null : colorId;
        setActiveColor(nextColor);
        if(onSelectColor) onSelectColor(nextColor);
    }

    return(
        <div className={styles.filtersSection}>
            {/* Seccion de Etiquetas */}
            <div className={styles.group}>
                <span className={styles.sectionTitle}>Etiquetas</span>
            <div className={styles.tagList}>
                {tags.map((tag) => (
                    <button
                        key={tag.id}
                        type="button"
                        className={`${styles.tagBtn} ${activeTag === tag.id ? styles.activeTag : ''}`}
                        style={{ backgroundColor: activeTag === tag.id ? '#ffffff' : tag.bgColor }}
                        onClick={() => handleTagClick(tag.id)}
                        >
                        <span className={styles.tagDot} style={{ backgroundColor: tag.dotColor }} />
                        <span>
                            {tag.label}
                        </span>
                </button>
            ))}
            </div>
        </div>
            {/* Seccion de Filtrar por tonos */}
            <div className={styles.group}>
                <span className={styles.sectionTitle}>Filtrar por tonos</span>
                <div className={styles.colorPalette}>
                {paperColors.map((paper) => (
                <button
                    key={paper.id}
                    type="button"
                    className={`${styles.colorDot} ${activeColor === paper.id ? styles.activeColor : ''}`}
                    style={{ backgroundColor: paper.color }}
                    onClick={() => handleColorClick(paper.id)}
                    aria-label={`Filtrar por color ${paper.id}`}
               />
                ))}
                </div>
            </div>
        </div>
    )
}
   