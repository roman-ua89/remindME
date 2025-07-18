'use client';

import React from 'react';
import { getSingleItems, getListItems } from '@/app/features/RemindSelector/actions';
import { useActionState, startTransition, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { IListNoteItem, ListNoteItem } from '@/app/features/ListNote/types';
import { ISingleNoteItem } from '@/app/features/SingleNote/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteListNoteById, deleteSingleNoteById } from '@/app/shared/actions';
import { setListNotes, setSingleNotes } from '@/store/features/remindSelector/remindSelectorSlice';
import { NotesViewWrapper } from '@/app/features/RemindSelector/components/NotesViewWrapper';

export const Main = () => {
    const singleNotes = useAppSelector((state) => state.remindSelector.singleNotes);
    const listNotes = useAppSelector((state) => state.remindSelector.listNotes);
    const searchResults = useAppSelector((state) => state.remindSelector.searchResults);
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

    if (searchResults.singleNotes.length || searchResults.listNotes.length) {
        const { listNotes: searchedListNotes, singleNotes: searchedSingleNotes } = searchResults;
        return (
            <NotesViewWrapper
                singleIsPending={false}
                listIsPending={false}
                singleNotes={searchedSingleNotes}
                listNotes={searchedListNotes}
                playSingleNoteHandler={playSingleNoteHandler}
                editSingleActionHandler={editSingleActionHandler}
                deleteSingleActionHandler={deleteSingleActionHandler}
                playListActionHandler={playListActionHandler}
                editListActionHandler={editListActionHandler}
                deleteListActionHandler={deleteListActionHandler}
            />
        );
    }

    return (
        <NotesViewWrapper
            singleIsPending={singleIsPending}
            listIsPending={listIsPending}
            singleNotes={singleNotes}
            listNotes={listNotes}
            playSingleNoteHandler={playSingleNoteHandler}
            editSingleActionHandler={editSingleActionHandler}
            deleteSingleActionHandler={deleteSingleActionHandler}
            playListActionHandler={playListActionHandler}
            editListActionHandler={editListActionHandler}
            deleteListActionHandler={deleteListActionHandler}
        />
    );
};
