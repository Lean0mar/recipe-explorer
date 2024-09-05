import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-sm">
                    © {new Date().getFullYear()} Recipe Explorer. Todos los derechos reservados.
                </div>

                <div className="text-sm">
                    <Link to="/recipes">Recetas</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;