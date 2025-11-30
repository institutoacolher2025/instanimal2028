import { Link } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { Calendar, ArrowRight } from 'lucide-react';

export function Blog() {
    const { posts } = usePosts();
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="bg-gradient-to-r from-primary to-orange-600 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Diário de Resgates</h1>
                    <p className="text-xl">Acompanhe nossas histórias de resgate e transformação</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedPosts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/resgates/${post.id}`}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                    <Calendar size={16} />
                                    <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                                <div className="flex items-center gap-2 text-primary font-semibold">
                                    Ler mais
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {sortedPosts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">Nenhuma notícia publicada ainda.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
