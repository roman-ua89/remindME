import React from 'react';
import {ActionButton, RedButton} from "@/app/shared/UI/Buttons";
import {IListNoteItem, ListNoteTile} from "@/app/features/ListNote/types";

interface Props {
    listNotes: ListNoteTile[];
    playListActionHandler: (id: IListNoteItem["id"]) => void;
    editListActionHandler: (id: IListNoteItem["id"]) => void;
    deleteListActionHandler: (id: IListNoteItem["id"], title: IListNoteItem["title"]) => void;
}

export const ListView = ({
    listNotes,
    playListActionHandler,
    editListActionHandler,
    deleteListActionHandler}: Props) => {

    return (
        <>
            <h1 className="h1">List items</h1>
            <ul>
                {listNotes.map(item => {
                    const { id, title } = item;
                    return (
                        <div key={`list-${id}`} className="item-presentation">
                            <div className="flex items-center">
                                <span className="item-type">L</span>
                                <span className="item-type-text">{title}</span>
                            </div>
                            <div className="flex gap-4">
                                <ActionButton label="Play" action={() => playListActionHandler(id)} />
                                <ActionButton label="Edit" action={() => editListActionHandler(id)} />
                                <RedButton label="Delete" action={() => deleteListActionHandler(id, title)} />
                            </div>
                        </div>
                    )
                })}
            </ul>
        </>
    )
}