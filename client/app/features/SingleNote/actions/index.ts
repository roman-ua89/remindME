'use server';

import { gql, request } from 'graphql-request'
import {SERVER_URL} from "@/app/shared/graphql/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {
    ICreateSingleNoteResponse,
    IUpdateSingleNoteResponse,
    ISingleNoteItem,
    IUpdateSingleNoteReturnType, CreateSingleNoteProps, ICreateSingleNoteReturnType,
} from '@/app/features/SingleNote/types';
import { DEFAULT_SINGLE_ITEM } from '@/app/shared/constants';

export const createSingleNote = async (state: { errorMessage: string }, dataToSave: CreateSingleNoteProps): Promise<ICreateSingleNoteReturnType> => {
    const { term, explanation } = dataToSave;
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
        return { errorMessage: 'addSingleNote action | something went wrong' + e }
    }
    revalidatePath('/');
    redirect(`/single/edit/${newItemId}`);
}

export const updateSingleNote = async (state: { errorMessage: string }, dataToSave: ISingleNoteItem):Promise<IUpdateSingleNoteReturnType> => {
    const { id, term, explanation } = dataToSave;

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
        const result = await request<IUpdateSingleNoteResponse>(SERVER_URL, document, {
            term: term,
            expl: explanation,
            id
        });
        const { updateSingleNote } = result;

        return { updateSingleNote, errorMessage: '' };
    } catch (e) {
        return { errorMessage: `Can not update Single Note: ${e}`, updateSingleNote: DEFAULT_SINGLE_ITEM }
    }
}
