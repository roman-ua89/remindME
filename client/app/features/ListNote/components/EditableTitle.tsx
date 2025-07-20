import { Edit3 } from '@deemlol/next-icons';
import React, { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { setId, setTitle } from '@/store/features/listNote/listNoteSlice';
import { updateListNoteTitle } from '@/app/features/ListNote/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const EditableTitle = () => {
    const dispatch = useAppDispatch();
    const title = useAppSelector((state) => state.listType.title);
    const list = useAppSelector((state) => state.listType.list);
    const id = useAppSelector((state) => state.listType.id);

    const [titleEditMode, setTitleEditMode] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [showIsSaved, setShowIsSaved] = useState(false);
    const [updateTitleState, updateTitleAction] = useActionState(updateListNoteTitle, undefined);
    const titleInitialValue = useRef<string>('');
    let timeoutId: any = null;

    useEffect(() => {
        if (titleEditMode) {
            titleInputRef?.current?.focus();
        }
    }, [titleEditMode]);

    useEffect(() => {
        if (!titleEditMode && title !== titleInitialValue.current) {
            startTransition(() => {
                updateTitleAction({ id, title: title });
                titleInitialValue.current = title;
            });
        }
    }, [titleEditMode]);

    useEffect(() => {
        if (updateTitleState && !updateTitleState.message) {
            const { id, title } = updateTitleState;
            dispatch(setId(id));
            dispatch(setTitle(title));
            notifyOnSave();
        }
    }, [updateTitleState]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTitleEditMode(false);
        }
    };

    const handleOnBlur = () => {
        setTitleEditMode(false);
    };

    const notifyOnSave = () => {
        clearTimeout(timeoutId);
        setShowIsSaved(true);
        timeoutId = setTimeout(() => {
            setShowIsSaved(false);
        }, 1000);
    };

    return (
        <div className="mb-4 min-h-10">
            {titleEditMode ? (
                <input
                    value={title}
                    ref={titleInputRef}
                    className="text-2xl border-solid border-stone-200 border-2 min-w-[400px] block"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.currentTarget.value))}
                    onBlur={handleOnBlur}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <div className="flex items-start">
                    <h2 className="h2 cursor-pointer group hover:text-inherit flex items-baseline mb-0!" onClick={() => setTitleEditMode(true)}>
                        <span className="text-gray-400 pr-2 group-hover:text-gray-500">
                            <Edit3 size={16} />
                        </span>
                        {title}
                        <span className="text-gray-300">&nbsp;({list.length})</span>
                        {showIsSaved && (
                            <span className="ml-2 self-end p-1 rounded text-xs text-white p2 border border-green-200 bg-green-400">Saved</span>
                        )}
                    </h2>
                </div>
            )}
        </div>
    );
};
