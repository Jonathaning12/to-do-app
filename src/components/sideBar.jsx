import { useMemo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import SearchFilters from './Filters';
import BrandMark from './BrandMark';
import Icon from './Icon';
import { useNotes } from '../state/notesContext';

const links = [
  { to: '/home', label: 'Todas las notas', icon: 'notes', category: null },
  { to: '/work', label: 'Área de trabajo', icon: 'work', category: 'trabajo' },
  { to: '/live', label: 'Vida cotidiana', icon: 'live', category: 'vida' },
  { to: '/calendar', label: 'Calendario', icon: 'calendar', category: 'calendar' },
];

export default function SideBar({ open, onNavigate }) {
  const { notes, user, setUser } = useNotes();
  const navigate = useNavigate();

  const pendingBy = useMemo(() => {
    const pending = notes.filter((n) => !n.done);
    return {
      all: pending.length,
      trabajo: pending.filter((n) => n.category === 'trabajo').length,
      vida: pending.filter((n) => n.category === 'vida').length,
      calendar: pending.filter((n) => n.due).length,
    };
  }, [notes]);

  const logout = () => {
    setUser(null);
    onNavigate?.();
    navigate('/login');
  };

  return (
    <aside id="app-sidebar" className={`${styles.sidebar} ${open ? styles.open : ''}`} aria-label="Navegación principal">
      <Link to="/home" className={styles.brand} onClick={onNavigate}>
        <BrandMark />
        <span>NoteOne</span>
      </Link>

      <nav aria-label="Secciones">
        <ul className={styles.navList}>
          {links.map((link) => {
            const count = link.category ? pendingBy[link.category] : pendingBy.all;
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={onNavigate}
                  viewTransition
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {/* La pastilla de selección se desliza entre secciones (View Transition) */}
                  <span className={styles.pill} aria-hidden="true" />
                  <Icon name={link.icon} size={18} />
                  <span className={styles.navLabel}>{link.label}</span>
                  {count > 0 && (
                    <span className={styles.count} aria-label={`${count} pendientes`}>
                      {count}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <SearchFilters />

      <div className={styles.account}>
        {user ? (
          <>
            <span className={styles.avatar} aria-hidden="true">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div className={styles.accountText}>
              <span className={styles.accountName}>{user.name}</span>
              <span className={styles.accountMail}>{user.email}</span>
            </div>
            <button type="button" className={styles.accountBtn} onClick={logout} aria-label="Cerrar sesión" title="Cerrar sesión">
              <Icon name="logout" size={18} />
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.signIn} onClick={onNavigate}>
            <Icon name="login" size={18} />
            <span>Iniciar sesión</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
