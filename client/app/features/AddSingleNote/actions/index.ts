'use server';

import { gql, request } from 'graphql-request'
import {SERVER_URL} from "@/app/shared/graphql/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export const addSingleNote = async (state: { message: string }, formData: FormData) => {
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
