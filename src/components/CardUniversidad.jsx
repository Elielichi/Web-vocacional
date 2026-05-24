function CardUniversidad({ nombre, tipo, costo, carrera }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition duration-300">

      <h2 className="text-2xl font-bold text-blue-700">
        {nombre}
      </h2>

      <p className="mt-2 text-gray-600">
        Tipo: {tipo}
      </p>

      <p className="text-gray-600">
        Carrera: {carrera}
      </p>

      <p className="text-green-600 font-bold mt-2">
        {costo}
      </p>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Ver Malla
      </button>

    </div>
  );
}

export default CardUniversidad;