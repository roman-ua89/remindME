import React from 'react';
import { Header } from '@/app/components/Header';
import { Form } from '@/app/features/SingleNote';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditSinglePage(props: PageProps) {
    const { id } = await props.params;

    return (
        <>
            <Header />
            <Form id={id} />
        </>
    );
}
