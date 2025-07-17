'use client';

import React from 'react';
import { getSingleItems, getListItems } from '@/app/features/RemindSelector/actions';
import { useActionState, startTransition, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { IListNoteItem, ListNoteItem } from '@/app/features/ListNote/types';
import { ISingleNoteItem } from '@/app/features/SingleNote/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSingleNotes } from '@/store/features/singleNote/singleNoteSlice';
import { setListNotes } from '@/store/features/listNote/listNoteSlice';
import { deleteListNoteById, deleteSingleNoteById } from '@/app/shared/actions';
import { ListView } from '@/app/features/RemindSelector/components/ListView';
import { SingleView } from '@/app/features/RemindSelector/components/SingleView';

export const Main = () => {
    const singleNotes = useAppSelector((state) => state.singleType.notes);
    const listNotes = useAppSelector((state) => state.listType.notes);
    const dispatch = useAppDispatch();

    const [singleFormState, singleAction, singleIsPending] = useActionState(getSingleItems, []);
    const [listFormState, listAction, listIsPending] = useActionState(getListItems, []);

    const [afterDeleteListState, deleteListByIdAction] = useActionState(deleteListNoteById, []);
    const [afterDeleteSingleState, deleteSingleByIdAction] = useActionState(deleteSingleNoteById, []);

    useEffect(() => {
        startTransition(() => {
            singleAction();
            listAction();
        });
    }, []);

    useEffect(() => {
        if (singleFormState.length) {
            dispatch(setSingleNotes(singleFormState));
        }
        if (listFormState.length) {
            dispatch(setListNotes(listFormState));
        }
        if (Array.isArray(afterDeleteListState) && afterDeleteListState.length) {
            dispatch(setListNotes(afterDeleteListState));
        }
        if (Array.isArray(afterDeleteSingleState) && afterDeleteSingleState.length) {
            dispatch(setSingleNotes(afterDeleteSingleState));
        }
    }, [singleFormState, listFormState, afterDeleteListState, afterDeleteSingleState]);

    const editSingleActionHandler = (id: ISingleNoteItem['id']) => {
        redirect(`/single/edit/${id}`);
    };

    const editListActionHandler = (id: ListNoteItem['id']) => {
        redirect(`/list/edit/${id}`);
    };

    const deleteListActionHandler = async (id: ListNoteItem['id'], title: string) => {
        const confirmResult = confirm(`Are you sure you want to delete '${title}'`);
        if (confirmResult) {
            startTransition(() => {
                deleteListByIdAction(id);
            });
        }
    };

    const deleteSingleActionHandler = async (id: ISingleNoteItem['id'], term: ISingleNoteItem['term']) => {
        const confirmResult = confirm(`Are you sure you want to delete '${term}'`);
        if (confirmResult) {
            startTransition(() => {
                deleteSingleByIdAction(id);
            });
        }
    };

    const playListActionHandler = (id: IListNoteItem['id']) => {
        redirect(`/list/play/${id}`);
    };

    const playSingleNoteHandler = (id: ISingleNoteItem['id']) => {
        redirect(`/single/play/${id}`);
    };

    return (
        <>
            {singleIsPending ? (
                <div>singleIsPending...</div>
            ) : (
                <SingleView
                    singleNotes={singleNotes}
                    playSingleNoteHandler={playSingleNoteHandler}
                    editSingleActionHandler={editSingleActionHandler}
                    deleteSingleActionHandler={deleteSingleActionHandler}
                />
            )}

            {listIsPending ? (
                <div>singleIsPending...</div>
            ) : (
                <ListView
                    listNotes={listNotes}
                    editListActionHandler={editListActionHandler}
                    deleteListActionHandler={deleteListActionHandler}
                    playListActionHandler={playListActionHandler}
                />
            )}
        </>
    );
};
