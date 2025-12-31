import { axiosInstance } from "@/services/axios";

export interface PlatformStats {
    activeStudents: string;
    branches: string;
    totalCourses: number;
    totalInstructors: number;
}

export const getStatsApi = async (): Promise<PlatformStats> => {
    const response = await axiosInstance.get('/stats');
    return response.data;
};

export const updateStatsApi = async (data: { activeStudents?: string; branches?: string }): Promise<PlatformStats> => {
    const response = await axiosInstance.put('/stats', data);
    return response.data;
};
