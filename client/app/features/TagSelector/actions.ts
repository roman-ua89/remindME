import { gql, request } from 'graphql-request';
import { ICreateNewTagProps, IUpdateTagsResponse, IUpdateTagsReturnType } from '@/app/features/TagSelector/types';
import { SERVER_URL } from '@/app/shared/graphql/client';

export const updateTags = async (state: { errorMessage: string }, dataToSave: ICreateNewTagProps): Promise<IUpdateTagsReturnType> => {
    const { title, userId } = dataToSave;

    const document = gql`
        mutation ($id: ID!, $tag: String!, $tagAction: String!) {
            updatedTags(id: $id, tag: $tag, tagAction: $tagAction) {
                tags
            }
        }
    `;

    try {
        const updateResult = await request<IUpdateTagsResponse>(SERVER_URL, document, {
            id: userId,
            title,
            tagAction: 'update',
        })
        console.log('updateResult', updateResult);
        const { updatedTags } = updateResult;
        return { errorMessage: '', updatedTags };
    } catch (e) {
        return { errorMessage: `Cannot update tags ${e}`, updatedTags: [] }
    }
}