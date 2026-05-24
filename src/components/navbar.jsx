import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          VocaTest
        </h1>

        <ul className="flex gap-6 font-medium">

          <li>
            <Link to="/" className="hover:text-yellow-300 transition">
              Inicio
            </Link>
          </li>

          <li>
            <Link to="/test" className="hover:text-yellow-300 transition">
              Test
            </Link>
          </li>

          <li>
            <Link to="/directorio" className="hover:text-yellow-300 transition">
              Universidades
            </Link>
          </li>

          <li>
            <Link to="/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;