
export type ListNoteItem = {
    id: number;
    left: string;
    right: string;
}

export interface ServerData {
    title: string;
    list: ListNoteItem[]
}
