import styles from './Card.module.css';

export default function Card({ 
  status = 'En progreso', 
  statusType = 'warning', // 'warning', 'success', 'purple'
  title = 'Revisar propuesta de diseño para cliente Acme',
  tasks = [
    { id: 1, text: 'Wireframes aprobados', completed: true },
    { id: 2, text: 'Exportar assets a Figma', completed: false },
    { id: 3, text: 'Preparar demo interactiva', completed: false }
  ],
  tag = 'Trabajo',
  time = 'Hoy, 18:00',
  bgColor = '#fef3c7' 
}) {
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <div className={styles.cardHeader}>
        <span className={`${styles.statusBadge} ${styles[statusType]}`}>
          📌 {status}
        </span>
        
        <div className={styles.actions}>
          <button type="button" className={styles.iconBtn} aria-label="Editar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Opciones">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>
      </div>

      {/*Cuerpo: Título y Lista de tareas */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        
        {tasks && tasks.length > 0 && (
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li key={task.id} className={styles.taskItem}>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  readOnly 
                  className={styles.checkbox}
                />
                <span className={task.completed ? styles.completedTask : ''}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pie de la Card: Tags y Tiempo */}
      <div className={styles.cardFooter}>
        <span className={styles.tag}>#{tag}</span>
        <span className={styles.timeText}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.timeIcon}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12h3.5" /><path d="M12 7v5" /></svg> {time}</span>
      </div>
    </div>
  );
}