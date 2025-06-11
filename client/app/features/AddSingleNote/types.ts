
export interface ISingleNote {
    id: number;
    term: string;
    explanation: string;
}

export interface ISingleNoteResponse {
    singleNoteById: ISingleNote;
}
