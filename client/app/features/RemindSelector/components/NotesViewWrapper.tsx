import { SingleView } from '@/app/features/RemindSelector/components/SingleView';
import { ListView } from '@/app/features/RemindSelector/components/ListView';
import React from 'react';
import { ISingleNoteItem, SingleNoteTile } from '@/app/features/SingleNote/types';
import { IListNoteItem, ListNoteTile } from '@/app/features/ListNote/types';

type Props = {
    singleIsPending: boolean;
    listIsPending: boolean;
    singleNotes: SingleNoteTile[];
    listNotes: ListNoteTile[];
    playSingleNoteHandler: (id: ISingleNoteItem['id']) => void;
    editSingleActionHandler: (id: ISingleNoteItem['id']) => void;
    deleteSingleActionHandler: (id: ISingleNoteItem['id'], term: ISingleNoteItem['term']) => void;
    playListActionHandler: (id: IListNoteItem["id"]) => void;
    editListActionHandler: (id: IListNoteItem["id"]) => void;
    deleteListActionHandler: (id: IListNoteItem["id"], title: IListNoteItem["title"]) => void;
};

export const NotesViewWrapper = ({
    singleIsPending,
    listIsPending,
    singleNotes,
    listNotes,
    playSingleNoteHandler,
    editSingleActionHandler,
    deleteSingleActionHandler,
    playListActionHandler,
    editListActionHandler,
    deleteListActionHandler,
}: Props) => {
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
