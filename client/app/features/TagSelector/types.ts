import { IUser } from '@/app/shared/types/types';

export interface ITag {
    id: number;
    title: string;
}

export interface ICreateNewTagProps {
    title: ITag['title'];
    userId: IUser['id'];
}