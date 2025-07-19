import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { INotification } from '@/app/features/Notifications';
import { setNotification } from '@/store/features/global/globalSlice';

type generatorProps = {
    variant: INotification['variant'];
    message: INotification['message'];
}

export const NotificationsGenerator = () => {
    const dispatch = useAppDispatch();

    const generateNotification = ({ variant, message }: generatorProps) => {
        dispatch(setNotification({ variant, message, id: Date.now().toString() }));
    }

    return (
        <>
            <div>
                <button onClick={() => generateNotification({ variant: 'success', message: 'This is success message' })}>Generate success</button>
            </div>
            <div>
                <button onClick={() => generateNotification({ variant: 'warning', message: 'This is some warning message' })}>Generate warning</button>
            </div>
        </>
    )
}