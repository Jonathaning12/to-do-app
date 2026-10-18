import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Live from './pages/Live.jsx'
import Calendar from './pages/Calendar.jsx'
export default function App() {
  return (
    <Routes>
      {/* Redirigir la raíz al login */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      {/* Rutas de Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/live" element={<Live />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/work" element={<Work />} />
      {/* Ruta de inicio */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}