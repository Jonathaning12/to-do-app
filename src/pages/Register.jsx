import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import AuthLayout from '../components/AuthLayout';
import Field from '../components/Field';
import Icon from '../components/Icon';
import { useNotes } from '../state/notesContext';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const { setUser } = useNotes();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const strength = Math.min(3, Math.floor(values.password.length / 4));

  const change = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Dinos cómo te llamas.';
    if (!EMAIL.test(values.email.trim())) next.email = 'Escribe un correo válido, por ejemplo ana@correo.com.';
    if (values.password.length < 8) next.password = 'Usa al menos 8 caracteres.';
    setErrors(next);
    const firstError = ['name', 'email', 'password'].find((k) => next[k]);
    if (firstError) {
      document.getElementById(`reg-${firstError}`)?.focus();
      return;
    }
    setUser({ name: values.name.trim(), email: values.email.trim() });
    navigate('/home');
  };

  return (
    <AuthLayout title="Crea tu cuenta" subtitle="Un tablero para tus notas, listas y pendientes. Listo en un minuto.">
      <form className={styles.form} onSubmit={submit} noValidate>
        <Field
          id="reg-name"
          name="name"
          label="Nombre"
          icon="user"
          autoComplete="name"
          placeholder="Ana García"
          value={values.name}
          onChange={change}
          error={errors.name}
        />
        <Field
          id="reg-email"
          name="email"
          label="Correo electrónico"
          icon="mail"
          type="email"
          autoComplete="email"
          placeholder="ana@correo.com"
          value={values.email}
          onChange={change}
          error={errors.email}
        />
        <div>
          <Field
            id="reg-password"
            name="password"
            label="Contraseña"
            icon="lock"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={values.password}
            onChange={change}
            error={errors.password}
          />
          {values.password && !errors.password && (
            <div className={styles.strength} data-level={strength}>
              <span />
              <span />
              <span />
              <em>{['Muy corta', 'Débil', 'Aceptable', 'Fuerte'][strength]}</em>
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          <span>Crear cuenta</span>
          <Icon name="arrowRight" size={18} strokeWidth={2.2} className={styles.btnIcon} />
        </button>

        <p className={styles.switch}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className={styles.link}>
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
