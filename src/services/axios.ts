import { BASE_URLS } from '@/services/config/base-urls';
import axios from 'axios';

const getAuthToken = () => {
    try {
        // Get accessToken from localStorage
        return localStorage.getItem('accessToken') || null;
    } catch {
        return null;
    }
};

const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({ baseURL });

    instance.interceptors.request.use(
        (request) => {
            const token = getAuthToken();
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        },
        (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
        (response) => response,
        (error) =>
            Promise.reject(
                (error.response && error.response.data) || {
                    message: 'Something went wrong',
                },
            ),
    );

    return instance;
};

const axiosInstance = createAxiosInstance(BASE_URLS.API);
const authApi = createAxiosInstance(BASE_URLS.AUTH);

export {
    authApi,
    axiosInstance
};
