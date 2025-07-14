'use server';

import { gql, request } from 'graphql-request'
import {SERVER_URL} from "@/app/shared/graphql/client";
import {IListNoteTileResponse, ListNoteTile} from "@/app/features/ListNote/types";
import {ISingleNoteTileResponse, SingleNoteTile} from "@/app/features/SingleNote/types";

export const getSingleItems = async (): Promise<SingleNoteTile[]> => {
  const document = gql`
      query {
          singleNotes {
              id
              term
          }
      }
  `;

    const result = await request<ISingleNoteTileResponse>(SERVER_URL, document);
    return result.singleNotes || [];
}


export const getListItems = async (): Promise<ListNoteTile[]> => {
  const document = gql`
      query {
          listNotes {
              id
              title
          }
      }
  `;

  const result = await request<IListNoteTileResponse>(SERVER_URL, document);
  return result.listNotes || [];
}
