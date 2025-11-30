import { useState } from 'react';
import { X, Check, Heart } from 'lucide-react';
import { useAnimals } from '../contexts/AnimalsContext';
import type { Animal } from '../data/animals';

export function Adopt() {
    const { animals } = useAnimals();
    const [selectedSpecies, setSelectedSpecies] = useState<string>('Todos');
    const [selectedSize, setSelectedSize] = useState<string>('Todos');
    const [selectedAge, setSelectedAge] = useState<string>('Todos');
    const [selectedGender, setSelectedGender] = useState<string>('Todos');
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

    // Filter out adopted animals - only show available ones
    const availableAnimals = animals.filter(a => a.status === 'Disponível');

    const filteredAnimals = availableAnimals.filter((animal) => {
        if (selectedSpecies !== 'Todos' && animal.species !== selectedSpecies) return false;
        if (selectedSize !== 'Todos' && animal.size !== selectedSize) return false;
        if (selectedAge !== 'Todos' && animal.age !== selectedAge) return false;
        if (selectedGender !== 'Todos' && animal.gender !== selectedGender) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="bg-gradient-to-r from-primary to-orange-600 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Quero Adotar</h1>
                    <p className="text-xl">Encontre seu novo melhor amigo</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-20">
                            <h2 className="text-xl font-bold mb-6">Filtros</h2>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="species-filter" className="block text-sm font-semibold mb-2">Espécie</label>
                                    <select
                                        id="species-filter"
                                        value={selectedSpecies}
                                        onChange={(e) => setSelectedSpecies(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option>Todos</option>
                                        <option>Cão</option>
                                        <option>Gato</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="size-filter" className="block text-sm font-semibold mb-2">Porte</label>
                                    <select
                                        id="size-filter"
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option>Todos</option>
                                        <option>P</option>
                                        <option>M</option>
                                        <option>G</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="age-filter" className="block text-sm font-semibold mb-2">Idade</label>
                                    <select
                                        id="age-filter"
                                        value={selectedAge}
                                        onChange={(e) => setSelectedAge(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option>Todos</option>
                                        <option>Filhote</option>
                                        <option>Adulto</option>
                                        <option>Idoso</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="gender-filter" className="block text-sm font-semibold mb-2">Sexo</label>
                                    <select
                                        id="gender-filter"
                                        value={selectedGender}
                                        onChange={(e) => setSelectedGender(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option>Todos</option>
                                        <option>Macho</option>
                                        <option>Fêmea</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedSpecies('Todos');
                                        setSelectedSize('Todos');
                                        setSelectedAge('Todos');
                                        setSelectedGender('Todos');
                                    }}
                                    className="w-full text-primary font-semibold hover:text-orange-700 text-sm"
                                >
                                    Limpar Filtros
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Animals Grid */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-900">{filteredAnimals.length}</span> {filteredAnimals.length === 1 ? 'animal encontrado' : 'animais encontrados'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredAnimals.map((animal) => (
                                <div
                                    key={animal.id}
                                    onClick={() => setSelectedAnimal(animal)}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer group"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={animal.image}
                                            alt={animal.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            {animal.neutered && (
                                                <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                    <Check size={12} /> Castrado
                                                </div>
                                            )}
                                            {animal.vaccinated && (
                                                <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                    <Check size={12} /> Vacinado
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{animal.name}</h3>
                                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                                            <span className="bg-gray-100 px-3 py-1 rounded-full">{animal.species}</span>
                                            <span className="bg-gray-100 px-3 py-1 rounded-full">Porte {animal.size}</span>
                                            <span className="bg-gray-100 px-3 py-1 rounded-full">{animal.age}</span>
                                            <span className="bg-gray-100 px-3 py-1 rounded-full">{animal.gender}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">{animal.ageYears}</p>
                                        <button className="w-full bg-primary hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredAnimals.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">Nenhum animal encontrado com esses filtros.</p>
                                <button
                                    onClick={() => {
                                        setSelectedSpecies('Todos');
                                        setSelectedSize('Todos');
                                        setSelectedAge('Todos');
                                        setSelectedGender('Todos');
                                    }}
                                    className="mt-4 text-primary font-semibold hover:text-orange-700"
                                >
                                    Limpar Filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedAnimal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedAnimal(null)}>
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                            <img
                                src={selectedAnimal.image}
                                alt={selectedAnimal.name}
                                className="w-full h-96 object-cover"
                            />
                            <button
                                onClick={() => setSelectedAnimal(null)}
                                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                                aria-label="Fechar"
                            >
                                <X size={24} />
                            </button>
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                {selectedAnimal.neutered && (
                                    <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Check size={14} /> Castrado
                                    </div>
                                )}
                                {selectedAnimal.vaccinated && (
                                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Check size={14} /> Vacinado
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedAnimal.name}</h2>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">{selectedAnimal.species}</span>
                                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">Porte {selectedAnimal.size}</span>
                                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">{selectedAnimal.age}</span>
                                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">{selectedAnimal.gender}</span>
                                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">{selectedAnimal.ageYears}</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-3">História</h3>
                                <p className="text-gray-700 leading-relaxed">{selectedAnimal.story}</p>
                            </div>

                            <button className="w-full bg-primary hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
                                <Heart size={24} />
                                Quero Adotar {selectedAnimal.name}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
