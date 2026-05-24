function CardUniversidad({ nombre, tipo, carreras }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition duration-300">

      <h2 className="text-2xl font-bold text-blue-700">
        {nombre}
      </h2>

      <p className="mt-2 text-gray-600">
        Tipo: {tipo}
      </p>

        <div className="mt-4">

            <h3 className="font-bold text-gray-700 mb-2">
                Carreras:
            </h3>

            <ul className="list-disc list-inside text-gray-600 space-y-1">
                {carreras.map((carrera, index) => (
                    <li key={index}>
                    {carrera}
                    </li>
                ))}
            </ul>
        </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Ver Malla
      </button>

    </div>
  );
}

export default CardUniversidad;