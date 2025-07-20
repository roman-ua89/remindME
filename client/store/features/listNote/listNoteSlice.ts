import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ListNoteItem } from '@/app/features/ListNote/types';

export interface ListNoteState {
    title: string;
    serializedObject: string;
    list: ListNoteItem[];
    id: number;
}

const initialState: ListNoteState = {
    title: 'Default title',
    serializedObject: '',
    list: [],
    id: 0,
};

type UpdateRightLeft = {
    id: number;
    value: string;
};

type DeleteRowType = {
    id: number;
};

export const listNoteSlice = createSlice({
    name: 'singleNote',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setSerializedObject: (state, action: PayloadAction<string>) => {
            state.serializedObject = action.payload;
            state.list = state.serializedObject ? JSON.parse(state.serializedObject) : [];
        },
        updateLeft: (state, action: PayloadAction<UpdateRightLeft>) => {
            const { id, value } = action.payload;
            state.list = state.list.map((item) => {
                if (item.id === id) {
                    return { ...item, left: value };
                } else {
                    return item;
                }
            });
        },
        updateRight: (state, action: PayloadAction<UpdateRightLeft>) => {
            const { id, value } = action.payload;
            state.list = state.list.map((item) => {
                if (item.id === id) {
                    return { ...item, right: value };
                } else {
                    return item;
                }
            });
        },
        deleteRow: (state, action: PayloadAction<DeleteRowType>) => {
            const { id } = action.payload;
            state.list = state.list.filter((item) => item.id !== id);
        },
        createNewRow: (state) => {
            let latestId = 0;
            state.list.forEach((item) => {
                if (item.id > latestId) latestId = item.id;
            });
            state.list = [...state.list, { id: latestId + 1, left: '', right: '' }];
        },
    },
});

export const { setTitle, setSerializedObject, updateLeft, updateRight, deleteRow, createNewRow, setId } = listNoteSlice.actions;

export default listNoteSlice.reducer;
