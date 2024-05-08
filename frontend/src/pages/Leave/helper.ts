import dayjs from "dayjs";

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

export const calculateDaysDiff = (startDate: any, endDate: any) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diffDays = end.diff(start, 'day') + 1; // Include both start and end dates
    return diffDays > 0 ? diffDays : 0; // Return 0 if the difference is negative
};