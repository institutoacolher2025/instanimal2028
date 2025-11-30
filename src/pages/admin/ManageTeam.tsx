import { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useUsers } from '../../contexts/UsersContext';
import { Plus, Edit, Trash2, X, UserCheck, UserX, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import type { User, UserRole, UserStatus } from '../../data/users';
import { useAuth } from '../../contexts/AuthContext';

export function ManageTeam() {
    const { users, addUser, updateUser, deleteUser, toggleUserStatus } = useUsers();
    const { user: currentUser, canManageUsers } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Colaborador' as UserRole,
    });

    const handleOpenModal = (user?: User) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                email: user.email,
                password: '', // Não mostrar senha existente
                role: user.role,
            });
        } else {
            setEditingUser(null);
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'Colaborador',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            // Ao editar, só atualiza senha se foi preenchida
            const updateData: Partial<User> = {
                name: formData.name,
                email: formData.email,
                role: formData.role,
            };
            if (formData.password) {
                updateData.password = formData.password;
            }
            updateUser(editingUser.id, updateData);
            toast.success('Usuário atualizado com sucesso!');
        } else {
            addUser({
                ...formData,
                status: 'Ativo',
            });
            toast.success('Usuário cadastrado com sucesso!');
        }

        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (currentUser?.id === id || (currentUser?.role !== 'Owner' && users.find(u => u.id === id)?.role === 'Owner')) {
            toast.error('Você não pode excluir sua própria conta ou remover o Owner.');
            return;
        }
        if (window.confirm('Tem certeza que deseja remover este usuário? O acesso será revogado imediatamente.')) {
            deleteUser(id);
            toast.success('Usuário excluído com sucesso!');
        }
    };

    const handlePasswordReset = (user: User) => {
        updateUser(user.id, { password: '123456' });
        toast.success(`Senha de ${user.name} redefinida para 123456 (mock).`);
    };

    const handleToggleStatus = (id: number, currentStatus: UserStatus) => {
        toggleUserStatus(id);
        const newStatus = currentStatus === 'Ativo' ? 'Inativo' : 'Ativo';
        toast.success(`Usuário ${newStatus === 'Ativo' ? 'ativado' : 'desativado'} com sucesso!`);
    };

    const handlePromote = (user: User) => {
        if (user.role === 'Admin') {
            toast.message('Esse membro já é administrador.');
            return;
        }
        updateUser(user.id, { role: 'Admin' });
        toast.success(`${user.name} promovido para Admin`);
    };

    const handleDemote = (user: User) => {
        if (user.role === 'Colaborador') {
            toast.message('Esse membro já é colaborador.');
            return;
        }
        updateUser(user.id, { role: 'Colaborador' });
        toast.success(`${user.name} rebaixado para Colaborador`);
    };

    const activeUsers = users.filter(u => u.status === 'Ativo');
    const inactiveUsers = users.filter(u => u.status === 'Inativo');

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Equipe</h1>
                        <p className="text-gray-600 mt-2">
                            {activeUsers.length} {activeUsers.length === 1 ? 'membro ativo' : 'membros ativos'}
                        </p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} />
                        Adicionar Membro
                    </button>
                </div>

                {/* Active Users */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="p-4 bg-emerald-50 border-b border-emerald-100">
                        <h2 className="font-bold text-emerald-900">Membros Ativos</h2>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Nome</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">E-mail</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Cargo</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Desde</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-900">{user.name}</td>
                                    <td className="py-4 px-6 text-gray-600">{user.email}</td>
                                    <td className="py-4 px-6">
                                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${user.role === 'Admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            {canManageUsers() && (
                                                <>
                                                    <button
                                                        onClick={() => handleOpenModal(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    {user.role === 'Colaborador' ? (
                                                        <button
                                                            onClick={() => handlePromote(user)}
                                                            className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            title="Promover para Admin"
                                                        >
                                                            <ArrowUpRight size={18} />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleDemote(user)}
                                                            className="p-2 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title="Rebaixar para Colaborador"
                                                        >
                                                            <ArrowDownRight size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handlePasswordReset(user)}
                                                        className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Resetar senha para 123456"
                                                    >
                                                        <RefreshCcw size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(user.id, user.status)}
                                                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                        title="Desativar"
                                                    >
                                                        <UserX size={18} />
                                                    </button>
                                                    <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Inactive Users */}
                {inactiveUsers.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="font-bold text-gray-700">Membros Inativos</h2>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Nome</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">E-mail</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Cargo</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inactiveUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 opacity-60">
                                        <td className="py-4 px-6 font-semibold text-gray-900">{user.name}</td>
                                        <td className="py-4 px-6 text-gray-600">{user.email}</td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs px-3 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                {canManageUsers() && (
                                                    <>
                                                        <button
                                                            onClick={() => handleToggleStatus(user.id, user.status)}
                                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            title="Reativar"
                                                        >
                                                            <UserCheck size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handlePasswordReset(user)}
                                                            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                            title="Resetar senha para 123456"
                                                        >
                                                            <RefreshCcw size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Excluir"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full">
                            <div className="p-6 border-b flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingUser ? 'Editar Membro' : 'Adicionar Membro'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nome Completo
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        E-mail
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        {editingUser ? 'Nova Senha (deixe em branco para manter)' : 'Senha Provisória'}
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required={!editingUser}
                                        placeholder={editingUser ? 'Deixe em branco para não alterar' : ''}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Função
                                    </label>
                                    <select
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        disabled={editingUser?.role === 'Owner'} // owner não pode ser rebaixado
                                    >
                                        <option value="Colaborador">Colaborador</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Owner">Owner</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {formData.role === 'Owner'
                                            ? '✓ Dono: acesso total e protegido contra exclusão por outros'
                                            : formData.role === 'Admin'
                                                ? '✓ Acesso total ao sistema'
                                                : '✓ Pode criar/editar animais, notícias e eventos'}
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-primary hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
                                    >
                                        {editingUser ? 'Atualizar' : 'Cadastrar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
