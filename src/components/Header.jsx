import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Icon from './Icon';
import { useNotes } from '../state/notesContext';

const categoryForPath = { '/work': 'trabajo', '/live': 'vida' };

export default function Header({ onMenu, menuOpen }) {
  const { filters, setQuery, addNote, openEditor, user, setUser } = useNotes();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const newNote = () => {
    // Sin animación propia: la transición del editor ya presenta la nota nueva.
    const note = addNote({ category: categoryForPath[pathname] ?? 'personal' }, { animate: false });
    openEditor(note.id);
  };

  const closeMenu = () => document.getElementById('menu-perfil')?.hidePopover?.();

  const go = (to) => {
    closeMenu();
    navigate(to);
  };

  const logout = () => {
    closeMenu();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={onMenu}
        aria-label="Abrir navegación"
        aria-expanded={menuOpen}
        aria-controls="app-sidebar"
      >
        <Icon name="menu" size={20} />
      </button>

      <div className={styles.searchContainer} role="search">
        <Icon name="search" size={17} className={styles.searchIcon} />
        <label htmlFor="global-search" className="visually-hidden">
          Buscar notas
        </label>
        <input
          id="global-search"
          type="search"
          placeholder="Buscar notas"
          className={styles.searchInput}
          value={filters.query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setQuery('');
              e.currentTarget.blur();
            }
          }}
          autoComplete="off"
        />
        {!filters.query && (
          <kbd className={styles.kbd} aria-hidden="true">
            /
          </kbd>
        )}
      </div>

      <div className={styles.userActions}>
        <button type="button" className={styles.newBtn} onClick={newNote}>
          <Icon name="plus" size={17} strokeWidth={2.2} />
          <span>Nueva nota</span>
        </button>

        <button type="button" className={styles.profileBtn} popoverTarget="menu-perfil" aria-label="Menú de cuenta">
          {user ? (
            <span className={styles.initial}>{user.name.charAt(0).toUpperCase()}</span>
          ) : (
            <Icon name="user" size={19} />
          )}
        </button>

        <div id="menu-perfil" popover="auto" className={styles.profileDropdown}>
          <div className={styles.menuHeader}>
            <p className={styles.userName}>{user ? user.name : 'Sin sesión'}</p>
            <span className={styles.userSub}>
              {user ? user.email : 'Tus notas se guardan en este navegador'}
            </span>
          </div>
          <div className={styles.menuNav}>
            {user ? (
              <button type="button" className={styles.menuItem} onClick={logout}>
                <Icon name="logout" size={17} />
                <span>Cerrar sesión</span>
              </button>
            ) : (
              <>
                <button type="button" className={styles.menuItem} onClick={() => go('/login')}>
                  <Icon name="login" size={17} />
                  <span>Iniciar sesión</span>
                </button>
                <button type="button" className={styles.menuItem} onClick={() => go('/register')}>
                  <Icon name="userPlus" size={17} />
                  <span>Crear cuenta</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
