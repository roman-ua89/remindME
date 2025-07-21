'use client';

import React from 'react';
import { Menu } from '@/app/components/Menu';
import { AccountActions } from '@/app/components/AccountActions';

export const Header = () => {
    return (
        <header className="mb-5 relative">
            <AccountActions />
            <div className="flex justify-center">
                <h1 className="font-bold text-lime-600 text-[60px]">
                    Remind
                    <span>ME</span>
                </h1>
            </div>
            <Menu />
        </header>
    );
};
