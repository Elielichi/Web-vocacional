import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import LogoVocatest from "../components/Logo";

function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 1. Vista Especial para Admin y Profesores
  if (user?.rol === "Admin" || user?.rol === "Profesor") {
    const esAdmin = user.rol === "Admin";
    return (
      <nav className={`${esAdmin ? 'bg-slate-950 text-gray-300 border-slate-800' : 'bg-blue-700 text-white border-blue-800'} shadow-lg border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <Link to="/" className="text-xl font-black hover:opacity-80 transition flex items-center gap-2">
            VocaTest <span className={`text-xs px-2 py-1 rounded-md ${esAdmin ? 'bg-indigo-600 text-white' : 'bg-white text-blue-700'}`}>
              Portal {user.rol}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/admin" className={`text-sm font-bold transition ${esAdmin ? 'text-gray-400 hover:text-white' : 'text-blue-100 hover:text-white'}`}>
              Mi Panel
            </Link>
            <div className="w-px h-5 bg-white/20"></div>
            <button type="button"
              onClick={handleLogout}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${esAdmin ? 'bg-slate-800 hover:bg-red-900 text-slate-300 hover:text-red-200' : 'bg-blue-800 hover:bg-red-500 text-white'}`}
            >
              Salir
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // 2. Vista Normal para Estudiantes y Visitantes
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition">
          <LogoVocatest className="w-10 h-10" />
          
          <span>VocaTest</span>
        </Link>

        <ul className="flex gap-3 font-medium items-center flex-wrap">
          <li><Link to="/" className="hover:text-yellow-300 transition">Inicio</Link></li>
          <li><Link to="/test" className="hover:text-yellow-300 transition">Test</Link></li>
          <li><Link to="/directorio" className="hover:text-yellow-300 transition">Universidades</Link></li>

          {user ? (
            <>
              {/* Botón "Unirme a sala" solo para Estudiantes */}
              {user.rol === "Estudiante" && (
                <li>
                  <Link
                    to="/sala"
                    className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm"
                  >
                    🚪 Unirme a sala
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/perfil"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition"
                >
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 text-xs font-black">
                    {user.nombres?.[0]}
                  </div>
                  <span className="text-sm font-bold">{user.nombres}</span>
                </Link>
              </li>

              <li>
                <button type="button"
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
                >
                  Salir
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-yellow-300 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition font-bold"
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;