'use client';

import React, {startTransition, useActionState, useCallback, useEffect, useRef, useState} from 'react';
import './../listNote.module.css';
import {BlueButton, GreenButton} from "@/app/shared/UI/Buttons";
import {useSideUpdate } from "@/app/features/ListNote/hooks";
import {normalizeList} from "@/app/features/ListNote/utils";
import {List} from "@/app/features/ListNote/components/List";
import {Edit3} from "@deemlol/next-icons";
import {addListNote, updateListNoteTitle} from "@/app/features/ListNote/actions";
import {ErrorMsg} from "@/app/shared/UI/ErrorMsg";
import {getListNoteById} from "@/app/shared/actions";

type Props = {
    id?: string;
}

export const Form = ({id}: Props) => {
    const [stateToEdit, getListNoteAction] = useActionState(getListNoteById, undefined);
    const { state, setState, updateInputValue, addNewRow, removeRow, isDirty } = useSideUpdate([]);
    const [titleEditMode, setTitleEditMode] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const titleInitialValue = useRef<string>('');
    const [showIsSaved, setShowIsSaved] = useState(false);
    const [titleContent, setTitleContent] = useState('Default title');
    const [listState, listAction] = useActionState(addListNote, {
        message: ''
    });
    const [updateTitleState, updateTitleAction] = useActionState(updateListNoteTitle, undefined);
    const { message } = listState;
    let timeoutId: any = null;

    console.log('updateTitleState', updateTitleState);

    const notifyOnSave = () => {
        clearTimeout(timeoutId);
        setShowIsSaved(true);
        timeoutId = setTimeout(() => {
            setShowIsSaved(false);
        }, 1000)
    }

    useEffect(() => {
        if (id) {
            startTransition(() => {
                getListNoteAction(id);
            })
        }
    }, []);

    useEffect(() => {
        if (stateToEdit) {
            const { title, serializedObject } = stateToEdit;
            setTitleContent(title);
            titleInitialValue.current = title;
            setState(JSON.parse(serializedObject));
        }
    }, [stateToEdit]);

    useEffect(() => {
        if (titleEditMode) {
            titleInputRef?.current?.focus();
        }
    }, [titleEditMode])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') setTitleEditMode(false);
    }

    const handleOnBlur = () => {
        setTitleEditMode(false);
    }

    useEffect(() => {
        // console.log('titleContent', titleContent);
        // console.log('titleInitialValue.current', titleInitialValue.current);
        if (!titleEditMode && titleContent !== titleInitialValue.current && titleInitialValue.current && id) {
            console.log('save title');
            startTransition(() => {
                updateTitleAction({ id: parseInt(id), title: titleContent });
            })
        }
    }, [titleEditMode]);

    const memoizedNormalizeList = useCallback(normalizeList, [state])

    const handleSave = () => {
        const normalizedData = memoizedNormalizeList(state);
        startTransition(() => {
            listAction({
                title: titleContent,
                data: normalizedData,
            });
        })
    }

    return (
        <div>
            {message && (<ErrorMsg msg={message} /> )}
            <div className="mb-4 min-h-10">
                {titleEditMode ? (
                    <input
                        value={titleContent}
                        ref={titleInputRef}
                        className="text-2xl border-solid border-stone-200 border-2 min-w-[400px] block"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTitleContent(e.currentTarget.value)}
                        onBlur={handleOnBlur}
                        onKeyDown={handleKeyDown} />
                ) : (
                    <div className="flex items-start">
                        <h2 className="h2 cursor-pointer group hover:text-inherit flex items-baseline mb-0!" onClick={() => setTitleEditMode(true)}>
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
