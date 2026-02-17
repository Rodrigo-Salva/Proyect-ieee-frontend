import api from './api';

export interface News {
    id: number;
    title: string;
    content: string;
    image: string;
    category?: string;
    author: number;
    created_at: string;
    updated_at: string;
}

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    created_at: string;
}

export interface Announcement {
    id: number;
    title: string;
    message: string;
    created_at: string;
}

const contentService = {
    // News endpoints
    getNews: async () => {
        const response = await api.get<News[]>('/content/news/');
        return response.data;
    },

    getNewsById: async (id: number) => {
        const response = await api.get<News>(`/content/news/${id}/`);
        return response.data;
    },

    createNews: async (data: Partial<News>) => {
        const response = await api.post<News>('/content/news/', data);
        return response.data;
    },

    updateNews: async (id: number, data: Partial<News>) => {
        const response = await api.patch<News>(`/content/news/${id}/`, data);
        return response.data;
    },

    deleteNews: async (id: number) => {
        await api.delete(`/content/news/${id}/`);
    },

    // Events endpoints
    getEvents: async () => {
        const response = await api.get<Event[]>('/content/events/');
        return response.data;
    },

    getEventById: async (id: number) => {
        const response = await api.get<Event>(`/content/events/${id}/`);
        return response.data;
    },

    createEvent: async (data: Partial<Event>) => {
        const response = await api.post<Event>('/content/events/', data);
        return response.data;
    },

    updateEvent: async (id: number, data: Partial<Event>) => {
        const response = await api.patch<Event>(`/content/events/${id}/`, data);
        return response.data;
    },

    deleteEvent: async (id: number) => {
        await api.delete(`/content/events/${id}/`);
    },

    // Announcements endpoints
    getAnnouncements: async () => {
        const response = await api.get<Announcement[]>('/content/announcements/');
        return response.data;
    },

    getAnnouncementById: async (id: number) => {
        const response = await api.get<Announcement>(`/content/announcements/${id}/`);
        return response.data;
    },

    createAnnouncement: async (data: Partial<Announcement>) => {
        const response = await api.post<Announcement>('/content/announcements/', data);
        return response.data;
    },

    updateAnnouncement: async (id: number, data: Partial<Announcement>) => {
        const response = await api.patch<Announcement>(`/content/announcements/${id}/`, data);
        return response.data;
    },

    deleteAnnouncement: async (id: number) => {
        await api.delete(`/content/announcements/${id}/`);
    },
};

export default contentService;
