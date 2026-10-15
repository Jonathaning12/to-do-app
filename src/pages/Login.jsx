import styles from './Login.module.css'

export default function Login(){
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}
                ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-notion">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M11 17.5v-6.5h.5l4 6h.5v-6.5" />
	<path d="M19.077 20.071l-11.53 .887a1 1 0 0 1 -.876 -.397l-2.471 -3.294a1 1 0 0 1 -.2 -.6v-10.741a1 1 0 0 1 .923 -.997l11.389 -.876a2 2 0 0 1 1.262 .33l1.535 1.023a2 2 0 0 1 .891 1.664v12.004a1 1 0 0 1 -.923 .997" />
	<path d="M4.5 5.5l2.5 2.5" />
	<path d="M20 7l-13 1v12.5" />
</svg></div>
                <h1>Bienvenido a NoteOne</h1>
                <p className={styles.description}>Tu espacio para pensar, anotar y cumplir tus metas con claridad.</p>


            {/* //Formulario de inicio de sesión */}
            <form className={styles.form}>
            <div className={styles.inputContainer}>
                
                {/* Campo Correo */}
                <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
                <div className={styles.inputWithIcon}>
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 7 9 6 9-6" />
                    </svg>
                    <input type="email" id="email" placeholder="ejemplo@correo.com" className={styles.input} />
                </div>
                </div>

                {/* Campo Contraseña */}
                {/* <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Contraseña</label>
                <div className={styles.inputWithIcon}>
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    </div>
                </div> */}
        
                  <div className={styles.inputGroup}>
                    <div className={styles.labelRow}>
                    <label htmlFor="password" className={styles.label}>Contraseña</label>
                    <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
                </div>
                <div className={styles.inputWithIcon}>
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    <input type="password" id="password" placeholder="••••••••••••" className={styles.input} />
                </div>
                </div>
                
                

                {/* Checkbox Recordarme */}
                <div className={styles.checkboxContainer}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recordarme en este dispositivo</label>
                </div>

            </div>

            <button type="submit" className={styles.submitBtn}>
                <span>Iniciar sesión</span>
                <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 8l4 4m0 0l-4 4m4-4H6" />
                </svg>
            </button>
            <div className={styles.divider}>
                <span>Continuar Con</span>
                </div>

                <div className={styles.socialButtons}>
                <button type="button" className={styles.socialBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Google</span>
                </button>

                <button type="button" className={styles.socialBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.61.72-1.14 1.88-1 3.01 1.09.08 2.18-.55 2.84-1.37z"/>
                    </svg>
                    <span>Apple</span>
                </button>
                </div>
            </form>
            </div>
        </div>
    );
}