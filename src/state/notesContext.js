import { createContext, useContext } from 'react';

export const NotesContext = createContext(null);

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes debe usarse dentro de <NotesProvider>');
  return ctx;
}

export const STORAGE_KEY = 'noteone.notes.v1';
export const USER_KEY = 'noteone.user.v1';

export function readUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) ?? null;
  } catch {
    return null;
  }
}

export function writeUser(user) {
  try {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  } catch {
    // El almacenamiento puede estar bloqueado (modo privado); la sesión vive solo en memoria.
  }
}
