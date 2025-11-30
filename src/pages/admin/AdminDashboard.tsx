import { AdminLayout } from '../../components/AdminLayout';
import { useAnimals } from '../../contexts/AnimalsContext';
import { PawPrint, Heart, CheckCircle, Plus, FileText, Calendar, CheckCircle2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
    const { animals } = useAnimals();

    const stats = {
        total: animals.length,
        neutered: animals.filter(a => a.neutered).length,
        vaccinated: animals.filter(a => a.vaccinated).length,
        available: animals.filter(a => a.status === 'Disponível').length,
        adopted: animals.filter(a => a.status === 'Adotado').length,
        deceased: animals.filter(a => a.status === 'Falecido').length,
    };

    return (
        <AdminLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Resumo</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total de Animais</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <PawPrint className="text-primary" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Castrados</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.neutered}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-emerald-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Vacinados</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.vaccinated}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Heart className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Falecidos</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.deceased}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-gray-500" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Últimos Animais Cadastrados</h2>
                    <div className="space-y-3">
                        {animals.slice(-5).reverse().map((animal) => (
                            <div key={animal.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <img
                                    src={animal.image}
                                    alt={animal.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{animal.name}</p>
                                    <p className="text-sm text-gray-600">{animal.species} • {animal.age}</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                        animal.status === 'Adotado'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : animal.status === 'Falecido'
                                                ? 'bg-gray-200 text-gray-700'
                                                : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {animal.status}
                                    </span>
                                    {animal.neutered && (
                                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                            Castrado
                                        </span>
                                    )}
                                    {animal.vaccinated && (
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                            Vacinado
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Disponibilidade</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50">
                                <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold">Disponíveis</p>
                                <p className="text-3xl font-bold text-blue-900 mt-1">{stats.available}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50">
                                <p className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">Adotados</p>
                                <p className="text-3xl font-bold text-emerald-900 mt-1">{stats.adopted}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-100">
                                <p className="text-xs uppercase tracking-wide text-gray-700 font-semibold">Falecidos</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.deceased}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/admin/animals" className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                                <Plus className="text-primary" size={20} />
                                <div>
                                    <p className="font-semibold text-gray-900">Registrar animal</p>
                                    <p className="text-sm text-gray-600">Novo cadastro ou atualização</p>
                                </div>
                            </Link>
                            <Link to="/admin/posts" className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                                <FileText className="text-primary" size={20} />
                                <div>
                                    <p className="font-semibold text-gray-900">Publicar notícia</p>
                                    <p className="text-sm text-gray-600">Compartilhe novidades</p>
                                </div>
                            </Link>
                            <Link to="/admin/events" className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                                <Calendar className="text-primary" size={20} />
                                <div>
                                    <p className="font-semibold text-gray-900">Criar evento</p>
                                    <p className="text-sm text-gray-600">Divulgue campanhas</p>
                                </div>
                            </Link>
                            <Link to="/admin/approvals" className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                                <CheckCircle2 className="text-primary" size={20} />
                                <div>
                                    <p className="font-semibold text-gray-900">Aprovações</p>
                                    <p className="text-sm text-gray-600">Revise pedidos de adoção</p>
                                </div>
                            </Link>
                            <Link to="/admin/team" className="flex items-center gap-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                                <Users className="text-primary" size={20} />
                                <div>
                                    <p className="font-semibold text-gray-900">Equipe</p>
                                    <p className="text-sm text-gray-600">Gerencie acessos</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
