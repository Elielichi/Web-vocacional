import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        contraseña: "",
        confirmar: "",
        ciudad: "",
        tipoColegio: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.contraseña !== form.confirmar) {
            alert("Las contraseñas no coinciden");
            return;
        }

        console.log("Usuario registrado: ", form);
        navigate("/login");
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 p-6'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md pt-4 space-y-6'
            >
                <h1 className='text-2xl font-bold'>¡ÚNETE A ...!</h1>

                <input name="nombres" placeholder="Nombres" onChange={handleChange} className='w-full p-2 border rounded'></input>
                <input name="apellidos" placeholder="Apellidos" onChange={handleChange} className='w-full p-2 border rounded'></input>
                <input name="correo" placeholder="Correo" onChange={handleChange} className='w-full p-2 border rounded'></input>
                <input name="contraseña" type="password" placeholder="Contraseña" onChange={handleChange} className='w-full p-2 border rounded'></input>
                <input name="confirmar" type="password" placeholder="Confirmar contraseña" onChange={handleChange} className='w-full p-2 border rounded'></input>
                <input name="ciudad" placeholder="Ciudad" onChange={handleChange} className='w-full p-2 border rounded'></input>

                <select name="tipoColegio" onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Tipo de colegio</option>
                    <option>Público</option>
                    <option>Privado</option>
                </select>

                <button className='w-full bg-blue-600 text-white p-2 rounded font-bold'>Registrarse</button>
            </form>
        </div>
    );
}

