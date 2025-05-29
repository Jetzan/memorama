// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Juego from '../pages/Juego';
import Bienvenida from '../pages/Bienvenda';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/juego" element={<Juego />} />
      <Route path='/bienvenida' element={<Bienvenida />}/>
    </Routes>
  );
}
