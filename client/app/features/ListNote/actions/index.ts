'use server';

import {
    CreatedListNoteResponse,
    IListNoteItem,
    IUpdateListNoteTitleResponse,
    ListNoteItem,
    UpdatedListNoteResponse
} from "@/app/features/ListNote/types";
import {gql, request} from "graphql-request";
import { SERVER_URL } from "@/app/shared/graphql/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {IListNote} from "@/app/features/SingleNote/types";

export type AddListNoteProps = {
    title: string;
    data: ListNoteItem[];
}

export const addListNote = async (state: { message: string }, dataToSave: AddListNoteProps) => {
    const { title, data } = dataToSave;

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

export type UpdateListNoteProps = {
    id: IListNote["id"];
    data: IListNote["serializedObject"];
}

type ErrorMsg = { message: string };

export const updateListNote = async (_: any, dataToSave: UpdateListNoteProps) => {
    const { id, data } = dataToSave;

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
            serializedObject: data
        })
        const { updateListNote } = updateResult;
        return updateListNote;
    } catch (e) {
        return {
            message: 'updateListNote action | something went wrong' + e
        }
    }
}

type UpdateListNoteTitleProps = {
    id: ListNoteItem['id'];
    title: string;
}

export const updateListNoteTitle = async (_:any, {id, title}: UpdateListNoteTitleProps) => {

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
            title
        });
        return updateListNoteTitle;
    } catch (e) {
        console.log('update listNoteItem', e);
    }

}
