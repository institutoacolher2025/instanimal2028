import { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Check, X, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface AdoptionRequest {
    id: number;
    animalName: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    message: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
}

export function Approvals() {
    const [requests, setRequests] = useState<AdoptionRequest[]>([
        {
            id: 1,
            animalName: 'Thor',
            applicantName: 'Maria Silva',
            applicantEmail: 'maria@email.com',
            applicantPhone: '(11) 98765-4321',
            message: 'Tenho um quintal grande e experiência com cães de grande porte.',
            date: '2024-11-28',
            status: 'pending',
        },
        {
            id: 2,
            animalName: 'Luna',
            applicantName: 'João Santos',
            applicantEmail: 'joao@email.com',
            applicantPhone: '(11) 91234-5678',
            message: 'Moro em apartamento mas tenho tempo para passear diariamente.',
            date: '2024-11-27',
            status: 'pending',
        },
        {
            id: 3,
            animalName: 'Mel',
            applicantName: 'Ana Costa',
            applicantEmail: 'ana@email.com',
            applicantPhone: '(11) 99876-5432',
            message: 'Sempre tive gatos e quero adotar mais um.',
            date: '2024-11-26',
            status: 'approved',
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRequest, setEditingRequest] = useState<AdoptionRequest | null>(null);
    const [formData, setFormData] = useState<Omit<AdoptionRequest, 'id'>>({
        animalName: '',
        applicantName: '',
        applicantEmail: '',
        applicantPhone: '',
        message: '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
    });

    const openModal = (request?: AdoptionRequest) => {
        if (request) {
            setEditingRequest(request);
            setFormData({
                animalName: request.animalName,
                applicantName: request.applicantName,
                applicantEmail: request.applicantEmail,
                applicantPhone: request.applicantPhone,
                message: request.message,
                date: request.date,
                status: request.status,
            });
        } else {
            setEditingRequest(null);
            setFormData({
                animalName: '',
                applicantName: '',
                applicantEmail: '',
                applicantPhone: '',
                message: '',
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingRequest(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingRequest) {
            setRequests(requests.map(req =>
                req.id === editingRequest.id ? { ...req, ...formData } : req
            ));
            toast.success('Solicitação atualizada com sucesso!');
        } else {
            const nextId = Math.max(0, ...requests.map(r => r.id)) + 1;
            setRequests([...requests, { id: nextId, ...formData }]);
            toast.success('Solicitação adicionada com sucesso!');
        }

        closeModal();
    };

    const handleApprove = (id: number) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: 'approved' as const } : req
        ));
        toast.success('Solicitação aprovada!');
    };

    const handleReject = (id: number) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: 'rejected' as const } : req
        ));
        toast.error('Solicitação rejeitada');
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta solicitação?')) {
            setRequests(requests.filter(req => req.id !== id));
            toast.success('Solicitação excluída');
        }
    };

    const pendingRequests = requests.filter(r => r.status === 'pending');
    const processedRequests = requests.filter(r => r.status !== 'pending');

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Aprovações de Adoção</h1>
                        <p className="text-gray-600 mt-1">Cadastre solicitações manualmente, edite, aprove ou rejeite.</p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} />
                        Nova Solicitação
                    </button>
                </div>

                {/* Pending Requests */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Pendentes ({pendingRequests.length})
                    </h2>

                    <div className="space-y-4">
                        {pendingRequests.map((request) => (
                            <div key={request.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{request.applicantName}</h3>
                                        <p className="text-gray-600">Interessado em: <span className="font-semibold text-primary">{request.animalName}</span></p>
                                        <p className="text-sm text-gray-500">Data: {new Date(request.date).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                                        <Clock size={16} />
                                        <span className="text-sm font-semibold">Pendente</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium">{request.applicantEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Telefone</p>
                                        <p className="font-medium">{request.applicantPhone}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-1">Mensagem</p>
                                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{request.message}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleApprove(request.id)}
                                        className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        <Check size={20} />
                                        Aprovar
                                    </button>
                                    <button
                                        onClick={() => handleReject(request.id)}
                                        className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        <X size={20} />
                                        Rejeitar
                                    </button>
                                    <button
                                        onClick={() => openModal(request)}
                                        className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        title="Editar solicitação"
                                    >
                                        <Edit size={18} />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(request.id)}
                                        className="flex items-center gap-2 px-4 py-3 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                                        title="Excluir solicitação"
                                    >
                                        <Trash2 size={18} />
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}

                        {pendingRequests.length === 0 && (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <Clock className="mx-auto text-gray-400 mb-3" size={48} />
                                <p className="text-gray-600">Nenhuma solicitação pendente</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Processed Requests */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Processadas ({processedRequests.length})
                    </h2>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Solicitante</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Animal</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {processedRequests.map((request) => (
                                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium text-gray-900">{request.applicantName}</td>
                                        <td className="py-3 px-4 text-gray-600">{request.animalName}</td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {new Date(request.date).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="py-3 px-4">
                                            {request.status === 'approved' ? (
                                                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    <Check size={14} />
                                                    Aprovada
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    <X size={14} />
                                                    Rejeitada
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(request)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Editar solicitação"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(request.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Excluir solicitação"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingRequest ? 'Editar Solicitação' : 'Nova Solicitação'}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="applicantName">Nome do Solicitante</label>
                                        <input
                                            id="applicantName"
                                            type="text"
                                            required
                                            value={formData.applicantName}
                                            onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="animalName">Animal</label>
                                        <input
                                            id="animalName"
                                            type="text"
                                            required
                                            value={formData.animalName}
                                            onChange={(e) => setFormData({ ...formData, animalName: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="applicantEmail">E-mail</label>
                                        <input
                                            id="applicantEmail"
                                            type="email"
                                            required
                                            value={formData.applicantEmail}
                                            onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="applicantPhone">Telefone</label>
                                        <input
                                            id="applicantPhone"
                                            type="text"
                                            required
                                            value={formData.applicantPhone}
                                            onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="date">Data</label>
                                        <input
                                            id="date"
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="status">Status</label>
                                        <select
                                            id="status"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as AdoptionRequest['status'] })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="pending">Pendente</option>
                                            <option value="approved">Aprovada</option>
                                            <option value="rejected">Rejeitada</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="message">Mensagem</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-primary hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
                                    >
                                        {editingRequest ? 'Atualizar' : 'Salvar'}
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
