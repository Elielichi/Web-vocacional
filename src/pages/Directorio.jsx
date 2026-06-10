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
  const [filtroTipo, setFiltroTipo] = useState("Todas");

  const universidadesFiltradas = universidades.filter((uni) => {
    const texto = busqueda.toLowerCase().trim();

    // Filtro por tipo
    if (filtroTipo !== "Todas" && uni.tipo !== filtroTipo) return false;

    // Filtro por búsqueda
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 py-10 max-w-6xl mx-auto w-full">

        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-700">
          Directorio de Universidades
        </h1>
        <p className="text-center text-slate-500 text-sm mb-8">
          Encuentra la universidad ideal para tu carrera vocacional
        </p>

        {/* Barra de búsqueda + filtros */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto mb-8">
          {/* Buscador */}
          <div className="relative flex-1">
            <input aria-label="text"
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por carrera, universidad o facultad..."
              className="w-full px-5 py-3.5 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-sm text-gray-800 font-medium bg-white"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filtro tipo */}
          <div className="flex gap-2">
            {["Todas", "Privada", "Pública"].map(t => (
              <button type="button"
                key={t}
                onClick={() => setFiltroTipo(t)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filtroTipo === t
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-slate-500 hover:bg-slate-50"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de resultados */}
        {universidadesFiltradas.length > 0 ? (
          <>
            <p className="text-center text-sm text-gray-400 mb-6">
              {universidadesFiltradas.length} universidad{universidadesFiltradas.length !== 1 ? "es" : ""}
              {filtroTipo !== "Todas" ? ` ${filtroTipo.toLowerCase()}` : ""}
              {busqueda ? ` para "${busqueda}"` : " encontrada" + (universidadesFiltradas.length !== 1 ? "s" : "")}
            </p>

            {/* Grid de cards */}
            <div className="space-y-5">
              {universidadesFiltradas.map((uni) => (
                <CardUniversidad
                  key={uni.id}
                  logo={uni.logo}
                  nombre={uni.nombre}
                  tipo={uni.tipo}
                  carreras={uni.carreras}
                  escalas={uni.escalas}
                  webOficial={uni.webOficial}
                  ubicacion={uni.ubicacion}
                  costoMatricula={uni.costoMatricula}
                  busqueda={busqueda}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-semibold">No se encontraron resultados</p>
            <p className="text-sm mt-2">
              Intenta con otro término como "Medicina", "Privada" o "PUCP"
            </p>
            <button type="button"
              onClick={() => { setBusqueda(""); setFiltroTipo("Todas"); }}
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