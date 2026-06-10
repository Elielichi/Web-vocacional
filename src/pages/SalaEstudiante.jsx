import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function SalaEstudiante() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setCodigo(val);
    setError("");
  };

  const unirse = () => {
    if (codigo.length !== 8) {
      setError("El código debe tener 8 caracteres.");
      return;
    }

    if (!user) {
      setError("Debes iniciar sesión antes de unirte a una sala.");
      return;
    }

    const salas = JSON.parse(localStorage.getItem("vocatest_salas") || "[]");
    const sala = salas.find(s => s.codigo === codigo && s.activa);

    if (!sala) {
      setError("Código inválido o la sala ya fue cerrada por el administrador.");
      return;
    }

    setCargando(true);
    // Guardamos el código de sala en localStorage para que TestVocacional lo use
    localStorage.setItem("vocatest_sala_actual", codigo);

    setTimeout(() => {
      navigate('/test');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">

          {/* Ícono */}
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
            🚪
          </div>

          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Unirme a sala de evaluación
          </h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Ingresa el código de 8 caracteres que te proporcionó tu profesor para acceder al test vocacional evaluado.
          </p>

          {/* Input de código */}
          <input aria-label="Campo"
            value={codigo}
            onChange={handleChange}
            onKeyDown={e => e.key === "Enter" && unirse()}
            maxLength={8}
            placeholder="Ej: AB12CD34"
            className="w-full border-2 border-slate-200 focus:border-purple-500 rounded-2xl px-5 py-4 text-center text-2xl font-bold tracking-[0.3em] focus:outline-none focus:ring-4 focus:ring-purple-100 mb-3 transition-all"
            style={{ letterSpacing: "0.3em" }}
          />

          {/* Contador de caracteres */}
          <p className="text-xs text-slate-400 mb-2">
            {codigo.length}/8 caracteres
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Aviso si no hay sesión */}
          {!user && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3 rounded-xl mb-5">
              Debes <a href="/login" className="font-bold underline">iniciar sesión</a> para participar en una sala.
            </div>
          )}

          {/* Botón */}
          <button type="button"
            onClick={unirse}
            disabled={codigo.length !== 8 || !user || cargando}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-md"
          >
            {cargando ? "Ingresando..." : "Ingresar al test →"}
          </button>

          <p className="text-xs text-slate-400 mt-6">
            Tu resultado se enviará automáticamente al administrador de la sala.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}