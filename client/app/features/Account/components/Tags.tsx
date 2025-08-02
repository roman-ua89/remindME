'use client';

import React from 'react';
import { Chip, Stack } from '@mui/material';

export const Tags = () => {


    const handleDelete = () => {

    }

    return (
        <li className="mb-4">
            Manage tags:
            <Stack direction="row" spacing={1}>
                <Chip label="English" variant="outlined" onDelete={handleDelete} />
                <Chip label="Coding" variant="outlined" onDelete={handleDelete} />
                <Chip label="Patterns" variant="outlined" onDelete={handleDelete} />
            </Stack>
        </li>
    )
}