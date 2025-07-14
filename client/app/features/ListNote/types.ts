
export interface IListNoteItem {
    id: number;
    title: string;
    serializedObject: string;
}

export type ListNoteTile = Pick<IListNoteItem, 'id' | 'title'>;

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

export interface UpdatedListNoteResponse {
    updateListNote: IListNoteItem;
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
