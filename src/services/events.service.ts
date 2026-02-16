import api from './api';

export interface Event {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location: string;
    image?: string;
    created_at: string;
    updated_at: string;
}

const eventsService = {
    getEvents: async (): Promise<Event[]> => {
        const response = await api.get('/content/events/');
        return response.data;
    },

    getEvent: async (id: number): Promise<Event> => {
        const response = await api.get(`/content/events/${id}/`);
        return response.data;
    },

    createEvent: async (event: Partial<Event>): Promise<Event> => {
        const response = await api.post('/content/events/', event);
        return response.data;
    },

    updateEvent: async (id: number, event: Partial<Event>): Promise<Event> => {
        const response = await api.put(`/content/events/${id}/`, event);
        return response.data;
    },

    deleteEvent: async (id: number): Promise<void> => {
        await api.delete(`/content/events/${id}/`);
    },
};

export default eventsService;
