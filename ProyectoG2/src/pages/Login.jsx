import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginOVerificarUsuario, carreraTemporal } = useApp();
  
  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Datos simulados del estudiante
    const datosEstudiante = {
      nombre: nombre,
      correo: correo,
      rol: "Estudiante"
    };

    // Logueamos al usuario y le adjuntamos la carrera que sacó en el test
    loginOVerificarUsuario(datosEstudiante, carreraTemporal);

    // Una vez registrado, lo enviamos directamente a su panel/perfil para que vea su carrera guardada
    navigate('/perfil');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900">Crea tu Cuenta</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            {carreraTemporal 
              ? `Regístrate para guardar tu resultado: ${carreraTemporal}` 
              : "Regístrate para acceder al directorio educativo"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Ana García" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="estudiante@colegio.edu.pe" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Guardar Perfil y Continuar 🚀
          </button>
        </form>
      </div>
    </div>
  );
}