import { ListNoteItem } from '@/app/features/ListNote/types';

export const normalizeList = (list: ListNoteItem[]) => {
    return trimStr(removeEmptyRows(list));
};

export const removeEmptyRows = (list: ListNoteItem[]): ListNoteItem[] => {
    return list.filter((listItem) => {
        const { left, right } = listItem;
        return !(!left.trim() && !right.trim());
    });
};

export const trimStr = (list: ListNoteItem[]): ListNoteItem[] => {
    return list.map((item) => {
        const { id, left, right } = item;
        return { id, left: left.trim(), right: right.trim() };
    });
};
