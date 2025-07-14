import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {SingleNoteTile} from "@/app/features/SingleNote/types";

export interface SingleNoteState {
    term: string,
    explanation: string,
    notes: SingleNoteTile[],
}

const initialState: SingleNoteState = {
    term: '',
    explanation: '',
    notes: [],
}

export const singleNoteSlice = createSlice({
    name: 'singleNote',
    initialState,
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        setTerm: (state, action: PayloadAction<string>) => {
            state.term = action.payload;
        },
        setExplanation: (state, action: PayloadAction<string>) => {
            state.explanation = action.payload;
        },
        setSingleNotes: (state, action: PayloadAction<SingleNoteTile[]>) => {
            state.notes = action.payload;
        },
        resetSingleNoteFields: (state) => {
            state.term = '';
            state.explanation = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTerm, setExplanation, setSingleNotes, resetSingleNoteFields } = singleNoteSlice.actions

export default singleNoteSlice.reducer
