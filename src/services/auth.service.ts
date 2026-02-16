import api from './api';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
}

const authService = {
    // Login and get JWT tokens
    login: async (credentials: LoginCredentials): Promise<AuthTokens> => {
        const response = await api.post<AuthTokens>('/auth/token/', credentials);
        const { access, refresh } = response.data;

        // Store tokens in localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        return response.data;
    },

    // Logout and clear tokens
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    // Get current user info
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/auth/users/me/');
        return response.data;
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('access_token');
    },

    // Get access token
    getAccessToken: (): string | null => {
        return localStorage.getItem('access_token');
    },
};

export default authService;
