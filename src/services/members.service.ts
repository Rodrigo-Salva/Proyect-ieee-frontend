import api from './api';

export interface Member {
    id: number;
    full_name: string;
    position: string;
    photo_url: string;
    bio?: string;
    join_date?: string;
    email?: string;
    is_active: boolean;
}

export interface Chapter {
    id: number;
    name: string;
    description: string;
    members: Member[];
}

export interface Branch {
    id: number;
    name: string;
    description: string;
    members: Member[];
    chapters: Chapter[];
}

const membersService = {
    getMembers: async (): Promise<Member[]> => {
        const response = await api.get('/organization/members/');
        return response.data;
    },

    getBranches: async (): Promise<Branch[]> => {
        const response = await api.get('/organization/branches/');
        return response.data;
    },

    getMember: async (id: number): Promise<Member> => {
        const response = await api.get(`/organization/members/${id}/`);
        return response.data;
    },
};

export default membersService;
