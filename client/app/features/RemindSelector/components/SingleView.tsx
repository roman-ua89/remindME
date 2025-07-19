import React from 'react';
import {ActionButton, RedButton} from "@/app/shared/UI/Buttons";
import {ISingleNoteItem, SingleNoteTile} from "@/app/features/SingleNote/types";
import { Triangle } from "@deemlol/next-icons"

interface Props {
    singleNotes: SingleNoteTile[];
    playSingleNoteHandler: (id: ISingleNoteItem['id']) => void;
    editSingleActionHandler: (id: ISingleNoteItem['id']) => void;
    deleteSingleActionHandler: (id: ISingleNoteItem['id'], term: ISingleNoteItem['term']) => void;
}

export const SingleView = ({
    singleNotes,
    playSingleNoteHandler,
    editSingleActionHandler,
    deleteSingleActionHandler}: Props) => {

    return (
        <>
            <div className="flex gap-4 justify-center mb-4 items-center">
                <h2 className="h2 mb-0!">Single items</h2>
                {singleNotes.length ? (
                    <button title="Play in random order" className="block bg-gray-100 rounded-md p-2 hover:bg-blue-200 cursor-pointer">
                        <span className="rotate-90 block"><Triangle size={26} color="#333" /></span>
                    </button>
                ) : null}
            </div>
            <ul className="mb-5">
                {singleNotes.map(item => {
                    const { id, term } = item;

                    return (
                        <div key={`single-${id}`} className="item-presentation">
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
        </>
    )
}