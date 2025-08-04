import { gql } from 'graphql-request';
import { ICreateNewTagProps } from '@/app/features/TagSelector/types';

export const createNewTag = (state: { errorMessage: string }, dataToSave: ICreateNewTagProps) => {
    const { title, userId } = dataToSave;

    const document = gql`
        mutation updateUser($id: ID!, $tags: String!) {
            updatedUser(id: $id, tags: $tags) {
                id
                tags
            }
        }
    `;
}