import styles from './Toast.module.css';
import Icon from './Icon';
import { useNotes } from '../state/notesContext';

// Aviso con "Deshacer": borrar nunca es definitivo al primer clic.
export default function Toast() {
  const { toast, dismissToast } = useNotes();

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (
        <div key={toast.key} className={styles.toast}>
          <span className={styles.message}>{toast.message}</span>
          {toast.undo && (
            <button
              type="button"
              className={styles.undo}
              onClick={() => {
                toast.undo();
                dismissToast();
              }}
            >
              Deshacer
            </button>
          )}
          <button type="button" className={styles.close} onClick={dismissToast} aria-label="Cerrar aviso">
            <Icon name="x" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
