
export interface INotification {
    variant: 'warning' | 'error' | 'success' | 'info';
    message: string;
    id: string;
}