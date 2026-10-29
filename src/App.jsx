import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Live from './pages/Live.jsx'
import Calendar from './pages/Calendar.jsx'
import AppShell from './components/AppShell.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Acceso */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Tablero: comparten barra lateral, encabezado, editor y avisos */}
      <Route element={<AppShell />}>
        <Route path="/home" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/live" element={<Live />} />
        <Route path="/calendar" element={<Calendar />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
