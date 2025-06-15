'use client';

import React, {startTransition, useActionState, useCallback, useEffect, useRef, useState} from 'react';
import './../listNote.module.css';
import {BlueButton, GreenButton} from "@/app/shared/UI/Buttons";
import {normalizeList} from "@/app/features/ListNote/utils";
import {List} from "@/app/features/ListNote/components/List";
import {Edit3} from "@deemlol/next-icons";
import {addListNote, updateListNote, UpdateListNoteProps, updateListNoteTitle} from "@/app/features/ListNote/actions";
import {ErrorMsg} from "@/app/shared/UI/ErrorMsg";
import {getListNoteById} from "@/app/shared/actions";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {createNewRow, setIsDirty, setSerializedObject, setTitle} from "@/store/features/listNote/listNoteSlice";

type Props = {
    id?: string;
}

export const Form = ({id}: Props) => {
    const dispatch = useAppDispatch();
    const titleContent = useAppSelector(state => state.listNote.title);
    const list = useAppSelector(state => state.listNote.list);
    const isDirty = useAppSelector(state => state.listNote.isDirty);

    const [stateToEdit, getListNoteAction] = useActionState(getListNoteById, undefined);
    // const { state, updateInputValue, addNewRow, removeRow, isDirty } = useSideUpdate();
    const [titleEditMode, setTitleEditMode] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const titleInitialValue = useRef<string>('');
    const [showIsSaved, setShowIsSaved] = useState(false);
    const [createState, createAction] = useActionState(addListNote, {
        message: ''
    });
    const [updateState, updateAction] = useActionState(updateListNote, { message: '' });
    const [updateTitleState, updateTitleAction] = useActionState(updateListNoteTitle, undefined);
    const message = createState?.message || updateState?.message || '';
    let timeoutId: any = null;

    console.log('updateState', updateState);

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
            dispatch(setTitle(title));
            titleInitialValue.current = title;
            dispatch(setSerializedObject(serializedObject));
        }
    }, [stateToEdit]);

    useEffect(() => {
        if (updateState.serializedObject) {
            dispatch(setSerializedObject(updateState.serializedObject));
        }
    }, [updateState]);

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

    const memoizedNormalizeList = useCallback(normalizeList, [list])

    const handleSave = () => {
        const normalizedData = memoizedNormalizeList(list);
        startTransition(() => {
            if (id) {
                updateAction({ id: parseInt(id), data: JSON.stringify(normalizedData) })
            } else {
                createAction({
                    title: titleContent,
                    data: normalizedData,
                });
            }
        })
        dispatch(setIsDirty(false));
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
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.currentTarget.value))}
                        onBlur={handleOnBlur}
                        onKeyDown={handleKeyDown} />
                ) : (
                    <div className="flex items-start">
                        <h2 className="h2 cursor-pointer group hover:text-inherit flex items-baseline mb-0!" onClick={() => setTitleEditMode(true)}>
                        <span className="text-gray-400 pr-2 group-hover:text-gray-500">
                            <Edit3 size={16}/>
                        </span>
                            {`${titleContent} (${list.length})`}
                            {showIsSaved && (
                                <span className="ml-2 self-end p-1 rounded text-xs text-white p2 border border-green-200 bg-green-400">Saved</span>
                            )}
                        </h2>
                    </div>
                )}
            </div>
            <List list={list} />

            <div className="flex flex-row gap-5">
                <BlueButton label="Add" action={() => dispatch(createNewRow())} />
                {isDirty && (<GreenButton label="Save" action={handleSave} />)}
            </div>
        </div>
    )
}
