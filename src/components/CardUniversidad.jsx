import { useState } from "react";

function CardUniversidad({ nombre, tipo, carreras }) {

  const [mostrarCarreras, setMostrarCarreras] = useState(false);

  return (

    <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition duration-300">

      <h2 className="text-2xl font-bold text-blue-700">
        {nombre}
      </h2>

      <p className="text-gray-600 mt-2 font-medium">
        Tipo: {tipo}
      </p>

      <button
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={() =>
          setMostrarCarreras(!mostrarCarreras)
        }>

        {mostrarCarreras
          ? "Ocultar carreras"
          : "Ver carreras"}

      </button>

      {mostrarCarreras && (

        <div className="mt-5 space-y-3">

          {carreras.map((carrera, index) => (

            <div
              key={index}
              className="border-b pb-2"
            >

              <p className="font-semibold text-gray-800">
                {carrera.nombre}
              </p>

              <p className="text-sm text-gray-500">
                Facultad de {carrera.facultad}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardUniversidad;