import React, { createContext, useState, useContext, useEffect } from 'react';
import authService, { User } from '../services/auth.service';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    updateProfile: (formData: FormData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error('Failed to parse user from localStorage', e);
            return null;
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hydrate and refresh background data
        const initAuth = async () => {
            if (authService.isAuthenticated()) {
                try {
                    // This now calls /auth/users/profile/ internally
                    const currentUser = await authService.getCurrentUser();
                    setUser(currentUser);
                } catch (error) {
                    console.error('Failed to refresh user session:', error);
                    // If refresh fails (e.g. token expired and refresh failed), logout
                    if (!authService.isAuthenticated()) {
                        setUser(null);
                    }
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password });
            setUser(response.user);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (data: any) => {
        try {
            const response = await authService.register(data);
            setUser(response.user);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const updateProfile = async (formData: FormData) => {
        try {
            const updatedUser = await authService.updateProfile(formData);
            setUser(updatedUser);
        } catch (error) {
            console.error('Update profile failed:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        updateProfile,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
