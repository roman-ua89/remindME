'use client';

import React, {startTransition, useActionState, useCallback, useEffect} from 'react';
import './../listNote.module.css';
import {BlueButton, GreenButton} from "@/app/shared/UI/Buttons";
import {normalizeList} from "@/app/features/ListNote/utils";
import {List} from "@/app/features/ListNote/components/List";
import {addListNote, updateListNote} from "@/app/features/ListNote/actions";
import {ErrorMsg} from "@/app/shared/UI/ErrorMsg";
import {getListNoteById} from "@/app/shared/actions";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {createNewRow, setId, setIsDirty, setSerializedObject, setTitle} from "@/store/features/listNote/listNoteSlice";
import {EditableTitle} from "@/app/features/ListNote/components/EditableTitle";

type Props = {
    id?: string;
}

export const Form = ({id}: Props) => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(state => state.listType.list);
    const isDirty = useAppSelector(state => state.listType.isDirty);
    const title = useAppSelector(state => state.listType.title);

    const [stateToEdit, getListNoteAction] = useActionState(getListNoteById, undefined);
    const [createState, createAction] = useActionState(addListNote, { message: '' });
    const [updateState, updateAction] = useActionState(updateListNote, { message: '' });
    const message = createState?.message || updateState?.message || '';

    useEffect(() => {
        if (id) {
            startTransition(() => {
                getListNoteAction(id);
            })
        }
    }, []);

    useEffect(() => {
        if (stateToEdit) {
            const { id, title, serializedObject } = stateToEdit;
            dispatch(setTitle(title));
            dispatch(setSerializedObject(serializedObject));
            dispatch(setId(id));
        }
    }, [stateToEdit]);

    useEffect(() => {
        if (updateState.serializedObject) {
            dispatch(setSerializedObject(updateState.serializedObject));
        }
    }, [updateState]);

    const memoizedNormalizeList = useCallback(normalizeList, [list])

    const handleSave = () => {
        const normalizedData = memoizedNormalizeList(list);
        startTransition(() => {
            if (id) {
                updateAction({ id: parseInt(id), data: JSON.stringify(normalizedData) })
            } else {
                createAction({
                    title,
                    data: normalizedData,
                });
            }
        })
        dispatch(setIsDirty(false));
    }

    return (
        <div>
            {message && (<ErrorMsg msg={message} /> )}
            <EditableTitle />
            <List list={list} />
            <div className="flex flex-row gap-5">
                <BlueButton label="Add" action={() => dispatch(createNewRow())} />
                {isDirty && (<GreenButton label="Save" action={handleSave} />)}
            </div>
        </div>
    )
}
