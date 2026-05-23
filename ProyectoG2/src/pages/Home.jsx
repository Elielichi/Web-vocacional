import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const handleStartTest = () => {
    // 3. Reemplaza el console.log por la redirección automática
    navigate('/test');
  };

  // 1. ESTADO PARA EL SLIDER DEL HERO (Imágenes de fondo dinámicas)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Arreglo con URLs de imágenes (puedes cambiarlas por fotos de tu campus o imágenes locales del proyecto)
  const backgroundImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80", // Campus / Estudiantes
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80", // Tecnología / Aprendizaje
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80"  // Orientación / Éxito
  ];

  // Cambiar de imagen automáticamente cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // 5000ms = 5 segundos

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen selection:bg-teal-500 selection:text-white">
      
      {/* =========================================================================
          1. SECCIÓN HERO CON SLIDER DE FONDO AUTOMÁTICO
         ========================================================================= */}
      <header className="relative text-white overflow-hidden py-32 px-6 md:px-12 text-center transition-all duration-1000 ease-in-out">
        
        {/* Capa de Imágenes del Slider con transiciones suaves */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}

        <div className="absolute inset-0 bg-linear-to-tr from-indigo-950 via-blue-900/70 to-teal-900/60 pointer-events-none"></div>

        {/* Contenido del Hero */}
        <div className="relative max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-white/20 backdrop-blur-md text-teal-100 hover:bg-white/30 transition-colors duration-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm">
            🚀 Prepárate para el siguiente nivel
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-teal-100 drop-shadow-sm">
            Diseña tu futuro académico con certeza
          </h1>
          
          <p className="text-lg md:text-2xl font-medium text-blue-100 max-w-2xl mx-auto italic">
            El futuro no se adivina, se planifica. Tu camino profesional empieza con una decisión informada.
          </p>
          
          <div className="pt-4">
            <button 
              onClick={handleStartTest} 
              className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-base font-bold text-white rounded-xl bg-linear-to-br from-teal-300 to-lime-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-xl shadow-teal-950/40"
            >
              <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-slate-900 rounded-xl group-hover:bg-opacity-0">
                🚀 Iniciar Test Vocacional
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. NUEVA SECCIÓN: BARRA DE BÚSQUEDA RÁPIDA (Debajo del Hero)
         ========================================================================= */}
      <section className="bg-linear-to-r from-teal-500 to-emerald-500 text-white py-8 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
              O encuentra la carrera que estás buscando
            </h3>
            <p className="text-sm md:text-base text-teal-50 font-medium">
              Encuentra la información más completa de carreras universitarias, universidades e instituciones.
            </p>
          </div>
          
          {/* Barra de búsqueda interactiva (Input) */}
          <div className="w-full md:w-auto flex-1 max-w-md relative group">
            <input 
              type="text" 
              placeholder="Ej. Ingeniería de Sistemas, Medicina..." 
              className="w-full px-5 py-3.5 pr-12 rounded-xl text-slate-800 bg-white border border-transparent focus:outline-none focus:ring-4 focus:ring-teal-300 shadow-inner font-medium transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-teal-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECCIÓN: ¿QUÉ HACE LA PLATAFORMA Y A QUIÉN DIRIGIDA? (Ancho completo / Full-Width)
         ========================================================================= */}
      {/* Bloque 1: ¿Qué es? */}
      <section className="w-full bg-white border-b border-slate-100 py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            ¿Qué es nuestra plataforma?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-normal">
            Somos una herramienta interactiva diseñada para guiarte en el descubrimiento de tu verdadera vocación. 
            A través de un riguroso cuestionario psicométrico y un análisis de perfil, procesamos tus respuestas para 
            recomendarte las carreras profesionales que mejor se alinean con tus habilidades e intereses.
          </p>
        </div>
      </section>

      {/* Bloque 2: ¿A quién está dirigido? */}
      <section className="w-full bg-slate-100/60 py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-500 rounded-2xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            ¿A quién está dirigido?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-normal">
            Esta plataforma está dirigida principalmente a <strong className="text-indigo-600 font-bold">estudiantes de 5to de secundaria en el Perú</strong>. Sabemos 
            que estás en una etapa de transición crucial, por lo que te ofrecemos un espacio confiable para resolver tus dudas 
            antes de dar el gran salto a la vida universitaria.
          </p>
        </div>
      </section>

      {/* =========================================================================
          4. MISIÓN Y VISIÓN
         ========================================================================= */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-linear-to-br from-slate-50 to-teal-50/20 p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-5 items-start">
            <div className="text-4xl bg-teal-100 p-4 rounded-xl text-teal-600 shrink-0">🎯</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nuestra Misión</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Facilitar el acceso a una orientación vocacional científica, transparente y centralizada para los jóvenes 
                peruanos, reduciendo la deserción universitaria y potenciando el talento humano del país.
              </p>
            </div>
          </div>

          <div className="bg-linear-to-br from-slate-50 to-purple-50/20 p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-5 items-start">
            <div className="text-4xl bg-purple-100 p-4 rounded-xl text-purple-600 shrink-0">👁️‍🗨️</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nuestra Visión</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Convertirnos en el ecosistema digital de orientación y consulta educativa referente en el Perú, 
                destacando por nuestra precisión algorítmica y la actualización de datos financieros y académicos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. BENEFICIOS PARA EL ESTUDIANTE
         ========================================================================= */}
      <section className="max-w-7xl mx-auto py-20 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 mb-12">
          ¿Cómo te beneficias al usar la plataforma?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Beneficio 1 */}
          <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full transition-all group-hover:scale-150 duration-300"></div>
            <div className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-teal-500 to-emerald-500 mb-4">01</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">Autoconocimiento Real</h4>
            <p className="text-slate-600 text-base leading-relaxed">Descubre tus fortalezas cognitivas y áreas de interés mediante un test estructurado.</p>
          </div>

          {/* Beneficio 2 */}
          <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full transition-all group-hover:scale-150 duration-300"></div>
            <div className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-500 mb-4">02</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Directorio Centralizado</h4>
            <p className="text-slate-600 text-base leading-relaxed">Explora un catálogo completo de universidades públicas y privadas de todo el Perú en un solo lugar.</p>
          </div>

          {/* Beneficio 3 */}
          <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full transition-all group-hover:scale-150 duration-300"></div>
            <div className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-pink-500 mb-4">03</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Transparencia Financiera</h4>
            <p className="text-slate-600 text-base leading-relaxed">Evalúa con claridad las escalas de pago, pensiones, matrículas o costos administrativos para tomar una decisión realista.</p>
          </div>
        </div>

        {/* Botón final con animación */}
        <div className="text-center mt-16">
          <button 
            onClick={handleStartTest} 
            className="animate-bounce hover:animate-none inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
          >
            <span>¡Descubrir mi carrera ahora!</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </section>

    </div>
  );
}