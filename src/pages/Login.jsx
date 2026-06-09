import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [intentos, setIntentos] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (intentos >= 5) {
      setError("Demasiados intentos. Vuelva más tarde.");
      return;
    }

    if (!correo || !contrasena) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setCargando(true);

    setTimeout(() => {
      const resultado = login(correo, contrasena);

      setCargando(false);

      if (resultado.ok) {
        setIntentos(0);

        if (resultado.rol === "Admin") {
          navigate('/admin');
        } else {
          navigate('/perfil');
        }
      } else {
        const nuevosIntentos = intentos + 1;

        setIntentos(nuevosIntentos);

        if (nuevosIntentos >= 5) {
          setError("Demasiados intentos. Vuelva más tarde.");
        } else {
          setError(
            `Correo o contraseña incorrectos.`
          );
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">

        {/* Logo / Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-white text-2xl font-black">V</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">VocaTest</h1>
          <p className="text-slate-500 text-sm mt-1">Inicia sesión para continuar</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Credenciales demo */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-1">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Cuentas de prueba
            </p>
            <p className="text-xs text-blue-600">
              👨‍🎓 Estudiante:{" "}
              <span className="font-mono font-bold">estudiante@ulima.edu.pe</span>{" "}
              /{" "}
              <span className="font-mono font-bold">ulima123</span>
            </p>
            <p className="text-xs text-blue-600">
              👨‍🏫 Profesor:{" "}
              <span className="font-mono font-bold">profesor@ulima.edu.pe</span>{" "}
              /{" "}
              <span className="font-mono font-bold">profe123</span>
            </p>
            <p className="text-xs text-purple-700 font-semibold">
              🛡️ Admin:{" "}
              <span className="font-mono">admin@vocatest.pe</span>{" "}
              /{" "}
              <span className="font-mono">admin123</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tucorreo@ulima.edu.pe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Contraseña
              </label>

              <input
                type={mostrarPassword ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all"
              />

              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="text-xs text-blue-600 mt-1 hover:underline"
              >
                {mostrarPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-60"
            >
              {cargando ? "Verificando..." : "Iniciar Sesión 🚀"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}