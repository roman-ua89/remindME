'use server';

import { gql, request } from 'graphql-request'
import {SERVER_URL} from "@/app/shared/graphql/client";

interface SingleNote {
    id: number;
    term: string;
    explanation: string;
}

interface Item {
    singleNotes: SingleNote[]
}

export const getList = async (): Promise<Item> => {
  const document = gql`
      query {
          singleNotes {
              term
              explanation
          }
      }
  `;

    return await request(SERVER_URL, document);
}
