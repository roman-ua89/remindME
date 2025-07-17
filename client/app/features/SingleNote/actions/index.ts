'use server';

import { gql, request } from 'graphql-request'
import {SERVER_URL} from "@/app/shared/graphql/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {
    ICreateSingleNoteResponse,
    IEditSingleNoteResponse,
    ISingleNoteItem,
    ISingleNoteResponse
} from "@/app/features/SingleNote/types";
import {IActionMessage} from "@/app/shared/types/types";

export const createSingleNote = async (state: { message: string }, formData: FormData) => {
    const term = formData.get('term');
    const explanation = formData.get('explanation');
    let newItemId = 0;

    const document = gql`
      mutation createSingleNote($term: String!, $expl: String!) {
          createSingleNote(term: $term, explanation: $expl) {
              id
              term
              explanation
          }
      }
    `;

    try {
      const result = await request<ICreateSingleNoteResponse>(SERVER_URL, document, {
          term: term,
          expl: explanation
      });

      newItemId = result.createSingleNote.id;
    } catch (e) {
        return {
            message: 'addSingleNote action | something went wrong' + e
        }
    }
    revalidatePath('/');
    redirect(`/single/edit/${newItemId}`);
}

export const updateSingleNote = async (_: any, formData: FormData):Promise<ISingleNoteItem | IActionMessage> => {
    const term = formData.get('term');
    const explanation = formData.get('explanation');
    const id = formData.get('id');

    const document = gql`
        mutation updateSingleNote($id: ID!, $term: String!, $expl: String!) {
          updateSingleNote(id: $id, term: $term, explanation: $expl) {
              id
              term
              explanation
          }
        }
    `;

    try {
        const result = await request<IEditSingleNoteResponse>(SERVER_URL, document, {
            term: term,
            expl: explanation,
            id
        });

        return result.updateSingleNote;
    } catch (e) {
        return {
            message: 'updateSingleNote action | something went wrong' + e
        }
    }
}
