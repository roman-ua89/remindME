import { gql, request } from 'graphql-request';
import { ICreateNewTagProps, ITag, IUpdateTagsResponse, IUpdateTagsReturnType } from '@/app/features/TagSelector/types';
import { SERVER_URL } from '@/app/shared/graphql/client';

export const updateTags = async (dataToSave: ICreateNewTagProps): Promise<IUpdateTagsReturnType> => {
    const { title, userId } = dataToSave;

    const document = gql`
        mutation ($id: ID!, $tag: String!, $tagAction: TagActionType!) {
            updateTags(id: $id, tag: $tag, tagAction: $tagAction) {
                tags
            }
        }
    `;

    try {
        const { updateTags } = await request<IUpdateTagsResponse>(SERVER_URL, document, {
            id: userId,
            tag: title,
            tagAction: 'update',
        })
        const { tags } = updateTags;
        const normalizedData: ITag[] = tags ? JSON.parse(tags) : [];
        return { errorMessage: '', updateTags: normalizedData };
    } catch (e) {
        console.log(e);
        return { errorMessage: `Cannot update tags` + e, updateTags: [] }
    }
}