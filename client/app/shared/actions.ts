import {gql, request} from "graphql-request";
import {IListNoteResponse, ISingleNoteResponse} from "@/app/features/SingleNote/types";
import {SERVER_URL} from "@/app/shared/graphql/client";
import {DeletedListNoteResponse, ListNoteTile} from "@/app/features/ListNote/types";
import {revalidatePath} from "next/cache";

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

export const getListNoteById = async (_: any, id: string) => {

  const document = gql`
      query GetListNoteById($id: ID!) {
          listNoteById(id: $id) {
              id
              title
              serializedObject
          }
      }
  `;

    try {
        const { listNoteById } = await request<IListNoteResponse>(SERVER_URL, document, { id: parseInt(id) });
        return listNoteById;
    } catch (e) {
        console.log('getSingleNoteById action | something went wrong' + e)
    }
}

export const deleteListNoteById = async (_:any, id: number): Promise<ListNoteTile[] | { message:string }> => {

  const document = gql`
      mutation deleteListNote($id: ID!) {
          deleteListNoteById(id: $id) {
              id
              title
          }
      }
  `;

  try {
      const { deleteListNoteById } = await request<DeletedListNoteResponse>(SERVER_URL, document, { id });
      return deleteListNoteById;
  } catch (e) {
      return {
          message: 'Something went wrong during removing ListNote item' + e
      }
  }
}