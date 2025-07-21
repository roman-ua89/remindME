'use client';

import React, { ChangeEvent, useState, useCallback, useActionState, startTransition, useEffect } from 'react';
import { debounce } from '@/app/utils/debounce';
import { X } from '@deemlol/next-icons';
import { searchForNotes } from '@/app/features/RemindSelector/actions';
import { useAppDispatch } from '@/store/hooks';
import { clearSearchResults, setSearchResults } from '@/store/features/remindSelector/remindSelectorSlice';

export const Search = () => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [searchState, searchAction] = useActionState(searchForNotes, { searchNotes: { singleNotes: [], listNotes: [] } });

    const startSearch = async (value: string) => {
        startTransition(() => {
            searchAction(value);
        });
    };

    useEffect(() => {
        const { singleNotes = [], listNotes = [] } = searchState.searchNotes;
        if (singleNotes.length || listNotes.length) {
            dispatch(setSearchResults({ singleNotes, listNotes }));
        }
    }, [searchState]);

    const debouncedStartSearch = useCallback(debounce(startSearch, 500), []);

    const clearInputHandler = () => {
        dispatch(clearSearchResults());
        setSearchValue('');
    };

    const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        if (e.target.value.length > 2) {
            debouncedStartSearch(e.target.value);
        } else if (!e.target.value) {
            clearInputHandler();
        }
    };

    return (
        <div className="mb-8">
            <div className="max-w-sm relative mx-auto">
                <input
                    className="input-style w-[100%] pl-3 pr-10"
                    value={searchValue}
                    onInput={onInputHandler}
                    type="text"
                    placeholder="Search for term for title"
                />
                {searchValue && (
                    <button onClick={clearInputHandler} className="absolute block w-6 h-6 right-3 top-3 cursor-pointer hover:opacity-60">
                        <X size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};
