'use server';

import { gql, request } from 'graphql-request'
import {SERVER_URL} from "@/app/shared/graphql/client";
import {ListNoteItem} from "@/app/features/AddListNote/types";

export interface SingleNote {
    id: number;
    term: string;
    explanation: string;
}

interface Item {
    singleNotes: SingleNote[]
}

export const getSingleItems = async (): Promise<Item> => {
  const document = gql`
      query {
          singleNotes {
              id
              term
          }
      }
  `;

    return await request(SERVER_URL, document);
}

export type ListItemReturnType = {
    id: ListNoteItem["id"];
    title: string;
}

export interface GetListItemsReturnType {
    listNotes: ListItemReturnType[];
}

export const getListItems = async (): Promise<GetListItemsReturnType> => {
  const document = gql`
      query {
          listNotes {
              id
              title
          }
      }
  `;

    return await request(SERVER_URL, document);
}
