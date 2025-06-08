import {ListNoteItem} from "@/app/features/AddListNote/types";

export const normalizeList = (list: ListNoteItem[]) => {
    return list.filter(listItem => {
        const { left, right } = listItem;
        if (!left.trim() && !right.trim()) {
            return false;
        }
        return true;
    })
}
