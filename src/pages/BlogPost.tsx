import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { Calendar, ArrowLeft } from 'lucide-react';

export function BlogPost() {
    const { id } = useParams<{ id: string }>();
    const { getPostById } = usePosts();
    const post = getPostById(Number(id));

    if (!post) {
        return (
            <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
                    <Link to="/resgates" className="text-primary hover:underline">
                        Voltar para o blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    to="/resgates"
                    className="inline-flex items-center gap-2 text-primary hover:text-orange-700 font-semibold mb-8"
                >
                    <ArrowLeft size={20} />
                    Voltar para o blog
                </Link>

                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="relative h-96">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <Calendar size={18} />
                            <span>{new Date(post.date).toLocaleDateString('pt-BR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {post.title}
                        </h1>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <Link
                                to="/resgates"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Ver mais histórias
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
