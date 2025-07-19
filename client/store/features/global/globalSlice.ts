import { INotification } from '@/app/features/Notifications';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGlobalState {
    notifications: INotification[];
}

const initialState: IGlobalState = {
    notifications: [],
}

export const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        setNotification(state, action: PayloadAction<INotification>) {
            state.notifications = [...state.notifications, action.payload];
        },
        removeNotificationById(state, action: PayloadAction<INotification["id"]>) {
            state.notifications = state.notifications.filter(item => item.id !== action.payload);
        }
    }
})

export const { setNotification, removeNotificationById } = globalSlice.actions;

export default globalSlice.reducer;