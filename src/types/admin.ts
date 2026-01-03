export type EnquiryStatus = 'New' | 'Follow-up' | 'Converted' | 'Lost';
export type EnquirySource = 'Contact Page' | 'Cost Estimator' | 'Newsletter' | 'Manual' | 'Other';

export interface Enquiry {
    id: string;
    name: string;
    phone: string;
    email?: string;
    location: string;
    budget: string;
    source: EnquirySource;
    status: EnquiryStatus;
    notes: string;
    estimateData?: any;
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
