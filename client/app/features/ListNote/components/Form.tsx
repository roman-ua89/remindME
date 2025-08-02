'use client';

import React, { startTransition, useActionState, useCallback, useEffect, useRef } from 'react';
import './../listNote.module.css';
import { ActionButton, BlueButton, GreenButton } from '@/app/shared/UI/Buttons';
import { normalizeList } from '@/app/features/ListNote/utils';
import { List } from '@/app/features/ListNote/components/List';
import { createListNote, updateListNote } from '@/app/features/ListNote/actions';
import { ErrorMsg } from '@/app/shared/UI/ErrorMsg';
import { getListNoteById } from '@/app/shared/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createNewRow, setId, setSerializedObject, setTitle } from '@/store/features/listNote/listNoteSlice';
import { EditableTitle } from '@/app/features/ListNote/components/EditableTitle';
import { DEFAULT_LIST_ITEM, DEFAULT_LIST_TITLE, LIST_ITEMS_LIMIT } from '@/app/shared/constants';
import { FormComponentsProps } from '@/app/features/ListNote/types';

export const Form = ({ id = '' }: FormComponentsProps) => {
    const dispatch = useAppDispatch();
    const list = useAppSelector((state) => state.listType.list);
    const title = useAppSelector((state) => state.listType.title);

    const [stateToEdit, getListNoteAction] = useActionState(getListNoteById, undefined);
    const [{ errorMessage: createErrorMessage }, createAction] = useActionState(createListNote, { errorMessage: '' });
    const [{ errorMessage: updateErrorMessage, updateListNote: updatedData }, updateAction] = useActionState(updateListNote, {
        updateListNote: DEFAULT_LIST_ITEM,
        errorMessage: '',
    });
    const message = createErrorMessage || updateErrorMessage || '';
    const initialState = useRef('');

    const isDirty = () => {
        return initialState.current !== (list.length === 0 ? '' : JSON.stringify(list));
    };

    useEffect(() => {
        if (id) {
            startTransition(() => {
                getListNoteAction(id);
            });
        }

        return () => {
            dispatch(setTitle(DEFAULT_LIST_TITLE));
            dispatch(setSerializedObject(''));
            dispatch(setId(0));
        };
    }, []);

    useEffect(() => {
        if (stateToEdit) {
            const { id, title, serializedObject } = stateToEdit;
            dispatch(setTitle(title));
            dispatch(setSerializedObject(serializedObject));
            dispatch(setId(id));

            initialState.current = serializedObject;
        }
    }, [stateToEdit]);

    useEffect(() => {
        if (!updateErrorMessage) {
            const { serializedObject } = updatedData;
            dispatch(setSerializedObject(serializedObject));
            initialState.current = serializedObject;
        }
    }, [updatedData, updateErrorMessage]);

    const memoizedNormalizeList = useCallback(normalizeList, [list]);

    const handleSave = () => {
        const normalizedData = memoizedNormalizeList(list);
        startTransition(() => {
            if (id) {
                updateAction({ id: parseInt(id), serializedObject: JSON.stringify(normalizedData) });
            } else {
                createAction({
                    title,
                    data: normalizedData,
                });
            }
        });
    };

    const resetOrRevertHandler = () => {
        dispatch(setSerializedObject(initialState.current));
    };

    return (
        <div>
            {message && <ErrorMsg msg={message} />}
            <EditableTitle />
            <List list={list} />
            <div className="flex justify-center">
                {list.length < LIST_ITEMS_LIMIT ? (
                    <BlueButton label="+" action={() => dispatch(createNewRow())} />
                ) : (
                    <span className="text-red-500">Amount of lines can&#39;t be more than {LIST_ITEMS_LIMIT}</span>
                )}
            </div>
            <div className="flex flex-row gap-5">
                {isDirty() && <GreenButton label="Save" action={handleSave} />}
                {isDirty() && <ActionButton action={resetOrRevertHandler} label={id ? 'Revert' : 'Reset'} />}
            </div>
        </div>
    );
};
