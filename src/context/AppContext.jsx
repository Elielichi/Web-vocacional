import { createContext, use, useCallback, useMemo, useState } from 'react';
import universidadesData from '../data/universidades';

const AppContext = createContext();

const STORAGE_KEYS = {
  usuarios: 'vocatest_usuarios:v1',
  sesion: 'vocatest_sesion:v1',
  carreraTemporal: 'carreraTemporal:v1',
  salas: 'vocatest_salas:v1',
  universidades: 'vocatest_universidades:v1',
  salaActual: 'vocatest_sala_actual:v1'
};

const LEGACY_STORAGE_KEYS = {
  usuarios: 'vocatest_usuarios',
  sesion: 'vocatest_sesion',
  carreraTemporal: 'carreraTemporal',
  salas: 'vocatest_salas',
  universidades: 'vocatest_universidades',
  salaActual: 'vocatest_sala_actual'
};

const USUARIOS_DEFAULT = [
  {
    id: 1,
    nombres: "Carlos",
    apellidos: "Mendoza Torres",
    correo: "estudiante@ulima.edu.pe",
    contrasena: "ulima123",
    "contraseÃ±a": "ulima123",
    rol: "Estudiante",
    ciudad: "Lima",
    tipoColegio: "Privado",
    telefono: "987-654-321",
    edad: "18",
    sexo: "Masculino",
    carreraRecomendada: "Ingenieria de Sistemas y Computacion",
    carrerasRecomendadas: ["Ingenieria de Sistemas", "Economia", "Ingenieria Civil"],
    universidadesFavoritas: ["Universidad de Lima", "Universidad del Pacifico", "Universidad Nacional Mayor de San Marcos"],
    historialTests: [{ resultado: "Ingenieria de Sistemas y Computacion", fecha: "12 enero 2026" }],
    fechaTest: "12 enero 2026",
    ultimoIngreso: "25/05/2026",
    notificacionesEmail: true,
    recordatorios: true,
    perfilPublico: true
  },
  {
    id: 2,
    nombres: "Maria",
    apellidos: "Garcia Lopez",
    correo: "profesor@ulima.edu.pe",
    contrasena: "profe123",
    "contraseÃ±a": "profe123",
    rol: "Profesor",
    ciudad: "Lima",
    telefono: "999-123-456",
    edad: "38",
    sexo: "Femenino",
    especialidad: "Ingenieria de Sistemas",
    gradoAcademico: "Magister en Ingenieria de Software",
    aniosExperiencia: "12 anos",
    estadoCuenta: "Activo",
    estudiantesAsignados: 24,
    testRevisados: 48,
    recursosCompartidos: 15,
    historialTests: [],
    ultimoIngreso: "25/05/2026",
    notificacionesEmail: true,
    recordatorios: true,
    perfilPublico: true
  },
  {
    id: 99,
    nombres: "Admin",
    apellidos: "VocaTest",
    correo: "admin@vocatest.pe",
    contrasena: "admin123",
    "contraseÃ±a": "admin123",
    rol: "Admin",
    ciudad: "Lima",
    estadoCuenta: "Activo",
    historialTests: [],
    ultimoIngreso: new Date().toLocaleDateString('es-PE'),
    notificacionesEmail: true,
    recordatorios: true,
    perfilPublico: true
  }
];

const readStorageValue = (keyName) => (
  localStorage.getItem(STORAGE_KEYS[keyName]) ?? localStorage.getItem(LEGACY_STORAGE_KEYS[keyName])
);

const readStorageJSON = (keyName, fallback) => {
  const value = readStorageValue(keyName);
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const writeStorageJSON = (keyName, value) => {
  localStorage.setItem(STORAGE_KEYS[keyName], JSON.stringify(value));
};

const removeStorageValue = (keyName) => {
  localStorage.removeItem(STORAGE_KEYS[keyName]);
  localStorage.removeItem(LEGACY_STORAGE_KEYS[keyName]);
};

const getPassword = (usuario) => usuario?.contrasena ?? usuario?.["contraseÃ±a"];

const ensureUsuariosIniciales = () => {
  const usuariosGuardados = readStorageJSON('usuarios', null);

  if (!usuariosGuardados) {
    writeStorageJSON('usuarios', USUARIOS_DEFAULT);
    return USUARIOS_DEFAULT;
  }

  if (!usuariosGuardados.find(usuario => usuario.rol === "Admin")) {
    const lista = [...usuariosGuardados, USUARIOS_DEFAULT[2]];
    writeStorageJSON('usuarios', lista);
    return lista;
  }

  return usuariosGuardados;
};

const obtenerSesionInicial = () => {
  const sesionActiva = readStorageJSON('sesion', null);
  if (!sesionActiva) return null;

  return {
    ...sesionActiva,
    notificacionesEmail: sesionActiva.notificacionesEmail ?? true,
    recordatorios: sesionActiva.recordatorios ?? true,
    perfilPublico: sesionActiva.perfilPublico ?? true
  };
};

const obtenerUniversidadesIniciales = () => {
  const parsedUnis = readStorageJSON('universidades', null);

  if (!parsedUnis) {
    writeStorageJSON('universidades', universidadesData);
    return universidadesData;
  }

  const uLima = parsedUnis.find(uni => uni.nombre === "Universidad de Lima");
  const industrialTienePDF = uLima?.carreras.find(carrera => carrera.nombre === "Ingenieria Industrial")?.planEstudios;

  if (!industrialTienePDF || parsedUnis[0].logo?.includes('http')) {
    writeStorageJSON('universidades', universidadesData);
    return universidadesData;
  }

  return parsedUnis;
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    ensureUsuariosIniciales();
    return obtenerSesionInicial();
  });
  const [carreraTemporal, setCarreraTemporal] = useState(() => readStorageValue('carreraTemporal') || "");
  const [salas, setSalas] = useState(() => readStorageJSON('salas', []));
  const [universidades, setUniversidades] = useState(obtenerUniversidadesIniciales);

  const login = useCallback((correo, password) => {
    const usuarios = readStorageJSON('usuarios', []);
    const correoNormalizado = correo.trim().toLowerCase();
    const encontrado = usuarios.find(usuario =>
      usuario.correo.toLowerCase() === correoNormalizado && getPassword(usuario) === password
    );

    if (!encontrado) {
      return { ok: false };
    }

    const actualizado = {
      ...encontrado,
      ultimoIngreso: new Date().toLocaleDateString('es-PE'),
      notificacionesEmail: encontrado.notificacionesEmail ?? true,
      recordatorios: encontrado.recordatorios ?? true,
      perfilPublico: encontrado.perfilPublico ?? true
    };
    const actualizados = usuarios.map(usuario => usuario.id === actualizado.id ? actualizado : usuario);
    writeStorageJSON('usuarios', actualizados);
    setUser(actualizado);
    writeStorageJSON('sesion', actualizado);
    return { ok: true, rol: actualizado.rol };
  }, []);

  const register = useCallback((datosUsuario) => {
    const usuarios = readStorageJSON('usuarios', []);
    const correoNormalizado = datosUsuario.correo.trim().toLowerCase();

    if (usuarios.find(usuario => usuario.correo.toLowerCase() === correoNormalizado)) {
      return { ok: false, mensaje: "Este correo ya esta registrado." };
    }

    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
    const { rol = "Estudiante", ...datosLimpios } = datosUsuario;
    delete datosLimpios.confirmar;
    const esEstudiante = rol === "Estudiante";

    const nuevoUsuario = {
      ...datosLimpios,
      id: Date.now(),
      rol,
      correo: correoNormalizado,
      contrasena: datosLimpios.contrasena ?? datosLimpios["contraseÃ±a"],
      ultimoIngreso: ahora.toLocaleDateString('es-PE'),
      notificacionesEmail: true,
      recordatorios: true,
      perfilPublico: true,
      ...(esEstudiante ? {
        carreraRecomendada: carreraTemporal || "",
        carrerasRecomendadas: carreraTemporal ? [carreraTemporal] : [],
        universidadesFavoritas: [],
        historialTests: carreraTemporal ? [{ resultado: carreraTemporal, fecha: fechaFormateada }] : [],
        fechaTest: carreraTemporal ? fechaFormateada : ""
      } : {
        especialidad: datosLimpios.especialidad || "Educacion Secundaria",
        estadoCuenta: "Activo",
        estudiantesAsignados: 0,
        testRevisados: 0,
        recursosCompartidos: 0,
        historialTests: []
      })
    };

    const actualizados = [...usuarios, nuevoUsuario];
    writeStorageJSON('usuarios', actualizados);
    setUser(nuevoUsuario);
    writeStorageJSON('sesion', nuevoUsuario);

    if (esEstudiante) {
      removeStorageValue('carreraTemporal');
      setCarreraTemporal("");
    }

    return { ok: true };
  }, [carreraTemporal]);

  const logout = useCallback(() => {
    setUser(null);
    removeStorageValue('sesion');
  }, []);

  const guardarResultadoTest = useCallback((resultadoFinal) => {
    setCarreraTemporal(resultadoFinal);
    localStorage.setItem(STORAGE_KEYS.carreraTemporal, resultadoFinal);

    if (!user) return;

    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
    const entrada = { resultado: resultadoFinal, fecha: fechaFormateada };
    const usuarioActualizado = {
      ...user,
      carreraRecommended: resultadoFinal,
      carreraRecomendada: resultadoFinal,
      carrerasRecomendadas: [resultadoFinal, ...(user.carrerasRecomendadas || [])].slice(0, 5),
      historialTests: [entrada, ...(user.historialTests || [])].slice(0, 20),
      fechaTest: fechaFormateada
    };

    setUser(usuarioActualizado);
    writeStorageJSON('sesion', usuarioActualizado);

    const usuarios = readStorageJSON('usuarios', []);
    const actualizados = usuarios.map(usuario => usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario);
    writeStorageJSON('usuarios', actualizados);

    const codigoSala = readStorageValue('salaActual');
    if (codigoSala) {
      const salasAlmacenadas = readStorageJSON('salas', []);
      const salasActualizadas = salasAlmacenadas.map(sala => {
        if (sala.codigo === codigoSala && sala.activa) {
          const nuevoResultado = {
            nombre: `${user.nombres} ${user.apellidos}`,
            correo: user.correo,
            resultado: resultadoFinal,
            fecha: ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
          };
          const resultadosPrevios = (sala.resultados || []).filter(resultado => resultado.correo !== user.correo);
          return { ...sala, resultados: [...resultadosPrevios, nuevoResultado] };
        }
        return sala;
      });

      writeStorageJSON('salas', salasActualizadas);
      setSalas(salasActualizadas);
    }
  }, [user]);

  const marcarFavoritoContext = useCallback((nombreUniversidad) => {
    if (!user) return;

    const favoritas = user.universidadesFavoritas || [];
    const usuarioActualizado = {
      ...user,
      universidadesFavoritas: favoritas.includes(nombreUniversidad)
        ? favoritas.filter(uni => uni !== nombreUniversidad)
        : [...favoritas, nombreUniversidad]
    };

    setUser(usuarioActualizado);
    writeStorageJSON('sesion', usuarioActualizado);
    const usuariosGlobales = readStorageJSON('usuarios', []);
    const actualizados = usuariosGlobales.map(usuario => usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario);
    writeStorageJSON('usuarios', actualizados);
  }, [user]);

  const crearSala = useCallback((nombreSala, codigoPersonalizado, pin) => {
    const codigo = codigoPersonalizado ? codigoPersonalizado.toUpperCase().trim() : Math.random().toString().slice(2, 10).toUpperCase();
    const nuevaSala = { id: Date.now(), nombre: nombreSala, codigo, pin, resultados: [], activa: true, creador: user.correo };
    const nuevasSalas = [...salas, nuevaSala];
    setSalas(nuevasSalas);
    writeStorageJSON('salas', nuevasSalas);
    return codigo;
  }, [salas, user]);

  const cerrarSala = useCallback((codigo) => {
    const salasActualizadas = salas.map(sala => sala.codigo === codigo ? { ...sala, activa: false } : sala);
    setSalas(salasActualizadas);
    writeStorageJSON('salas', salasActualizadas);
  }, [salas]);

  const abrirSala = useCallback((codigo) => {
    const salasActualizadas = salas.map(sala => sala.codigo === codigo ? { ...sala, activa: true } : sala);
    setSalas(salasActualizadas);
    writeStorageJSON('salas', salasActualizadas);
  }, [salas]);

  const eliminarSala = useCallback((codigo) => {
    const salasFiltradas = salas.filter(sala => sala.codigo !== codigo);
    setSalas(salasFiltradas);
    writeStorageJSON('salas', salasFiltradas);
  }, [salas]);

  const editarUsuario = useCallback((id, nuevosDatos) => {
    const usuarios = readStorageJSON('usuarios', []);
    const actualizados = usuarios.map(usuario => usuario.id === id ? { ...usuario, ...nuevosDatos } : usuario);
    writeStorageJSON('usuarios', actualizados);

    if (user && user.id === id) {
      const usuarioActualizado = { ...user, ...nuevosDatos };
      setUser(usuarioActualizado);
      writeStorageJSON('sesion', usuarioActualizado);
    }
  }, [user]);

  const eliminarUsuario = useCallback((id) => {
    const usuarios = readStorageJSON('usuarios', []);
    const filtrados = usuarios.filter(usuario => usuario.id !== id);
    writeStorageJSON('usuarios', filtrados);
  }, []);

  const actualizarPreferencias = useCallback((preferencias) => {
    if (!user) return;

    const usuarioActualizado = { ...user, ...preferencias };
    setUser(usuarioActualizado);
    writeStorageJSON('sesion', usuarioActualizado);
    const usuarios = readStorageJSON('usuarios', []);
    const actualizados = usuarios.map(usuario => usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario);
    writeStorageJSON('usuarios', actualizados);
  }, [user]);

  const cambiarNombre = useCallback((nombres, apellidos, passwordActual) => {
    if (!user) return { ok: false, mensaje: "No hay sesion activa." };
    if (getPassword(user) !== passwordActual) return { ok: false, mensaje: "La contrasena es incorrecta." };
    editarUsuario(user.id, { nombres, apellidos });
    return { ok: true };
  }, [editarUsuario, user]);

  const cambiarCorreo = useCallback((nuevoCorreo, confirmarCorreo, passwordActual) => {
    if (!user) return { ok: false, mensaje: "No hay sesion activa." };

    const nuevoCorreoNormalizado = nuevoCorreo.trim().toLowerCase();
    const confirmarCorreoNormalizado = confirmarCorreo.trim().toLowerCase();
    if (nuevoCorreoNormalizado !== confirmarCorreoNormalizado) return { ok: false, mensaje: "Los correos no coinciden." };
    if (getPassword(user) !== passwordActual) return { ok: false, mensaje: "La contrasena es incorrecta." };

    const usuarios = readStorageJSON('usuarios', []);
    if (usuarios.find(usuario => usuario.correo.toLowerCase() === nuevoCorreoNormalizado && usuario.id !== user.id)) {
      return { ok: false, mensaje: "Ese correo ya esta registrado." };
    }

    editarUsuario(user.id, { correo: nuevoCorreoNormalizado });
    return { ok: true };
  }, [editarUsuario, user]);

  const cambiarPassword = useCallback((passwordActual, nuevaPassword, confirmarPassword) => {
    if (!user) return { ok: false, mensaje: "No hay sesion activa." };
    if (getPassword(user) !== passwordActual) return { ok: false, mensaje: "La contrasena actual es incorrecta." };
    if (nuevaPassword !== confirmarPassword) return { ok: false, mensaje: "Las contrasenas no coinciden." };

    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexPassword.test(nuevaPassword)) {
      return { ok: false, mensaje: "La contrasena debe tener al menos 8 caracteres, una mayuscula y un numero." };
    }

    editarUsuario(user.id, { contrasena: nuevaPassword, "contraseÃ±a": nuevaPassword });
    return { ok: true };
  }, [editarUsuario, user]);

  const agregarUniversidad = useCallback((nuevaUni) => {
    const uniConId = { ...nuevaUni, id: Date.now() };
    const unisActualizadas = [...universidades, uniConId];
    setUniversidades(unisActualizadas);
    writeStorageJSON('universidades', unisActualizadas);
  }, [universidades]);

  const eliminarUniversidad = useCallback((nombreUni) => {
    const unisActualizadas = universidades.filter(uni => uni.nombre !== nombreUni);
    setUniversidades(unisActualizadas);
    writeStorageJSON('universidades', unisActualizadas);
  }, [universidades]);

  const eliminarCarrera = useCallback((nombreUni, nombreCarrera) => {
    const unisActualizadas = universidades.map(uni => {
      if (uni.nombre === nombreUni) {
        return {
          ...uni,
          carreras: uni.carreras.filter(carrera => carrera.nombre !== nombreCarrera)
        };
      }
      return uni;
    });
    setUniversidades(unisActualizadas);
    writeStorageJSON('universidades', unisActualizadas);
  }, [universidades]);

  const buscarCarreraGlobal = useCallback((nombreCarrera) => {
    const carreraBuscada = nombreCarrera.toLowerCase();
    const carrerasIndexadas = universidades.flatMap(uni =>
      (uni.carreras || []).map(carrera => ({ ...carrera, universidad: uni.nombre }))
    );
    return carrerasIndexadas.find(carrera => carrera.nombre.toLowerCase().includes(carreraBuscada)) || null;
  }, [universidades]);

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    marcarFavoritoContext,
    guardarResultadoTest,
    carreraTemporal,
    setCarreraTemporal,
    salas,
    crearSala,
    cerrarSala,
    abrirSala,
    eliminarSala,
    universidades,
    agregarUniversidad,
    eliminarUniversidad,
    eliminarCarrera,
    editarUsuario,
    eliminarUsuario,
    buscarCarreraGlobal,
    cambiarNombre,
    cambiarCorreo,
    cambiarPassword,
    actualizarPreferencias
  }), [
    user,
    login,
    register,
    logout,
    marcarFavoritoContext,
    guardarResultadoTest,
    carreraTemporal,
    salas,
    crearSala,
    cerrarSala,
    abrirSala,
    eliminarSala,
    universidades,
    agregarUniversidad,
    eliminarUniversidad,
    eliminarCarrera,
    editarUsuario,
    eliminarUsuario,
    buscarCarreraGlobal,
    cambiarNombre,
    cambiarCorreo,
    cambiarPassword,
    actualizarPreferencias
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => use(AppContext);
