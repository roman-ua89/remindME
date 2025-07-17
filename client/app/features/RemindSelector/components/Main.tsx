'use client';

import {getSingleItems, getListItems} from "@/app/features/RemindSelector/actions";
import { useActionState, startTransition, useEffect } from "react";
import {ActionButton, RedButton} from "@/app/shared/UI/Buttons";
import {redirect} from "next/navigation";
import {IListNoteItem, ListNoteItem} from "@/app/features/ListNote/types";
import {ISingleNoteItem} from "@/app/features/SingleNote/types";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setSingleNotes} from "@/store/features/singleNote/singleNoteSlice";
import {setListNotes} from "@/store/features/listNote/listNoteSlice";
import {deleteListNoteById, deleteSingleNoteById} from "@/app/shared/actions";

export const Main = () => {
    const singleNotes = useAppSelector(state => state.singleType.notes);
    const listNotes = useAppSelector(state => state.listType.notes);
    const dispatch = useAppDispatch();

    const [singleFormState, singleAction, singleIsPending] = useActionState(getSingleItems, []);
    const [listFormState, listAction, listIsPending] = useActionState(getListItems, []);

    const [afterDeleteListState, deleteListByIdAction] = useActionState(deleteListNoteById, []);
    const [afterDeleteSingleState, deleteSingleByIdAction] = useActionState(deleteSingleNoteById, []);

    useEffect(() => {
        startTransition(() => {
            singleAction();
            listAction();
        })
    }, []);

    useEffect(() => {
        if (singleFormState.length) {
            dispatch(setSingleNotes(singleFormState));
        }
        if (listFormState.length) {
            dispatch(setListNotes(listFormState));
        }
        if (Array.isArray(afterDeleteListState) && afterDeleteListState.length) {
            dispatch(setListNotes(afterDeleteListState))
        }
        if (Array.isArray(afterDeleteSingleState) && afterDeleteSingleState.length) {
            dispatch(setSingleNotes(afterDeleteSingleState))
        }
    }, [singleFormState, listFormState, afterDeleteListState, afterDeleteSingleState]);

    const editSingleActionHandler = (id: ISingleNoteItem["id"]) => {
        redirect(`/single/edit/${id}`);

    }

    const editListActionHandler = (id: ListNoteItem["id"]) => {
        redirect(`/list/edit/${id}`);
    }

    const deleteListActionHandler = async (id: ListNoteItem["id"], title: string) => {
        const confirmResult = confirm(`Are you sure you want to delete '${title}'`);
        if (confirmResult) {
            startTransition(() => {
                deleteListByIdAction(id);
            })
        }
    }

    const deleteSingleActionHandler = async (id: ISingleNoteItem["id"], term: ISingleNoteItem["term"]) => {
        const confirmResult = confirm(`Are you sure you want to delete '${term}'`);
        if (confirmResult) {
            console.log('in')
            startTransition(() => {
                console.log('transition')
                deleteSingleByIdAction(id);
            })
        }
    }

    const playListActionHandler = (id: IListNoteItem["id"]) => {
        redirect(`/list/play/${id}`);
    }

    const playSingleNoteHandler = (id: ISingleNoteItem["id"]) => {
        redirect(`/single/play/${id}`);
    }

    return (
        <>
            <h1 className="h1">Single items</h1>
            {singleIsPending ? (<div>singleIsPending...</div>) : (
                <ul className="mb-5">
                    {singleNotes.map(item => {
                        const { id, term } = item;

                        return (
                            <div key={id} className="item-presentation">
                                <div className="flex items-center">
                                    <span className="item-type">S</span>
                                    <span className="item-type-text">{term}</span>
                                </div>
                                <div className="flex gap-4">
                                    <ActionButton label="View" />
                                    <ActionButton label="Play" action={() => playSingleNoteHandler(id)} />
                                    <ActionButton label="Edit" action={() => editSingleActionHandler(id)} />
                                    <RedButton label="Delete" action={() => deleteSingleActionHandler(id, term)} />
                                </div>
                            </div>
                        )
                    })}
                </ul>
            )}

            <h1 className="h1">List items</h1>
            {listIsPending ? (<div>singleIsPending...</div>) : (
                <ul>
                    {listNotes.map(item => {
                        const { id, title } = item;
                        return (
                            <div key={id} className="item-presentation">
                                <div className="flex items-center">
                                    <span className="item-type">L</span>
                                    <span className="item-type-text">{title}</span>
                                </div>
                                <div className="flex gap-4">
                                    <ActionButton label="Play" action={() => playListActionHandler(id)} />
                                    <ActionButton label="Edit" action={() => editListActionHandler(id)} />
                                    <RedButton label="Delete" action={() => deleteListActionHandler(id)} />
                                </div>
                            </div>
                        )
                    })}
                </ul>
            )}
        </>
    )
}
