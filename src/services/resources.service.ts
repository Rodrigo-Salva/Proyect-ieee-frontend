import api from './api';

export interface Resource {
    id: number;
    title: string;
    description: string;
    resource_type: string;
    url?: string;
    file?: string;
    created_at: string;
    updated_at: string;
}

export interface ResourcesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Resource[];
}

class ResourcesService {
    async getResources(): Promise<ResourcesResponse> {
        const response = await api.get<ResourcesResponse>('/resources/resources/');
        return response.data;
    }

    async getResourceById(id: number): Promise<Resource> {
        const response = await api.get<Resource>(`/resources/resources/${id}/`);
        return response.data;
    }

    async createResource(resource: Partial<Resource>): Promise<Resource> {
        const response = await api.post<Resource>('/resources/resources/', resource);
        return response.data;
    }

    async updateResource(id: number, resource: Partial<Resource>): Promise<Resource> {
        const response = await api.put<Resource>(`/resources/resources/${id}/`, resource);
        return response.data;
    }

    async deleteResource(id: number): Promise<void> {
        await api.delete(`/resources/resources/${id}/`);
    }
}

export default new ResourcesService();
