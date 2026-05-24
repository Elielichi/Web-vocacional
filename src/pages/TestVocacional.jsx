import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // 1. Importamos el contexto global
import Footer from '../components/footer';

export default function TestVocacional() {
  const navigate = useNavigate();
  
  // 2. Extraemos las funciones y estados globales necesarios
  const { setCarreraTemporal, user } = useApp();

  // 1. BANCO DE PREGUNTAS (8 preguntas para robustecer el MVP)
  const preguntas = [
    {
      id: 1,
      pregunta: "¿Qué tipo de actividades te entusiasma más realizar en tu día a día?",
      opciones: [
        { texto: "Resolver acertijos lógicos, programar o entender cómo funcionan las aplicaciones.", categoria: "Sistemas" },
        { texto: "Organizar flujos de trabajo, planificar rutas, optimizar tiempos y liderar equipos.", categoria: "Logistica" },
        { texto: "Ayudar a las personas, entender el cuerpo humano y realizar análisis en laboratorios.", categoria: "Salud" }
      ]
    },
    {
      id: 2,
      pregunta: "Si tuvieras que elegir un proyecto académico para la universidad, ¿cuál preferirías?",
      opciones: [
        { texto: "Diseñar y desplegar una base de datos relacional o simular una red en la nube.", categoria: "Sistemas" },
        { texto: "Analizar la cadena de suministro de una empresa para reducir mermas y costos.", categoria: "Logistica" },
        { texto: "Investigar el desarrollo de un nuevo fármaco o atender pacientes en campañas médicas.", categoria: "Salud" }
      ]
    },
    {
      id: 3,
      pregunta: "¿Qué herramienta o concepto tecnológico te llama más la atención aprender a dominar?",
      opciones: [
        { texto: "Algoritmos de Inteligencia Artificial, contenedores Docker y servidores en la nube (AWS).", categoria: "Sistemas" },
        { texto: "Modelado de procesos en herramientas como BPMN, diagramas UML y metodologías ágiles.", categoria: "Logistica" },
        { texto: "Instrumentación médica de alta precisión, biología celular y bioética.", categoria: "Salud" }
      ]
    },
    {
      id: 4,
      pregunta: "Imagina que hay un problema crítico en una organización, ¿cuál sería tu enfoque para resolverlo?",
      opciones: [
        { texto: "Revisar las líneas de código, logs del servidor o consultas SQL para corregir la falla del sistema.", categoria: "Sistemas" },
        { texto: "Diseñar un diagrama SIPOC o de flujo para identificar en qué parte del proceso se genera el cuello de botella.", categoria: "Logistica" },
        { texto: "Diagnosticar los síntomas con un enfoque metodológico y priorizar la atención de las personas afectadas.", categoria: "Salud" }
      ]
    },
    {
      id: 5,
      pregunta: "¿En qué tipo de entorno laboral te visualizas trabajando en los próximos años?",
      opciones: [
        { texto: "En una empresa de base tecnológica o laboratorio de virtualización, gestionando infraestructura digital.", categoria: "Sistemas" },
        { texto: "En plantas industriales, empresas operadoras logísticas o áreas de gestión estratégica corporativa.", categoria: "Logistica" },
        { texto: "En centros de salud, clínicas, hospitales o centros de investigación científica.", categoria: "Salud" }
      ]
    },
    {
      id: 6,
      pregunta: "¿Qué tipo de lecturas o noticias captan tu atención en redes sociales o internet?",
      opciones: [
        { texto: "Lanzamientos de nuevos frameworks de software, ciberseguridad o tendencias en bases de datos.", categoria: "Sistemas" },
        { texto: "Casos de éxito sobre optimización de recursos, automatización industrial o gestión de inventarios.", categoria: "Logistica" },
        { texto: "Avances científicos en medicina, genética o descubrimientos sobre la salud pública.", categoria: "Salud" }
      ]
    },
    {
      id: 7,
      pregunta: "Cuando trabajas en un equipo multifuncional, ¿qué rol te sale de forma más natural?",
      opciones: [
        { texto: "El especialista técnico que se encarga del modelado de datos, la arquitectura y el desarrollo de la solución.", categoria: "Sistemas" },
        { texto: "El coordinador que diseña el plan de trabajo, controla los indicadores de gestión y mide la eficiencia del grupo.", categoria: "Logistica" },
        { texto: "El integrador empático que vela por el bienestar común, la comunicación y el soporte directo a las necesidades del equipo.", categoria: "Salud" }
      ]
    },
    {
      id: 8,
      pregunta: "Si pudieras automatizar una tarea en la sociedad actual, ¿cuál elegirías?",
      opciones: [
        { texto: "La interconexión y sincronización de datos de manera segura entre distintas entidades del estado.", categoria: "Sistemas" },
        { texto: "El despacho, ruteo rápido y distribución de suministros de emergencia para que lleguen en el menor tiempo posible.", categoria: "Logistica" },
        { texto: "El monitoreo preventivo de signos vitales para alertar de forma temprana sobre riesgos de salud.", categoria: "Salud" }
      ]
    }
  ];

  // 2. ESTADOS DE REACT
  const [currentPregunta, setCurrentPregunta] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [testFinalizado, setTestFinalizado] = useState(false);
  const [resultadoCarrera, setResultadoCarrera] = useState("");

  // 3. MANEJADOR DE SELECCIÓN DE RESPUESTA
  const handleOpcionSeleccionada = (categoria) => {
    const nuevasRespuestas = [...respuestas, categoria];
    setRespuestas(nuevasRespuestas);

    if (currentPregunta < preguntas.length - 1) {
      setCurrentPregunta(currentPregunta + 1);
    } else {
      calcularResultado(nuevasRespuestas);
    }
  };

  // 4. ALGORITMO PARA CALCULAR LA CARRERA CON MAYOR PUNTAJE
  const calcularResultado = (listaRespuestas) => {
    const conteo = listaRespuestas.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    const carreraGanadora = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
    
    const nombresCarreras = {
      Sistemas: "Ingeniería de Sistemas y Computación",
      Logistica: "Ingeniería Industrial / Gestión Logística",
      Salud: "Ciencias de la Salud / Medicina"
    };

    const carreraFinal = nombresCarreras[carreraGanadora];
    setResultadoCarrera(carreraFinal);
    
    // 3. Modificación: Guardamos de forma global el resultado para recuperarlo en el login/registro
    setCarreraTemporal(carreraFinal);
    setTestFinalizado(true);
  };

  // 4. CONTROLADOR DEL ACCESO AL DIRECTORIO DE UNIVERSIDADES
  const handleVerUniversidades = () => {
    if (user) {
      // Si el usuario ya está autenticado en la sesión, avanza al catálogo
      navigate('/directorio');
    } else {
      // Si es un usuario anónimo, lo enviamos a registrarse/iniciar sesión
      navigate('/login');
    }
  };

  // 5. REINICIAR EL TEST
  const reiniciarTest = () => {
    setCurrentPregunta(0);
    setRespuestas([]);
    setTestFinalizado(false);
    setResultadoCarrera("");
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 transition-all duration-500">
        
        {!testFinalizado ? (
          /* =========================================================================
              VISTA DEL CUESTIONARIO (Paso a Paso)
             ========================================================================= */
          <div className="space-y-8 animate-fade-in">
            {/* Barra de Progreso Superior */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                <span className="text-blue-600 uppercase tracking-wider">Test en progreso</span>
                <span>Pregunta {currentPregunta + 1} de {preguntas.length}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-linear-to-r from-blue-600 to-teal-400 h-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentPregunta + 1) / preguntas.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Enunciado de la Pregunta */}
            <div className="space-y-4">
              <span className="inline-block bg-blue-50 text-blue-600 font-extrabold px-3 py-1 rounded-lg text-xs md:text-sm">
                Bloque de Intereses
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {preguntas[currentPregunta].pregunta}
              </h2>
            </div>

            {/* Opciones de Respuesta de Opción Múltiple */}
            <div className="grid gap-4">
              {preguntas[currentPregunta].opciones.map((opcion, index) => (
                <button
                  key={index}
                  onClick={() => handleOpcionSeleccionada(opcion.categoria)}
                  className="w-full text-left bg-slate-50 hover:bg-linear-to-r hover:from-blue-50 hover:to-teal-50 border-2 border-slate-100 hover:border-blue-400 p-5 rounded-2xl font-medium text-slate-700 hover:text-blue-900 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-bold text-sm shrink-0 transition-colors">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-base md:text-lg leading-snug">{opcion.texto}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* =========================================================================
              VISTA DE RESULTADOS (Procesado Exitoso)
             ========================================================================= */
          <div className="text-center space-y-8 animate-bounce-in">
            <div className="inline-flex p-5 bg-teal-50 text-teal-500 rounded-full text-5xl shadow-inner animate-pulse">
              🎉
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                ¡Análisis Completado!
              </h2>
              <p className="text-slate-500 font-medium max-w-md mx-auto">
                Nuestro algoritmo ha procesado tus respuestas basándose en tus habilidades y preferencias declaradas.
              </p>
            </div>

            {/* Tarjeta con la Carrera Recomendada */}
            <div className="bg-linear-to-br from-indigo-900 to-blue-800 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
              <span className="text-teal-300 font-bold text-xs uppercase tracking-widest block mb-2">
                Carrera con mayor afinidad:
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-teal-50 to-teal-200">
                {resultadoCarrera}
              </h3>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={handleVerUniversidades} // Modificado para controlar el flujo de Auth
                className="inline-flex justify-center items-center gap-2 bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-teal-500/20 transform hover:scale-105 transition-all cursor-pointer text-base"
              >
                <span>Ver Universidades en Perú</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <button
                onClick={reiniciarTest}
                className="inline-flex justify-center items-center bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 font-bold px-6 py-4 rounded-xl shadow-sm transition-all cursor-pointer text-base"
              >
                Repetir Cuestionario
              </button>
            </div>
          </div>
        )}
        
      </div>
      
    </div>
    
  );
}
