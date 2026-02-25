import api from './api';

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    image_url?: string;
    is_interested: boolean;
    interest_count: number;
}

export interface Resource {
    id: number;
    title: string;
    description: string;
    category: string;
    file_url?: string;
    link_url?: string;
    icon_url?: string;
}

const contentService = {
    // Toggle interest in an event
    toggleEventInterest: async (eventId: number): Promise<{ is_interested: boolean; interest_count: number }> => {
        const response = await api.post(`/content/events/${eventId}/toggle_interest/`);
        return response.data;
    },

    // Get events (paginated)
    getEvents: async (params?: any): Promise<any> => {
        const response = await api.get('/content/events/', { params });
        return response.data;
    },

    // Get resources (paginated)
    getResources: async (params?: any): Promise<any> => {
        const response = await api.get('/content/resources/', { params });
        return response.data;
    }
};

export default contentService;
