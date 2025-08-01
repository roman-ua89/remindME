import React from 'react';
import { Play } from '@/app/features/PlaySingle'
import {Header} from "@/app/components/Header";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PlaySinglePage({params}: PageProps) {
    const { id } = await params;

    return (
        <div>
            <Header />
            <Play id={id} />
        </div>
    )
}
