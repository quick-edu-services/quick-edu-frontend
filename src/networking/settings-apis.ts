
import { axiosInstance } from "@/services/axios";

export interface SocialLinks {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
}

export interface SiteSettings {
    siteName: string;
    tagline?: string;
    email: string;
    phone: string;
    address: string;
    aboutText: string;
    socialLinks?: SocialLinks;
}

export const getSettingsApi = async (): Promise<SiteSettings> => {
    const response = await axiosInstance.get('/settings');
    return response.data;
};

export const updateSettingsApi = async (data: SiteSettings): Promise<SiteSettings> => {
    const response = await axiosInstance.put('/settings', data);
    return response.data;
};
