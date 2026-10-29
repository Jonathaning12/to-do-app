import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import AuthLayout from '../components/AuthLayout';
import Field from '../components/Field';
import Icon from '../components/Icon';
import { readUser, useNotes } from '../state/notesContext';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { setUser } = useNotes();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: readUser()?.email ?? '', password: '', remember: true });
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!EMAIL.test(values.email.trim())) next.email = 'Escribe un correo válido, por ejemplo ana@correo.com.';
    if (!values.password) next.password = 'Escribe tu contraseña.';
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.email ? 'email' : 'password')?.focus();
      return;
    }
    const saved = readUser();
    const email = values.email.trim();
    const name = saved?.email === email ? saved.name : email.split('@')[0];
    setUser({ name, email });
    navigate('/home');
  };

  return (
    <AuthLayout title="Hola de nuevo" subtitle="Entra para seguir con tus notas, listas y pendientes.">
      <form className={styles.form} onSubmit={submit} noValidate>
        <Field
          id="email"
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
        <Field
          id="password"
          name="password"
          label="Contraseña"
          icon="lock"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={change}
          error={errors.password}
          aside={
            <a href="#" className={styles.forgotPassword} onClick={(e) => e.preventDefault()}>
              ¿La olvidaste?
            </a>
          }
        />

        <label className={styles.checkboxContainer}>
          <input type="checkbox" name="remember" checked={values.remember} onChange={change} />
          <span className={styles.checkBox} aria-hidden="true">
            <Icon name="check" size={13} strokeWidth={3} />
          </span>
          Recordarme en este dispositivo
        </label>

        <button type="submit" className={styles.submitBtn}>
          <span>Iniciar sesión</span>
          <Icon name="arrowRight" size={18} strokeWidth={2.2} className={styles.btnIcon} />
        </button>

        <p className={styles.switch}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" className={styles.link}>
            Crea una gratis
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
