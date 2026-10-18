import styles from './WorkStates.module.css'

export default function WorkStates() {
    return (
    <div className={styles.statsContainer}>
      {/*Entregas esta semana */}
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <span className={styles.statTitleGroup}><svg xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 24 24" 
           fill="none" stroke="currentColor"
            strokeWidth="1" 
            strokeLinecap="round"
             strokeLinejoin="round" 
             className={`${styles.statIcon} icon icon-tabler icons-tabler-outline icon-tabler-clipboard-check`}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /><path d="M9 14l2 2l4 -4" />
            </svg> Entregas esta semana</span>
          <span className={`${styles.badge} ${styles.badgeOrange}`}>+3 hoy</span>
        </div>
        <div className={styles.statValueGroup}>
          <span className={styles.statNumber}>8</span>
          <span className={styles.statSub}>hitos clave</span>
        </div>
        {/* Barra de progreso */}
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: '60%', backgroundColor: '#d97706' }}></div>
        </div>
      </div>

      {/*Tareas completadas */}
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <span className={styles.statTitleGroup}><svg xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 24 24" 
          fill="none" stroke="currentColor"
           strokeWidth="1" strokeLinecap="round" 
           strokeLinejoin="round" 
           className={styles.statIcon}><path 
           stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" /><path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" /><path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" /><path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" /><path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" /><path d="M9 12l2 2l4 -4" /></svg>
           Tareas completadas</span>
          <span className={`${styles.badge} ${styles.badgeGreen}`}>Sprint Active</span>
        </div>
        <div className={styles.statValueGroup}>
          <span className={styles.statNumber}>12</span>
          <span className={styles.statPercentage}>(65%)</span>
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: '65%', backgroundColor: '#10b981' }}></div>
        </div>
      </div>

      {/*Pendientes críticos */}
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <span className={styles.statTitleGroup}>  
            <svg xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.statIcon}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                Pendientes críticos</span>
          <span className={`${styles.badge} ${styles.badgeRed}`}>Acción Inmediata</span>
        </div>
        <div className={styles.statValueGroup}>
          <span className={styles.statNumber}>2</span>
          <span className={styles.statSub}>bloqueos detectados</span>
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: '30%', backgroundColor: '#ef4444' }}></div>
        </div>
      </div>
    </div>
    )
}