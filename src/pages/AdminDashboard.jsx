import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/navbar';
import CardUniversidad from '../components/CardUniversidad';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, salas, crearSala, cerrarSala, abrirSala, eliminarSala, universidades, agregarUniversidad, eliminarUniversidad, eliminarCarrera, editarUsuario, eliminarUsuario } = useApp();
  const [tab, setTab] = useState('salas');
  
  const [nombreSala, setNombreSala] = useState('');
  const [codigoSala, setCodigoSala] = useState('');
  const [pinSala, setPinSala] = useState(''); 

  const [listaUsuarios, setListaUsuarios] = useState(() => JSON.parse(localStorage.getItem('vocatest_usuarios:v1') ?? localStorage.getItem('vocatest_usuarios') ?? '[]'));
  const [editandoId, setEditandoId] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState({});

  const [mostrarModalUni, setMostrarModalUni] = useState(false);
  const [formUni, setFormUni] = useState({ nombre: '', tipo: 'Privada', logo: null, carreras: [] });
  const [carreraTemp, setCarreraTemp] = useState({ nombre: '', facultad: '', planEstudios: null });

  const [modalPin, setModalPin] = useState({ visible: false, sala: null, pin: '' });
  const [errorPin, setErrorPin] = useState('');
  const [modalUsuario, setModalUsuario] = useState({ visible: false, id: null, nombre: '' });
  const [modalUni, setModalUni] = useState({ visible: false, nombre: '' });
  const [modalCarrera, setModalCarrera] = useState({ visible: false, uni: '', carrera: '' });

  if (!user || (user.rol !== 'Admin' && user.rol !== 'Profesor')) {
    return <div className="p-10 text-center text-red-500 font-bold">Acceso denegado. Área exclusiva para Docentes y Administradores.</div>;
  }

  const esAdmin = user.rol === 'Admin';

  const theme = {
    bgMain: esAdmin ? "bg-slate-950 text-slate-300" : "bg-slate-50 text-slate-800",
    headerText: esAdmin ? "text-white" : "text-slate-900",
    headerSub: esAdmin ? "text-slate-500" : "text-slate-500",
    cardBg: esAdmin ? "bg-slate-900 border border-slate-800" : "bg-white border border-slate-200 shadow-xl",
    cardTitle: esAdmin ? "text-white" : "text-slate-800",
    inputBg: esAdmin ? "bg-slate-950 border-slate-800 text-white focus:ring-indigo-500" : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-blue-500",
    btnPrimary: esAdmin ? "bg-indigo-600 hover:bg-indigo-500" : "bg-blue-600 hover:bg-blue-700",
    navBg: esAdmin ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm",
    btnTabActive: esAdmin ? "bg-indigo-600 text-white" : "bg-blue-600 text-white",
    btnTabInactive: esAdmin ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600",
    itemBg: esAdmin ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
  };

  const handleCrearSala = (e) => {
    e.preventDefault();
    if (nombreSala && pinSala.length === 4) {
      crearSala(nombreSala, codigoSala, pinSala);
      setNombreSala('');
      setCodigoSala('');
      setPinSala('');
    } else {
      alert("Debes asignar un PIN de 4 dígitos.");
    }
  };

  const iniciarBorradoSala = (sala) => {
    setModalPin({ visible: true, sala: sala, pin: '' });
    setErrorPin('');
  };

  const confirmarBorradoSala = () => {
    const { sala, pin } = modalPin;
    if (pin === sala.pin || (esAdmin && pin === "0000")) {
      eliminarSala(sala.codigo);
      setModalPin({ visible: false, sala: null, pin: '' }); 
    } else {
      setErrorPin("PIN incorrecto. Intenta de nuevo."); 
    }
  };

  const iniciarEdicion = (u) => {
    setEditandoId(u.id);
    setDatosEdicion({ nombres: u.nombres, apellidos: u.apellidos, rol: u.rol, correo: u.correo });
  };
  const guardarEdicion = (id) => {
    editarUsuario(id, datosEdicion);
    setListaUsuarios(listaUsuarios.map(u => u.id === id ? { ...u, ...datosEdicion } : u));
    setEditandoId(null);
  };
  const confirmarBorrarUsuario = () => {
    eliminarUsuario(modalUsuario.id);
    setListaUsuarios(listaUsuarios.filter(u => u.id !== modalUsuario.id));
    setModalUsuario({ visible: false, id: null, nombre: '' });
  };

  const confirmarBorrarUni = () => {
    eliminarUniversidad(modalUni.nombre);
    setModalUni({ visible: false, nombre: '' });
  };
  const confirmarBorrarCarrera = () => {
    eliminarCarrera(modalCarrera.uni, modalCarrera.carrera);
    setModalCarrera({ visible: false, uni: '', carrera: '' });
  };

  const handleDescargarTXT = (sala) => {
    let contenido = `========================================\n   RESULTADOS DE EVALUACIÓN VOCACIONAL\n========================================\n\nSala: ${sala.nombre}\nCódigo: ${sala.codigo}\nEstado: ${sala.activa ? "Activa" : "Cerrada"}\n\n----------------------------------------\n`;
    if (sala.resultados && sala.resultados.length > 0) {
      sala.resultados.forEach((al, idx) => {
        contenido += `${idx + 1}. Nombre: ${al.nombre}\n   Correo: ${al.correo}\n   Resultado: ${al.resultado}\n   Hora: ${al.fecha}\n\n`;
      });
    } else {
      contenido += `Ningún estudiante evaluado.\n`;
    }
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Resultados_${sala.codigo}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const procesarLogoBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormUni({ ...formUni, logo: reader.result });
      reader.readAsDataURL(file);
    }
  };
  const procesarMallaBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCarreraTemp({ ...carreraTemp, planEstudios: reader.result });
      reader.readAsDataURL(file);
    }
  };
  const agregarCarreraAlFormulario = () => {
    if(carreraTemp.nombre && carreraTemp.facultad) {
      setFormUni({ ...formUni, carreras: [...formUni.carreras, carreraTemp] });
      setCarreraTemp({ nombre: '', facultad: '', planEstudios: null });
    } else { alert("La carrera necesita al menos un nombre y una facultad."); }
  };
  const guardarNuevaUniversidad = () => {
    if (!formUni.nombre) return alert("El nombre de la universidad es obligatorio.");
    agregarUniversidad(formUni);
    setMostrarModalUni(false);
    setFormUni({ nombre: '', tipo: 'Privada', logo: null, carreras: [] });
  };

  return (
    <div className={`min-h-screen font-sans relative ${theme.bgMain}`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="mb-8 border-b border-slate-300/20 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className={`text-3xl font-black tracking-tight ${theme.headerText}`}>
              Panel de Control <span className={esAdmin ? "text-indigo-500" : "text-blue-500"}>{user.rol}</span>
            </h1>
            <p className={`mt-1 ${theme.headerSub}`}>
              {esAdmin ? "Supervisa evaluaciones y controla a todos los usuarios." : "Gestiona las evaluaciones de tus estudiantes y explora el directorio."}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
            <div className={`flex rounded-lg p-1 border ${theme.navBg}`}>
              {esAdmin && (
                <button type="button" onClick={() => setTab('usuarios')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all cursor-pointer ${tab === 'usuarios' ? theme.btnTabActive : theme.btnTabInactive}`}>Usuarios</button>
              )}
              <button type="button" onClick={() => setTab('salas')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all cursor-pointer ${tab === 'salas' ? theme.btnTabActive : theme.btnTabInactive}`}>Salas Activas</button>
              <button type="button" onClick={() => setTab('directorio')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all cursor-pointer ${tab === 'directorio' ? theme.btnTabActive : theme.btnTabInactive}`}>Directorio</button>
              
              {/* 🔥 AQUÍ ESTÁ LA SOLUCIÓN: Una pestaña nativa integrada solo para Profesores */}
              {!esAdmin && (
                <button type="button" 
                  onClick={() => navigate('/perfil')} 
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all cursor-pointer ${theme.btnTabInactive} hover:text-blue-600`}
                >
                  Mi Perfil ⚙️
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ════════ CONTENIDO: SALAS ════════ */}
        {tab === 'salas' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className={`p-6 rounded-2xl ${theme.cardBg}`}>
                <h2 className={`text-xl font-bold mb-4 ${theme.cardTitle}`}>Nueva Sala de Evaluación</h2>
                <form onSubmit={handleCrearSala} className="space-y-4">
                  <div>
                    <label htmlFor="admin-nombre-sala" className={`block text-sm font-medium mb-1 ${theme.headerSub}`}>Nombre del Grupo / Aula *</label>
                    <input id="admin-nombre-sala" type="text" required value={nombreSala} onChange={(e)=>setNombreSala(e.target.value)} placeholder="Ej. 5to Secundaria A" className={`w-full rounded-xl px-4 py-3 outline-none mb-3 border ${theme.inputBg}`}/>
                  </div>
                  <div>
                    <label htmlFor="admin-codigo-sala" className={`block text-sm font-medium mb-1 ${theme.headerSub}`}>Código Personalizado (Opcional)</label>
                    <input id="admin-codigo-sala" type="text" maxLength="8" value={codigoSala} onChange={(e)=>setCodigoSala(e.target.value)} placeholder="Ej. PROMO26" className={`w-full rounded-xl px-4 py-3 outline-none uppercase font-mono tracking-widest border ${theme.inputBg}`}/>
                  </div>
                  <div>
                    <label htmlFor="admin-pin-sala" className={`block text-sm font-medium mb-1 ${theme.headerSub}`}>PIN de Seguridad (4 dígitos) *</label>
                    <input id="admin-pin-sala" type="text" required maxLength="4" pattern="\d{4}" value={pinSala} onChange={(e)=>setPinSala(e.target.value.replace(/\D/g, ''))} placeholder="Ej. 1234" className={`w-full rounded-xl px-4 py-3 outline-none border ${theme.inputBg}`}/>
                  </div>
                  <button type="submit" className={`w-full text-white font-bold py-3 rounded-xl transition-all cursor-pointer ${theme.btnPrimary}`}>
                    Crear Sala Protegida
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className={`text-xl font-bold ${theme.cardTitle}`}>Salas de Evaluación ({salas.length})</h2>
              {salas.length === 0 ? <p className="text-slate-500 italic">No hay salas creadas.</p> : null}
              {salas.map(sala => {
                const esCreador = sala.creador === user.correo;
                
                return (
                  <div key={sala.id} className={`p-6 rounded-2xl ${theme.cardBg}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-300/10 pb-4 mb-4 gap-4">
                      <div>
                        <h3 className={`text-lg font-bold ${theme.cardTitle}`}>{sala.nombre}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md mt-1 inline-block ${sala.activa ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {sala.activa ? '🟢 ACTIVA' : '🔴 CERRADA'}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">Creado por: {sala.creador}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className={`px-4 py-2 rounded-lg flex items-center gap-2 border ${theme.itemBg}`}>
                          <span className="text-slate-500 text-xs uppercase tracking-widest">Código:</span>
                          <span className={`${esAdmin ? 'text-indigo-500' : 'text-blue-600'} font-mono text-xl tracking-[0.2em] font-bold`}>{sala.codigo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-3">Alumnos evaluados ({sala.resultados ? sala.resultados.length : 0})</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar mb-4">
                        {sala.resultados && sala.resultados.length > 0 ? sala.resultados.map((al, idx) => (
                          <div key={idx} className={`flex justify-between items-center p-3 rounded-xl border ${theme.itemBg}`}>
                            <div>
                              <p className={`font-medium ${theme.headerText}`}>{al.nombre}</p>
                              <p className="text-xs text-slate-500">{al.fecha}</p>
                            </div>
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-right">
                              {al.resultado}
                            </span>
                          </div>
                        )) : <p className="text-xs text-slate-400">Esperando que los alumnos terminen el test...</p>}
                      </div>

                      <div className="flex gap-2 flex-wrap border-t border-slate-300/10 pt-4">
                        {(esAdmin || esCreador) && (
                          sala.activa ? (
                            <button type="button" onClick={() => cerrarSala(sala.codigo)} className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm cursor-pointer">
                              Cerrar Sala
                            </button>
                          ) : (
                            <button type="button" onClick={() => abrirSala(sala.codigo)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm cursor-pointer">
                              Reabrir Sala
                            </button>
                          )
                        )}
                        {(esAdmin || esCreador) && (
                          <button type="button" onClick={() => handleDescargarTXT(sala)} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 cursor-pointer">
                            📄 Descargar TXT
                          </button>
                        )}
                        {(esAdmin || esCreador) && (
                          <button type="button" onClick={() => iniciarBorradoSala(sala)} className="bg-red-900/50 hover:bg-red-800 border border-red-800 text-red-200 px-4 py-2 rounded-lg text-sm font-bold transition ml-auto cursor-pointer">
                            Eliminar Aula
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════ CONTENIDO: USUARIOS (SOLO ADMIN) ════════ */}
        {tab === 'usuarios' && esAdmin && (
          <div className={`p-8 rounded-2xl ${theme.cardBg}`}>
            <h2 className="text-2xl font-bold text-white mb-6">Control Total de Usuarios</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-sm">
                    <th className="pb-3 font-medium">Nombres y Apellidos</th>
                    <th className="pb-3 font-medium">Correo</th>
                    <th className="pb-3 font-medium">Rol</th>
                    <th className="pb-3 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listaUsuarios.map(u => (
                    <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors">
                      {editandoId === u.id ? (
                        <>
                          <td className="py-4">
                            <input aria-label="text" type="text" className="bg-slate-950 border border-slate-700 text-white px-2 py-1 rounded w-full mb-1" value={datosEdicion.nombres} onChange={e=>setDatosEdicion({...datosEdicion, nombres: e.target.value})} />
                            <input aria-label="text" type="text" className="bg-slate-950 border border-slate-700 text-white px-2 py-1 rounded w-full" value={datosEdicion.apellidos} onChange={e=>setDatosEdicion({...datosEdicion, apellidos: e.target.value})} />
                          </td>
                          <td className="py-4 px-2"><input aria-label="email" type="email" className="bg-slate-950 border border-slate-700 text-white px-2 py-1 rounded w-full" value={datosEdicion.correo} onChange={e=>setDatosEdicion({...datosEdicion, correo: e.target.value})} /></td>
                          <td className="py-4 px-2">
                            <select aria-label="Campo" className="bg-slate-950 border border-slate-700 text-white px-2 py-1 rounded" value={datosEdicion.rol} onChange={e=>setDatosEdicion({...datosEdicion, rol: e.target.value})}>
                              <option>Estudiante</option><option>Profesor</option><option>Admin</option>
                            </select>
                          </td>
                          <td className="py-4 text-right space-x-2">
                            <button type="button" onClick={()=>guardarEdicion(u.id)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-sm font-bold cursor-pointer">Guardar</button>
                            <button type="button" onClick={()=>setEditandoId(null)} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm font-bold cursor-pointer">Cancelar</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-4 font-medium text-slate-200">{u.nombres} {u.apellidos}</td>
                          <td className="py-4 text-slate-400">{u.correo}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${u.rol==='Admin' ? 'bg-indigo-500/20 text-indigo-400' : u.rol==='Profesor' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>{u.rol}</span>
                          </td>
                          <td className="py-4 text-right space-x-2">
                            <button type="button" onClick={()=>iniciarEdicion(u)} className="text-indigo-400 hover:text-indigo-300 text-sm font-bold cursor-pointer">Editar</button>
                            {u.id !== user.id && (
                              <button type="button" 
                                onClick={() => setModalUsuario({ visible: true, id: u.id, nombre: `${u.nombres} ${u.apellidos}` })} 
                                className="text-red-400 hover:text-red-300 text-sm font-bold cursor-pointer"
                              >
                                Eliminar
                              </button>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════════ CONTENIDO: DIRECTORIO DETALLADO ════════ */}
        {tab === 'directorio' && (
          <div className={`p-8 rounded-2xl ${theme.cardBg}`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${theme.cardTitle}`}>Catálogo de Universidades</h2>
              <p className={`${theme.headerSub}`}>Listado oficial de instituciones registradas en la plataforma.</p>
            </div>
            
            <div className="space-y-6 text-left">
              {universidades.map((uni) => (
                <div key={uni.id} className={esAdmin ? "opacity-90 hover:opacity-100 transition-opacity" : ""}>
                  <CardUniversidad
                    logo={uni.logo}
                    nombre={uni.nombre}
                    tipo={uni.tipo}
                    carreras={uni.carreras}
                    escalas={uni.escalas}
                    webOficial={uni.webOficial}
                    ubicacion={uni.ubicacion}
                    costoMatricula={uni.costoMatricula}
                    busqueda=""
                    isDark={esAdmin} 
                    isAdmin={esAdmin} 
                    onEliminarUni={() => setModalUni({ visible: true, nombre: uni.nombre })}
                    onEliminarCarrera={(nombreCarrera) => setModalCarrera({ visible: true, uni: uni.nombre, carrera: nombreCarrera })}
                  />
                </div>
              ))}
            </div>

            {esAdmin && (
              <div className="mt-8 text-center border-t border-slate-300/20 pt-8">
                <button type="button" onClick={() => setMostrarModalUni(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg cursor-pointer">+ Agregar Nueva Universidad</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ════════ MODALES EMERGENTES (Con diseño Backdrop Blur Elegante) ═════════ */}
      {/* ========================================================================= */}

      {/* 1. Modal para Eliminar Sala con PIN */}
      {modalPin.visible && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className={`rounded-3xl p-8 w-full max-w-sm shadow-2xl relative border ${theme.cardBg}`}>
            <button type="button" 
              onClick={() => setModalPin({ visible: false, sala: null, pin: '' })} 
              className={`absolute top-4 right-5 text-xl font-bold transition-colors cursor-pointer ${theme.headerSub} hover:text-red-500`}
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🔒</div>
              <h3 className={`text-xl font-black mb-1 ${theme.headerText}`}>Eliminar Sala</h3>
              <p className={`text-sm ${theme.headerSub}`}>
                {esAdmin ? `Ingrese el PIN de la sala "${modalPin.sala?.nombre}". (Admin: '0000')` : `Ingrese su PIN de 4 dígitos para eliminar la sala "${modalPin.sala?.nombre}":`}
              </p>
            </div>
            <input aria-label="PIN de seguridad" type="password" maxLength="4" value={modalPin.pin} onChange={(e) => setModalPin({ ...modalPin, pin: e.target.value.replace(/\D/g, '') })} placeholder="••••" className={`w-full rounded-2xl px-4 py-4 text-center text-3xl tracking-[0.5em] font-mono mb-2 border-2 transition-all outline-none ${theme.inputBg} focus:border-red-500`} />
            {errorPin && <p className="text-red-500 text-xs font-bold text-center mb-4 animate-pulse">{errorPin}</p>}
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setModalPin({ visible: false, sala: null, pin: '' })} className={`flex-1 font-bold py-3 rounded-xl transition-all border cursor-pointer ${esAdmin ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}>Cancelar</button>
              <button type="button" onClick={confirmarBorradoSala} disabled={modalPin.pin.length !== 4} className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal para Eliminar Usuario */}
      {modalUsuario.visible && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className={`rounded-3xl p-8 w-full max-w-sm shadow-2xl relative border ${theme.cardBg}`}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🗑️</div>
              <h3 className={`text-xl font-black mb-1 ${theme.headerText}`}>Eliminar Usuario</h3>
              <p className={`text-sm ${theme.headerSub}`}>¿Estás seguro de eliminar a <strong>{modalUsuario.nombre}</strong> del sistema? Esta acción no se puede deshacer.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setModalUsuario({ visible: false, id: null, nombre: '' })} className={`flex-1 font-bold py-3 rounded-xl transition-all border cursor-pointer ${esAdmin ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}>Cancelar</button>
              <button type="button" onClick={confirmarBorrarUsuario} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal para Eliminar Universidad */}
      {modalUni.visible && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className={`rounded-3xl p-8 w-full max-w-sm shadow-2xl relative border ${theme.cardBg}`}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🚨</div>
              <h3 className={`text-xl font-black mb-1 ${theme.headerText}`}>Eliminar Institución</h3>
              <p className={`text-sm ${theme.headerSub}`}>¿Estás seguro de eliminar <strong>{modalUni.nombre}</strong> por completo? Esto borrará todas sus carreras para todos los alumnos.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setModalUni({ visible: false, nombre: '' })} className={`flex-1 font-bold py-3 rounded-xl transition-all border cursor-pointer ${esAdmin ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}>Cancelar</button>
              <button type="button" onClick={confirmarBorrarUni} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer">Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal para Eliminar Carrera de una Universidad */}
      {modalCarrera.visible && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className={`rounded-3xl p-8 w-full max-w-sm shadow-2xl relative border ${theme.cardBg}`}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">⚠️</div>
              <h3 className={`text-xl font-black mb-1 ${theme.headerText}`}>Eliminar Carrera</h3>
              <p className={`text-sm ${theme.headerSub}`}>¿Deseas eliminar <strong>{modalCarrera.carrera}</strong> de la universidad <strong>{modalCarrera.uni}</strong>?</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setModalCarrera({ visible: false, uni: '', carrera: '' })} className={`flex-1 font-bold py-3 rounded-xl transition-all border cursor-pointer ${esAdmin ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}>Cancelar</button>
              <button type="button" onClick={confirmarBorrarCarrera} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer">Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ MODAL AGREGAR UNIVERSIDAD (OVERLAY) ════════ */}
      {mostrarModalUni && esAdmin && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl relative">
            <button type="button" onClick={() => setMostrarModalUni(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-xl cursor-pointer">✕</button>
            <h2 className="text-2xl font-black text-white mb-6">Registrar Institución</h2>
            <div className="space-y-4 mb-6 pb-6 border-b border-slate-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admin-universidad-nombre" className="block text-sm font-medium text-slate-300 mb-1">Nombre de la Universidad *</label>
                <input id="admin-universidad-nombre" type="text" value={formUni.nombre} onChange={e => setFormUni({...formUni, nombre: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-indigo-500 outline-none" placeholder="Ej. Universidad de Lima" />
                </div>
                <div>
                  <label htmlFor="admin-universidad-tipo" className="block text-sm font-medium text-slate-300 mb-1">Tipo de Institución</label>
                  <select id="admin-universidad-tipo" value={formUni.tipo} onChange={e => setFormUni({...formUni, tipo: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-indigo-500 outline-none">
                    <option>Privada</option><option>Pública</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="admin-universidad-logo" className="block text-sm font-medium text-slate-300 mb-1">Subir Logo (Archivo PNG/JPG)</label>
                <input id="admin-universidad-logo" type="file" accept="image/png, image/jpeg" onChange={procesarLogoBase64} className="w-full text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-indigo-400 mb-4">Añadir Carreras a la Malla</h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <input aria-label="Nombre (Ej. Ing. Sistemas)" type="text" placeholder="Nombre (Ej. Ing. Sistemas)" value={carreraTemp.nombre} onChange={e => setCarreraTemp({...carreraTemp, nombre: e.target.value})} className="bg-slate-900 border border-slate-800 text-white px-3 py-2 rounded-lg text-sm outline-none" />
                <input aria-label="Facultad (Ej. Ingeniería)" type="text" placeholder="Facultad (Ej. Ingeniería)" value={carreraTemp.facultad} onChange={e => setCarreraTemp({...carreraTemp, facultad: e.target.value})} className="bg-slate-900 border border-slate-800 text-white px-3 py-2 rounded-lg text-sm outline-none" />
              </div>
              <div>
                <label htmlFor="admin-carrera-plan" className="block text-xs font-medium text-slate-300 mb-1">Adjuntar Plan de estudios (PDF) - Opcional</label>
                <input id="admin-carrera-plan" type="file" accept="application/pdf" onChange={procesarMallaBase64} className="text-xs text-slate-200 w-full" />
              </div>
              <button type="button" onClick={agregarCarreraAlFormulario} className="w-full bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold py-2 rounded-lg text-sm transition-colors border border-slate-700 cursor-pointer">+ Añadir esta carrera a la lista</button>
            </div>
            {formUni.carreras.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-bold text-white mb-2">Carreras listas para guardar ({formUni.carreras.length}):</p>
                <div className="space-y-2">
                  {formUni.carreras.map((c, i) => (
                    <div key={i} className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 flex justify-between items-center">
                      <span className="text-sm text-slate-300">{c.nombre} <span className="text-xs text-slate-500">({c.facultad})</span></span>
                      {c.planEstudios && <span className="text-xs bg-indigo-900 text-indigo-300 px-2 rounded">PDF ✅</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-4 pt-4 border-t border-slate-800">
              <button type="button" onClick={() => setMostrarModalUni(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer">Cancelar</button>
              <button type="button" onClick={guardarNuevaUniversidad} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all cursor-pointer">Guardar Institución Completa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
