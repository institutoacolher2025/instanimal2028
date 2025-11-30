import { useState, useMemo, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { TrendingUp, DollarSign, Plus, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';

export function Financial() {
    type Donation = {
        id: number;
        donor: string;
        amount: number;
        date: string;
        type: 'PIX' | 'Ração';
        status: 'Confirmado' | 'Pendente';
    };

    const initialDonations: Donation[] = [
        { id: 1, donor: 'Maria Silva', amount: 250, date: '2024-11-28', type: 'PIX', status: 'Confirmado' },
        { id: 2, donor: 'Casa do Pet', amount: 500, date: '2024-11-27', type: 'Ração', status: 'Confirmado' },
        { id: 3, donor: 'João Santos', amount: 120, date: '2024-11-27', type: 'PIX', status: 'Pendente' },
        { id: 4, donor: 'Ana Costa', amount: 300, date: '2024-11-25', type: 'PIX', status: 'Confirmado' },
    ];

    const [donations, setDonations] = useState<Donation[]>(() => {
        const stored = localStorage.getItem('donations_data');
        return stored ? JSON.parse(stored) : initialDonations;
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
    const [formData, setFormData] = useState({
        donor: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        type: 'PIX' as Donation['type'],
        status: 'Confirmado' as Donation['status'],
    });

    useEffect(() => {
        localStorage.setItem('donations_data', JSON.stringify(donations));
    }, [donations]);

    const currentMonthLabel = new Date().toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

    const totals = useMemo(() => {
        const confirmed = donations.filter(d => d.status === 'Confirmado');
        const total = confirmed.reduce((sum, d) => sum + d.amount, 0);
        const monthTotal = confirmed
            .filter(d => {
                const label = new Date(d.date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
                return label === currentMonthLabel;
            })
            .reduce((sum, d) => sum + d.amount, 0);
        return { total, monthTotal };
    }, [donations, currentMonthLabel]);

    const handleOpenModal = (donation?: Donation) => {
        if (donation) {
            setEditingDonation(donation);
            setFormData({
                donor: donation.donor,
                amount: donation.amount.toString(),
                date: donation.date,
                type: donation.type,
                status: donation.status,
            });
        } else {
            setEditingDonation(null);
            setFormData({
                donor: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                type: 'PIX',
                status: 'Confirmado',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingDonation(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amountNumber = Number(formData.amount);
        if (Number.isNaN(amountNumber) || amountNumber <= 0) {
            return;
        }

        if (editingDonation) {
            setDonations(donations.map(d =>
                d.id === editingDonation.id
                    ? { ...d, ...formData, amount: amountNumber }
                    : d
            ));
        } else {
            const nextId = Math.max(0, ...donations.map(d => d.id)) + 1;
            setDonations([
                ...donations,
                {
                    id: nextId,
                    donor: formData.donor,
                    type: formData.type,
                    status: formData.status,
                    amount: amountNumber,
                    date: formData.date,
                },
            ]);
        }

        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este lançamento?')) {
            setDonations(donations.filter(d => d.id !== id));
        }
    };

    const sortedDonations = [...donations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
                        <p className="text-gray-600 mt-1">Registrar doações recebidas (PIX/Ração) para transparência.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} />
                        Novo Lançamento
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Arrecadado no mês ({currentMonthLabel})</p>
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-emerald-600" size={20} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            R$ {totals.monthTotal.toLocaleString('pt-BR')}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Total de doações (confirmadas)</p>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="text-blue-600" size={20} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            R$ {totals.total.toLocaleString('pt-BR')}
                        </p>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Doações Registradas</h2>
                        <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-2 text-primary font-semibold hover:text-orange-700"
                        >
                            <Plus size={18} />
                            Adicionar
                        </button>
                    </div>

                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Doador</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Valor</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Data</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Tipo</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                                <th className="text-right py-3 px-6 font-semibold text-gray-700">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedDonations.map((donation) => (
                                <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-6 font-medium text-gray-900">
                                        {donation.donor}
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-900">
                                        R$ {donation.amount.toLocaleString('pt-BR')}
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        {new Date(donation.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            {donation.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {donation.status === 'Confirmado' ? (
                                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                <CheckCircle size={14} />
                                                Confirmado
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                <Clock size={14} />
                                                Pendente
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(donation)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar lançamento"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(donation.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Excluir lançamento"
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

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-xl w-full">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingDonation ? 'Editar doação' : 'Registrar doação'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <span className="sr-only">Fechar</span>
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="donor">Doador</label>
                                        <input
                                            id="donor"
                                            type="text"
                                            required
                                            value={formData.donor}
                                            onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="amount">Valor</label>
                                        <input
                                            id="amount"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            required
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="type">Tipo</label>
                                        <select
                                            id="type"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value as Donation['type'] })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="PIX">PIX</option>
                                            <option value="Ração">Ração</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="status">Status</label>
                                        <select
                                            id="status"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as Donation['status'] })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="Confirmado">Confirmado</option>
                                            <option value="Pendente">Pendente</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-2">
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
                                        {editingDonation ? 'Atualizar' : 'Salvar'}
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
