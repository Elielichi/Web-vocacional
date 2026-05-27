import { useState } from "react";

function CardUniversidad({ nombre, tipo, carreras, busqueda = "" }) {
  const texto = busqueda.toLowerCase().trim();

  const tieneCoincidenciaCarrera = texto
    ? carreras.some((c) =>
        c.nombre.toLowerCase().includes(texto) ||
        c.facultad.toLowerCase().includes(texto)
      )
    : false;

  const [mostrarCarreras, setMostrarCarreras] = useState(tieneCoincidenciaCarrera);

  // ✅ Escape de caracteres especiales para evitar que RegExp explote
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition duration-300">
      <h2 className="text-2xl font-bold text-blue-700">
        {highlight(nombre)}
      </h2>

      <p className="text-gray-600 mt-2 font-medium">
        Tipo:{" "}
        <span className={`font-semibold ${tipo === "Privada" ? "text-purple-600" : "text-green-600"}`}>
          {tipo}
        </span>
      </p>

      <button
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={() => setMostrarCarreras(!mostrarCarreras)}
      >
        {mostrarCarreras ? "Ocultar carreras" : `Ver ${carreras.length} carreras`}
      </button>

      {mostrarCarreras && (
        <div className="mt-5 space-y-3">
          {carreras.map((carrera, index) => {
            const coincide = texto && (
              carrera.nombre.toLowerCase().includes(texto) ||
              carrera.facultad.toLowerCase().includes(texto)
            );
            return (
              <div
                key={index}
                className={`border-b pb-2 ${coincide ? "bg-yellow-50 rounded px-2 border-yellow-200" : ""}`}
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