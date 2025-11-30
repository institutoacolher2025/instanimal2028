export type UserRole = 'Admin' | 'Colaborador' | 'Owner';
export type UserStatus = 'Ativo' | 'Inativo';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // Em produção: usar hash bcrypt
    role: UserRole;
    status: UserStatus;
    createdAt: string;
}

// Definição de permissões por role
export const PERMISSIONS = {
    Admin: [
        'view_dashboard',
        'manage_animals',
        'manage_posts',
        'manage_events',
        'view_approvals',
        'view_financial',
        'manage_team',
        'delete_animals',
        'delete_posts',
        'delete_events',
    ],
    Owner: [
        'view_dashboard',
        'manage_animals',
        'manage_posts',
        'manage_events',
        'view_approvals',
        'view_financial',
        'manage_team',
        'delete_animals',
        'delete_posts',
        'delete_events',
    ],
    Colaborador: [
        'view_dashboard',
        'manage_animals',
        'manage_posts',
        'manage_events',
        'view_approvals',
    ],
} as const;

// Usuários mock da equipe
export const mockUsers: User[] = [
    {
        id: 1,
        name: 'Administrador Principal',
        email: 'admin@isa.org',
        password: '123456',
        role: 'Admin',
        status: 'Ativo',
        createdAt: '2024-01-15',
    },
    {
        id: 2,
        name: 'Owner',
        email: 'admin@adotar',
        password: '123456',
        role: 'Owner',
        status: 'Ativo',
        createdAt: '2024-01-20',
    },
    {
        id: 3,
        name: 'Admin Patricia',
        email: 'patricia@adotar',
        password: '123456',
        role: 'Admin',
        status: 'Ativo',
        createdAt: '2024-02-10',
    },
    {
        id: 4,
        name: 'Voluntário Silva',
        email: 'voluntario@isa.org',
        password: '123456',
        role: 'Colaborador',
        status: 'Ativo',
        createdAt: '2024-02-20',
    },
    {
        id: 5,
        name: 'Maria Santos',
        email: 'maria@isa.org',
        password: '123456',
        role: 'Colaborador',
        status: 'Ativo',
        createdAt: '2024-03-10',
    },
    {
        id: 6,
        name: 'João Oliveira',
        email: 'joao@isa.org',
        password: '123456',
        role: 'Admin',
        status: 'Ativo',
        createdAt: '2024-04-05',
    },
    {
        id: 7,
        name: 'Ana Costa',
        email: 'ana@isa.org',
        password: '123456',
        role: 'Colaborador',
        status: 'Inativo',
        createdAt: '2024-05-12',
    },
];

// Helper para verificar permissões
export function hasPermission(role: UserRole, permission: string): boolean {
    return PERMISSIONS[role].includes(permission as any);
}

// Helper para verificar se é admin
export function isAdmin(role: UserRole): boolean {
    return role === 'Admin';
}
