import { createContext, useContext, useState, type ReactNode } from 'react';
import { mockPosts, type BlogPost } from '../data/posts';

interface PostsContextType {
    posts: BlogPost[];
    addPost: (post: Omit<BlogPost, 'id'>) => void;
    updatePost: (id: number, post: Omit<BlogPost, 'id'>) => void;
    deletePost: (id: number) => void;
    getPostById: (id: number) => BlogPost | undefined;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
    const [posts, setPosts] = useState<BlogPost[]>(() => {
        const stored = localStorage.getItem('blog_posts');
        return stored ? JSON.parse(stored) : mockPosts;
    });

    const saveToStorage = (newPosts: BlogPost[]) => {
        localStorage.setItem('blog_posts', JSON.stringify(newPosts));
        setPosts(newPosts);
    };

    const addPost = (post: Omit<BlogPost, 'id'>) => {
        const newId = Math.max(...posts.map(p => p.id), 0) + 1;
        const newPost = { ...post, id: newId };
        saveToStorage([newPost, ...posts]);
    };

    const updatePost = (id: number, post: Omit<BlogPost, 'id'>) => {
        const updated = posts.map(p => p.id === id ? { ...post, id } : p);
        saveToStorage(updated);
    };

    const deletePost = (id: number) => {
        const filtered = posts.filter(p => p.id !== id);
        saveToStorage(filtered);
    };

    const getPostById = (id: number) => {
        return posts.find(p => p.id === id);
    };

    return (
        <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost, getPostById }}>
            {children}
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error('usePosts must be used within PostsProvider');
    }
    return context;
}
