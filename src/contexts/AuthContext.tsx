import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { mockUsers, hasPermission, type User } from '../data/users';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
    isAdmin: () => boolean;
    canManageUsers: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('admin_user');
        return stored ? JSON.parse(stored) : null;
    });

    const isAuthenticated = user !== null && user.status === 'Ativo';

    const login = (email: string, password: string) => {
        // Buscar usuário nos dados mock
        const foundUser = mockUsers.find(
            u => u.email === email && u.password === password && u.status === 'Ativo'
        );

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('admin_user', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_user');
    };

    const checkPermission = (permission: string): boolean => {
        if (!user) return false;
        return hasPermission(user.role, permission);
    };

    const checkIsAdmin = (): boolean => {
        return user?.role === 'Admin' || user?.role === 'Owner';
    };

    const canManageUsers = (): boolean => user?.role === 'Admin' || user?.role === 'Owner';

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout,
            hasPermission: checkPermission,
            isAdmin: checkIsAdmin,
            canManageUsers,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
