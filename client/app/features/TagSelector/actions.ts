import { gql, request } from 'graphql-request';
import { ICreateNewTagProps, ITag, IUpdateTagsResponse, IUpdateTagsReturnType } from '@/app/features/TagSelector/types';
import { SERVER_URL } from '@/app/shared/graphql/client';

export const updateTags = async (dataToSave: ICreateNewTagProps): Promise<IUpdateTagsReturnType> => {
    console.log('dataToSave', dataToSave);
    const { title, userId, actionType, tagId } = dataToSave;

    const document = gql`
        mutation ($userId: ID!, $tagId: Int, $tag: String, $actionType: TagActionType!) {
            updateTags(userId: $userId, tagId: $tagId, tag: $tag, actionType: $actionType) {
                tags
            }
        }
    `;

    try {
        const { updateTags } = await request<IUpdateTagsResponse>(SERVER_URL, document, {
            tagId,
            userId,
            tag: title,
            actionType,
        })
        const { tags } = updateTags;
        const normalizedData: ITag[] = tags ? JSON.parse(tags) : [];
        return { errorMessage: '', updateTags: normalizedData };
    } catch (e) {
        console.log(e);
        return { errorMessage: `Cannot update tags` + e, updateTags: [] }
    }
}