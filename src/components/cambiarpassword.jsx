import { useState } from "react";
import { useApp } from "../context/AppContext";

const Cambiarpassword = () => {
    const [abierto, setAbierto] = useState(false);
    const { cambiarPassword } = useApp();

    const [passwordActual, setPasswordActual] = useState("");
    const [nuevaPassword, setNuevaPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [error, setError] = useState("");

    const [mensaje, setMensaje] = useState("");

    const handleGuardar = () => {
        setError("");

        if (!passwordActual || !nuevaPassword || !confirmarPassword) {
            setError("Completa todos los campos.");
            return;
        }

        if (nuevaPassword !== confirmarPassword) {
            setError("Las contraseñas nuevas no coinciden.");
            return;
        }

        const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!regexPassword.test(nuevaPassword)) {
            setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
            return;
        }

        if (passwordActual === nuevaPassword) {
            setError("La nueva contraseña no puede ser igual a la actual.");
            return;
        }

        const resultado = cambiarPassword(
            passwordActual,
            nuevaPassword,
            confirmarPassword
        );

        if (resultado.ok) {
            setMensaje("✔ Contraseña actualizada");

            setPasswordActual("");
            setNuevaPassword("");
            setConfirmarPassword("");

            setTimeout(() => {
                setAbierto(false);
                setMensaje("");
            }, 1500);
        } else {
            setError(resultado.mensaje);
        }
    };

    return (
        <div>

            <button type="button"
                onClick={() => setAbierto(true)}
                className="text-blue-600 font-bold hover:text-blue-700 transition-all cursor-pointer"
            >
                Cambiar
            </button>

            {abierto && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
                        <button type="button"
                            onClick={() => setAbierto(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-black text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Cambiar contraseña
                        </h2>
                        {mensaje && (
                            <div className="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-xl mb-4 animate-pulse">
                                {mensaje}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">

                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">
                                    Contraseña actual
                                </p>
                                <input aria-label="password"
                                    type="password"
                                    value={passwordActual}
                                    onChange={(e) => setPasswordActual(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">
                                    Contraseña nueva
                                </p>
                                <input aria-label="password"
                                    type="password"
                                    value={nuevaPassword}
                                    onChange={(e) => setNuevaPassword(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">
                                    Vuelva a introducir la contraseña
                                </p>
                                <input aria-label="password"
                                    type="password"
                                    value={confirmarPassword}
                                    onChange={(e) => setConfirmarPassword(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button type="button"
                                    onClick={handleGuardar}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition-all"
                                >
                                    Guardar
                                </button>

                                <button type="button"
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

export default Cambiarpassword;