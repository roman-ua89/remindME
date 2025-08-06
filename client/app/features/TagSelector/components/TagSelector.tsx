'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { Chip, Stack, Divider } from '@mui/material';
import { GreenButton } from '@/app/shared/UI/Buttons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ITag } from '@/app/features/TagSelector/types';
import { getUserData } from '@/app/shared/actions';
import { setNotification, setTags } from '@/store/features/global/globalSlice';

export const TagSelector = () => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');
    const tags = useAppSelector((state) => state.globalState.tags);
    const TEMP_USER_ID = 2;

    useEffect(() => {
        startTransition(() => {
            getUserData(TEMP_USER_ID, ['tags']).then(result => {
                const { getUserData } = result;
                if (getUserData?.tags?.length) {
                    const { tags } = getUserData;
                    dispatch(setTags(tags));
                }
            });
        })
    }, [])

    const deleteActionHandler = ({ id }: { id: ITag['id'] }) => {
        console.log('delete with id: ', id);
    };

    const addActionHandler = () => {
        console.log('add title: ', inputValue);

    }

    return (
        <div className="mb-4">
            Tag selector
            <div className="mb-4">
                <Divider>
                    <Chip label="Attach tag" size="small" />
                </Divider>
            </div>
            <div className="mb-4">
                {tags.length ? (
                    <Stack direction="row" spacing={1}>
                        {tags.map((tag) => {
                            const { title, id } = tag;
                            return <Chip key={title} label={title} variant="outlined" onDelete={() => deleteActionHandler({ id })} />;
                        })}
                    </Stack>
                ) : (
                    <div>You have not added any tags yet</div>
                )}
            </div>
            <div className="mb-4">
                <div className="flex gap-4">
                    <input type="text" value={inputValue} className="input-style" onChange={(e) => setInputValue(e.target.value)} />
                    <GreenButton label="Add new tag" disabled={inputValue.length < 3} action={addActionHandler} />
                </div>
            </div>
            <Divider />
        </div>
    );
};
