const universidades = [
  {
    id: 1,
    nombre: "Universidad de Lima",
    tipo: "Privada",
    logo: "/universidades/ulima.png",
    ubicacion: "Av. Javier Prado Este 4600, Santiago de Surco, Lima",
    costoMatricula: "S/. 300",
    webOficial: "https://www.ulima.edu.pe/",
    escalas: [
      { escala: "Escala 1", rango: "S/. 1,800 - S/. 2,000" },
      { escala: "Escala 2", rango: "S/. 2,200 - S/. 2,500" },
      { escala: "Escala 3", rango: "S/. 2,800 - S/. 3,200" },
      { escala: "Escala 4", rango: "S/. 3,500 - S/. 4,200" }
    ],
    carreras: [
      {
        nombre: "Ingeniería de Sistemas",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        descripcion: "Forma ingenieros capaces de diseñar, implementar y gestionar sistemas de información.",
        planEstudios: "/mallas/ulima-sistemas.pdf"
      },
      {
        nombre: "Ingeniería Industrial",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Optimización de procesos productivos y gestión eficiente de recursos.",
        planEstudios: "/mallas/ulima-industrial.pdf"
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 230,
        descripcion: "Diseño y planificación de espacios habitables con enfoque sostenible.",
        planEstudios: "/mallas/ulima-arquitectura.pdf"
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Gestión estratégica de organizaciones públicas y privadas.",
        planEstudios: "/mallas/ulima-administracion.pdf"
      },
      {
        nombre: "Marketing",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Estrategias de mercado, branding y comportamiento del consumidor.",
        planEstudios: "/mallas/ulima-marketing.pdf"
      },
      {
        nombre: "Economía",
        facultad: "Economía",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Análisis económico, políticas públicas y mercados financieros.",
        planEstudios: "/mallas/ulima-economia.pdf"
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        descripcion: "Formación jurídica integral con enfoque en derecho corporativo.",
        planEstudios: "/mallas/ulima-derecho.pdf"
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Comprensión del comportamiento humano y salud mental.",
        planEstudios: "/mallas/ulima-psicologia.pdf"
      },
      {
        nombre: "Contabilidad",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Gestión financiera, auditoría y contabilidad empresarial.",
        planEstudios: "/mallas/ulima-contabilidad.pdf"
      },
      {
        nombre: "Comunicación",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Comunicación estratégica, periodismo y medios digitales.",
        planEstudios: "/mallas/ulima-comunicacion.pdf"
      }
    ]
  },
  {
    id: 2,
    nombre: "Pontificia Universidad Católica del Perú",
    tipo: "Privada",
    logo: "/universidades/pucp.png",
    ubicacion: "Av. Universitaria 1801, San Miguel, Lima",
    costoMatricula: "S/. 400",
    webOficial: "https://www.pucp.edu.pe/",
    escalas: [
      { escala: "Escala 1", rango: "S/. 800 - S/. 1,000" },
      { escala: "Escala 2", rango: "S/. 1,100 - S/. 1,300" },
      { escala: "Escala 3", rango: "S/. 1,300 - S/. 1,500" }
    ],
    carreras: [
      {
        nombre: "Ingeniería Informática",
        facultad: "Ciencias e Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 218,
        descripcion: "Desarrollo de software, inteligencia artificial y sistemas computacionales.",
        planEstudios: "/mallas/pucp-informatica.pdf"
      },
      {
        nombre: "Ingeniería Civil",
        facultad: "Ciencias e Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        descripcion: "Diseño y construcción de infraestructura civil sostenible.",
        planEstudios: "/mallas/pucp-civil.pdf"
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura y Urbanismo",
        duracion: "10 ciclos (5 años)",
        creditos: 230,
        descripcion: "Arquitectura con enfoque en diseño urbano y sostenibilidad.",
        planEstudios: "/mallas/pucp-arquitectura.pdf"
      },
      {
        nombre: "Economía",
        facultad: "Ciencias Sociales",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Economía aplicada, política económica y desarrollo social.",
        planEstudios: "/mallas/pucp-economia.pdf"
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Psicología clínica, educativa y organizacional.",
        planEstudios: "/mallas/pucp-psicologia.pdf"
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        descripcion: "Derecho constitucional, civil y corporativo.",
        planEstudios: "/mallas/pucp-derecho.pdf"
      },
      {
        nombre: "Ingeniería Mecatrónica",
        facultad: "Ciencias e Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 222,
        descripcion: "Integración de sistemas mecánicos, electrónicos y de control.",
        planEstudios: "/mallas/pucp-mecatronica.pdf"
      },
      {
        nombre: "Diseño Gráfico",
        facultad: "Arte y Diseño",
        duracion: "10 ciclos (5 años)",
        creditos: 198,
        descripcion: "Diseño visual, identidad de marca y comunicación gráfica.",
        planEstudios: "/mallas/pucp-diseño.pdf"
      },
      {
        nombre: "Comunicación Audiovisual",
        facultad: "Ciencias y Artes de la Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Producción audiovisual, cine y medios digitales.",
        planEstudios: "/mallas/pucp-comunicacion.pdf"
      },
      {
        nombre: "Gestión y Alta Dirección",
        facultad: "Gestión y Alta Dirección",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Gestión de organizaciones con enfoque estratégico y social.",
        planEstudios: "/mallas/pucp-administracion.jpg"
      }
    ]
  },
  {
    id: 3,
    nombre: "Universidad Nacional Mayor de San Marcos",
    tipo: "Pública",
    logo: "/universidades/unmsm.png",
    ubicacion: "Ciudad Universitaria, Cercado de Lima",
    costoMatricula: "Gratuita",
    webOficial: "https://unmsm.edu.pe/",
    escalas: [
      { escala: "Única", rango: "S/. 0 (Costo administrativo mínimo por semestre)" }
    ],
    carreras: [
      {
        nombre: "Medicina",
        facultad: "Medicina",
        duracion: "14 ciclos (7 años)",
        creditos: 340,
        descripcion: "Una de las escuelas de medicina más reconocidas del país.",
        planEstudios: "/mallas/unmsm-medicina.pdf"
      },
      {
        nombre: "Ingeniería de Software",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Desarrollo de software de calidad y gestión de proyectos tecnológicos.",
        planEstudios: "/mallas/unmsm-software.pdf"
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Formación jurídica con enfoque en derecho público y privado.",
        planEstudios: "/mallas/unmsm-derecho.pdf"
      },
      {
        nombre: "Farmacia",
        facultad: "Farmacia y Bioquímica",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        descripcion: "Ciencias farmacéuticas y bioquímica aplicada.",
        planEstudios: "/mallas/unmsm-farmacia.pdf"
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Psicología clínica y comunitaria con enfoque social.",
        planEstudios: "/mallas/unmsm-psicologia.pdf"
      },
      {
        nombre: "Administración",
        facultad: "Administración",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Gestión pública y privada con visión estratégica.",
        planEstudios: "/mallas/unmsm-administracion.pdf"
      },
      {
        nombre: "Contabilidad",
        facultad: "Ciencias Contables",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Contabilidad, auditoría y finanzas corporativas.",
        planEstudios: "/mallas/unmsm-contabilidad.pdf"
      },
      {
        nombre: "Odontología",
        facultad: "Odontología",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Salud oral y odontología clínica integral.",
        planEstudios: "/mallas/unmsm-odontologia.pdf"
      },
      {
        nombre: "Ingeniería Industrial",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Optimización industrial y gestión de operaciones.",
        planEstudios: "/mallas/unmsm-industrial.pdf"
      },
      {
        nombre: "Biología",
        facultad: "Ciencias Biológicas",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Biología molecular, ecología y ciencias de la vida.",
        planEstudios: "/mallas/unmsm-biologia.pdf"
      }
    ]
  },
  {
    id: 4,
    nombre: "Universidad Nacional de Ingeniería",
    tipo: "Pública",
    logo: "/universidades/uni.png",
    ubicacion: "Av. Túpac Amaru 210, Rímac, Lima",
    costoMatricula: "Gratuita",
    webOficial: "https://www.uni.edu.pe/",
    escalas: [
      { escala: "Única", rango: "S/. 0 (Costo administrativo mínimo por semestre)" }
    ],
    carreras: [
      {
        nombre: "Ingeniería de Sistemas",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        descripcion: "Sistemas computacionales, redes y desarrollo de software.",
        planEstudios: "/mallas/uni-sistemas.pdf"
      },
      {
        nombre: "Ingeniería Civil",
        facultad: "Ingeniería Civil",
        duracion: "10 ciclos (5 años)",
        creditos: 230,
        descripcion: "Infraestructura civil, estructuras y gestión de proyectos.",
        planEstudios: "/mallas/uni-civil.pdf"
      },
      {
        nombre: "Ingeniería Industrial",
        facultad: "Ingeniería Industrial",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Procesos productivos y optimización de sistemas industriales.",
        planEstudios: "/mallas/uni-industrial.pdf"
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        descripcion: "Arquitectura, urbanismo y diseño ambiental.",
        planEstudios: "/mallas/uni-arquitectura.pdf"
      },
      {
        nombre: "Ingeniería Mecánica",
        facultad: "Ingeniería Mecánica",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        descripcion: "Diseño mecánico, termodinámica y manufactura.",
        planEstudios: "/mallas/uni-mecanica.pdf"
      },
      {
        nombre: "Ingeniería Electrónica",
        facultad: "Ingeniería Electrónica",
        duracion: "10 ciclos (5 años)",
        creditos: 218,
        descripcion: "Electrónica, telecomunicaciones y sistemas embebidos.",
        planEstudios: "/mallas/uni-electronica.pdf"
      },
      {
        nombre: "Ingeniería Química",
        facultad: "Ingeniería Química",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Procesos químicos industriales y química aplicada.",
        planEstudios: "/mallas/uni-quimica.pdf"
      },
      {
        nombre: "Ingeniería Ambiental",
        facultad: "Ingeniería Ambiental",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Gestión ambiental y desarrollo sostenible.",
        planEstudios: "/mallas/uni-ambiental.pdf"
      },
      {
        nombre: "Ingeniería de Telecomunicaciones",
        facultad: "Ingeniería Electrónica",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Redes de comunicación, fibra óptica y sistemas inalámbricos.",
        planEstudios: "/mallas/uni-telecomunicaciones.pdf"
      },
      {
        nombre: "Ingeniería Económica",
        facultad: "Ingeniería Económica",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Economía aplicada a proyectos de ingeniería.",
        planEstudios: "/mallas/uni-economica.pdf"
      }
    ]
  },
  {
    id: 5,
    nombre: "Universidad Peruana de Ciencias Aplicadas",
    tipo: "Privada",
    logo: "/universidades/upc.png",
    ubicacion: "Av. Alonso de Molina 1611, Monterrico, Santiago de Surco",
    costoMatricula: "S/. 400",
    webOficial: "https://www.upc.edu.pe/",
    escalas: [
      { escala: "Escala 1", rango: "S/. 900 - S/. 1,200" },
      { escala: "Escala 2", rango: "S/. 1,200 - S/. 1,500" },
      { escala: "Escala 3", rango: "S/. 1,500 - S/. 1,800" }
    ],
    carreras: [
      {
        nombre: "Ingeniería de Software",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 212,
        descripcion: "Desarrollo ágil de software, DevOps y arquitectura de sistemas.",
        planEstudios: "/mallas/upc-software.pdf"
      },
      {
        nombre: "Diseño Gráfico",
        facultad: "Diseño",
        duracion: "10 ciclos (5 años)",
        creditos: 195,
        descripcion: "Diseño digital, UX/UI y comunicación visual.",
        planEstudios: "/mallas/upc-diseno.pdf"
      },
      {
        nombre: "Negocios Internacionales",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Comercio exterior, logística internacional y finanzas globales.",
        planEstudios: "/mallas/upc-negocios.pdf"
      },
      {
        nombre: "Comunicaciones",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 198,
        descripcion: "Comunicación corporativa, periodismo y medios digitales.",
        planEstudios: "/mallas/upc-comunicaciones.pdf"
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        descripcion: "Arquitectura sostenible y diseño urbano contemporáneo.",
        planEstudios: "/mallas/upc-arquitectura.pdf"
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Psicología organizacional y clínica.",
        planEstudios: "/mallas/upc-psicologia.pdf"
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Administración moderna con enfoque en liderazgo y tecnología.",
        planEstudios: "/mallas/upc-administracion.pdf"
      },
      {
        nombre: "Marketing",
        facultad: "Marketing",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Marketing digital, e-commerce y estrategia de marca.",
        planEstudios: "/mallas/upc-marketing.pdf"
      },
      {
        nombre: "Ingeniería Civil",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        descripcion: "Construcción, gestión de proyectos civiles y BIM.",
        planEstudios: "/mallas/upc-civil.pdf"
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Derecho empresarial y nuevas tecnologías jurídicas.",
        planEstudios: "/mallas/upc-derecho.pdf"
      }
    ]
  },
  {
    id: 6,
    nombre: "Universidad San Ignacio de Loyola",
    tipo: "Privada",
    logo: "/universidades/usil.png",
    ubicacion: "Av. La Fontana 550, La Molina, Lima",
    costoMatricula: "S/. 320",
    webOficial: "https://www.usil.edu.pe/",
    escalas: [
      { escala: "Escala 1", rango: "S/. 700 - S/. 1,000" },
      { escala: "Escala 2", rango: "S/. 1,000 - S/. 1,400" }
    ],
    carreras: [
      {
        nombre: "Gastronomía",
        facultad: "Hotelería y Turismo",
        duracion: "8 ciclos (4 años)",
        creditos: 185,
        descripcion: "Arte culinario, gestión gastronómica y cocina internacional.",
        planEstudios: "/mallas/usil-gastronomia.pdf"
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Administración con enfoque emprendedor e innovación.",
        planEstudios: "/mallas/usil-administracion.pdf"
      },
      {
        nombre: "Marketing",
        facultad: "Marketing",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Marketing experiencial y estrategia digital.",
        planEstudios: "/mallas/usil-marketing.pdf"
      },
      {
        nombre: "Ingeniería Empresarial",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Ingeniería aplicada a la gestión empresarial.",
        planEstudios: "/mallas/usil-empresarial.pdf"
      },
      {
        nombre: "Comunicaciones",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 198,
        descripcion: "Comunicación estratégica y relaciones públicas.",
        planEstudios: "/mallas/usil-comunicaciones.pdf"
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        descripcion: "Arquitectura con énfasis en diseño sostenible.",
        planEstudios: "/mallas/usil-arquitectura.pdf"
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Derecho corporativo y relaciones internacionales.",
        planEstudios: "/mallas/usil-derecho.pdf"
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Psicología organizacional y del consumidor.",
        planEstudios: "/mallas/usil-psicologia.pdf"
      },
      {
        nombre: "Negocios Internacionales",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Comercio internacional y cadenas de suministro globales.",
        planEstudios: "/mallas/usil-negocios.pdf"
      },
      {
        nombre: "Contabilidad",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Contabilidad financiera y tributación empresarial.",
        planEstudios: "/mallas/usil-contabilidad.pdf"
      }
    ]
  },
  {
    id: 7,
    nombre: "Universidad Ricardo Palma",
    tipo: "Privada",
    logo: "/universidades/urp.png",
    ubicacion: "Av. Benavides 5440, Santiago de Surco, Lima",
    costoMatricula: "S/. 250",
    webOficial: "https://www.urp.edu.pe/",
    escalas: [
      { escala: "Escala 1", rango: "S/. 600 - S/. 900" },
      { escala: "Escala 2", rango: "S/. 900 - S/. 1,200" }
    ],
    carreras: [
      {
        nombre: "Medicina",
        facultad: "Medicina",
        duracion: "14 ciclos (7 años)",
        creditos: 340,
        descripcion: "Medicina clínica y salud preventiva.",
        planEstudios: "/mallas/urp-medicina.pdf"
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        descripcion: "Arquitectura y urbanismo contemporáneo.",
        planEstudios: "/mallas/urp-arquitectura.pdf"
      },
      {
        nombre: "Ingeniería Informática",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Sistemas de información y desarrollo tecnológico.",
        planEstudios: "/mallas/urp-informatica.pdf"
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Psicología clínica y educativa.",
        planEstudios: "/mallas/urp-psicologia.pdf"
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Derecho penal, civil y constitucional.",
        planEstudios: "/mallas/urp-derecho.pdf"
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Gestión empresarial y dirección estratégica.",
        planEstudios: "/mallas/urp-administracion.pdf"
      },
      {
        nombre: "Marketing",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 198,
        descripcion: "Investigación de mercados y publicidad.",
        planEstudios: "/mallas/urp-marketing.pdf"
      },
      {
        nombre: "Contabilidad",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Contabilidad y auditoría empresarial.",
        planEstudios: "/mallas/urp-contabilidad.pdf"
      },
      {
        nombre: "Traducción",
        facultad: "Humanidades",
        duracion: "10 ciclos (5 años)",
        creditos: 190,
        descripcion: "Traducción e interpretación en múltiples idiomas.",
        planEstudios: "/mallas/urp-traduccion.pdf"
      },
      {
        nombre: "Biología",
        facultad: "Ciencias Biológicas",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Biología aplicada y biotecnología.",
        planEstudios: "/mallas/urp-biologia.pdf"
      }
    ]
  },
  {
    id: 8,
    nombre: "Universidad Científica del Sur",
    tipo: "Privada",
    logo: "/universidades/cientifica.png",
    ubicacion: "Antigua Carretera Panamericana Sur km 19, Villa El Salvador, Lima",
    costoMatricula: "S/. 350",
    webOficial: "https://www.cientifica.edu.pe/",
    escalas: [
      { escala: "Escala 1", rango: "S/. 700 - S/. 1,100" },
      { escala: "Escala 2", rango: "S/. 1,100 - S/. 1,500" }
    ],
    carreras: [
      {
        nombre: "Medicina",
        facultad: "Medicina",
        duracion: "14 ciclos (7 años)",
        creditos: 340,
        descripcion: "Medicina general con énfasis en investigación científica.",
        planEstudios: "/mallas/cientifica-medicina.pdf"
      },
      {
        nombre: "Odontología",
        facultad: "Ciencias de la Salud",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Salud bucal y odontología preventiva.",
        planEstudios: "/mallas/cientifica-odontologia.pdf"
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Psicología clínica y neuropsicología.",
        planEstudios: "/mallas/cientifica-psicologia.pdf"
      },
      {
        nombre: "Ingeniería Ambiental",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Gestión ambiental y sostenibilidad.",
        planEstudios: "/mallas/cientifica-ambiental.pdf"
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Administración con enfoque en innovación.",
        planEstudios: "/mallas/cientifica-administracion.pdf"
      },
      {
        nombre: "Marketing",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 195,
        descripcion: "Marketing digital y analítica de datos.",
        planEstudios: "/mallas/cientifica-marketing.pdf"
      },
      {
        nombre: "Veterinaria",
        facultad: "Veterinaria",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        descripcion: "Medicina veterinaria y zootecnia.",
        planEstudios: "/mallas/cientifica-veterinaria.pdf"
      },
      {
        nombre: "Nutrición",
        facultad: "Ciencias de la Salud",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Nutrición clínica y salud pública.",
        planEstudios: "/mallas/cientifica-nutricion.pdf"
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Derecho ambiental y corporativo.",
        planEstudios: "/mallas/cientifica-derecho.pdf"
      },
      {
        nombre: "Biología Marina",
        facultad: "Ciencias Ambientales",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Ecosistemas marinos y recursos hidrobiológicos.",
        planEstudios: "/mallas/cientifica-biologia.pdf"
      }
    ]
  },
  {
    id: 9,
    nombre: "Universidad ESAN",
    tipo: "Privada",
    logo: "/universidades/esan.png",
    ubicacion: "Alonso de Molina 1652, Monterrico, Santiago de Surco",
    costoMatricula: "S/. 300",
    webOficial: "https://www.ue.edu.pe/",
    escalas: [
      { escala: "Escala 1", rango: "S/. 1,000 - S/. 1,500" },
      { escala: "Escala 2", rango: "S/. 1,500 - S/. 2,000" }
    ],
    carreras: [
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Administración de empresas con visión global.",
        planEstudios: "/mallas/esan-administracion.pdf"
      },
      {
        nombre: "Ingeniería de Tecnologías",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 212,
        descripcion: "Tecnologías de información aplicadas a los negocios.",
        planEstudios: "/mallas/esan-tecnologias.pdf"
      },
      {
        nombre: "Marketing",
        facultad: "Marketing",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Marketing estratégico y gestión comercial.",
        planEstudios: "/mallas/esan-marketing.pdf"
      },
      {
        nombre: "Economía",
        facultad: "Economía",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Economía empresarial y análisis financiero.",
        planEstudios: "/mallas/esan-economia.pdf"
      },
      {
        nombre: "Negocios Internacionales",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Comercio global, finanzas internacionales.",
        planEstudios: "/mallas/esan-negocios.pdf"
      },
      {
        nombre: "Contabilidad",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Contabilidad corporativa y finanzas.",
        planEstudios: "/mallas/esan-contabilidad.pdf"
      },
      {
        nombre: "Ingeniería Industrial",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Gestión de operaciones e ingeniería de procesos.",
        planEstudios: "/mallas/esan-industrial.pdf"
      },
      {
        nombre: "Finanzas",
        facultad: "Finanzas",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Mercados financieros, inversiones y banca.",
        planEstudios: "/mallas/esan-finanzas.pdf"
      },
      {
        nombre: "Derecho Corporativo",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Derecho empresarial y regulatorio.",
        planEstudios: "/mallas/esan-derecho.pdf"
      },
      {
        nombre: "Comunicación",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 195,
        descripcion: "Comunicación corporativa y relaciones institucionales.",
        planEstudios: "/mallas/esan-comunicacion.pdf"
      }
    ]
  },
  {
    id: 10,
    nombre: "Universidad de San Martín de Porres",
    tipo: "Privada",
    logo: "/universidades/usmp.png",
    ubicacion: "Av. Las Calandrias 151, Santa Anita, Lima",
    costoMatricula: "S/. 250",
    webOficial: "https://www.usmp.edu.pe/",
    escalas: [
      { escala: "Escala 1", rango: "S/. 500 - S/. 750" },
      { escala: "Escala 2", rango: "S/. 750 - S/. 1,000" }
    ],
    carreras: [
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Derecho civil, penal y empresarial.",
        planEstudios: "/mallas/usmp-derecho.pdf"
      },
      {
        nombre: "Ingeniería de Computación",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        descripcion: "Computación, redes y sistemas de información.",
        planEstudios: "/mallas/usmp-computacion.pdf"
      },
      {
        nombre: "Medicina",
        facultad: "Medicina",
        duracion: "14 ciclos (7 años)",
        creditos: 340,
        descripcion: "Medicina clínica y salud comunitaria.",
        planEstudios: "/mallas/usmp-medicina.pdf"
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        descripcion: "Arquitectura y diseño de interiores.",
        planEstudios: "/mallas/usmp-arquitectura.pdf"
      },
      {
        nombre: "Contabilidad",
        facultad: "Ciencias Contables",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Contabilidad, auditoría y tributación.",
        planEstudios: "/mallas/usmp-contabilidad.pdf"
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        descripcion: "Psicología clínica, educativa y forense.",
        planEstudios: "/mallas/usmp-psicologia.pdf"
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        descripcion: "Gestión empresarial y emprendimiento.",
        planEstudios: "/mallas/usmp-administracion.pdf"
      },
      {
        nombre: "Marketing",
        facultad: "Marketing",
        duracion: "10 ciclos (5 años)",
        creditos: 198,
        descripcion: "Marketing digital y gestión de marca.",
        planEstudios: "/mallas/usmp-marketing.pdf"
      },
      {
        nombre: "Odontología",
        facultad: "Odontología",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        descripcion: "Odontología general y especializada.",
        planEstudios: "/mallas/usmp-odontologia.pdf"
      },
      {
        nombre: "Turismo y Hotelería",
        facultad: "Turismo",
        duracion: "10 ciclos (5 años)",
        creditos: 195,
        descripcion: "Gestión hotelera y turismo sostenible.",
        planEstudios: "/mallas/usmp-turismo.pdf"
      }
    ]
  }
];

export default universidades;