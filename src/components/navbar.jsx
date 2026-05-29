import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <img></img>
        <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition">
          VocaTest
        </Link>

        <ul className="flex gap-4 font-medium items-center">
          <li><Link to="/" className="hover:text-yellow-300 transition">Inicio</Link></li>
          <li><Link to="/test" className="hover:text-yellow-300 transition">Test</Link></li>
          <li><Link to="/directorio" className="hover:text-yellow-300 transition">Universidades</Link></li>

          {user ? (
            <>
              <li>
                <Link to="/perfil" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 text-xs font-black">
                    {user.nombres?.[0]}
                  </div>
                  <span className="text-sm font-bold">{user.nombres}</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
                >
                  Salir
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-yellow-300 transition">Login</Link></li>
              <li>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition font-bold">
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