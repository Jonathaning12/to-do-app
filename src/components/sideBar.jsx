
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';

const links = [
    { to: '/home', label: 'Todas las notas', icon: 'notes' },
    { to: '/login', label: 'Registrarse', icon: 'user' },
    { to: '/register', label: 'Crear cuenta', icon: 'add' },
];

function NavIcon({ name }) {
    if (name === 'user') {
        return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>;
    }

    if (name === 'add') {
        return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>;
    }

    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h10l4 4v11H5z" /><path d="M15 4.5v4h4M8 12h8M8 16h6" /></svg>;
}

export default function SideBar() {
    return (
        <aside className={styles.sidebar} aria-label="Main navigation">
            <NavLink to="/home" className={styles.brand} aria-label="NoteOne home">
                <span className={styles.brandMark} aria-hidden="true">N</span>
                <span>NoteOne</span>
            </NavLink>

            <div className={styles.sectionLabel}>TABLERO</div>
            <nav>
                <ul className={styles.navList}>
                    {links.map(({ to, label, icon }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                            >
                                <NavIcon name={icon} />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.sidebarNote}>
                <span className={styles.noteIcon} aria-hidden="true"></span>
                <p>cuadrito de prueba</p>
            </div>
        </aside>
    );
}