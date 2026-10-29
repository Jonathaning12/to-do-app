import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../pages/Login.module.css';
import BrandMark from './BrandMark';

// Pantalla dividida de acceso: a la izquierda fichas flotantes, a la derecha el formulario.
export default function AuthLayout({ title, subtitle, children }) {
  const showcaseRef = useRef(null);

  // Paralaje sutil: cada ficha sigue al puntero según su profundidad.
  const onPointerMove = (e) => {
    const el = showcaseRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const onPointerLeave = () => {
    showcaseRef.current?.style.setProperty('--px', 0);
    showcaseRef.current?.style.setProperty('--py', 0);
  };

  return (
    <div className={styles.container}>
      <section
        ref={showcaseRef}
        className={styles.showcase}
        aria-hidden="true"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <Link to="/home" className={styles.brand} tabIndex={-1}>
          <BrandMark size={32} />
          <span>NoteOne</span>
        </Link>

        <div className={styles.stack}>
          <div className={`${styles.paper} ${styles.p1}`}>
            <span className={styles.paperTag}><i /> Casa</span>
            <strong>Víveres del sábado</strong>
            <span className={styles.paperTask}><i className={styles.tick} /> Café en grano</span>
            <span className={styles.paperTask}><i /> Pan integral</span>
          </div>
          <div className={`${styles.paper} ${styles.p2}`}>
            <span className={styles.paperTag}><i /> Proyectos</span>
            <strong>Lanzamiento v2.0</strong>
            <span className={styles.paperDue}>Vence el viernes</span>
          </div>
          <div className={`${styles.paper} ${styles.p3}`}>
            <span className={styles.paperTag}><i /> Ideas</span>
            <strong>Paseo en bici por el parque</strong>
          </div>
        </div>

        <p className={styles.tagline}>Tus ideas, en orden.</p>
      </section>

      <main className={styles.panel}>
        <div className={styles.card}>
          <Link to="/home" className={styles.mobileBrand}>
            <BrandMark size={30} />
            <span>NoteOne</span>
          </Link>
          <h1>{title}</h1>
          <p className={styles.description}>{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
