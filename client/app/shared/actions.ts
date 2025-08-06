import { gql, request } from 'graphql-request';
import { IDeleteSingleNoteResponse, IListNoteResponse, ISingleNoteItem, ISingleNoteResponse, SingleNoteTile } from '@/app/features/SingleNote/types';
import { SERVER_URL } from '@/app/shared/graphql/client';
import { DeletedListNoteResponse, ListNoteTile } from '@/app/features/ListNote/types';
import { IUser, IUserDataResponse, IUserDataReturnType } from '@/app/shared/types/types';

export const getSingleNoteById = async (_: any, id: ISingleNoteItem['id']) => {
    const document = gql`
        query GetSingleNoteById($id: ID!) {
            singleNoteById(id: $id) {
                id
                term
                explanation
            }
        }
    `;

    try {
        const { singleNoteById } = await request<ISingleNoteResponse>(SERVER_URL, document, { id: parseInt(id) });
        return singleNoteById;
    } catch (e) {
        console.log('getSingleNoteById action | something went wrong' + e);
    }
};

export const getListNoteById = async (_: any, id: string) => {
    const document = gql`
        query GetListNoteById($id: ID!) {
            listNoteById(id: $id) {
                id
                title
                serializedObject
            }
        }
    `;

    try {
        const { listNoteById } = await request<IListNoteResponse>(SERVER_URL, document, { id: parseInt(id) });
        return listNoteById;
    } catch (e) {
        console.log('getSingleNoteById action | something went wrong' + e);
    }
};

export const deleteListNoteById = async (_: any, id: number): Promise<ListNoteTile[] | { message: string }> => {
    const document = gql`
        mutation deleteListNote($id: ID!) {
            deleteListNoteById(id: $id) {
                id
                title
            }
        }
    `;

    try {
        const { deleteListNoteById } = await request<DeletedListNoteResponse>(SERVER_URL, document, { id });
        return deleteListNoteById;
    } catch (e) {
        return {
            message: 'Something went wrong during removing ListNote item' + e,
        };
    }
};

export const deleteSingleNoteById = async (_: any, id: number): Promise<SingleNoteTile[] | { message: string }> => {
    const document = gql`
        mutation deleteSingleNote($id: ID!) {
            deleteSingleNoteById(id: $id) {
                id
                term
            }
        }
    `;

    try {
        const { deleteSingleNoteById } = await request<IDeleteSingleNoteResponse>(SERVER_URL, document, { id });
        return deleteSingleNoteById;
    } catch (e) {
        return {
            message: 'Something went wrong during removing ListNote item' + e,
        };
    }
};

export const getUserData = async (id: IUser['id'], fields: Array<keyof IUser>): Promise<IUserDataReturnType> => {
    const fieldsToSelect = fields.join(' ');

    const document = gql`
        query ($id: ID!) {
            getUserData(id: $id) {
                ${fieldsToSelect}   
            }
        }
    `;

    try {
        const { getUserData } = await request<IUserDataResponse>(SERVER_URL, document, { id });
        const normalizedData = {
            ...getUserData,
            tags: getUserData?.tags ? JSON.parse(getUserData.tags) : undefined,
        }

        return { getUserData: normalizedData, errorMessage: '' }
    } catch (e) {
        return { getUserData: {}, errorMessage: 'Cannot get user data' + e }
    }
}
