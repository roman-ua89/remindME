'use client';

import React from 'react';
import { styles } from '../styles';

export const ContentAdded = () => {

    return (
        <li className="mb-4">
            Content added:
            <ul>
                <li className={styles.contentTitle}>meaningful title 1</li>
                <li className={styles.contentTitle}>some term</li>
                <li className={styles.contentTitle}>another text</li>
                <li className={styles.contentTitle}>maybe also term</li>
            </ul>
        </li>
    )
}