'use server';

import {ListNoteItem, SavedListNoteResponse} from "@/app/features/AddListNote/types";
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
            createListNote(title: $title, serializedObject: $serializedObject) {
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
