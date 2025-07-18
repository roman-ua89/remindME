import React from 'react';
import {ActionButton, RedButton} from "@/app/shared/UI/Buttons";
import {ISingleNoteItem, SingleNoteTile} from "@/app/features/SingleNote/types";

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
            <h1 className="h1">Single items</h1>
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