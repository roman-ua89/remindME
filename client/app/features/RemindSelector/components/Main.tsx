'use client';

import {getSingleItems, getListItems, SingleNote, ListItemReturnType} from "@/app/features/RemindSelector/actions";
import { useActionState, startTransition, useEffect } from "react";
import {ActionButton} from "@/app/shared/UI/Buttons";
import {redirect} from "next/navigation";

export const Main = () => {
    const [singleFormState, singleAction, singleIsPending] = useActionState(getSingleItems, undefined);
    const [listFormState, listAction, listIsPending] = useActionState(getListItems, undefined);

    useEffect(() => {
        startTransition(() => {
            singleAction();
            listAction();
        })
    }, []);

    const editSingleActionHandler = (id: SingleNote["id"]) => {
        redirect(`/edit/single/${id}`);

    }

    const editListActionHandler = (id: ListItemReturnType["id"]) => {
        redirect(`/edit/list/${id}`);
    }

    return (
        <>
            <h1 className="h1">Single items</h1>
            {singleIsPending ? (<div>singleIsPending...</div>) : (
                <ul className="mb-5">
                    {singleFormState?.singleNotes?.map(item => {
                        const { id, term } = item;
                        console.log('id', id);
                        return (
                            <div key={id} className="item-presentation">
                                <div className="flex items-center">
                                    <span className="item-type">S</span>
                                    <span className="item-type-text">{term}</span>
                                </div>
                                <div className="flex gap-4">
                                    <ActionButton label="View" />
                                    <ActionButton label="Play" />
                                    <ActionButton label="Edit" action={() => editSingleActionHandler(id)} />
                                </div>
                            </div>
                        )
                    })}
                </ul>
            )}

            <h1 className="h1">List items</h1>
            {listIsPending ? (<div>singleIsPending...</div>) : (
                <ul>
                    {listFormState?.listNotes?.map(item => {
                        const { id, title } = item;
                        console.log('id', id);
                        return (
                            <div key={id} className="item-presentation">
                                <div className="flex items-center">
                                    <span className="item-type">L</span>
                                    <span className="item-type-text">{title}</span>
                                </div>
                                <div className="flex gap-4">
                                    <ActionButton label="Play" />
                                    <ActionButton label="Edit" action={() => editListActionHandler(id)} />
                                </div>
                            </div>
                        )
                    })}
                </ul>
            )}
        </>
    )
}
