import api from './api';

export interface Resource {
    id: number;
    title: string;
    description: string;
    file: string;
    file_url?: string;
    category: string;
    uploaded_by_username: string;
    download_count: number;
    created_at: string;
}

export interface ResourcesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Resource[];
}

const resourcesService = {
    getResources: async (): Promise<Resource[]> => {
        const response = await api.get('/resources/resources/');
        return Array.isArray(response.data) ? response.data : (response.data as any).results || [];
    },

    getResourceById: async (id: number): Promise<Resource> => {
        const response = await api.get(`/resources/resources/${id}/`);
        return response.data;
    },

    downloadResource: async (id: number): Promise<void> => {
        // Implementation for download tracking if needed
    }
};

export default resourcesService;
