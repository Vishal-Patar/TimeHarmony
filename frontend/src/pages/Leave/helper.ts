export interface StatusType {
    color: string;
    label: string;
}

export const status: Record<string, StatusType> = {
    pending: {
        color: 'orange',
        label: 'Pending'
    },
    approved: {
        color: 'green',
        label: 'Approved'
    },
    rejected: {
        color: 'red',
        label: 'Rejected'
    }
};