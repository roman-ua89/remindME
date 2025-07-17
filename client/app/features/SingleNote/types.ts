
export interface ISingleNoteItem {
    id: number;
    term: string;
    explanation: string;
}

export type SingleNoteTile = Pick<ISingleNoteItem, 'id' | 'term'>

export interface ISingleNoteTileResponse {
    singleNotes: SingleNoteTile[];
}

export interface ISingleNoteResponse {
    singleNoteById: ISingleNoteItem;
}

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

export interface IEditSingleNoteResponse {
    updateSingleNote: ISingleNoteItem;
}
