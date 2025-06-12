import {gql, request} from "graphql-request";
import {ISingleNoteResponse} from "@/app/features/AddSingleNote/types";
import {SERVER_URL} from "@/app/shared/graphql/client";

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
