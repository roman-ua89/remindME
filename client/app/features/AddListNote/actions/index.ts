'use server';

import {IListNoteResponse, ListNoteItem, SavedListNoteResponse} from "@/app/features/AddListNote/types";
import {gql, request} from "graphql-request";
import { SERVER_URL } from "@/app/shared/graphql/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export type AddListNoteProps = {
    title: string;
    data: ListNoteItem[];
}

export const addListNote = async (state: { message: string }, dataToSave: AddListNoteProps) => {
    const { title, data } = dataToSave;

    const document = gql`
        mutation createListNote($title: String!, $serializedObject: String!) {
            listNote(title: $title, serializedObject: $serializedObject) {
                id
                title
                serializedObject
            }
        }
    `;

    try {
        const stringifiedData = JSON.stringify(data);
        const addListNoteResult = await request<SavedListNoteResponse>(SERVER_URL, document, {
            title,
            serializedObject: stringifiedData
        })
        const { createListNote } = addListNoteResult;
        console.log('createListNote', createListNote);
    } catch (e) {
        return {
            message: 'createListNote action | something went wrong' + e
        }
    }

    revalidatePath('/');
    redirect('/');
}

type UpdateListNoteTitleProps = {
    id: ListNoteItem['id'];
    title: string;
}

export const updateListNoteTitle = async (_:any, {id, title}: UpdateListNoteTitleProps) => {

    const document = gql`
        mutation updateListNoteTitle($id: Int!, $title: String!) {
            updateListNoteTitle(id: $id, title: $title) {
                id
                title
                serializedObject
            }
        }
    `;

    try {
        const { listNoteItem } = await request<IListNoteResponse>(SERVER_URL, document, {
            id,
            title
        });
        console.log('update listNoteItem', listNoteItem);
        return listNoteItem;
    } catch (e) {
        console.log('update listNoteItem', e);
    }

}
