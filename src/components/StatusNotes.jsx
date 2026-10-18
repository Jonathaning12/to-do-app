import styles from './Status.module.css';

export default function Status() {

         return(
            <>
            <div className={styles.pageHeader}>
                <div className={styles.headerTitles}>
                <span className={styles.badgeCategory}>TABLERO PERSONAL</span>
                <h1>Todas las Notas</h1>
                <p>Captura pensamientos, listas y pendientes con textura de papel y flujo natural.</p>
                </div>
                {/* Contenedor derecho: Cápsulas / Badges de estado */}
                <div className={styles.statusBadges}>
                <div className={`${styles.badge} ${styles.badgeActive}`}>
                    <span className={styles.badgeDot}></span>
                    <span>14 Activas</span>
                </div>
                <div className={`${styles.badge} ${styles.badgeDone}`}>
                    <span className={styles.badgeDot}></span>
                    <span>8 Hechas</span>
                </div>
                <div className={`${styles.badge} ${styles.badgeWarning}`}>
                    <span className={styles.badgeDot}></span>
                    <span>3 Por vencer hoy</span>
                </div>
                </div>
            </div>
            </>
         )
}