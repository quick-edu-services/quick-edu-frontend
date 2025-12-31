import { loginApi } from '@/networking/authentications/auth-apis';
import { jwtDecode } from '@/services/jwt';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface User {
    _id: string;
    fullName?: string;
    email: string;
    role?: string;
    [key: string]: any;
}

interface AuthContextType {
    userData: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: (redirectPath?: string) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logout = (redirectPath: string = '/login') => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUserData(null);
        navigate(redirectPath);
    };

    const checkTokenExpiration = (token: string) => {
        try {
            const decoded = jwtDecode(token);
            // exp is in seconds, Date.now() is in ms
            if (decoded && decoded.exp * 1000 < Date.now()) {
                logout();
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            if (checkTokenExpiration(token)) {
                try {
                    setUserData(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Error parsing stored user data", e);
                    logout();
                }

                // Set up auto logout
                try {
                    const decoded = jwtDecode(token);
                    if (decoded) {
                        const timeout = decoded.exp * 1000 - Date.now();
                        if (timeout > 0) {
                            const timer = setTimeout(() => {
                                toast.info("Session expired. Please login again.");
                                logout();
                            }, timeout);

                            // Do not return early here, as it skips setLoading(false)
                            // We will handle cleanup in a way that doesn't block
                        } else {
                            logout();
                        }
                    }
                } catch (e) {
                    console.error("Error decoding token for auto-logout", e);
                }
            }
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        try {
            // Backend expects 'email', so we map username to email
            const response = await loginApi({ email: username, password });

            // The response from loginApi is already the data object
            const { success, data, message } = response;

            if (!success) {
                throw new Error(message || 'Login failed');
            }

            const { token, user } = data;

            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUserData(user);

            const decoded = jwtDecode(token);
            if (decoded) {
                const timeout = decoded.exp * 1000 - Date.now();
                if (timeout > 0) {
                    setTimeout(() => {
                        toast.info("Session expired. Please login again.");
                        logout();
                    }, timeout);
                }
            }

            return true;
        } catch (error: any) {
            console.error("Login error:", error);
            const errorMsg = error.response?.data?.message || error.message || 'Login failed';
            toast.error(errorMsg);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ userData, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};
