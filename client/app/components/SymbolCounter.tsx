import React from 'react';

type Props = {
    strLength: number;
    max: number;
    ariaLabel?: string;
}

export const SymbolCounter = ({strLength, max, ariaLabel}: Props ) => {
    const defaultColor = 'text-green-300';
    const warningColor = 'text-yellow-300';
    const errorColor = 'text-red-400';
    let color = '';

    const warningPoint = Math.round(max * 0.7);
    const errorPoint = Math.round(max * 0.9);


    if (strLength >= 0 && strLength < warningPoint) {
        color = defaultColor;
    } else if (strLength >= warningPoint && strLength < errorPoint) {
        color = warningColor;
    } else if (strLength >= errorPoint) {
        color = errorColor;
    }

    return (
        <div aria-label={ariaLabel} className={`${color} pl-2`}>{strLength}</div>
    )
}