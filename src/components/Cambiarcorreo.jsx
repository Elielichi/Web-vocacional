import { useState } from "react";

const Cambiarcorreo = () => {

    const [abierto, setAbierto] = useState(false);

    return (
        <div>

          <button
    onClick={() => setAbierto(true)}
    className="text-blue-600 font-bold hover:text-blue-700 transition-all cursor-pointer"
>
    Cambiar
</button>

            {abierto && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn">

                        <button
                            onClick={() => setAbierto(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        {/* TITULO */}
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Cambiar dirección de correo electrónico
                        </h2>
                        <p>
                            Registraste tu cuenta con estudiante@ulima.edu.pe. Si esto es incorrecto, puedes cambiar tu correo electrónico aquí
                        </p>

                        <div className="space-y-5">

                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">
                                    Nuevo Correo Electrónico
                                </p>

                                <input
                                    type="email"
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">
                                    Confirmar el nuevo correo electrónico
                                </p>

                                <input
                                    type="email"
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">
                                    Confirmar contraseña
                                </p>

                                <input
                                    type="password"
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">

                                <button
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-bold transition-all"
                                >
                                    Guardar
                                </button>

                                <button
                                    onClick={() => setAbierto(false)}
                                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-3 rounded-xl font-bold transition-all"
                                >
                                    Cancelar
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Cambiarcorreo;