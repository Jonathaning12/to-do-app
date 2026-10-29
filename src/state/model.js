// Modelo de datos de NoteOne: tintas, categorías, fechas y helpers puros.

// Colores del sistema: `dot` es el color pleno, `tint` el fondo suave de la ficha
// y `text` una versión oscura del mismo tono para texto con buen contraste.
export const INKS = [
  { id: 'amarillo', label: 'Amarillo', dot: '#ffcc00', tint: '#fff9e0', text: '#8a6100' },
  { id: 'rosa', label: 'Rosa', dot: '#ff2d55', tint: '#ffeef1', text: '#c4123b' },
  { id: 'azul', label: 'Azul', dot: '#007aff', tint: '#ebf4ff', text: '#0060c7' },
  { id: 'menta', label: 'Verde', dot: '#34c759', tint: '#ebf9ef', text: '#1f7a37' },
  { id: 'naranja', label: 'Naranja', dot: '#ff9500', tint: '#fff3e5', text: '#b35c00' },
  { id: 'lila', label: 'Morado', dot: '#af52de', tint: '#f7edfc', text: '#8a2fb8' },
];

export const inkById = (id) => INKS.find((ink) => ink.id === id) ?? INKS[0];

export const CATEGORIES = [
  { id: 'personal', label: 'Personal' },
  { id: 'trabajo', label: 'Trabajo' },
  { id: 'vida', label: 'Vida cotidiana' },
];

export const categoryLabel = (id) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? 'Personal';

export const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

// Fechas en formato local YYYY-MM-DD (sin zonas horarias de por medio).
export const toISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const fromISODate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (date, n) => {
  const next = new Date(date);
  next.setDate(next.getDate() + n);
  return next;
};

export const todayISO = () => toISODate(new Date());

const dayDiff = (iso) => {
  const today = fromISODate(todayISO());
  return Math.round((fromISODate(iso) - today) / 86_400_000);
};

const weekday = new Intl.DateTimeFormat('es', { weekday: 'long' });
const shortDate = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' });

// "Hoy", "Mañana", "Vence el jueves", "Venció hace 2 días"...
export function describeDue(iso) {
  if (!iso) return null;
  const diff = dayDiff(iso);
  const date = fromISODate(iso);
  if (diff === 0) return { text: 'Vence hoy', tone: 'soon' };
  if (diff === 1) return { text: 'Vence mañana', tone: 'soon' };
  if (diff === -1) return { text: 'Venció ayer', tone: 'late' };
  if (diff < -1) return { text: `Venció hace ${-diff} días`, tone: 'late' };
  if (diff < 7) return { text: `Vence el ${weekday.format(date)}`, tone: 'calm' };
  return { text: `Vence el ${shortDate.format(date)}`, tone: 'calm' };
}

export const isOverdue = (note) => !note.done && note.due && dayDiff(note.due) < 0;
export const isDueToday = (note) => !note.done && note.due && dayDiff(note.due) === 0;
export const isDueThisWeek = (note) =>
  !note.done && note.due && dayDiff(note.due) >= 0 && dayDiff(note.due) < 7;

export function taskProgress(note) {
  const total = note.tasks.length;
  const done = note.tasks.filter((t) => t.done).length;
  return { total, done, ratio: total ? done / total : note.done ? 1 : 0 };
}

export function createNote(fields = {}) {
  const now = new Date().toISOString();
  return {
    id: uid(),
    title: '',
    body: '',
    tasks: [],
    category: 'personal',
    tag: '',
    ink: 'amarillo',
    priority: 'normal',
    due: null,
    pinned: false,
    done: false,
    createdAt: now,
    updatedAt: now,
    ...fields,
  };
}

// Convierte el texto rápido del compositor en una nota.
// "#etiqueta" se vuelve etiqueta y las líneas que empiezan con "- " o "[] " se vuelven tareas.
export function parseQuickText(text) {
  let tag = '';
  const lines = text.split('\n');
  const tasks = [];
  const rest = [];

  for (const raw of lines) {
    let line = raw.trim();
    const tagMatch = line.match(/(^|\s)#([\p{L}\p{N}_-]+)/u);
    if (tagMatch && !tag) {
      tag = tagMatch[2];
      line = line.replace(tagMatch[0], ' ').trim();
    }
    const taskMatch = line.match(/^(?:-|\*|\[\s?\])\s+(.+)/);
    if (taskMatch) tasks.push({ id: uid(), text: taskMatch[1], done: false });
    else if (line) rest.push(line);
  }

  const [title = '', ...body] = rest;
  return { title, body: body.join('\n'), tasks, tag };
}

export function matchesQuery(note, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return [note.title, note.body, note.tag, ...note.tasks.map((t) => t.text)]
    .join(' ')
    .toLowerCase()
    .includes(q);
}
