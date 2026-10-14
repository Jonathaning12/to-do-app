2026-10-14 -- Se inicializa el repo en GitHub

### Lista de comando utilizados hasta ahora:

1. Inicialización y Configuración del Proyecto
npm create vite@latest

Crea la estructura base del proyecto interactivo con Vite (React + JavaScript) e incluye el archivo .gitignore esencial.

npm install

Descarga e instala todas las librerías descritas en el archivo package.json generando la carpeta local node_modules/.

npm run dev

Inicia el servidor de desarrollo local para previsualizar la aplicación en el navegador.

2. Vinculación con GitHub
git init

Inicializa un repositorio Git local dentro de la carpeta del proyecto.

git branch -M main

Renombra la rama por defecto a main (estándar actual usado por GitHub).

git remote add origin <URL_DEL_REPOSITO.git>

Conecta tu repositorio local en la computadora con el repositorio remoto alojado en GitHub.

3. Guardado y Envío de Cambios (Workflow diario)
git status

Muestra el estado actual de tus archivos (cuáles han sido modificados, cuáles no están rastreados o cuáles están listos para commit).

git add .

Prepara todos los archivos nuevos y modificados de la carpeta actual para el siguiente commit (excluyendo lo especificado en .gitignore).

git commit -m "mensaje"

Guarda un punto de control (snapshot) del proyecto local con un mensaje explicativo sobre los cambios realizados.

git push -u origin main

Sube los commits de tu rama local main al repositorio remoto en GitHub por primera vez.

4. Sincronización y Solución de Conflictos
git pull origin main --rebase

Descarga e integra los cambios más recientes desde GitHub ordenando tus commits locales por encima de los descargados para mantener un historial limpio.

git push origin main --force

Fuerza la actualización del repositorio remoto en GitHub reemplazando su historial por el contenido de tu copia local (útil para reestructuraciones iniciales).

git push origin --delete master

Elimina una rama remota en GitHub (en este caso, para borrar la rama master antigua que quedaba duplicada).

5. Comandos útiles para tus 2 Colaboradores
git clone <URL_DEL_REPOSITO.git>

Descarga una copia completa del repositorio desde GitHub a la máquina local.

git checkout -b feature/nombre-tarea

Crea y se cambia a una rama de trabajo nueva e independiente para desarrollar una función sin afectar a la rama main.