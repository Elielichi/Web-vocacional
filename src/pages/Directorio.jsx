import CardUniversidad from "../components/CardUniversidad";
import universidades from "../data/universidades";

function Directorio() {

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Universidades
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

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
