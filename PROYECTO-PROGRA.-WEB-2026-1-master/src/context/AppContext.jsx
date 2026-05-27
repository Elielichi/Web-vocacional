import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

// ============================================================
// USUARIOS POR DEFECTO (se cargan si localStorage está vacío)
// ============================================================
const USUARIOS_DEFAULT = [
  {
    id: 1,
    nombres: "Carlos",
    apellidos: "Mendoza Torres",
    correo: "estudiante@ulima.edu.pe",
    contraseña: "ulima123",
    rol: "Estudiante",
    ciudad: "Lima",
    tipoColegio: "Privado",
    telefono: "987-654-321",
    edad: "18",
    sexo: "Masculino",
    carreraRecomendada: "Ingeniería de Sistemas y Computación",
    carrerasRecomendadas: ["Ingeniería de Sistemas", "Economía", "Ingeniería Civil"],
    universidadesFavoritas: ["Universidad de Lima", "Universidad del Pacífico", "Universidad Nacional Mayor de San Marcos"],
    fechaTest: "12 enero 2026",
    ultimoIngreso: "25/05/2026"
  },
  {
    id: 2,
    nombres: "María",
    apellidos: "García López",
    correo: "profesor@ulima.edu.pe",
    contraseña: "profe123",
    rol: "Profesor",
    ciudad: "Lima",
    telefono: "999-123-456",
    edad: "38",
    sexo: "Femenino",
    especialidad: "Ingeniería de Sistemas",
    gradoAcademico: "Magíster en Ingeniería de Software",
    aniosExperiencia: "12 años",
    estadoCuenta: "Activo",
    estudiantesAsignados: 24,
    testRevisados: 48,
    recursosCompartidos: 15,
    ultimoIngreso: "25/05/2026"
  }
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carreraTemporal, setCarreraTemporal] = useState("");

  // Inicializar localStorage con usuarios por defecto si está vacío
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('vocatest_usuarios');
    if (!usuariosGuardados) {
      localStorage.setItem('vocatest_usuarios', JSON.stringify(USUARIOS_DEFAULT));
    }

    // Restaurar sesión activa si existe
    const sesionActiva = localStorage.getItem('vocatest_sesion');
    if (sesionActiva) {
      setUser(JSON.parse(sesionActiva));
    }

    // Restaurar carrera temporal si existe
    const carreraGuardada = localStorage.getItem('carreraTemporal');
    if (carreraGuardada) {
      setCarreraTemporal(carreraGuardada);
    }
  }, []);

  const login = (correo, contraseña) => {
    const usuarios = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    const encontrado = usuarios.find(
      u => u.correo === correo && u.contraseña === contraseña
    );
    if (encontrado) {
      setUser(encontrado);
      localStorage.setItem('vocatest_sesion', JSON.stringify(encontrado));
      return { ok: true, rol: encontrado.rol };
    }
    return { ok: false };
  };

  const register = (datosUsuario) => {
    const usuarios = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    const yaExiste = usuarios.find(u => u.correo === datosUsuario.correo);
    if (yaExiste) {
      return { ok: false, mensaje: "Este correo ya está registrado." };
    }
    const nuevoUsuario = {
      ...datosUsuario,
      id: Date.now(),
      rol: "Estudiante",
      carreraRecomendada: carreraTemporal || "",
      carrerasRecomendadas: carreraTemporal ? [carreraTemporal] : [],
      universidadesFavoritas: [],
      fechaTest: carreraTemporal ? new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }) : "",
      ultimoIngreso: new Date().toLocaleDateString('es-PE')
    };
    const actualizados = [...usuarios, nuevoUsuario];
    localStorage.setItem('vocatest_usuarios', JSON.stringify(actualizados));
    setUser(nuevoUsuario);
    localStorage.setItem('vocatest_sesion', JSON.stringify(nuevoUsuario));
    localStorage.removeItem('carreraTemporal');
    setCarreraTemporal("");
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vocatest_sesion');
  };

  // Compatibilidad con código anterior
  const loginOVerificarUsuario = (datosUsuario, carrera) => {
    setUser({ ...datosUsuario, carreraRecomendada: carrera });
    localStorage.setItem('vocatest_sesion', JSON.stringify({ ...datosUsuario, carreraRecomendada: carrera }));
  };

  return (
    <AppContext.Provider value={{
      user, login, register, logout, loginOVerificarUsuario,
      carreraTemporal, setCarreraTemporal
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);