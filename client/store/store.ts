import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { singleNoteSlice } from '@/store/features/singleNote/singleNoteSlice';
import { listNoteSlice } from '@/store/features/listNote/listNoteSlice';
import { remindSelectorSlice } from '@/store/features/remindSelector/remindSelectorSlice';
import { globalSlice } from '@/store/features/global/globalSlice';

const rootReducer = combineReducers({
    singleType: singleNoteSlice.reducer,
    listType: listNoteSlice.reducer,
    remindSelector: remindSelectorSlice.reducer,
    globalState: globalSlice.reducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
