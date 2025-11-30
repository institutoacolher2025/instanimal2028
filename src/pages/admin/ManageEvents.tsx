import { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useEvents } from '../../contexts/EventsContext';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit, Trash2, X, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import type { Event } from '../../data/events';

export function ManageEvents() {
    const { events, addEvent, updateEvent, deleteEvent } = useEvents();
    const { hasPermission } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        description: '',
        status: 'Agendado' as 'Agendado' | 'Concluído',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingEvent) {
            updateEvent(editingEvent.id, formData);
            toast.success('Evento atualizado com sucesso!');
        } else {
            addEvent(formData);
            toast.success('Evento criado com sucesso!');
        }

        handleCloseModal();
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            name: event.name,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description,
            status: event.status ?? 'Agendado',
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este evento?')) {
            deleteEvent(id);
            toast.success('Evento excluído com sucesso!');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        setFormData({ name: '', date: '', time: '', location: '', description: '', status: 'Agendado' });
    };

    const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Gerenciar Eventos</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} />
                        Novo Evento
                    </button>
                </div>

                <div className="grid gap-4">
                    {sortedEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4 flex-1">
                                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                        <Calendar className="text-primary" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                                (event.status ?? 'Agendado') === 'Agendado'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                                {event.status ?? 'Agendado'}
                                            </span>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p><strong>Data:</strong> {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}</p>
                                            <p><strong>Local:</strong> {event.location}</p>
                                            <p className="text-gray-700 mt-2">{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    {hasPermission('delete_events') && (
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingEvent ? 'Editar Evento' : 'Novo Evento'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold mb-2">Nome do Evento</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-semibold mb-2">Data</label>
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
                                        <label htmlFor="time" className="block text-sm font-semibold mb-2">Horário</label>
                                        <input
                                            id="time"
                                            type="time"
                                            required
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-semibold mb-2">Local</label>
                                    <input
                                        id="location"
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-semibold mb-2">Descrição</label>
                                    <textarea
                                        id="description"
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-semibold mb-2">Status</label>
                                    <select
                                        id="status"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Agendado' | 'Concluído' })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="Agendado">Agendado</option>
                                        <option value="Concluído">Concluído</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        {editingEvent ? 'Atualizar' : 'Criar'} Evento
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Cancelar
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
