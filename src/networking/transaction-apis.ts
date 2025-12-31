import { axiosInstance } from "@/services/axios";

export interface TransactionData {
    orderId: string;
    cfOrderId?: string;
    userId: string;
    userName: string;
    userEmail: string;
    courses: {
        courseId: string;
        title: string;
        price: number;
    }[];
    amount: number;
    currency?: string;
    status?: 'SUCCESS' | 'FAILED' | 'PENDING';
}

export const recordTransactionApi = async (data: TransactionData) => {
    const response = await axiosInstance.post('/transactions/record', data);
    return response.data;
};

export const getMyTransactionsApi = async () => {
    const response = await axiosInstance.get('/transactions/my-history');
    return response.data;
};
