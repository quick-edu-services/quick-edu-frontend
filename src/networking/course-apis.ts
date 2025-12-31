import { axiosInstance } from "@/services/axios";

export interface Course {
    _id?: string;
    id?: string; // for compatibility
    title: string;
    slug: string;
    category: string;
    level: string;
    rating: number;
    reviews: number;
    students: number;
    price: number;
    originalPrice: number;
    instructor: string;
    instructorId: string;
    duration: string;
    lectures: number;
    description: string;
    highlights: string[];
    image: string;
    curriculum: {
        section: string;
        lectures: number;
        duration: string;
    }[];
}

export const getAllCoursesApi = async (): Promise<Course[]> => {
    const response = await axiosInstance.get('/courses');
    return response.data;
};

export const createCourseApi = async (data: Partial<Course>): Promise<Course> => {
    const response = await axiosInstance.post('/courses', data);
    return response.data;
};

export const updateCourseApi = async (id: string, data: Partial<Course>): Promise<Course> => {
    const response = await axiosInstance.put(`/courses/${id}`, data);
    return response.data;
};

export const deleteCourseApi = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/courses/${id}`);
};

export const getCourseBySlugApi = async (slug: string): Promise<Course> => {
    const response = await axiosInstance.get(`/courses/slug/${slug}`);
    return response.data;
};
