
export interface IListNoteItem {
    id: number;
    title: string;
    serializedObject: string;
}

export type ListNoteTile = Pick<IListNoteItem, 'id' | 'title'>;

export type UpdateListSerializedObject = Pick<IListNoteItem, 'id' | 'serializedObject'>;

export type ListNoteItem = {
    id: number;
    left: string;
    right: string;
}

export interface IListNoteTileResponse {
    listNotes: ListNoteTile[];
}

export interface CreatedListNoteResponse {
    createListNote: IListNoteItem;
}

export interface CreatedListNoteReturnType {
    errorMessage: string;
}

export interface UpdatedListNoteResponse {
    updateListNote: IListNoteItem;
}

export interface IUpdatedListNoteReturnType extends UpdatedListNoteResponse {
    errorMessage: string;
}

export interface DeletedListNoteResponse {
    deleteListNoteById: ListNoteTile[];
}

export interface IUpdateListNoteTitleResponse {
    updateListNoteTitle: {
        id: IListNoteItem["id"];
        title: IListNoteItem["title"]
    };
}

export interface IUpdateListNoteTitleReturnType extends IUpdateListNoteTitleResponse {
    errorMessage: string;
}

export type FormComponentsProps = {
    id?: string;
}

export interface ListNoteTitleProps {
    id: ListNoteItem['id'];
    title: string;
};
