import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { Notification } from '@/app/features/Notifications/components/Notification';


export const NotificationDecorator = () => {
    const notifications = useAppSelector(state => state.globalState.notifications);

    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-3xl mx-auto block">
            {notifications.map(({ variant, message, id }) => (<Notification key={id} variant={variant} message={message} id={id} />))}
        </div>
    )
};
