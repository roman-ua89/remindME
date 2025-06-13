
export interface ISingleNote {
    id: number;
    term: string;
    explanation: string;
}

export interface ISingleNoteResponse {
    singleNoteById: ISingleNote;
}

export interface IListNote {
    id: number;
    title: string;
    serializedObject: string;
}

export interface IListNoteResponse {
    listNoteById: IListNote;
}
