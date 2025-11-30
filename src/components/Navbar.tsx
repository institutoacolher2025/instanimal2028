import React from 'react';
import { User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary">Acolher</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
                        <Link to="/adotar" className="text-gray-700 hover:text-primary transition-colors font-medium">Quero Adotar</Link>
                        <Link to="/finais-felizes" className="text-gray-700 hover:text-primary transition-colors font-medium">Finais Felizes</Link>
                        <Link to="/resgates" className="text-gray-700 hover:text-primary transition-colors font-medium">Diário de Resgates</Link>
                        <Link to="/eventos" className="text-gray-700 hover:text-primary transition-colors font-medium">Eventos</Link>
                        <Link to="/doar" className="text-gray-700 hover:text-primary transition-colors font-medium">Doe Agora</Link>
                        <Link to="/transparencia" className="text-gray-700 hover:text-primary transition-colors font-medium">Transparência</Link>
                        <button className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2">
                            <User size={18} />
                            Área do Voluntário
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700" aria-label="Toggle menu">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Home</Link>
                        <Link to="/adotar" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Quero Adotar</Link>
                        <Link to="/finais-felizes" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Finais Felizes</Link>
                        <Link to="/resgates" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Diário de Resgates</Link>
                        <Link to="/eventos" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Eventos</Link>
                        <Link to="/doar" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Doe Agora</Link>
                        <Link to="/transparencia" className="block px-3 py-2 text-gray-700 hover:text-primary font-medium">Transparência</Link>
                        <Link to="/doar" className="block px-3 py-2 text-primary font-medium">
                            Doar
                        </Link>
                        <button className="w-full text-left px-3 py-2 text-gray-700 flex items-center gap-2 font-medium">
                            <User size={20} /> Login
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
