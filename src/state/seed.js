import { addDays, createNote, toISODate, uid } from './model';

// Notas de ejemplo para el primer arranque (las mismas que tenía el tablero original).
const task = (text, done = false) => ({ id: uid(), text, done });
const inDays = (n) => toISODate(addDays(new Date(), n));

export function seedNotes() {
  return [
    createNote({
      title: 'Lanzamiento v2.0: roadmap y checklist final',
      category: 'trabajo',
      tag: 'Proyectos',
      ink: 'amarillo',
      priority: 'alta',
      pinned: true,
      due: inDays(2),
      tasks: [
        task('Pruebas de carga y latencia <85ms', true),
        task('Auditoría de seguridad tokens JWT', true),
        task('Revisión de copywriting con Product Marketing', true),
        task('Deploy a staging y smoke test final'),
      ],
    }),
    createNote({
      title: 'Revisar propuesta de diseño para cliente Acme',
      category: 'trabajo',
      tag: 'Trabajo',
      ink: 'naranja',
      due: inDays(0),
      body: 'Llevar notas de la última llamada y los comentarios sobre la paleta.',
    }),
    createNote({
      title: 'Minutas con stakeholders y presupuesto Q4',
      category: 'trabajo',
      tag: 'Reuniones',
      ink: 'lila',
      tasks: [
        task('Aprobación de incremento del 18% en infraestructura', true),
        task('Validar arquitectura de microservicios con CTO'),
      ],
    }),
    createNote({
      title: 'Code review: motor de sync y WebSockets',
      category: 'trabajo',
      tag: 'Urgente',
      ink: 'rosa',
      priority: 'alta',
      due: inDays(-1),
      tasks: [
        task('Resolver condición de carrera en notas concurrentes'),
        task('Reconexión sin pérdida de cambios'),
      ],
    }),
    createNote({
      title: 'Rediseño de componentes UI en Figma',
      category: 'trabajo',
      tag: 'Diseño',
      ink: 'azul',
      due: inDays(4),
      tasks: [
        task('Actualizar fichas de notas y selectores de color', true),
        task('Crear variantes en modo oscuro'),
      ],
    }),
    createNote({
      title: 'Documentación de endpoints API v1',
      category: 'trabajo',
      tag: 'Desarrollo',
      ink: 'menta',
      done: true,
      tasks: [
        task('Generar colección de Postman', true),
        task('Publicar Swagger para el equipo frontend', true),
      ],
    }),
    createNote({
      title: 'Comprar víveres semanales',
      category: 'vida',
      tag: 'Casa',
      ink: 'menta',
      due: inDays(1),
      tasks: [
        task('Leche de almendras', true),
        task('Frutas frescas', true),
        task('Pan integral'),
        task('Café en grano'),
      ],
    }),
    createNote({
      title: 'Ideas de fin de semana',
      category: 'vida',
      tag: 'Ideas',
      ink: 'azul',
      tasks: [task('Paseo en bicicleta por el parque'), task('Probar la panadería nueva')],
    }),
    createNote({
      title: 'Leer «El diseño de las cosas cotidianas»',
      category: 'personal',
      tag: 'Lecturas',
      ink: 'lila',
      body: 'Capítulos 3 y 4: affordances y modelos mentales.',
      due: inDays(9),
    }),
  ];
}
