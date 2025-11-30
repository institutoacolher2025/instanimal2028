import { type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PawPrint, LogOut, CheckCircle, DollarSign, FileText, Calendar, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function AdminLayout({ children }: { children: ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user, hasPermission } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success('Logout realizado com sucesso');
        navigate('/admin');
    };

    const menuItems = [
        { path: '/admin/dashboard', label: 'Visão Geral', icon: LayoutDashboard, permission: 'view_dashboard' },
        { path: '/admin/animals', label: 'Gerenciar Animais', icon: PawPrint, permission: 'manage_animals' },
        { path: '/admin/posts', label: 'Notícias', icon: FileText, permission: 'manage_posts' },
        { path: '/admin/events', label: 'Eventos', icon: Calendar, permission: 'manage_events' },
        { path: '/admin/approvals', label: 'Aprovações', icon: CheckCircle, permission: 'view_approvals' },
        { path: '/admin/financial', label: 'Financeiro', icon: DollarSign, permission: 'view_financial' },
        { path: '/admin/team', label: 'Equipe', icon: Users, permission: 'manage_team' },
    ];

    // Filtrar menu items baseado em permissões
    const visibleMenuItems = menuItems.filter(item => hasPermission(item.permission));

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-primary">Acolher Admin</h1>
                    <p className="text-sm text-gray-600 mt-1">Painel Administrativo</p>
                    {user && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500">Logado como:</p>
                            <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                            <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${user.role === 'Admin'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                {user.role}
                            </span>
                        </div>
                    )}
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {visibleMenuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-primary text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
