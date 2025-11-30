import { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAnimals } from '../../contexts/AnimalsContext';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Animal } from '../../data/animals';


export function ManageAnimals() {
    const { animals, addAnimal, updateAnimal, deleteAnimal } = useAnimals();
    const { hasPermission } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        species: 'Cão' as 'Cão' | 'Gato',
        size: 'M' as 'P' | 'M' | 'G',
        age: 'Adulto' as 'Filhote' | 'Adulto' | 'Idoso',
        gender: 'Macho' as 'Macho' | 'Fêmea',
        image: '',
        neutered: false,
        vaccinated: false,
        story: '',
        ageYears: '',
        status: 'Disponível' as 'Disponível' | 'Adotado' | 'Falecido',
        adopterName: '',
        adoptionDate: '',
        finalHappy: false,
    });

    const handleOpenModal = (animal?: Animal) => {
        if (animal) {
            setEditingAnimal(animal);
            setFormData({
                name: animal.name,
                species: animal.species,
                size: animal.size,
                age: animal.age,
                gender: animal.gender,
                image: animal.image,
                neutered: animal.neutered,
                vaccinated: animal.vaccinated,
                story: animal.story,
                ageYears: animal.ageYears,
                status: animal.status,
                adopterName: animal.adopterName || '',
                adoptionDate: animal.adoptionDate || '',
                finalHappy: animal.finalHappy || false,
            });
        } else {
            setEditingAnimal(null);
            setFormData({
                name: '',
                species: 'Cão',
                size: 'M',
                age: 'Adulto',
                gender: 'Macho',
                image: '',
                neutered: false,
                vaccinated: false,
                story: '',
                ageYears: '',
                status: 'Disponível',
                adopterName: '',
                adoptionDate: '',
                finalHappy: false,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAnimal(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.status === 'Adotado') {
            if (!formData.adopterName || !formData.adoptionDate) {
                toast.error('Informe nome do adotante e data da adoção.');
                return;
            }
            formData.finalHappy = true;
        } else {
            // limpar campos se não for adotado
            formData.adopterName = '';
            formData.adoptionDate = '';
            formData.finalHappy = false;
        }

        if (editingAnimal) {
            updateAnimal(editingAnimal.id, formData);
            toast.success('Animal atualizado com sucesso!');
        } else {
            addAnimal(formData);
            toast.success('Animal cadastrado com sucesso!');
        }

        handleCloseModal();
    };

    const handleDelete = (id: number, name: string) => {
        if (window.confirm(`Tem certeza que deseja excluir ${name}?`)) {
            deleteAnimal(id);
            toast.success('Animal excluído com sucesso!');
        }
    };

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Gerenciar Animais</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} />
                        Adicionar Animal
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Foto</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Nome</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Espécie</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Idade</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animals.map((animal) => (
                                <tr key={animal.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-6">
                                        <img
                                            src={animal.image}
                                            alt={animal.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-900">{animal.name}</td>
                                    <td className="py-4 px-6 text-gray-600">{animal.species}</td>
                                    <td className="py-4 px-6 text-gray-600">{animal.ageYears}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1">
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                                animal.status === 'Adotado'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : animal.status === 'Falecido'
                                                        ? 'bg-gray-200 text-gray-700'
                                                        : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {animal.status}
                                            </span>
                                            {animal.status === 'Adotado' && animal.adoptionDate && (
                                                <span className="text-[11px] text-gray-600">
                                                    Adotado em {new Date(animal.adoptionDate).toLocaleDateString('pt-BR')}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(animal)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            {hasPermission('delete_animals') && (
                                                <button
                                                    onClick={() => handleDelete(animal.id, animal.name)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingAnimal ? 'Editar Animal' : 'Adicionar Animal'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nome
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
                                        <label htmlFor="ageYears" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Idade
                                        </label>
                                        <input
                                            id="ageYears"
                                            type="text"
                                            value={formData.ageYears}
                                            onChange={(e) => setFormData({ ...formData, ageYears: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Ex: 2 anos"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                                        URL da Foto
                                    </label>
                                    <input
                                        id="image"
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="species" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Espécie
                                        </label>
                                        <select
                                            id="species"
                                            value={formData.species}
                                            onChange={(e) => setFormData({ ...formData, species: e.target.value as 'Cão' | 'Gato' })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option>Cão</option>
                                            <option>Gato</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="size" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Porte
                                        </label>
                                        <select
                                            id="size"
                                            value={formData.size}
                                            onChange={(e) => setFormData({ ...formData, size: e.target.value as 'P' | 'M' | 'G' })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option>P</option>
                                            <option>M</option>
                                            <option>G</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Faixa Etária
                                        </label>
                                        <select
                                            id="age"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value as 'Filhote' | 'Adulto' | 'Idoso' })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option>Filhote</option>
                                            <option>Adulto</option>
                                            <option>Idoso</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Sexo
                                        </label>
                                        <select
                                            id="gender"
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Macho' | 'Fêmea' })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option>Macho</option>
                                            <option>Fêmea</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="story" className="block text-sm font-semibold text-gray-700 mb-2">
                                        História
                                    </label>
                                    <textarea
                                        id="story"
                                        value={formData.story}
                                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={formData.status}
                                        onChange={(e) => {
                                            const value = e.target.value as 'Disponível' | 'Adotado' | 'Falecido';
                                            setFormData({
                                                ...formData,
                                                status: value,
                                                adopterName: value === 'Adotado' ? formData.adopterName : '',
                                                adoptionDate: value === 'Adotado' ? (formData.adoptionDate || new Date().toISOString().split('T')[0]) : '',
                                            });
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option>Disponível</option>
                                        <option>Adotado</option>
                                        <option>Falecido</option>
                                    </select>
                                </div>

                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.neutered}
                                            onChange={(e) => setFormData({ ...formData, neutered: e.target.checked })}
                                            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                                        />
                                        <span className="font-medium text-gray-700">Castrado</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.vaccinated}
                                            onChange={(e) => setFormData({ ...formData, vaccinated: e.target.checked })}
                                            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                                        />
                                        <span className="font-medium text-gray-700">Vacinado</span>
                                    </label>
                                </div>

                                {formData.status === 'Adotado' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="adopterName" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Nome do Adotante
                                            </label>
                                            <input
                                                id="adopterName"
                                                type="text"
                                                value={formData.adopterName}
                                                onChange={(e) => setFormData({ ...formData, adopterName: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                required={formData.status === 'Adotado'}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="adoptionDate" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Data da Adoção
                                            </label>
                                            <input
                                                id="adoptionDate"
                                                type="date"
                                                value={formData.adoptionDate}
                                                onChange={(e) => setFormData({ ...formData, adoptionDate: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                required={formData.status === 'Adotado'}
                                            />
                                        </div>
                                    </div>
                                )}

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
                                        {editingAnimal ? 'Atualizar' : 'Cadastrar'}
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
