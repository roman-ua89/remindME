'use server';

import {
    CreatedListNoteResponse, CreatedListNoteReturnType, IUpdatedListNoteReturnType,
    IUpdateListNoteTitleResponse, IUpdateListNoteTitleReturnType,
    ListNoteItem, ListNoteTitleProps,
    UpdatedListNoteResponse, UpdateListSerializedObject,
} from '@/app/features/ListNote/types';
import { gql, request } from 'graphql-request';
import { SERVER_URL } from '@/app/shared/graphql/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DEFAULT_LIST_ITEM, DEFAULT_LIST_ITEM_TITLE } from '@/app/shared/constants';

export type CreateListNoteProps = {
    title: string;
    data: ListNoteItem[];
};

export const createListNote = async (state: { errorMessage: string }, dataToSave: CreateListNoteProps): Promise<CreatedListNoteReturnType> => {
    const { title, data } = dataToSave;
    let newItemId = 0;

    const document = gql`
        mutation createListNoteItem($title: String!, $serializedObject: String!) {
            createListNote(title: $title, serializedObject: $serializedObject) {
                id
                title
                serializedObject
            }
        }
    `;

    try {
        const stringifiedData = JSON.stringify(data);
        const addListNoteResult = await request<CreatedListNoteResponse>(SERVER_URL, document, {
            title,
            serializedObject: stringifiedData
        })
        // TODO: get rid or serializedObj from response
        const { createListNote } = addListNoteResult;
        newItemId = createListNote.id;
    } catch (e) {
        return { errorMessage: 'Cannot create a new List Note' + e }
    }

    revalidatePath('/');
    redirect(`/list/edit/${newItemId}`);
}

export const updateListNote = async (state: { errorMessage: string }, dataToSave: UpdateListSerializedObject): Promise<IUpdatedListNoteReturnType> => {
    const { id, serializedObject } = dataToSave;

    const document = gql`
        mutation updateListNote($id: ID!, $serializedObject: String!) {
            updateListNote(id: $id, serializedObject: $serializedObject) {
                id
                title
                serializedObject
            }
        }
    `;

    try {
        const updateResult = await request<UpdatedListNoteResponse>(SERVER_URL, document, {
            id,
            serializedObject,
        });
        const { updateListNote } = updateResult;
        return { updateListNote, errorMessage: '' };
    } catch (e) {
        return { errorMessage: `Cannot update: ${e}`, updateListNote: DEFAULT_LIST_ITEM };
    }
};


export const updateListNoteTitle = async (state: { errorMessage: string }, { id, title }: ListNoteTitleProps): Promise<IUpdateListNoteTitleReturnType> => {
    const document = gql`
        mutation updateListNoteTitle($id: ID!, $title: String!) {
            updateListNoteTitle(id: $id, title: $title) {
                id
                title
            }
        }
    `;

    try {
        const { updateListNoteTitle } = await request<IUpdateListNoteTitleResponse>(SERVER_URL, document, {
            id,
            title,
        });
        return { updateListNoteTitle, errorMessage: '' };
    } catch (e) {
        console.log(e);
        return { errorMessage: 'Cannot update list', updateListNoteTitle: DEFAULT_LIST_ITEM_TITLE };
    }
};
