import { useState } from "react";
import { useApp } from "../context/AppContext";

function CardUniversidad({ logo, nombre, tipo, carreras, busqueda = "" }) {
  // 1. Traemos 'marcarFavoritoContext' desde nuestro estado global
  const { user, marcarFavoritoContext } = useApp();
  const texto = busqueda.toLowerCase().trim();

  const esFavorito = user?.universidadesFavoritas?.includes(nombre) || false;
  const tieneCoincidenciaCarrera = texto
    ? carreras.some((c) =>
        c.nombre.toLowerCase().includes(texto) ||
        c.facultad.toLowerCase().includes(texto)
      )
    : false;

  const [mostrarCarreras, setMostrarCarreras] = useState(tieneCoincidenciaCarrera);

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

  // 2. Redirigimos el click a la lógica del Contexto global
  const handleToggleFavorito = () => {
    if (!user) return alert("Debes iniciar sesión para guardar favoritos");
    marcarFavoritoContext(nombre);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition duration-300 relative">
      
      {/* SECCIÓN SUPERIOR: Nombre y Logo */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-700">
            {highlight(nombre)}
          </h2>
          <p className="text-gray-600 mt-2 font-medium">
            Tipo:{" "}
            <span className={`font-semibold ${tipo === "Privada" ? "text-purple-600" : "text-green-600"}`}>
              {tipo}
            </span>
          </p>
        </div>

        {logo && (
          <img 
            src={logo} 
            alt={`Logo de ${nombre}`} 
            className="w-16 h-16 object-contain rounded-lg p-1 bg-gray-50 shrink-0"
          />
        )}
      </div>

      {/* SECCIÓN INFERIOR: Botón de carreras y Botón de Favorito alineados */}
      <div className="mt-5 flex justify-between items-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          onClick={() => setMostrarCarreras(!mostrarCarreras)}
        >
          {mostrarCarreras ? "Ocultar carreras" : `Ver ${carreras.length} carreras`}
        </button>

        {/* Botón Favorito estilo cápsula / contenedor alargado en la esquina inferior derecha */}
        {user && user.rol !== "Profesor" && (
          <button
            onClick={handleToggleFavorito}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-all duration-200 transform active:scale-95 select-none focus:outline-none group"
            title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <span className={`text-xs font-bold transition-colors duration-200 ${
              esFavorito ? "text-red-400" : "text-purple-400"
            }`}>
              Favorito
            </span>
            
            {/* Ícono de Corazón SVG dinámico (Línea o Relleno) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className={`w-6 h-6 transition-all duration-200 transform group-hover:scale-110 ${
                esFavorito 
                  ? "fill-red-500 stroke-red-500 drop-shadow-[0_2px_4px_rgba(239,68,68,0.3)]" 
                  : "fill-none stroke-slate-400 group-hover:stroke-slate-600"
              }`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        )}
      </div>

      {/* DESPLEGABLE DE CARRERAS */}
      {mostrarCarreras && (
        <div className="mt-5 space-y-3 pt-4 border-t border-gray-100">
          {carreras.map((carrera, index) => {
            const coincide = texto && (
              carrera.nombre.toLowerCase().includes(texto) ||
              carrera.facultad.toLowerCase().includes(texto)
            );
            return (
              <div
                key={index}
                className={`border-b pb-2 last:border-none ${coincide ? "bg-yellow-50 rounded px-2 border-yellow-200" : ""}`}
              >
                <p className="font-semibold text-gray-800">
                  {highlight(carrera.nombre)}
                </p>
                <p className="text-sm text-gray-500">
                  Facultad de {highlight(carrera.facultad)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CardUniversidad;