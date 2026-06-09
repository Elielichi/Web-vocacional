import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Cambiarpassword from '../components/cambiarpassword';
import Cambiarcorreo from '../components/Cambiarcorreo';
import Cambiarnombre from '../components/Cambiarnombre';

const PerfilEditar = () => {

  const { user, logout, actualizarPreferencias } = useApp();
  const navigate = useNavigate();

  const [tabActiva, setTabActiva] = useState('cuenta');

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-600 font-medium">
          Debes iniciar sesión para editar tu perfil.
        </p>

        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Ir al Login
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'cuenta', label: '👤 Cuenta' },
    { id: 'notificaciones', label: '🎯 Notificaciones' },
    { id: 'privacidad', label: '🔒 Privacidad' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">

        <div className="max-w-5xl mx-auto">

          <div className="mb-6">
            <h1 className="text-3xl font-black text-slate-900">
              Configuración de Perfil
            </h1>

            <p className="text-slate-600 mt-2">
              Administra tu cuenta y preferencias
            </p>
          </div>

          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-sm border border-slate-200 overflow-x-auto mb-6">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id)}
                className={`flex-1 min-w-max px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${tabActiva === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">

            {tabActiva === 'cuenta' && (

              <div className="space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-5">

                  <div>
                    <p className="text-slate-900 font-semibold">
                      Nombre
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-600">
                      {user?.nombres} {user?.apellidos}
                    </span>

                    <Cambiarnombre />
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-5">

                  <div>
                    <p className="text-slate-900 font-semibold">
                      Contraseña
                    </p>

                  </div>
                  <Cambiarpassword />

                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                  <div>
                    <p className="text-slate-900 font-semibold">
                      Correo electrónico
                    </p>
                  </div>

                  <div className="flex items-center gap-3 break-all">
                    <span className="text-slate-600">
                      {user?.correo}
                    </span>

                    <Cambiarcorreo />
                  </div>

                </div>

              </div>

            )}

            {tabActiva === 'notificaciones' && (
              <div className="space-y-4">

                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Notificaciones por correo
                    </h3>

                    <p className="text-sm text-slate-500">
                      Recibe actualizaciones en tu email
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={user?.notificacionesEmail ?? false}
                    onChange={(e) =>
                      actualizarPreferencias({ notificacionesEmail: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Recordatorios
                    </h3>

                    <p className="text-sm text-slate-500">
                      Alertas sobre tests y actividades
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={user?.recordatorios ?? false}
                    onChange={(e) =>
                      actualizarPreferencias({ recordatorios: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>

              </div>
            )}

            {tabActiva === 'privacidad' && (
              <div className="space-y-4">

                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Perfil público
                    </h3>

                    <p className="text-sm text-slate-500">
                      Permitir que otros usuarios vean tu perfil
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={user?.perfilPublico ?? false} onChange={(e) =>
                      actualizarPreferencias({ perfilPublico: e.target.checked })
                    }
                    className="w-5 h-5"
                  />                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-bold transition-all"
                >
                  Cerrar sesión
                </button>

              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default PerfilEditar;