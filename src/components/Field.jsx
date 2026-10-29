import { useState } from 'react';
import styles from '../pages/Login.module.css';
import Icon from './Icon';

// Campo de formulario con ícono, error accesible y opción de mostrar la contraseña.
export default function Field({ id, label, icon, type = 'text', error, aside, ...input }) {
  const [reveal, setReveal] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {aside}
      </div>
      <div className={`${styles.inputWithIcon} ${error ? styles.invalid : ''}`}>
        <Icon name={icon} size={18} className={styles.icon} />
        <input
          id={id}
          type={isPassword && reveal ? 'text' : type}
          className={styles.input}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...input}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.reveal}
            onClick={() => setReveal((r) => !r)}
            aria-label={reveal ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={reveal}
          >
            <Icon name={reveal ? 'eyeOff' : 'eye'} size={18} />
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
