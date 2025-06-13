
export type ListNoteItem = {
    id: number;
    left: string;
    right: string;
}

export interface ServerData {
    title: string;
    list: ListNoteItem[]
}

interface ServerListNote {
    id: number;
    title: string;
    serializedObject: string;
}

export interface SavedListNoteResponse {
    ListNote: ServerListNote;
}

// -------------how should be

export interface IListNoteItem {
    id: number;
    title: string;
    serializedObject: string;
}

export interface IListNoteResponse {
    listNoteItem: IListNoteItem;
}
