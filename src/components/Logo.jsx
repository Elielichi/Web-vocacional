
export default function LogoVocatest({ className = "w-16 h-16" }) {
  return (
    <div className={`p-2 rounded-xl inline-flex items-center justify-center shadow-inner ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-full h-full"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Estrellas de fondo (detalles adicionales) */}
        {/* Estrella pequeña izquierda */}
        <path d="M4 6l0.5 1.5l1.5 0.5l-1.5 0.5l-0.5 1.5l-0.5 -1.5l-1.5 -0.5l1.5 -0.5z" fill="white" stroke="none" className="animate-pulse" />
        {/* Estrella mediana derecha alta */}
        <path d="M19 4l0.5 2l2 0.5l-2 0.5l-0.5 2l-0.5 -2l-2 -0.5l2 -0.5z" fill="white" stroke="none" className="animate-ping [animation-duration:3s]" />
        {/* Estrella pequeña derecha baja */}
        <path d="M20 16l0.5 1.5l1.5 0.5l-1.5 0.5l-0.5 1.5l-0.5 -1.5l-1.5 -0.5l1.5 -0.5z" fill="white" stroke="none" />
        
        {/* Estelas de velocidad / destellos inferiores */}
        <line x1="12" y1="20" x2="12" y2="23" strokeDasharray="1 2" />
        <line x1="9" y1="19" x2="7" y2="21" />
        <line x1="15" y1="19" x2="17" y2="21" />

        {/* CUERPO CENTRAL DE LA NAVE (Apuntando firmemente hacia arriba) */}
        <path 
          d="M12 2C11.5 4 10 7.5 10 11C10 14.5 11 16.5 12 17C13 16.5 14 14.5 14 11C14 7.5 12.5 4 12 2Z" 
          fill="black" 
          stroke="white" 
          strokeWidth="1.75"
        />

        {/* Alerón Izquierdo */}
        <path d="M10 12.5L6 16C5.5 16.5 6 17 7 17L10 15.5" fill="black" stroke="white" />
        
        {/* Alerón Derecho */}
        <path d="M14 12.5L18 16C18.5 16.5 18 17 17 17L14 15.5" fill="black" stroke="white" />

        {/* Ventana / Cabina (Detalle circular en el centro) */}
        <circle cx="12" cy="9" r="1.5" fill="white" stroke="white" />
        
        {/* Propulsor / Fuego trasero (Línea blanca estilizada) */}
        <path d="M11 17.5L12 19.5L13 17.5" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  );
}