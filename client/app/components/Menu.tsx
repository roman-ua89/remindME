import Link from 'next/link';
import React from 'react';

export const Menu = () => {
    return (
        <ul className="flex justify-center gap-5 mb-4">
            <li className="block p-2">
                <Link href="/" className="hover:text-green-800">
                    Home
                </Link>
            </li>
            <li className="block p-2">
                <Link href="/add" className="hover:text-green-800">
                    Add note
                </Link>
            </li>
            <li className="block p-2">
                <Link href="/settings" className="hover:text-green-800">
                    Settings
                </Link>
            </li>
            <li className="block p-2">
                <Link href="/about" className="hover:text-green-800">
                    About
                </Link>
            </li>
        </ul>
    );
};
