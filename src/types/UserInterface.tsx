export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl: string;
    role?: 'USER' | 'ADMIN' | 'MODERATOR';
}

export interface registerDto {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface loginDto {
    email: string;
    password: string;
}