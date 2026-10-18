import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      {/*Barra de búsqueda*/}
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

      {/*Filtros centrales */}
      <div className={styles.filterGroup}>
        <button type="button" className={`${styles.filterBtn} ${styles.active}`}>Todas</button>
        <button type="button" className={styles.filterBtn}>Pendientes</button>
        <button type="button" className={styles.filterBtn}>Hechas</button>
      </div>

      {/* Acciones de usuario: Notificaciones y Perfil */}
      <div className={styles.userActions}>
        <button type="button" className={styles.iconBtn} aria-label="Notificaciones">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
         viewBox="0 0 24 24" fill="none" stroke="currentColor" 
         strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
         className="icon icon-tabler icons-tabler-outline icon-tabler-bell">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
        </button>

        {/* Boton Disparador del menú de perfil */}
        <button 
          type="button" 
          className={styles.profileBtn} 
          popoverTarget="menu-perfil"
          aria-label="Menú de usuario"
        > 
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1" strokeLinecap="round" 
          strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </button>

        {/*Panel desplegable */}
        <div id="menu-perfil" popover="auto" className={styles.profileDropdown}>
          <div className={styles.menuHeader}>
            <p className={styles.userName}>Cuenta de usuario</p>
            <span className={styles.userSub}>Acceso rápido</span>
          </div>
          
          <hr className={styles.divider} />

          <nav className={styles.menuNav}>
            <NavLink 
              to="/login" 
              className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>Iniciar sesión</span>
            </NavLink>

            <NavLink 
              to="/register" 
              className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              <span>Registrarse</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  ) ;
}