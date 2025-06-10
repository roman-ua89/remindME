
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
    createListNote: ServerListNote;
}
