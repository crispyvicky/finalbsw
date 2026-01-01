export type EnquiryStatus = 'New' | 'Follow-up' | 'Converted' | 'Lost';

export interface Enquiry {
    id: string;
    name: string;
    phone: string;
    location: string;
    budget: string;
    status: EnquiryStatus;
    notes: string;
    date: string;
}

export type ProjectStage = 'Design' | 'Approval' | 'Execution' | 'Handover';

export interface Project {
    id: string;
    name: string;
    clientName: string;
    stage: ProjectStage;
    progress: number;
    startDate: string;
    endDate?: string;
    budget: number;
}

export interface Client {
    id: string;
    name: string;
    phone: string;
    email?: string;
    address: string;
    budget: string;
    projectId?: string;
}
