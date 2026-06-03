import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const equivalenciasCarreras = {
  "Ingeniería de Sistemas y Computación": [
    {
      universidad: "Universidad de Lima",
      tipo: "Privada",
      costoAproximado: "S/. 2,500 - S/. 4,200 mensual",
      escalaPagos: "5 escalas según colegio de procedencia",
      mallaUrl: "https://www.ulima.edu.pe/sites/default/files/career/files/plan_de_estudios_eegg-2026-1.pdf",
      masInfoUrl: "https://www.ulima.edu.pe/pregrado/ingenieria-de-sistemas", // Enlace informativo añadido
      destacado: true
    },
    {
      universidad: "Universidad Nacional Mayor de San Marcos",
      tipo: "Pública",
      costoAproximado: "Gratuita (Costo administrativo mínimo)",
      escalaPagos: "No aplica",
      mallaUrl: "https://www.scribd.com/document/357167816/Plan-de-estudios-Ingenieria-de-Sistemas-UNMSM-pdf",
      masInfoUrl: "https://fisi.unmsm.edu.pe/html/sistemas.html",
      destacado: false
    },
    {
      universidad: "UTP (Universidad Tecnológica del Perú)",
      tipo: "Privada",
      costoAproximado: "S/. 850 - S/. 1,200 mensual",
      escalaPagos: "Turno y sede dependiente",
      mallaUrl: "https://www.utp.edu.pe/sites/default/files/mallas/MALLA_Ingenieria_de_Sistemas_e_Informatica_0.pdf",
      masInfoUrl: "https://www.utp.edu.pe/carreras/ingenieria-de-sistemas-e-informatica",
      destacado: false
    }
  ],
  "Ingeniería Industrial": [
    {
      universidad: "Pontificia Universidad Católica del Perú",
      tipo: "Privada",
      costoAproximado: "S/. 1,800 - S/. 3,500 mensual",
      escalaPagos: "7 escalas según evaluación socioeconómica",
      mallaUrl: "https://facultad-ciencias-ingenieria.pucp.edu.pe/wp-content/uploads/2026/03/ppee_INDUSTRIAL-2026-1.pdf",
      masInfoUrl: "https://pucp.edu.pe/carrera/ingenieria-industrial/",
      destacado: true
    },
    {
      universidad: "Universidad de Lima",
      tipo: "Privada",
      costoAproximado: "S/. 2,500 - S/. 4,200 mensual",
      escalaPagos: "5 escalas",
      mallaUrl: "https://www.ulima.edu.pe/sites/default/files/career/files/ingenieria_industrial_plan_de_estudios.pdf",
      masInfoUrl: "https://www.ulima.edu.pe/pregrado/ingenieria-industrial",
      destacado: false
    },
    {
      universidad: "Universidad Nacional de Ingeniería",
      tipo: "Pública",
      costoAproximado: "Gratuita (Costo administrativo mínimo)",
      escalaPagos: "No aplica",
      mallaUrl: "https://acreditacion.uni.edu.pe/es/industrial/curriculum/",
      masInfoUrl: "https://portal.uni.edu.pe/index.php/facultades/ingenieria-industrial-y-de-sistemas",
      destacado: false
    }
  ],
  "Medicina": [
    {
      universidad: "Universidad Peruana Cayetano Heredia",
      tipo: "Privada",
      costoAproximado: "S/. 2,000 - S/. 3,800 mensual",
      escalaPagos: "Escalas diferenciadas por evaluación",
      mallaUrl: "https://medicina.cayetano.edu.pe/wp-content/uploads/sites/2/2025/07/plan_de_estudios-MEDICINA-2024.pdf",
      masInfoUrl: "https://cayetano.edu.pe/pregrado/medicina/",
      destacado: true
    },
    {
      universidad: "Universidad Nacional Mayor de San Marcos",
      tipo: "Pública",
      costoAproximado: "Gratuita (Costo administrativo mínimo)",
      escalaPagos: "No aplica",
      mallaUrl: "https://medicina.unmsm.edu.pe/wp-content/uploads/2021/06/PLAN-CURRICULAR-EP-MEDICINA.pdf",
      masInfoUrl: "https://medicina.unmsm.edu.pe/escuela-profesional-de-medicina-humana/",
      destacado: false
    },
    {
      universidad: "Universidad San Martín de Porres",
      tipo: "Privada",
      costoAproximado: "S/. 1,500 - S/. 2,800 mensual",
      escalaPagos: "4 escalas",
      mallaUrl: "https://medicina.usmp.edu.pe/wp-content/uploads/transparencia/CBC-VII/MV8/RR.459-2025-CU-R-USMP-CURRICULO_FMH-2025_ve2.pdf",
      masInfoUrl: "https://medicina.usmp.edu.pe/",
      destacado: false
    }
  ],
  "Derecho": [
    {
      universidad: "Pontificia Universidad Católica del Perú",
      tipo: "Privada",
      costoAproximado: "S/. 1,800 - S/. 3,500 mensual",
      escalaPagos: "7 escalas",
      mallaUrl: "https://facultad-derecho.pucp.edu.pe/wp-content/uploads/2022/08/malla-curricular.pdf",
      masInfoUrl: "https://pucp.edu.pe/carrera/derecho/",
      destacado: true
    },
    {
      universidad: "Universidad Nacional Mayor de San Marcos",
      tipo: "Pública",
      costoAproximado: "Gratuita",
      escalaPagos: "No aplica",
      mallaUrl: "https://derecho2.unmsm.edu.pe/ddocus/ANEXO%20RR%2007023-R-170001.pdf",
      masInfoUrl: "https://derecho.unmsm.edu.pe/",
      destacado: false
    }
  ],
  "Arquitectura": [
    {
      universidad: "Universidad de Lima",
      tipo: "Privada",
      costoAproximado: "S/. 2,500 - S/. 4,200 mensual",
      escalaPagos: "5 escalas",
      mallaUrl: "https://www.ulima.edu.pe/sites/default/files/career/files/7000_plan_de_estudios_2026-1.pdf",
      masInfoUrl: "https://www.ulima.edu.pe/pregrado/arquitectura",
      destacado: true
    },
    {
      universidad: "Universidad Nacional de Ingeniería",
      tipo: "Pública",
      costoAproximado: "Gratuita",
      escalaPagos: "No aplica",
      mallaUrl: "https://portal.uni.edu.pe/index.php/facultades/arquitectura-urbanismo-y-artes/arquitectura",
      masInfoUrl: "https://faua.uni.edu.pe/",
      destacado: false
    }
  ]
};

const procesarResultadosAsincronos = async (listaRespuestas) => {
    setIsLoading(true);

    try {
      // Simulación del procesamiento del algoritmo
      await new Promise((resolve) => setTimeout(resolve, 2200));

      const conteo = listaRespuestas.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});

      const areaGanadora = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);

      // Mapeo completo de las carreras según la categoría ganadora
      const nombresMacroAreas = {
        Tecnologia: "Ingeniería de Sistemas y Computación",
        Negocios_Finanzas: "Ingeniería Industrial",
        Salud_Bienestar: "Medicina",
        Humanidades_Leyes: "Derecho",
        Diseno_Construccion: "Arquitectura"
      };

      const carreraCalculada = nombresMacroAreas[areaGanadora] || "Ingeniería de Sistemas y Computación";

      // BÚSQUEDA DINÁMICA
      const infoCarrera = buscarCarreraGlobal(carreraCalculada);
      const carreraFinalAAsignar = infoCarrera ? infoCarrera.nombre : carreraCalculada;

      // =======================================================
      // 🔥 SOLUCIÓN: ESCRITURA HÍBRIDA Y ESPERA ASÍNCRONA
      // =======================================================
      
      // 1. Forzamos la actualización local SIEMPRE (para que la UI no lea caché vieja)
      if (typeof setCarreraTemporal === 'function') {
        setCarreraTemporal(carreraFinalAAsignar);
      }
      localStorage.setItem('carreraTemporal', carreraFinalAAsignar);

      // 2. Si está logueado, aseguramos la persistencia oficial en el servidor
      if (user) {
        if (typeof guardarResultadoTest === 'function') {
          // ⚠️ AGREGADO 'await': Detiene la navegación hasta que el contexto se actualice con el nuevo resultado
          await guardarResultadoTest(carreraFinalAAsignar); 
        }
      }

      // 3. Ahora que todo está guardado y actualizado en caliente, cambiamos de pantalla
      navigate('/resultado-test');

    } catch (error) {
      console.error(error);
      alert("Hubo un problema al procesar tus respuestas.");
    } finally {
      setIsLoading(false);
    }
  };



const ResultadoTest = () => {
  const navigate = useNavigate();
  const { carreraTemporal } = useApp();

  // 🛠️ Estado dinámico inicializado con prioridad limpia
  const [carreraFinal, setCarreraFinal] = useState(() => {
    return carreraTemporal || localStorage.getItem('carreraTemporal') || "Ingeniería de Sistemas y Computación";
  });

  // 🛠️ Sincronizar el estado de la pantalla cada vez que la carrera cambie en el Contexto o Storage
  useEffect(() => {
    const ultimaCarrera = carreraTemporal || localStorage.getItem('carreraTemporal');
    if (ultimaCarrera) {
      setCarreraFinal(ultimaCarrera);
    }
  }, [carreraTemporal]);

  const universidadesRecomendadas = equivalenciasCarreras[carreraFinal] || [];

  const abrirEnlaceExterno = (url) => {
    if (url && url !== "#") {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("El enlace no está disponible en este momento.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100 text-center">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Resultado Oficial
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">
            ¡Tu perfil está listo!
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto mb-4">
            Basado en tus respuestas analizadas, tienes una alta afinidad y potencial para la carrera de:
          </p>
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl md:text-2xl font-bold px-6 py-3 rounded-xl shadow-md">
            {carreraFinal}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Opciones recomendadas en Perú
          </h2>
          <p className="text-sm text-gray-500">
            Mostrando {universidadesRecomendadas.length} universidades estratégicas para tu carrera.
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          {universidadesRecomendadas.length > 0 ? (
            universidadesRecomendadas.map((uni, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl shadow-sm p-5 border transition-all ${
                  uni.destacado ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900">{uni.universidad}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                        uni.tipo === 'Privada' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {uni.tipo}
                      </span>
                      {uni.destacado && (
                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-md font-semibold">
                          Sugerido
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      <p><span className="font-semibold text-gray-700">Inversión aprox:</span> {uni.costoAproximado}</p>
                      <p><span className="font-semibold text-gray-700">Estructura de costos:</span> {uni.escalaPagos}</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 justify-end">
                    <button 
                      onClick={() => abrirEnlaceExterno(uni.mallaUrl)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      Ver Malla Curricular
                    </button>
                    <button 
                      onClick={() => abrirEnlaceExterno(uni.masInfoUrl)}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Más detalles
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300 text-gray-500">
              No se encontraron universidades de respaldo estático pre-mapeadas para la carrera "{carreraFinal}".
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-gray-200 pt-6">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2 transition-colors cursor-pointer"
          >
            Volver al Inicio
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('carreraTemporal');
              navigate('/test');
            }}
            className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Repetir Cuestionario
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultadoTest;