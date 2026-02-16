import api from './api';

export interface ContactForm {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at?: string;
}

class ContactService {
    async submitContactForm(formData: Omit<ContactForm, 'id' | 'created_at'>): Promise<ContactForm> {
        const response = await api.post<ContactForm>('/contact/contact-forms/', formData);
        return response.data;
    }

    async getContactForms(): Promise<ContactForm[]> {
        const response = await api.get<ContactForm[]>('/contact/contact-forms/');
        return response.data;
    }
}

export default new ContactService();
