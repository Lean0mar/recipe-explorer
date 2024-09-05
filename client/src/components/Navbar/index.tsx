import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!sessionStorage.getItem('token');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold hover:text-gray-300">
                    Recipe Explorer
                </Link>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link to="/recipes" className="text-white hover:text-gray-300">Recetas</Link>
                            <Link to="/recipe/create" className="text-white hover:text-gray-300">Crear Receta</Link>
                            <Link to="/search-external" className="text-white hover:underline">Buscar en Api</Link>

                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-white hover:text-gray-300 flex items-center"
                                >
                                    <FaUserCircle size={24} />
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Mi Perfil
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-300">Iniciar Sesión</Link>
                            <Link to="/register" className="text-white hover:text-gray-300">Registrarte</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;