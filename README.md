NoteOne- Modern Auth & Notes App

Vista Previa e Interfaz

El módulo de autenticación (Login y Registro) está diseñado siguiendo principios de diseño limpio (UI/UX estilo Canva), con una paleta de colores tenue tipo smoke, tarjetas centralizadas con sombras suaves e íconos interactivos posicionados dentro de los campos de entrada.

Características Principales

Autenticación UI/UX Completa: Vistas estilizadas para Inicio de Sesión y Registro de Usuarios.

Estilos Modulares: Uso estricto de CSS Modules para evitar colisiones de clases y mantener un código limpio y escalable.

 Campos e Íconos Dinámicos: Inputs con íconos SVG fijos e invisibles al tipear para mejorar la usabilidad.

Componentes Personalizados: Checkbox con diseño a medida (Smoke Gray) e indicadores dinámicos.

 Navegación Fluida: Enrutamiento SPA sin recargas de página mediante react-router-dom.

Diseño Adaptativo: Flexbox responsivo para garantizar una excelente visualización en dispositivos móviles y de escritorio.

 Tecnologías Utilizadas

Frontend Core: React + Vite

Enrutamiento: React Router v6

Estilos: CSS Modules + Vanilla CSS 3

Iconografía: SVG Vectores Inline & Tabler Icons

 Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto localmente en tu entorno de desarrollo:

1. Clonar el repositorio

git clone https://github.com/tu-usuario/notitas-app.git
cd notitas-app


2. Instalar dependencias

npm install


3. Iniciar el servidor de desarrollo

npm run dev


Abre tu navegador e ingresa a http://localhost:5173 para ver la aplicación en vivo.

📁 Estructura del Proyecto

to-do-app/
├── public/              # Archivos estáticos y favicon
├── src/
│   ├── assets/          # Imágenes y recursos multimedia
│   ├── components/      # Componentes reutilizables (Sidebar, Inputs, Buttons)
│   ├── pages/           # Vistas principales (Login.jsx, Register.jsx)
│   ├── App.jsx          # Configuración de rutas principales
│   ├── main.jsx         # Punto de entrada con BrowserRouter
│   └── index.css        # Estilos globales y reset
├── package.json         # Dependencias y scripts
└── README.md            # Documentación del proyecto


