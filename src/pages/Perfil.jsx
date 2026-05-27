import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function Perfil() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState('perfil');

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-600 font-medium">Debes iniciar sesión para ver tu perfil.</p>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition">
          Ir al Login
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const esProfesor = user.rol === 'Profesor';

  const tabs = esProfesor
    ? [
        { id: 'perfil', label: '👤 Mi Perfil' },
        { id: 'actividad', label: '📊 Actividad' },
        { id: 'profesional', label: '🏫 Info Profesional' },
      ]
    : [
        { id: 'perfil', label: '👤 Mi Perfil' },
        { id: 'test', label: '🎯 Resultado Test' },
        { id: 'favoritos', label: '❤️ Favoritos' },
      ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 space-y-6">

        {/* Header del perfil */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-md shrink-0">
            {user.nombres?.[0]}{user.apellidos?.[0]}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-black text-slate-900">{user.nombres} {user.apellidos}</h1>
            <p className="text-slate-500 font-medium">{user.correo}</p>
            <span className={`inline-block mt-1 text-xs font-bold px-3 py-1 rounded-full ${
              esProfesor ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {user.rol} — Universidad de Lima
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm px-5 py-2.5 rounded-xl transition border border-red-200"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-sm border border-slate-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              className={`flex-1 min-w-max px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tabActiva === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ======================== TAB: MI PERFIL ======================== */}
        {tabActiva === 'perfil' && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* Información personal */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-xl">👤</span>
                Información Personal
              </h2>
              <div className="space-y-3">
                {[
                  { label: 'Nombre completo', valor: `${user.nombres} ${user.apellidos}` },
                  { label: 'Correo', valor: user.correo },
                  { label: 'Teléfono', valor: user.telefono || 'No registrado' },
                  { label: 'Edad', valor: user.edad ? `${user.edad} años` : 'No registrado' },
                  { label: 'Sexo', valor: user.sexo || 'No registrado' },
                  { label: 'Ciudad', valor: user.ciudad || 'No registrado' },
                  ...(!esProfesor ? [{ label: 'Colegio de procedencia', valor: user.tipoColegio || 'No registrado' }] : [])
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500 font-medium">{item.label}</span>
                    <span className="text-sm font-bold text-slate-800">{item.valor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seguridad */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="bg-green-100 text-green-600 p-2 rounded-xl">🔒</span>
                Seguridad de la Cuenta
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-500 font-medium">Contraseña</span>
                  <span className="text-sm font-bold text-slate-800 tracking-widest">••••••••</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-500 font-medium">Correo verificado</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Verificado ✓</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-500 font-medium">Último ingreso</span>
                  <span className="text-sm font-bold text-slate-800">{user.ultimoIngreso || 'Hoy'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-500 font-medium">Rol</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    esProfesor ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>{user.rol}</span>
                </div>
              </div>

              <button onClick={() => navigate('/EditarPerfil')} className="w-full mt-4 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm px-4 py-2.5 rounded-xl transition">
                ✏️ Editar información
              </button>
            </div>
          </div>
        )}

        {/* ======================== TAB ESTUDIANTE: RESULTADO TEST ======================== */}
        {tabActiva === 'test' && !esProfesor && (
          <div className="space-y-6">
            {user.carreraRecomendada ? (
              <>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">🎯</span>
                    Resultado de tu Test Vocacional
                  </h2>
                  <p className="text-sm text-slate-500 mb-4">
                    Fecha: <strong className="text-blue-600">{user.fechaTest || 'Reciente'}</strong>
                  </p>

                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 text-center mb-6">
                    <p className="text-sm font-medium opacity-80 mb-1">Tu carrera recomendada principal</p>
                    <p className="text-2xl font-black">{user.carreraRecomendada}</p>
                  </div>

                  {user.carrerasRecomendadas?.length > 0 && (
                    <div>
                      <p className="font-bold text-slate-700 mb-3">Tus tres carreras recomendadas:</p>
                      <div className="space-y-2">
                        {user.carrerasRecomendadas.map((c, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                            <span className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black">{i + 1}</span>
                            <span className="font-semibold text-slate-800">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <Link to="/test"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition shadow-md">
                    🔄 Repetir el test vocacional
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center space-y-4">
                <p className="text-5xl">📋</p>
                <h3 className="text-xl font-black text-slate-800">Aún no has hecho el test</h3>
                <p className="text-slate-500">Completa el test vocacional para descubrir qué carrera es ideal para ti.</p>
                <Link to="/test"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition mt-2">
                  🚀 Iniciar Test Vocacional
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ======================== TAB ESTUDIANTE: FAVORITOS ======================== */}
        {tabActiva === 'favoritos' && !esProfesor && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-red-100 text-red-500 p-2 rounded-xl">❤️</span>
              Universidades Favoritas
            </h2>

            {user.universidadesFavoritas?.length > 0 ? (
              <div className="space-y-3">
                {user.universidadesFavoritas.map((uni, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black text-sm">
                        {uni[0]}
                      </div>
                      <span className="font-semibold text-slate-800">{uni}</span>
                    </div>
                    <span className="text-red-500 text-lg">❤️</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <p className="text-4xl">🏫</p>
                <p className="font-medium">No tienes universidades favoritas aún.</p>
                <Link to="/directorio" className="text-blue-600 font-bold hover:underline text-sm">
                  Explorar el directorio →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ======================== TAB PROFESOR: ACTIVIDAD ======================== */}
        {tabActiva === 'actividad' && esProfesor && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Estudiantes asignados', valor: user.estudiantesAsignados || 0, color: 'purple', emoji: '👥' },
                { label: 'Estudiantes activos', valor: user.estudiantesAsignados || 0, color: 'green', emoji: '✅' },
                { label: 'Test revisados', valor: user.testRevisados || 0, color: 'amber', emoji: '📋' },
                { label: 'Recursos compartidos', valor: user.recursosCompartidos || 0, color: 'blue', emoji: '📚' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-center space-y-2">
                  <p className="text-3xl">{stat.emoji}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.valor}</p>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-black text-slate-900 mb-4">📅 Resumen de actividad — Este año</h2>
              <div className="text-center py-8 text-slate-400">
                <p className="text-4xl mb-2">📊</p>
                <p className="font-medium">Gráficos de actividad próximamente</p>
              </div>
            </div>
          </div>
        )}

        {/* ======================== TAB PROFESOR: INFO PROFESIONAL ======================== */}
        {tabActiva === 'profesional' && esProfesor && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-600 p-2 rounded-xl">🏫</span>
              Información Profesional
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Especialidad', valor: user.especialidad || 'Ingeniería de Sistemas' },
                { label: 'Grado académico', valor: user.gradoAcademico || 'Magíster en Educación' },
                { label: 'Años de experiencia', valor: user.aniosExperiencia || '—' },
                { label: 'Estado de cuenta', valor: user.estadoCuenta || 'Activo' },
                { label: 'Universidad', valor: 'Universidad de Lima' },
                { label: 'Facultad', valor: 'Ingeniería de Sistemas' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500 font-medium">{item.label}</span>
                  <span className="text-sm font-bold text-slate-800">{item.valor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}