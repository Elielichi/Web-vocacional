import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Estado del usuario logueado (null si no hay sesión)
  const [user, setUser] = useState(null);
  // Estado temporal para guardar la carrera ganadora del test antes de registrarse
  const [carreraTemporal, setCarreraTemporal] = useState("");

  // Función para simular un registro o login exitoso
  const loginOVerificarUsuario = (datosUsuario, carreraAAsignar) => {
    const usuarioConCarrera = {
      ...datosUsuario,
      carreraRecomendada: carreraAAsignar || carreraTemporal
    };
    setUser(usuarioConCarrera);
    // Limpiamos la temporal una vez guardada en el perfil
    setCarreraTemporal(""); 
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, loginOVerificarUsuario, logout, carreraTemporal, setCarreraTemporal }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);