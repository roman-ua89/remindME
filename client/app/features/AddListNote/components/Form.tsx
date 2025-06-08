'use client';

import React, {useEffect, useRef, useState} from 'react';
import './../listNote.module.css';
import {BlueButton, GreenButton} from "@/app/shared/UI/Buttons";
import {useSideUpdate } from "@/app/features/AddListNote/hooks";
import {normalizeList} from "@/app/features/AddListNote/utils";
import {List} from "@/app/features/AddListNote/components/List";
import {Edit3} from "@deemlol/next-icons";



export const Form = () => {
    const { state, updateInputValue, addNewRow, removeRow, isDirty } = useSideUpdate([]);
    const [editMode, setEditMode] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const titleInitialValue = useRef<string>('');
    const [showIsSaved, setShowIsSaved] = useState(false);
    const [titleContent, setTitleContent] = useState('Default title');
    let timeoutId: any = null;

    const notifyOnSave = () => {
        clearTimeout(timeoutId);
        setShowIsSaved(true);
        timeoutId = setTimeout(() => {
            setShowIsSaved(false);
        }, 1000)
    }

    useEffect(() => {
        if (editMode) {
            titleInputRef?.current?.focus();
        }
    }, [editMode])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') setEditMode(false);
    }

    const handleOnBlur = () => {
        setEditMode(false);
    }

    const saveData = () => {
        if (titleInitialValue.current !== titleContent) {
            titleInitialValue.current = titleContent;
            console.log('save title: ', titleContent);
            notifyOnSave();
        } else {
            console.log('title was not changed')
        }
    }

    const handleSave = () => {
        const normalizedData = normalizeList(state);
        console.log('normalizedData', normalizedData);
        console.log('title', titleContent);
    }

    return (
        <div>

            <div className="mb-4 min-h-10">
                {editMode ? (
                    <input
                        value={titleContent}
                        ref={titleInputRef}
                        className="text-2xl border-solid border-stone-200 border-2 min-w-[400px] block"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTitleContent(e.currentTarget.value)}
                        onBlur={handleOnBlur}
                        onKeyDown={handleKeyDown} />
                ) : (
                    <div className="flex items-start">
                        <h2 className="h2 cursor-pointer group hover:text-inherit flex items-baseline mb-0!" onClick={() => setEditMode(true)}>
                        <span className="text-gray-400 pr-2 group-hover:text-gray-500">
                            <Edit3 size={16}/>
                        </span>
                            {`${titleContent} (${state.length})`}
                            {showIsSaved && (
                                <span className="ml-2 self-end p-1 rounded text-xs text-white p2 border border-green-200 bg-green-400">Saved</span>
                            )}
                        </h2>
                    </div>
                )}
            </div>
            <List updateInputValue={updateInputValue} removeRow={removeRow} state={state} />

            <div className="flex flex-row gap-5">
                <BlueButton label="Add" action={addNewRow} />
                {isDirty && (<GreenButton label="Save" action={handleSave} />)}
            </div>
        </div>
    )
}
