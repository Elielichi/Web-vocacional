import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx' // IMPORTANTE
import Home from './pages/Home.jsx' 
import TestVocacional from './pages/TestVocacional.jsx'
import Login from './pages/Login.jsx'
import Directorio from './pages/Directorio.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider> {/* 👈 Envolvemos aquí */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestVocacional />} />
          <Route path="/login" element={<Login />} />
          <Route path="/directorio" element={<Directorio />} />
          {/* <Route path="/perfil" element={<Perfil />} /> */}
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
