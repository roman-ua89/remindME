'use client';

import React from 'react';
import { Header } from '@/app/components/Header';
import { Main } from '@/app/features/RemindSelector';
import { Search } from '@/app/features/RemindSelector/components/Search';

export default function Home() {
    return (
        <div>
            <Header />
            <Search />
            <Main />
        </div>
    );
}
