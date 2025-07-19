import React from 'react';
import {ActionButton, RedButton} from "@/app/shared/UI/Buttons";
import {IListNoteItem, ListNoteTile} from "@/app/features/ListNote/types";
import { Triangle } from '@deemlol/next-icons';

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
            <div className="flex gap-4 justify-center mb-4 items-center">
                <h2 className="h2 mb-0!">List items</h2>
                {listNotes.length ? (
                    <button title="Play in random order" className="block bg-gray-100 rounded-md p-2 hover:bg-blue-200 cursor-pointer">
                        <span className="rotate-90 block"><Triangle size={26} color="#333" /></span>
                    </button>
                ) : null}
            </div>
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