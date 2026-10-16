import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* 1. Barra de búsqueda con icono */}
      <div className={styles.searchContainer}>
        <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input 
          type="text" 
          placeholder="Buscar notas, pendientes, etiquetas..." 
          className={styles.searchInput} 
        />
      </div>

      {/* 2. Filtros centrales */}
      <div className={styles.filterGroup}>
        <button type="button" className={`${styles.filterBtn} ${styles.active}`}>Todas</button>
        <button type="button" className={styles.filterBtn}>Pendientes</button>
        <button type="button" className={styles.filterBtn}>Hechas</button>
      </div>

      {/* 3. Acciones de usuario: Notificaciones y Perfil */}
      <div className={styles.userActions}>
        <button type="button" className={styles.iconBtn} aria-label="Notificaciones">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
        </button>

        <div className={styles.profileAvatar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
        </div>
      </div>
    </header>
  );
}