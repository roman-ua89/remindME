
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

export interface CreatedListNoteResponse {
    createListNote: IListNoteItem;
}

export interface UpdatedListNoteResponse {
    updateListNote: IListNoteItem;
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

export interface IUpdateListNoteTitleResponse {
    updateListNoteTitle: {
        id: IListNoteItem["id"];
        title: IListNoteItem["title"]
    };
}
