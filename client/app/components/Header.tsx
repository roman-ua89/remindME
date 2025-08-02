'use client';

import React from 'react';
import { Menu } from '@/app/components/Menu';
import { AccountLinks } from '@/app/components/AccountLinks';

export const Header = () => {
    return (
        <header className="mb-5 relative">
            <AccountLinks />
            <div className="flex justify-center">
                <h1 className="font-bold text-lime-600 text-[60px]">
                    RemindME
                </h1>
            </div>
            <Menu />
        </header>
    );
};
