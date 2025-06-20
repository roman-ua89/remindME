import { configureStore } from '@reduxjs/toolkit'
import {singleNoteSlice} from "@/store/features/singleNote/singleNoteSlice";
import {listNoteSlice} from "@/store/features/listNote/listNoteSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            singleNote: singleNoteSlice.reducer,
            listNote: listNoteSlice.reducer,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
