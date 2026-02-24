import api from './api';

export interface LoginCredentials {
    email: string;
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
    phone?: string;
    biography?: string;
    ieee_id?: string;
    avatar?: string;
    avatar_url?: string;
    interested_chapters?: number[];
}

export interface RegisterData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
}

export interface AuthResponse extends AuthTokens {
    user: User;
}

const authService = {
    // Login and get JWT tokens
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/token/', credentials);
        const { access, refresh, user } = response.data;

        // Store tokens and user in localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
    },

    // Register a new user
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register/', data);
        const { access, refresh, user } = response.data;

        // Store tokens and user in localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
    },

    // Update user profile
    updateProfile: async (formData: FormData): Promise<User> => {
        const response = await api.put<User>('/auth/users/profile/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    },

    // Logout and clear tokens
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },

    // Get current user info
    getCurrentUser: async (): Promise<User> => {
        // Use the consolidated profile endpoint instead of /me/
        const response = await api.get<User>('/auth/users/profile/');
        localStorage.setItem('user', JSON.stringify(response.data));
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
