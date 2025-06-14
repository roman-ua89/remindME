import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SingleNoteState {
    value: number,
    term: string,
    explanation: string,
}

const initialState: SingleNoteState = {
    value: 5,
    term: '',
    explanation: ''
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
    },
})

// Action creators are generated for each case reducer function
export const { setTerm, setExplanation } = singleNoteSlice.actions

export default singleNoteSlice.reducer
