'use client';

import React from 'react';

type Props = {
    action?: () => void;
    label: string;
    disabled?: boolean;
};

export const BlueButton = ({ action, label, disabled }: Props) => {
    return (
        <button
            disabled={disabled}
            className="bg-blue-500 hover:bg-blue-400 pt-1 pr-2 pb-1 pl-2 text-white font-lg rounded-sm cursor-pointer disabled:bg-gray-300"
            onClick={action ? () => action() : undefined}
        >
            {label}
        </button>
    );
};

export const RedButton = ({ action, label, disabled }: Props) => {
    return (
        <button
            className="bg-red-400 hover:bg-red-500 pt-1 pr-2 pb-1 pl-2 text-white font-lg rounded-sm cursor-pointer disabled:bg-gray-300"
            disabled={disabled}
            onClick={action ? () => action() : undefined}
        >
            {label}
        </button>
    );
};

export const GreenButton = ({ action, label, disabled }: Props) => {
    return (
        <button
            className="bg-green-500 hover:bg-green-400 pt-1 pr-2 pb-1 pl-2 text-white font-lg rounded-sm cursor-pointer disabled:bg-gray-300"
            disabled={disabled}
            onClick={action ? () => action() : undefined}
        >
            {label}
        </button>
    );
};

export const ActionButton = ({ action, label, disabled }: Props) => {
    return (
        <button
            className="disabled:cursor-default disabled:hover:bg-gray-100 disabled:opacity-50 border-gray-200 border-1 bg-gray-100 text-gray-600 bold text-sm px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
            disabled={disabled}
            onClick={action ? () => action() : undefined}
        >
            {label}
        </button>
    );
};
