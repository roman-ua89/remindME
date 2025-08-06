import { INotification } from '@/app/features/Notifications';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag } from '@/app/features/TagSelector/types';

interface IGlobalState {
    notifications: INotification[];
    isRegisterFormVisible: boolean;
    isLoginFormVisible: boolean;
    isLoggedIn: boolean;
    tags: ITag[];
}

const initialState: IGlobalState = {
    notifications: [],
    isRegisterFormVisible: false,
    isLoginFormVisible: false,
    isLoggedIn: false,
    tags: [],
};

export const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        setNotification(state, action: PayloadAction<INotification>) {
            state.notifications = [...state.notifications, action.payload];
        },
        removeNotificationById(state, action: PayloadAction<INotification['id']>) {
            state.notifications = state.notifications.filter((item) => item.id !== action.payload);
        },
        setIsRegisterFormVisible(state, action: PayloadAction<boolean>) {
            state.isRegisterFormVisible = action.payload;
        },
        setIsLoginFormVisible(state, action: PayloadAction<boolean>) {
            state.isLoginFormVisible = action.payload;
        },
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setTags(state, action: PayloadAction<ITag[]>) {
            state.tags = action.payload;
        },
    },
});

export const { setNotification, removeNotificationById, setIsRegisterFormVisible, setIsLoginFormVisible, setIsLoggedIn, setTags } =
    globalSlice.actions;

export default globalSlice.reducer;
