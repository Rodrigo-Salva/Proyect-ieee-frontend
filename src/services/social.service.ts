import api from './api';

export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon?: string;
    created_at: string;
    updated_at: string;
}

class SocialService {
    async getSocialLinks(): Promise<SocialLink[]> {
        const response = await api.get<SocialLink[]>('/contact/social-links/');
        return response.data;
    }

    async getSocialLinkById(id: number): Promise<SocialLink> {
        const response = await api.get<SocialLink>(`/contact/social-links/${id}/`);
        return response.data;
    }

    async createSocialLink(link: Partial<SocialLink>): Promise<SocialLink> {
        const response = await api.post<SocialLink>('/contact/social-links/', link);
        return response.data;
    }

    async updateSocialLink(id: number, link: Partial<SocialLink>): Promise<SocialLink> {
        const response = await api.put<SocialLink>(`/contact/social-links/${id}/`, link);
        return response.data;
    }

    async deleteSocialLink(id: number): Promise<void> {
        await api.delete(`/contact/social-links/${id}/`);
    }
}

export default new SocialService();
