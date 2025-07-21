'use client';

import React from 'react';
import { Header } from '@/app/components/Header';
import { Main } from '@/app/features/RemindSelector';
import { Search } from '@/app/features/RemindSelector/components/Search';
import { NotificationDecorator } from '@/app/features/Notifications';
import { MODAL_WINDOW_CONTAINER_ID } from '@/app/shared/constants';

export default function Home() {
    return (
        <div className="relative">
            <Header />
            <Search />
            <Main />
            <NotificationDecorator />
            <div id={MODAL_WINDOW_CONTAINER_ID}></div>
        </div>
    );
}
