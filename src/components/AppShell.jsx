import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AppShell.module.css';
import SideBar from './sideBar';
import Header from './Header';
import NoteEditor from './NoteEditor';
import Toast from './Toast';

const isTyping = (el) => el?.closest?.('input, textarea, select, [contenteditable="true"]');

export default function AppShell() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setNavOpen(false);
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      // "/" busca, "n" escribe una nota nueva. Sin animación: son atajos de uso frecuente.
      if (e.key === '/') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      } else if (e.key === 'n') {
        const composer = document.getElementById('quick-note');
        if (composer) {
          e.preventDefault();
          composer.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={styles.shell}>
      <SideBar open={navOpen} onNavigate={() => setNavOpen(false)} />
      {navOpen && <div className={styles.scrim} onClick={() => setNavOpen(false)} aria-hidden="true" />}

      <div className={styles.main}>
        <div className={styles.column}>
          <Header onMenu={() => setNavOpen(true)} menuOpen={navOpen} />
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>

      <NoteEditor />
      <Toast />
    </div>
  );
}
