import { useState } from "react";
import { useLocation } from "react-router-dom";
import CardUniversidad from "../components/CardUniversidad";
import universidades from "../data/universidades";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Directorio() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryInicial = params.get("q") || "";

  const [busqueda, setBusqueda] = useState(queryInicial);

  const universidadesFiltradas = universidades.filter((uni) => {
    const texto = busqueda.toLowerCase().trim();
    if (!texto) return true;

    const coincideNombre = uni.nombre.toLowerCase().includes(texto);
    const coincideTipo = uni.tipo.toLowerCase().includes(texto);
    const coincideCarrera = uni.carreras.some((c) =>
      c.nombre.toLowerCase().includes(texto) ||
      c.facultad.toLowerCase().includes(texto)
    );

    return coincideNombre || coincideTipo || coincideCarrera;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow p-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">
          Directorio de Universidades
        </h1>

        {/* Buscador */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por carrera, universidad o facultad..."
            className="w-full px-5 py-3.5 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-sm text-gray-800 font-medium"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Resultados */}
        {universidadesFiltradas.length > 0 ? (
          <>
            <p className="text-center text-sm text-gray-500 mb-6">
              {universidadesFiltradas.length} universidad{universidadesFiltradas.length !== 1 ? "es" : ""} encontrada{universidadesFiltradas.length !== 1 ? "s" : ""}
              {busqueda && ` para "${busqueda}"`}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {universidadesFiltradas.map((uni, index) => (
                <CardUniversidad
                  key={index}
                  nombre={uni.nombre}
                  tipo={uni.tipo}
                  carreras={uni.carreras}
                  busqueda={busqueda}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-semibold">No se encontraron resultados</p>
            <p className="text-sm mt-2">Intenta con otro término como "Medicina", "Privada" o "PUCP"</p>
            <button
              onClick={() => setBusqueda("")}
              className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              Ver todas las universidades
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Directorio;