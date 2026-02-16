import api from './api';

export interface Member {
    id: number;
    user: number;
    chapter: number;
    branch: number | null;
    position: string;
    join_date: string;
    is_active: boolean;
    bio: string;
    photo_url?: string;
}

const membersService = {
    getMembers: async (): Promise<Member[]> => {
        const response = await api.get('/organization/members/');
        return response.data;
    },

    getMember: async (id: number): Promise<Member> => {
        const response = await api.get(`/organization/members/${id}/`);
        return response.data;
    },

    createMember: async (member: Partial<Member>): Promise<Member> => {
        const response = await api.post('/organization/members/', member);
        return response.data;
    },

    updateMember: async (id: number, member: Partial<Member>): Promise<Member> => {
        const response = await api.put(`/organization/members/${id}/`, member);
        return response.data;
    },

    deleteMember: async (id: number): Promise<void> => {
        await api.delete(`/organization/members/${id}/`);
    },
};

export default membersService;
