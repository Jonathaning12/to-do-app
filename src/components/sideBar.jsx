
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';
import SearchFilters from './Filters';

const links = [
    { to: '/home', label: 'Todas las notas', icon: 'notes' },
    { to: '/work', label: 'Area de trabajo', icon: 'work' },
    { to: '/live', label: 'Vida Cotidiana', icon: 'live' },
    { to: '/calendar', label: 'Calendario', icon: 'calendar' },

];

function NavIcon({ name }) {
    if (name === 'live') {
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" 
        strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clover">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 10l-3.397 -3.44a2.104 2.104 0 0 1 0 -2.95a2.04 2.04 0 0 1 2.912 0l.485 .39l.485 -.39a2.04 2.04 0 0 1 2.912 0a2.104 2.104 0 0 1 0 2.95l-3.397 3.44" /><path 
            d="M12 14l-3.397 3.44a2.104 2.104 0 0 0 0 2.95a2.04 2.04 0 0 0 2.912 0l.485 -.39l.485 .39a2.04 2.04 0 0 0 2.912 0a2.104 2.104 0 0 0 0 -2.95l-3.397 -3.44" /><path
             d="M14 12l3.44 -3.397a2.104 2.104 0 0 1 2.95 0a2.04 2.04 0 0 1 0 2.912l-.39 .485l.39 .485a2.04 2.04 0 0 1 0 2.912a2.104 2.104 0 0 1 -2.95 0l-3.44 -3.397" /><path 
             d="M10 12l-3.44 -3.397a2.104 2.104 0 0 0 -2.95 0a2.04 2.04 0 0 0 0 2.912l.39 .485l-.39 .485a2.04 2.04 0 0 0 0 2.912a2.104 2.104 0 0 0 2.95 0l3.44 -3.397" /></svg>;
    }

    if (name === 'work') {
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" 
                className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9" />
                <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                </svg>;
    }
    if(name === 'calendar') {
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" 
                strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar"><path 
                stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" /><path 
                d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" />
                </svg>;
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
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                            >
                                <NavIcon name={link.icon} />
                                <span>{link.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <SearchFilters 
                    onSelectTag={(tag) => console.log('Tag seleccionado:', tag)}
                    onSelectColor={(color) => console.log('Color seleccionado:', color)}
                />
            </nav>

            <div className={styles.sidebarNote}>
                <span className={styles.noteIcon} aria-hidden="true"></span>
                <p>cuadrito de prueba</p>
            </div>
        </aside>
    );
}