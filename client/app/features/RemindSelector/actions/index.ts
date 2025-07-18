'use server';

import { gql, request } from 'graphql-request'
import {SERVER_URL} from "@/app/shared/graphql/client";
import {IListNoteTileResponse, ListNoteTile} from "@/app/features/ListNote/types";
import {ISingleNoteTileResponse, SingleNoteTile} from "@/app/features/SingleNote/types";
import { ISearchNotesResponse } from '@/app/features/RemindSelector/types';

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

export const searchForNotes = async (_: any, searchTerm: string) => {
    const document = gql`
        query SearchNotes($searchTerm: String!) {
            searchNotes(searchTerm: $searchTerm) {
                singleNotes {
                    id
                    term
                }
                listNotes {
                    id
                    title
                }
            }
        }
    `;

    return request<ISearchNotesResponse>(SERVER_URL, document, { searchTerm });
}
