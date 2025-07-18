import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ListNoteTile } from '@/app/features/ListNote/types';
import { SingleNoteTile } from '@/app/features/SingleNote/types';

export interface IRemindSelectorState {
    listNotes: ListNoteTile[],
    singleNotes: SingleNoteTile[],
    searchResults: {
        listNotes: ListNoteTile[],
        singleNotes: SingleNoteTile[],
    },
}

const initialState: IRemindSelectorState = {
    listNotes: [],
    singleNotes: [],
    searchResults: {
        listNotes: [],
        singleNotes: [],
    },
}

export const remindSelectorSlice = createSlice({
    name: "remindSelector",
    initialState,
    reducers: {
        setSingleNotes: (state, action: PayloadAction<SingleNoteTile[]>) => {
            state.singleNotes = action.payload;
        },
        setListNotes: (state, action: PayloadAction<ListNoteTile[]>) => {
            state.listNotes = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<IRemindSelectorState["searchResults"]>) => {
            state.searchResults = action.payload;
        },
        clearSearchResults: (state) => {
            state.searchResults = { listNotes: [], singleNotes: [] };
        }
    }
})

export const { setSingleNotes, setListNotes, setSearchResults, clearSearchResults } = remindSelectorSlice.actions

export default remindSelectorSlice.reducer