import { useAnimals } from '../contexts/AnimalsContext';
import { Heart, Sparkles, Check } from 'lucide-react';

export function HappyEndings() {
    const { animals } = useAnimals();
    const adoptedAnimals = animals.filter(a => a.status === 'Adotado' || a.finalHappy);

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles size={40} />
                        <h1 className="text-4xl md:text-5xl font-bold">Finais Felizes</h1>
                        <Sparkles size={40} />
                    </div>
                    <p className="text-xl">Celebrando os animais que encontraram um lar cheio de amor</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="text-center mb-12">
                    <p className="text-2xl font-bold text-gray-900">
                        🎉 {adoptedAnimals.length} {adoptedAnimals.length === 1 ? 'animal adotado' : 'animais adotados'}!
                    </p>
                    <p className="text-gray-600 mt-2">
                        Cada adoção é uma vitória e uma vida transformada
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adoptedAnimals.map((animal) => (
                        <div
                            key={animal.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border-4 border-emerald-200 hover:border-emerald-400 transition-all relative"
                        >
                            <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                                <div className="bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                                    <Heart size={16} fill="currentColor" />
                                    ADOTADO
                                </div>
                                {animal.adoptionDate && (
                                    <div className="bg-white/90 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
                                        Adotado em {new Date(animal.adoptionDate).toLocaleDateString('pt-BR')}
                                    </div>
                                )}
                            </div>

                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={animal.image}
                                    alt={animal.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{animal.name}</h3>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                                        {animal.species}
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                                        Porte {animal.size}
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                                        {animal.age}
                                    </span>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    {animal.neutered && (
                                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                                            <Check size={14} />
                                            <span>Castrado</span>
                                        </div>
                                    )}
                                    {animal.vaccinated && (
                                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                                            <Check size={14} />
                                            <span>Vacinado</span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-gray-700 text-sm line-clamp-3">{animal.story}</p>

                                <div className="mt-4 pt-4 border-t border-emerald-100">
                                    <p className="text-center text-emerald-600 font-semibold flex items-center justify-center gap-2">
                                        <Heart size={18} fill="currentColor" />
                                        Vivendo feliz em seu novo lar!
                                    </p>
                                    {animal.adopterName && (
                                        <p className="text-center text-sm text-gray-600 mt-1">Adotante: {animal.adopterName}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {adoptedAnimals.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-xl">
                        <Heart className="mx-auto text-gray-400 mb-3" size={48} />
                        <p className="text-gray-600 text-lg">Ainda não temos finais felizes registrados.</p>
                        <p className="text-gray-500 mt-2">Em breve teremos histórias incríveis para compartilhar!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
