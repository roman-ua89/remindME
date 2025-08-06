import { IUser } from '@/app/shared/types/types';

export interface ITag {
    id: number;
    title: string;
}

export interface ICreateNewTagProps {
    tagId?: ITag['id'];
    title?: ITag['title'];
    userId: IUser['id'];
    actionType: 'delete' | 'update';
}

export interface IUpdateTagsResponse {
    updateTags: {
        tags: string;
    };
}

export interface IUpdateTagsReturnType {
    updateTags: ITag[];
    errorMessage: string;
}