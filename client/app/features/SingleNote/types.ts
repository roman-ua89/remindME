
export interface ISingleNoteItem {
    id: number;
    term: string;
    explanation: string;
}

export type SingleNoteTile = Pick<ISingleNoteItem, 'id' | 'term'>;

export type CreateSingleNoteProps = Pick<ISingleNoteItem, 'term' | 'explanation'>;

export interface ISingleNoteTileResponse {
    singleNotes: SingleNoteTile[];
}

export interface ISingleNoteResponse {
    singleNoteById: ISingleNoteItem;
}

// TODO: move to ListNote feature
export interface IListNote {
    id: number;
    title: string;
    serializedObject: string;
}

export interface IListNoteResponse {
    listNoteById: IListNote;
}

export interface ICreateSingleNoteResponse {
    createSingleNote: ISingleNoteItem;
}

export interface ICreateSingleNoteReturnType {
    errorMessage: string;
}

export interface IUpdateSingleNoteResponse {
    updateSingleNote: ISingleNoteItem;
}

export interface IUpdateSingleNoteReturnType extends IUpdateSingleNoteResponse {
    errorMessage: string;
}

export interface IDeleteSingleNoteResponse {
    deleteSingleNoteById: SingleNoteTile[];
}
