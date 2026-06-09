import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, carreraTemporal } = useApp();

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contraseña: "",
    confirmar: "",
    ciudad: "",
    telefono: "",
    edad: "",
    sexo: "",
    tipoColegio: ""
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const [mostrarPass, setMostrarPass] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const obtenerFortaleza = (password) => {
    let puntos = 0;

    if (password.length >= 8) puntos++;
    if (/[A-Z]/.test(password)) puntos++;
    if (/[a-z]/.test(password)) puntos++;
    if (/\d/.test(password)) puntos++;
    if (/[^A-Za-z0-9]/.test(password)) puntos++;

    if (puntos <= 2)
      return {
        texto: "Débil",
        color: "bg-red-500",
        width: "33%"
      };

    if (puntos <= 4)
      return {
        texto: "Media",
        color: "bg-yellow-500",
        width: "66%"
      };

    return {
      texto: "Fuerte",
      color: "bg-green-500",
      width: "100%"
    };
  };

  const fortaleza = obtenerFortaleza(form.contraseña);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (
      !form.nombres ||
      !form.apellidos ||
      !form.correo ||
      !form.contraseña ||
      !form.confirmar
    ) {
      setError('Los campos con * son obligatorios.');
      return;
    }

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!regexNombre.test(form.nombres)) {
      setError('Los nombres solo pueden contener letras.')
      return;
    }

    if (!regexNombre.test(form.apellidos)) {
      setError('Los apellidos solo pueden contener letras.')
      return;
    }

    const regexTelefono = /^9\d{8}$/;

    if (form.telefono && !regexTelefono.test(form.telefono)) {
      setError('Ingrese un número de teléfono válido.')
      return;
    }

    const edad = Number(form.edad);

    if (form.edad && (edad < 15 || edad > 80)) {
      setError('La edad debe estar entre 15 y 80 años.')
      return;
    }

    if (form.contraseña !== form.confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regexPassword.test(form.contraseña)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      const resultado = register(form);
      setCargando(false);
      if (resultado.ok) {
        navigate('/perfil');
      } else {
        setError(resultado.mensaje);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-10">
      <div className="max-w-lg w-full space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-white text-2xl font-black">V</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">Crear cuenta</h1>
          <p className="text-slate-500 text-sm mt-1">Únete a VocaTest — Universidad de Lima</p>
        </div>

        {/* Aviso si viene del test */}
        {carreraTemporal && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2">
            ✅ Tu resultado del test (<strong>{carreraTemporal}</strong>) se guardará automáticamente.
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Fila nombres */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nombres *</label>
                <input name="nombres" onChange={handleChange} placeholder="Ej. Carlos"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Apellidos *</label>
                <input name="apellidos" onChange={handleChange} placeholder="Ej. Mendoza"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Correo electrónico *</label>
              <input name="correo" type="email" onChange={handleChange} placeholder="tucorreo@ulima.edu.pe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Contraseña *
                </label>

                <input
                  name="contraseña"
                  value={form.contraseña}
                  type={mostrarPass ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all"
                />

                <button
                  type="button"
                  onClick={() => setMostrarPass(!mostrarPass)}
                  className="text-xs text-blue-600 mt-1 hover:underline"
                >
                  {mostrarPass ? "Ocultar" : "Mostrar"}
                </button>

                {form.contraseña && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 ${fortaleza.color} transition-all`}
                        style={{ width: fortaleza.width }}
                      />
                    </div>

                    <p className="text-xs mt-1 text-gray-600">
                      Fortaleza: <strong>{fortaleza.texto}</strong>
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Confirmar *
                </label>

                <input
                  name="confirmar"
                  value={form.confirmar}
                  type={mostrarConfirmar ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all"
                />

                <button
                  type="button"
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                  className="text-xs text-blue-600 mt-1 hover:underline"
                >
                  {mostrarConfirmar ? "Ocultar" : "Mostrar"}
                </button>

                {form.confirmar && (
                  <p
                    className={`text-xs mt-1 ${form.contraseña === form.confirmar
                      ? "text-green-600"
                      : "text-red-600"
                      }`}
                  >
                    {form.contraseña === form.confirmar
                      ? "✓ Las contraseñas coinciden"
                      : "✗ Las contraseñas no coinciden"}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Ciudad</label>
                <input name="ciudad" onChange={handleChange} placeholder="Lima"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Teléfono</label>
                <input name="telefono" onChange={handleChange} placeholder="9XX-XXX-XXX"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Edad</label>
                <input name="edad" type="number" onChange={handleChange} placeholder="17"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Sexo</label>
                <select name="sexo" onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all bg-white">
                  <option value="">Seleccionar</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Prefiero no decir</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de colegio de procedencia</label>
              <select name="tipoColegio" onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all bg-white">
                <option value="">Seleccionar tipo</option>
                <option>Público</option>
                <option>Privado</option>
              </select>
            </div>

            <button type="submit" disabled={cargando}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-60 mt-2">
              {cargando ? "Creando cuenta..." : "Crear mi cuenta 🚀"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}