import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function CardUniversidad({ logo, nombre, tipo, carreras, escalas, webOficial, ubicacion, costoMatricula, busqueda = "", isDark = false, isAdmin = false, onEliminarUni, onEliminarCarrera }) {
  const { user, marcarFavoritoContext } = useApp();
  const navigate = useNavigate();
  const texto = busqueda.toLowerCase().trim();

  const esFavorito = user?.universidadesFavoritas?.includes(nombre) || false;
  const tieneCoincidenciaCarrera = texto
    ? carreras.some((c) =>
      c.nombre.toLowerCase().includes(texto) ||
      c.facultad.toLowerCase().includes(texto)
    )
    : false;

  const [mostrarCarreras, setMostrarCarreras] = useState(tieneCoincidenciaCarrera);
  const [mostrarEscalas, setMostrarEscalas] = useState(false);

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const highlight = (str) => {
    if (!texto) return str;
    try {
      const regex = new RegExp(`(${escapeRegex(texto)})`, "gi");
      const parts = str.split(regex);
      return parts.map((part, i) =>
        part.toLowerCase() === texto
          ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark>
          : part
      );
    } catch {
      return str;
    }
  };

  const handleToggleFavorito = () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar favoritos");
      return;
    }
    marcarFavoritoContext(nombre);
  };

  const irAFavoritos = () => {
    navigate('/perfil?tab=favoritos');
  };

  return (
    <div className={`w-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>

      {/* ── CABECERA HORIZONTAL ─────────────────────────── */}
      <div className="flex items-center gap-5 px-6 py-5">
        <div className={`shrink-0 w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
          {logo ? (
            <img src={logo} alt={`Logo ${nombre}`} className="w-full h-full object-contain p-1" onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<span style="font-size:22px;font-weight:800;color:#3b82f6">${nombre[0]}</span>`; }} />
          ) : (
            <span className="text-2xl font-black text-blue-600">{nombre[0]}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h2 className={`text-xl font-bold leading-tight ${isDark ? 'text-slate-100' : 'text-blue-700'}`}>
                {highlight(nombre)}
              </h2>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${tipo === "Privada" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
                  {tipo}
                </span>
                {costoMatricula && (
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>💰 {costoMatricula}</span>
                )}
                {ubicacion && (
                  <span className={`text-xs truncate max-w-xs ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>📍 {ubicacion}</span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {/* Botón Favorito (Solo para Estudiantes) */}
              {user && user.rol !== "Admin" && user.rol !== "Profesor" && (
                <button type="button" onClick={handleToggleFavorito} title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shrink-0 ${esFavorito ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100" : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100"}`}>
                  <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-all ${esFavorito ? "fill-red-500 stroke-red-500" : "fill-none stroke-slate-400"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                  {esFavorito ? "Guardado" : "Favorito"}
                </button>
              )}

              {/* Botón Eliminar Univ (Solo para Admin) */}
              {isAdmin && (
                <button type="button" onClick={onEliminarUni} title="Eliminar universidad completa" className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shrink-0 bg-red-900/40 text-red-400 border border-red-800 hover:bg-red-600 hover:text-white cursor-pointer`}>
                  🗑️ Eliminar Univ.
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTONES DE ACCIÓN ────────────────────────────── */}
      <div className="flex items-center gap-3 px-6 pb-4 flex-wrap">
        <button type="button" onClick={() => setMostrarCarreras(!mostrarCarreras)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition cursor-pointer">
          {mostrarCarreras ? "Ocultar carreras" : `Ver ${carreras.length} carreras`}
        </button>

        {escalas && escalas.length > 0 && (
          <button type="button" onClick={() => setMostrarEscalas(!mostrarEscalas)} className={`${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} px-5 py-2 rounded-lg text-sm font-bold transition cursor-pointer`}>
            {mostrarEscalas ? "Ocultar costos" : "Ver escalas de pago"}
          </button>
        )}

        {webOficial && (
          <a href={webOficial} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-sm font-medium hover:underline transition">
            🌐 Sitio web oficial
          </a>
        )}

        {esFavorito && user && (
          <button type="button" onClick={irAFavoritos} className="text-red-500 text-xs font-medium hover:underline ml-auto cursor-pointer">Ver mis favoritos →</button>
        )}
      </div>

      {/* ── ESCALAS DE PAGO ──────────────────────────────── */}
      {mostrarEscalas && escalas && escalas.length > 0 && (
        <div className={`mx-6 mb-4 rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
          <p className={`text-xs font-bold uppercase tracking-wider px-4 py-2 border-b ${isDark ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-slate-100'}`}>Escalas de Pago</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {escalas.map((e, i) => (
              <div key={i} className={`flex justify-between items-center px-4 py-2.5 border-b last:border-0 text-sm ${isDark ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'}`}>
                <span className="font-semibold">{e.escala}</span>
                <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>{e.rango}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LISTA DE CARRERAS ────────────────────────────── */}
      {mostrarCarreras && (
        <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          {carreras.map((carrera, index) => {
            const coincide = texto && (carrera.nombre.toLowerCase().includes(texto) || carrera.facultad.toLowerCase().includes(texto));
            return (
              <div key={index} className={`flex items-start justify-between gap-4 px-6 py-4 border-b last:border-0 transition-colors ${coincide ? (isDark ? "bg-indigo-900/30" : "bg-yellow-50") : (isDark ? "hover:bg-slate-950 border-slate-800" : "hover:bg-slate-50 border-slate-50")}`}>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {highlight(carrera.nombre)}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-slate-400">Fac. de {highlight(carrera.facultad)}</span>
                    {carrera.duracion && <span className="text-xs text-slate-400">· {carrera.duracion}</span>}
                    {carrera.creditos && <span className="text-xs text-slate-400">· {carrera.creditos} créditos</span>}
                  </div>
                  {carrera.descripcion && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{carrera.descripcion}</p>}
                </div>

                <div className="flex gap-2 shrink-0">
                  {/* AQUÍ SE HIZO EL CAMBIO DEL BOTÓN AL PDF PARA QUE DIGA "Plan de estudios" */}
                  {carrera.planEstudios && (
                    <a href={carrera.planEstudios} target="_blank" rel="noopener noreferrer" className={`text-xs font-bold px-3 py-1.5 rounded-lg transition border flex items-center gap-1 ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100'}`}>
                      📄 Plan de estudios
                    </a>
                  )}

                  {/* Botón Eliminar Carrera (Solo para Admin) */}
                  {isAdmin && (
                    <button type="button" onClick={() => onEliminarCarrera(carrera.nombre)} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition border flex items-center gap-1 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 cursor-pointer`}>
                      🗑️ Eliminar
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CardUniversidad;