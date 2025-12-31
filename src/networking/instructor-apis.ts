import { axiosInstance } from "@/services/axios";

export interface Instructor {
    _id?: string;
    id?: string;
    name: string;
    title: string;
    avatar: string;
    rating: number;
    students: number;
    courses: number;
    bio: string;
    expertise: string[];
}

export const getAllInstructorsApi = async (): Promise<Instructor[]> => {
    const response = await axiosInstance.get('/instructors');
    return response.data;
};

export const createInstructorApi = async (data: Partial<Instructor>): Promise<Instructor> => {
    const response = await axiosInstance.post('/instructors', data);
    return response.data;
};

export const updateInstructorApi = async (id: string, data: Partial<Instructor>): Promise<Instructor> => {
    const response = await axiosInstance.put(`/instructors/${id}`, data);
    return response.data;
};

export const deleteInstructorApi = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/instructors/${id}`);
};

export const getInstructorByIdApi = async (id: string): Promise<Instructor> => {
    const response = await axiosInstance.get(`/instructors/${id}`);
    return response.data;
};
