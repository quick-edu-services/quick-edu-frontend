import { authApi } from '@/services/axios';
import { LOGIN_URL, SIGNUP_URL, FORGOT_PASSWORD_URL, RESET_PASSWORD_URL, REGISTER_ADMIN_URL } from './auth-endpoints';

// TypeScript Interfaces
export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    fullName: string;
    email: string;
    password: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    otp: string;
    newPassword: string;
}

export interface RegisterAdminPayload {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface LoginResponse extends AuthResponse {
    data: {
        token: string;
        user: {
            _id: string;
            fullName: string;
            email: string;
            username?: string;
            role: 'student' | 'admin' | 'instructor';
        };
    };
}

export interface ForgotPasswordResponse extends AuthResponse {
    data: {
        message: string;
    };
}

export interface ResetPasswordResponse extends AuthResponse {
    data: {
        message: string;
    };
}

// API Functions
export const loginApi = async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await authApi.post(LOGIN_URL, data);
    return response.data;
};

export const signupApi = async (data: SignupPayload): Promise<AuthResponse> => {
    const response = await authApi.post(SIGNUP_URL, data);
    return response.data;
};

export const forgotPasswordApi = async (data: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
    const response = await authApi.post(FORGOT_PASSWORD_URL, data);
    return response.data;
};

export const resetPasswordApi = async (data: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
    const response = await authApi.post(RESET_PASSWORD_URL, data);
    return response.data;
};

export const registerAdminApi = async (data: RegisterAdminPayload): Promise<AuthResponse> => {
    const response = await authApi.post(REGISTER_ADMIN_URL, data);
    return response.data;
};

