import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { mockUsers, type User, type UserStatus } from '../data/users';

interface UsersContextType {
    users: User[];
    addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
    updateUser: (id: number, user: Partial<User>) => void;
    deleteUser: (id: number) => void;
    toggleUserStatus: (id: number) => void;
    getUserById: (id: number) => User | undefined;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>(() => {
        const stored = localStorage.getItem('isa_users');
        return stored ? JSON.parse(stored) : mockUsers;
    });

    useEffect(() => {
        localStorage.setItem('isa_users', JSON.stringify(users));
    }, [users]);

    const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
        const newUser: User = {
            ...userData,
            id: Math.max(0, ...users.map(u => u.id)) + 1,
            createdAt: new Date().toISOString().split('T')[0],
        };
        setUsers([...users, newUser]);
    };

    const updateUser = (id: number, userData: Partial<User>) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, ...userData } : user
        ));
    };

    const deleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const toggleUserStatus = (id: number) => {
        setUsers(users.map(user =>
            user.id === id
                ? { ...user, status: user.status === 'Ativo' ? 'Inativo' as UserStatus : 'Ativo' as UserStatus }
                : user
        ));
    };

    const getUserById = (id: number) => {
        return users.find(user => user.id === id);
    };

    return (
        <UsersContext.Provider value={{
            users,
            addUser,
            updateUser,
            deleteUser,
            toggleUserStatus,
            getUserById,
        }}>
            {children}
        </UsersContext.Provider>
    );
}

export function useUsers() {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsers must be used within UsersProvider');
    }
    return context;
}
