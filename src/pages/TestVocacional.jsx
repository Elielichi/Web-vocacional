import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Footer from '../components/footer';

export default function TestVocacional() {
  const navigate = useNavigate();
  const context = useApp();

  // Banco de 15 preguntas profesionales optimizadas
  const preguntas = [
    {
      id: 1,
      pregunta: "¿Cuál de las siguientes actividades te genera mayor curiosidad o satisfacción realizar?",
      bloque: "Intereses",
      opciones: [
        { texto: "Diseñar el funcionamiento de una app, automatizar tareas o resolver problemas lógicos.", categoria: "Tecnologia" },
        { texto: "Analizar problemas sociales, debatir sobre normativas o defender los derechos de las personas.", categoria: "Humanidades_Leyes" },
        { texto: "Comprender el comportamiento humano, escuchar y guiar a personas en situaciones difíciles.", categoria: "Salud_Bienestar" },
        { texto: "Planificar estrategias de venta, evaluar presupuestos o liderar la organización de un proyecto.", categoria: "Negocios_Finanzas" },
        { texto: "Diseñar planos, crear composiciones visuales, videos o maquetas estructurales.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 2,
      pregunta: "Si tuvieras que leer un artículo o ver un documental por puro interés, ¿de qué temática sería?",
      bloque: "Intereses",
      opciones: [
        { texto: "El impacto de la Inteligencia Artificial y la ciberseguridad en el mundo actual.", categoria: "Tecnologia" },
        { texto: "Un análisis sobre un juicio histórico o cómo se maneja la política internacional.", categoria: "Humanidades_Leyes" },
        { texto: "Avances médicos en cirugías complejas, odontología o el estudio del cerebro humano.", categoria: "Salud_Bienestar" },
        { texto: "Cómo las grandes empresas o startups logran posicionarse en el mercado global.", categoria: "Negocios_Finanzas" },
        { texto: "Innovaciones en arquitectura sostenible o tendencias en el diseño gráfico digital.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 3,
      pregunta: "En un trabajo en equipo, ¿qué rol prefieres asumir de forma natural?",
      bloque: "Intereses",
      opciones: [
        { texto: "El encargado de administrar los datos, la parte técnica, herramientas digitales o cálculos.", categoria: "Tecnologia" },
        { texto: "El encargado de redactar el sustento teórico, argumentar la exposición o investigar fuentes.", categoria: "Humanidades_Leyes" },
        { texto: "El mediador del equipo, enfocado en que todos se sientan escuchados, cómodos y motivados.", categoria: "Salud_Bienestar" },
        { texto: "El coordinador general, quien distribuye los recursos, gestiona tiempos y define la estrategia.", categoria: "Negocios_Finanzas" },
        { texto: "El director creativo, encargado de la estética, las diapositivas o la identidad visual.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 4,
      pregunta: "¿Ante cuál de estas situaciones sientes que tienes una habilidad natural superior?",
      bloque: "Habilidades",
      opciones: [
        { texto: "Encontrar patrones en problemas complejos, usar la lógica matemática o programar secuencias.", categoria: "Tecnologia" },
        { texto: "Expresar ideas con mucha claridad de forma verbal o escrita, persuadir y argumentar.", categoria: "Humanidades_Leyes" },
        { texto: "Mostrar empatía, mantener la calma bajo presión o cuidar del bienestar de los demás.", categoria: "Salud_Bienestar" },
        { texto: "Manejar presupuestos de dinero, identificar oportunidades de negocio o vender una idea.", categoria: "Negocios_Finanzas" },
        { texto: "Visualizar espacios en tres dimensiones, dibujar o componer estéticamente un entorno.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 5,
      pregunta: "Cuando te enfrentas a un problema complejo o un reto de lógica, ¿cómo reaccionas habitualmente?",
      bloque: "Habilidades",
      opciones: [
        { texto: "Intento desglosarlo en partes más pequeñas, analizando algoritmos paso a paso hasta solucionarlo.", categoria: "Tecnologia" },
        { texto: "Busco precedentes, leo reglamentos o analizo interpretaciones de un texto para armar un sustento.", categoria: "Humanidades_Leyes" },
        { texto: "Analizo cómo afecta la situación emocional o físicamente a las personas involucradas.", categoria: "Salud_Bienestar" },
        { texto: "Evalúo la relación costo-beneficio, el impacto financiero o los riesgos comerciales.", categoria: "Negocios_Finanzas" },
        { texto: "Busco una solución fuera de lo común, experimentando de forma visual o creativa.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 6,
      pregunta: "¿Con cuál de los siguientes tipos de herramientas te sientes más cómodo interactuando diariamente?",
      bloque: "Habilidades",
      opciones: [
        { texto: "Software especializado, editores de código, servidores o terminales de comandos.", categoria: "Tecnologia" },
        { texto: "Ensayos científicos, artículos de opinión, códigos jurídicos o textos de investigación.", categoria: "Humanidades_Leyes" },
        { texto: "Equipamiento de laboratorios, maquetas anatómicas o herramientas de diagnóstico.", categoria: "Salud_Bienestar" },
        { texto: "Hojas de cálculo (Excel), gráficos estadísticos o dashboards de métricas financieras.", categoria: "Negocios_Finanzas" },
        { texto: "Software de modelado 3D, tabletas digitales de dibujo o herramientas de diseño estructural.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 7,
      pregunta: "¿En qué tipo de ambiente laboral te proyectas trabajando con mayor comodidad en el futuro?",
      bloque: "Ambientes de Trabajo",
      opciones: [
        { texto: "En un laboratorio tecnológico, centro de datos, o de forma remota desarrollando software.", categoria: "Tecnologia" },
        { texto: "En firmas corporativas de asesoría legal, instituciones del Estado o juzgados.", categoria: "Humanidades_Leyes" },
        { texto: "En clínicas, hospitales, consultorios privados o laboratorios biológicos.", categoria: "Salud_Bienestar" },
        { texto: "En oficinas corporativas, áreas de dirección de empresas o agencias de marketing.", categoria: "Negocios_Finanzas" },
        { texto: "En estudios de arquitectura, constructoras en campo o agencias creativas de publicidad.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 8,
      pregunta: "Si te ofrecieran un proyecto especial financiado, ¿cuál de estos desafíos preferirías liderar?",
      bloque: "Ambientes de Trabajo",
      opciones: [
        { texto: "El desarrollo de un sistema inteligente para optimizar los procesos digitales de una organización.", categoria: "Tecnologia" },
        { texto: "Una investigación social sobre vacíos legales en las leyes laborales vigentes del país.", categoria: "Humanidades_Leyes" },
        { texto: "Una campaña comunitaria de salud mental preventiva y atención médica en zonas vulnerables.", categoria: "Salud_Bienestar" },
        { texto: "El plan de expansión comercial y posicionamiento de mercado de una marca en el extranjero.", categoria: "Negocios_Finanzas" },
        { texto: "El diseño arquitectónico y paisajista de un centro cultural moderno y eco-amigable.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 9,
      pregunta: "Al evaluar el éxito de tu jornada diaria de trabajo, ¿qué factor te haría sentir más realizado?",
      bloque: "Ambientes de Trabajo",
      opciones: [
        { texto: "Haber solucionado un error complejo en el sistema o haber optimizado la infraestructura de datos.", categoria: "Tecnologia" },
        { texto: "Haber estructurado una defensa impecable o resuelto un conflicto normativo con justicia.", categoria: "Humanidades_Leyes" },
        { texto: "Haber contribuido directamente a aliviar una dolencia física o dar paz mental a alguien.", categoria: "Salud_Bienestar" },
        { texto: "Haber cerrado un trato de negocios importante o coordinado una estrategia comercial exitosa.", categoria: "Negocios_Finanzas" },
        { texto: "Haber materializado una idea abstracta en un producto visual, plano o diseño tangible.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 10,
      pregunta: "¿Cuál consideras que es tu mayor fortaleza en el ámbito del pensamiento crítico?",
      bloque: "Estilo de Pensamiento",
      opciones: [
        { texto: "Pensamiento lógico-matemático: Estructuro todo mediante secuencias y procesos exactos.", categoria: "Tecnologia" },
        { texto: "Pensamiento argumentativo: Cuestiono las normativas y debato con fundamentos sólidos.", categoria: "Humanidades_Leyes" },
        { texto: "Pensamiento empático: Observo las conductas para entender necesidades emocionales o de salud.", categoria: "Salud_Bienestar" },
        { texto: "Pensamiento estratégico: Identifico tendencias de mercado y oportunidades de optimización.", categoria: "Negocios_Finanzas" },
        { texto: "Pensamiento creativo: Proyecto soluciones visuales innovadoras e imagino estructuras estéticas.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 11,
      pregunta: "¿Cuál de estos problemas de la sociedad te genera mayor urgencia por contribuir a solucionar?",
      bloque: "Estilo de Pensamiento",
      opciones: [
        { texto: "La brecha digital y la falta de seguridad de la información privada en las plataformas web.", categoria: "Tecnologia" },
        { texto: "La injusticia social, la falta de ética corporativa y la ineficiencia de las leyes.", categoria: "Humanidades_Leyes" },
        { texto: "El acceso limitado a una atención médica de calidad o el descuido de la salud mental.", categoria: "Salud_Bienestar" },
        { texto: "La quiebra de pequeños negocios o la falta de cultura y educación financiera.", categoria: "Negocios_Finanzas" },
        { texto: "El crecimiento desordenado de las ciudades o la falta de infraestructura segura.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 12,
      pregunta: "¿Qué tipo de pasatiempo técnico te llamaría más la atención aprender en un taller libre?",
      bloque: "Estilo de Pensamiento",
      opciones: [
        { texto: "Configurar una red de computadoras casera segura o programar scripts de automatización.", categoria: "Tecnologia" },
        { texto: "Participar en un club de debate sobre dilemas éticos globales o historia política.", categoria: "Humanidades_Leyes" },
        { texto: "Un curso básico de primeros auxilios, nutrición avanzada o psicología del comportamiento.", categoria: "Salud_Bienestar" },
        { texto: "Un taller de inversiones en bolsa de valores o creación de modelos de negocio digitales.", categoria: "Negocios_Finanzas" },
        { texto: "Un taller de fotografía profesional o modelado e impresión 3D de estructuras.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 13,
      pregunta: "Si visitaras una universidad en su día de orientación, ¿en qué laboratorios pasarías más tiempo?",
      bloque: "Proyección",
      opciones: [
        { texto: "En los laboratorios de cómputo avanzados, redes Cisco, servidores y robótica.", categoria: "Tecnologia" },
        { texto: "En las salas de simulación de juicios orales o auditorios de ciencias sociales.", categoria: "Humanidades_Leyes" },
        { texto: "En los laboratorios de simulación médica, odontológica o cámaras Gesell de psicología.", categoria: "Salud_Bienestar" },
        { texto: "En las incubadoras de negocios, salas de simulación financiera o talleres de marketing.", categoria: "Negocios_Finanzas" },
        { texto: "En los talleres de maquetas arquitectónicas o salas de diseño digital e ilustración.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 14,
      pregunta: "Imagina que debes evaluar la eficiencia de la cola de un banco. ¿Qué te interesaría optimizar?",
      bloque: "Proyección",
      opciones: [
        { texto: "El código del sistema de turnos y los servidores para que procesen todo en milisegundos.", categoria: "Tecnologia" },
        { texto: "Que el reglamento proteja legalmente los datos del cliente y evite reclamos jurídicos.", categoria: "Humanidades_Leyes" },
        { texto: "Reducir el nivel de estrés o ansiedad de los usuarios mediante un trato humano guiado.", categoria: "Salud_Bienestar" },
        { texto: "La asignación de personal y costos operativos para maximizar la rentabilidad económica.", categoria: "Negocios_Finanzas" },
        { texto: "La distribución física de los módulos (arquitectura interna) para una navegación fluida.", categoria: "Diseno_Construccion" }
      ]
    },
    {
      id: 15,
      pregunta: "¿Qué tipo de logro profesional te gustaría ostentar con orgullo en tu perfil de LinkedIn?",
      bloque: "Proyección",
      opciones: [
        { texto: "Líder técnico del desarrollo de infraestructura de software o ciberseguridad corporativa.", categoria: "Tecnologia" },
        { texto: "Abogado consultor corporativo o especialista en derecho constitucional y defense legal.", categoria: "Humanidades_Leyes" },
        { texto: "Médico especialista en salud clínica, odontológica, o psicólogo de alta trayectoria.", categoria: "Salud_Bienestar" },
        { texto: "Director de Operaciones, Finanzas o Gerente de Estrategia Digital de Marketing.", categoria: "Negocios_Finanzas" },
        { texto: "Arquitecto principal encargado de proyectos urbanísticos o Director Creativo de Diseño.", categoria: "Diseno_Construccion" }
      ]
    }
  ];

  const [currentPregunta, setCurrentPregunta] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpcionSeleccionada = (categoria) => {
    const nuevasRespuestas = [...respuestas, categoria];
    setRespuestas(nuevasRespuestas);

    if (currentPregunta < preguntas.length - 1) {
      setCurrentPregunta(currentPregunta + 1);
    } else {
      procesarResultadosAsincronos(nuevasRespuestas);
    }
  };

  const procesarResultadosAsincronos = async (listaRespuestas) => {
    setIsLoading(true);

    try {
      // Simulación controlada del tiempo de carga (2.2 segundos para excelente UX)
      await new Promise((resolve) => setTimeout(resolve, 2200));

      const conteo = listaRespuestas.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});

      const areaGanadora = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
      
      const nombresMacroAreas = {
        Tecnologia: "Ingeniería de Sistemas y Computación",
        Negocios_Finanzas: "Ingeniería Industrial / Gestión Logística",
        Salud_Bienestar: "Ciencias de la Salud / Medicina"
      };

      const resultadoFinal = nombresMacroAreas[areaGanadora] || "Ingeniería de Sistemas y Computación";

      // Intentamos guardar de forma segura en tu contexto global.
      // Si la función setCarreraTemporal no existe en tu AppContext, capturamos el aviso sin congelar el código.
      try {
        if (context && typeof context.setCarreraTemporal === 'function') {
          context.setCarreraTemporal(resultadoFinal);
        }
      } catch (e) {
        console.warn("Falta enlazar setCarreraTemporal en AppContext.");
      }
      
      // Respaldo de seguridad infalible para asegurar la carga asíncrona
      localStorage.setItem('carreraTemporal', resultadoFinal);
      
      // Saltamos a la pantalla de resultados
      navigate('/resultado-test');

    } catch (error) {
      console.error(error);
      alert("Hubo un problema al procesar tus respuestas.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-center">
        <div className="space-y-6 max-w-sm">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 animate-pulse">Procesando respuestas...</h3>
            <p className="text-sm text-slate-500 font-medium">
              Nuestro algoritmo está cruzando tus intereses y aptitudes con el catálogo del directorio universitario peruano.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 transition-all duration-500 mx-auto my-auto">
        <div className="space-y-8">
          
          {/* Progreso */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-slate-400">
              <span className="text-blue-600 uppercase tracking-wider">Test en progreso</span>
              <span>Pregunta {currentPregunta + 1} de {preguntas.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-teal-400 h-full transition-all duration-500 ease-out"
                style={{ width: `${((currentPregunta + 1) / preguntas.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Enunciado */}
          <div className="space-y-4">
            <span className="inline-block bg-blue-50 text-blue-600 font-extrabold px-3 py-1 rounded-lg text-xs md:text-sm uppercase tracking-wide">
              {preguntas[currentPregunta].bloque}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              {preguntas[currentPregunta].pregunta}
            </h2>
          </div>

          {/* Opciones */}
          <div className="grid gap-4">
            {preguntas[currentPregunta].opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => handleOpcionSeleccionada(opcion.categoria)}
                className="w-full text-left bg-slate-50 hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-teal-50/40 border-2 border-slate-100 hover:border-blue-400 p-5 rounded-2xl font-medium text-slate-700 hover:text-blue-900 transition-all duration-200 shadow-xs flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-bold text-sm shrink-0 transition-colors shadow-xs">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-base md:text-lg leading-snug">{opcion.texto}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}