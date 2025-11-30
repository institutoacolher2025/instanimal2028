import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';



export function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">Instituto Acolher</h3>
                        <p className="text-gray-400 mb-4">
                            Transformando vidas através do amor e cuidado animal. Junte-se a nós nessa missão.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4">Links Rápidos</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/adotar" className="hover:text-primary transition-colors">Quero Adotar</Link></li>
                            <li><Link to="/doar" className="hover:text-primary transition-colors">Doe Agora</Link></li>
                            <li><Link to="/resgates" className="hover:text-primary transition-colors">Blog / Notícias</Link></li>
                            <li><Link to="/eventos" className="hover:text-primary transition-colors">Eventos</Link></li>
                            <li><Link to="/transparencia" className="hover:text-primary transition-colors">Transparência</Link></li>
                            <li><Link to="/politica-de-privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
                            <li><Link to="/termos-de-uso" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contato</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center gap-2"><Mail size={16} /> contato@acolher.org.br</li>
                            <li className="flex items-center gap-2"><Phone size={16} /> (11) 98765-4321</li>
                            <li className="flex items-center gap-2"><MapPin size={16} /> Rua dos Bichos, 123 - São Paulo, SP</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4">Certificações</h4>
                        <div className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm">
                            <p className="text-sm font-semibold text-emerald-400">OSCIP Certificada</p>
                            <p className="text-xs text-gray-400 mt-1">Utilidade Pública Federal</p>
                            <p className="text-xs text-gray-500 mt-2">CNPJ: 12.345.678/0001-90</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>© 2024 Instituto Acolher. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
