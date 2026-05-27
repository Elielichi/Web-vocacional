import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Home from './pages/Home.jsx' 
import TestVocacional from './pages/TestVocacional.jsx'
import Login from './pages/Login.jsx'
import Directorio from './pages/Directorio.jsx'
import Register from './pages/Register.jsx'
import ResultadoTest from './pages/ResultadoTest.jsx' 
import Editar from './pages/PerfilEditar.jsx'
import Perfil from './pages/Perfil.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestVocacional />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/directorio" element={<Directorio />} />
          <Route path="/resultado-test" element={<ResultadoTest />} /> {/*  AGREGAR ESTA LÍNEA */}
          <Route path="/perfil" element={<Perfil />} />
           <Route path="/EditarPerfil" element={<Editar/>} /> 
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)