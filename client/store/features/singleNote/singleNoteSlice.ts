import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {SingleNoteTile} from "@/app/features/SingleNote/types";

export interface SingleNoteState {
    isDirty: boolean,
    term: string,
    explanation: string,
}

const initialState: SingleNoteState = {
    isDirty: false,
    term: '',
    explanation: '',
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
            state.isDirty = true;
        },
        setExplanation: (state, action: PayloadAction<string>) => {
            state.explanation = action.payload;
            state.isDirty = true;
        },
        resetSingleNoteFields: (state) => {
            state.term = '';
            state.explanation = '';
        },
        setIsDirty: (state, action: PayloadAction<boolean>) => {
            state.isDirty = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTerm, setExplanation, resetSingleNoteFields, setIsDirty } = singleNoteSlice.actions

export default singleNoteSlice.reducer
