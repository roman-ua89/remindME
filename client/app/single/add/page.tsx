import React from 'react';
import { Header } from '@/app/components/Header';
import { Form } from '../../features/SingleNote';

export default function Single() {
    return (
        <>
            <Header />
            <h2 className="h2">Single item</h2>
            <Form />
        </>
    );
}
