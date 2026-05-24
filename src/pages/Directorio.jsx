import CardUniversidad from "../components/CardUniversidad";
import universidades from "../data/universidades";

function Directorio() {

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Directorio de Universidades
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {universidades.map((uni, index) => (
          <CardUniversidad
            key={index}
            nombre={uni.nombre}
            tipo={uni.tipo}
            carreras={uni.carreras}
          />
        ))}
      </div>
    </div>
  );
}

export default Directorio;