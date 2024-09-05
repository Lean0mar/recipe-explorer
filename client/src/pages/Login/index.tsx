import React, { useState } from 'react';
import { loginUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser({ email, password });
            Swal.fire({
                title: '¡Inicio de sesión exitoso!',
                text: 'Has iniciado sesión con éxito.',
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                navigate('/');
            });
        } catch {
            Swal.fire({
                title: 'Error',
                text: 'Credenciales inválidas. Por favor intenta de nuevo.',
                icon: 'error',
                confirmButtonText: 'Reintentar'
            });
            setError('Credenciales inválidas');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="w-full max-w-lg p-10 space-y-8 bg-white rounded-3xl shadow-xl">
                <h1 className="text-4xl font-extrabold text-center text-gray-800">Login</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-gray-600">¿No tienes una cuenta?</p>
                    <button
                        onClick={handleRegister}
                        className="mt-2 text-blue-500 hover:underline focus:outline-none"
                    >
                        Regístrate aquí
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;