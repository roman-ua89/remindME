import { ITag } from '@/app/features/TagSelector/types';

export type createActionTypes = 'single_note' | 'list_note';

export interface IUser {
    id: number;
    password: string;
    email: string;
    name: string;
    totalScore: number;
    tags: ITag[];
}