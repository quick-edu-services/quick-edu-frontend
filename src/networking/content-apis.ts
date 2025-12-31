
import { axiosInstance } from "@/services/axios";

export interface HeroContent {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
}

export interface AboutContent {
    title: string;
    description: string;
    mission: string;
    vision: string;
}

export interface ScrollingCourses {
    courses: string[];
}

export type ContentType = 'hero' | 'about' | 'scrolling';

export const getContentApi = async <T>(type: ContentType): Promise<T> => {
    const response = await axiosInstance.get(`/content/${type}`);
    return response.data;
};

export const updateContentApi = async <T>(type: ContentType, data: T): Promise<T> => {
    const response = await axiosInstance.put(`/content/${type}`, data);
    return response.data;
};
