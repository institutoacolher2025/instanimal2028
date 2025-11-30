import { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { usePosts } from '../../contexts/PostsContext';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import type { BlogPost } from '../../data/posts';

export function ManagePosts() {
    const { posts, addPost, updatePost, deletePost } = usePosts();
    const { hasPermission } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        content: '',
        coverImage: '',
        excerpt: '',
        highlight: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPost) {
            updatePost(editingPost.id, formData);
            toast.success('Post atualizado com sucesso!');
        } else {
            addPost(formData);
            toast.success('Post criado com sucesso!');
        }

        handleCloseModal();
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            date: post.date,
            content: post.content,
            coverImage: post.coverImage,
            excerpt: post.excerpt,
            highlight: post.highlight ?? false,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este post?')) {
            deletePost(id);
            toast.success('Post excluído com sucesso!');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPost(null);
        setFormData({ title: '', date: '', content: '', coverImage: '', excerpt: '', highlight: false });
    };

    return (
        <AdminLayout>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Gerenciar Notícias</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <Plus size={20} />
                        Novo Post
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Título</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Data</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Destaque</th>
                                <th className="text-right py-3 px-6 font-semibold text-gray-700">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-6 font-medium text-gray-900">{post.title}</td>
                                    <td className="py-4 px-6 text-gray-600">
                                        {new Date(post.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        {post.highlight ? (
                                            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                Destaque
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-500">Normal</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            {hasPermission('delete_posts') && (
                                                <button
                                                    onClick={() => handleDelete(post.id)}
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

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingPost ? 'Editar Post' : 'Novo Post'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-semibold mb-2">Título</label>
                                    <input
                                        id="title"
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

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
                                    <label htmlFor="coverImage" className="block text-sm font-semibold mb-2">URL da Imagem de Capa</label>
                                    <input
                                        id="coverImage"
                                        type="url"
                                        required
                                        value={formData.coverImage}
                                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="excerpt" className="block text-sm font-semibold mb-2">Resumo</label>
                                    <textarea
                                        id="excerpt"
                                        required
                                        rows={2}
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-sm font-semibold mb-2">Conteúdo</label>
                                    <textarea
                                        id="content"
                                        required
                                        rows={8}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        id="highlight"
                                        type="checkbox"
                                        checked={formData.highlight}
                                        onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
                                        className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                                    />
                                    <label htmlFor="highlight" className="text-sm font-semibold text-gray-700">
                                        Marcar como destaque na Home
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        {editingPost ? 'Atualizar' : 'Criar'} Post
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
