import { Header } from '@/app/components/Header';
import React from 'react';
import { Tags } from '@/app/features/Account/components/Tags';
import { Info } from '@/app/features/Account/components/Info';
import { ContentAdded } from '@/app/features/Account/components/ContentAdded';

export default function Account() {


    return (
        <div>
            <Header />
            <h2 className="h2">Account settings</h2>
            <ul>
                <Info />
                <Tags />
                <ContentAdded />
            </ul>
        </div>
    );
}
