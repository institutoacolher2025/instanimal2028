import { Heart, Calendar, Dog, Cat, Bone, Users, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { useEvents } from '../contexts/EventsContext';
import { useAnimals } from '../contexts/AnimalsContext';

export function Home() {
    const { posts } = usePosts();
    const { events } = useEvents();
    const { animals } = useAnimals();

    const latestPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
    const adoptedAnimals = animals.filter(a => a.status === 'Adotado').slice(0, 3);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Transformando vidas, <br /> um resgate de cada vez
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Dê uma nova chance para quem só quer amar. Adote ou ajude a manter nosso abrigo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                            Quero Adotar
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                            Fazer Doação Mensal
                        </button>
                    </div>
                </div>
            </section>

            {/* Transparency Panel */}
            <section className="bg-emerald-600 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                        <div className="flex flex-col items-center p-4">
                            <Heart size={48} className="mb-4 text-emerald-200" />
                            <span className="text-4xl font-bold mb-2">1.200+</span>
                            <span className="text-lg opacity-90">Animais Salvos</span>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <Calendar size={48} className="mb-4 text-emerald-200" />
                            <span className="text-4xl font-bold mb-2">850</span>
                            <span className="text-lg opacity-90">Adoções</span>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <Bone size={48} className="mb-4 text-emerald-200" />
                            <span className="text-4xl font-bold mb-2">5 Toneladas</span>
                            <span className="text-lg opacity-90">Ração Doadas</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Esperando por um Lar</h2>
                        <p className="text-xl text-gray-600">Estes amigos estão esperando há muito tempo por uma família.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Thor',
                                time: '2 anos de espera',
                                image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                type: 'Cão',
                                age: '4 anos'
                            },
                            {
                                name: 'Luna',
                                time: '1 ano de espera',
                                image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                type: 'Gato',
                                age: '2 anos'
                            },
                            {
                                name: 'Bob',
                                time: '3 anos de espera',
                                image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                type: 'Cão',
                                age: '6 anos'
                            }
                        ].map((animal, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={animal.image}
                                        alt={animal.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                                        {animal.time}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{animal.name}</h3>
                                            <p className="text-gray-500">{animal.type} • {animal.age}</p>
                                        </div>
                                        {animal.type === 'Cão' ? <Dog className="text-gray-400" /> : <Cat className="text-gray-400" />}
                                    </div>
                                    <button className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-3 rounded-xl font-semibold transition-colors">
                                        Conhecer História
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Blog Posts */}
            {latestPosts.length > 0 && (
                <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Últimas do Diário</h2>
                                <p className="text-xl text-gray-600">Histórias de resgate e transformação</p>
                            </div>
                            <Link to="/resgates" className="flex items-center gap-2 text-primary hover:text-orange-700 font-semibold">
                                Ver todas <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {latestPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/resgates/${post.id}`}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('pt-BR')}</p>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Próximos Eventos</h2>
                                <p className="text-xl text-gray-600">Participe e ajude a causa animal</p>
                            </div>
                            <Link to="/eventos" className="flex items-center gap-2 text-primary hover:text-orange-700 font-semibold">
                                Ver agenda completa <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-gradient-to-br from-primary/5 to-orange-50 rounded-2xl p-6 border-2 border-primary/20 hover:border-primary transition-colors"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-primary rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                                            <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                                            <div className="text-xs uppercase">{new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}</div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2">{event.name}</h3>
                                            <p className="text-sm text-gray-600 mb-1">{event.time} • {event.location}</p>
                                            <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Happy Endings */}
            {adoptedAnimals.length > 0 && (
                <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Sparkles className="text-emerald-600" size={32} />
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Finais Felizes</h2>
                                    <Sparkles className="text-emerald-600" size={32} />
                                </div>
                                <p className="text-xl text-gray-600">Celebrando nossos sucessos</p>
                            </div>
                            <Link to="/finais-felizes" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold">
                                Ver todos <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {adoptedAnimals.map((animal) => (
                                <div
                                    key={animal.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border-4 border-emerald-200 hover:border-emerald-400 transition-all relative"
                                >
                                    <div className="absolute top-4 right-4 z-10">
                                        <div className="bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                                            <Heart size={16} fill="currentColor" />
                                            ADOTADO
                                        </div>
                                    </div>
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={animal.image}
                                            alt={animal.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{animal.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{animal.species} • {animal.ageYears}</p>
                                        <p className="text-emerald-600 font-semibold flex items-center gap-2">
                                            <Heart size={16} fill="currentColor" />
                                            Vivendo feliz em seu novo lar!
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* How to Help Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como Você Pode Ajudar</h2>
                        <p className="text-xl text-gray-600">Existem várias formas de fazer a diferença.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="text-primary" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Seja Voluntário</h3>
                            <p className="text-gray-600 mb-6">Doe seu tempo e carinho. Precisamos de ajuda nos eventos e no dia a dia do abrigo.</p>
                            <button className="text-primary font-semibold hover:text-orange-700">Saiba mais →</button>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift className="text-emerald-600" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Doe Materiais</h3>
                            <p className="text-gray-600 mb-6">Ração, medicamentos, cobertores e produtos de limpeza são sempre bem-vindos.</p>
                            <button className="text-emerald-600 font-semibold hover:text-emerald-700">Ver lista de necessidades →</button>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="text-blue-600" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Apadrinhe</h3>
                            <p className="text-gray-600 mb-6">Não pode adotar? Ajude a manter um animal específico com uma contribuição mensal.</p>
                            <button className="text-blue-600 font-semibold hover:text-blue-700">Escolher um afilhado →</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
