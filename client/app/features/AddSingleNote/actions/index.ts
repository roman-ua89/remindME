'use server';

import { gql, request } from 'graphql-request'
import {SERVER_URL} from "@/app/shared/graphql/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {ISingleNoteResponse} from "@/app/features/AddSingleNote/types";

export const createSingleNote = async (state: { message: string }, formData: FormData) => {
    const term = formData.get('term');
    const explanation = formData.get('explanation');

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
      await request(SERVER_URL, document, {
          term: term,
          expl: explanation
      });
    } catch (e) {
        return {
            message: 'addSingleNote action | something went wrong' + e
        }
    }

    revalidatePath('/');
    redirect('/');
}

export const updateSingleNote = async (formData: FormData) => {
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
        await request(SERVER_URL, document, {
            term: term,
            expl: explanation,
            id
        });
    } catch (e) {
        console.log('updateSingleNote action | something went wrong' + e);
    }

    revalidatePath('/');
    redirect('/');
}

export const getSingleNoteById = async (_: any, id: string) => {

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
      console.log('getSingleNoteById action | something went wrong' + e)
  }
}
