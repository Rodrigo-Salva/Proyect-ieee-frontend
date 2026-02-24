import api from './api';

export interface Chapter {
    id: number;
    name: string;
    description: string;
    icon_url?: string;
}

const organizationService = {
    // Get all chapters
    getChapters: async (): Promise<Chapter[]> => {
        const response = await api.get<any>('/organization/chapters/');
        // Handle paginated response if applicable, otherwise return data directly
        if (response.data && response.data.results) {
            return response.data.results;
        }
        return response.data;
    },
};

export default organizationService;
