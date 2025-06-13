import {Edit3} from "@deemlol/next-icons";
import React, {useEffect, useRef, useState} from "react";
import {ServerData} from "@/app/features/ListNote/types";

type Props = {
    title: ServerData["title"];
    itemsCount: number;
}

export const EditableTitle = ({ title, itemsCount }: Props) => {
    const [editMode, setEditMode] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const initialValue = useRef<string>(title);
    const [showIsSaved, setShowIsSaved] = useState(false);
    const [content, setContent] = useState(title || 'Default title');
    let timeoutId: any = null;

    const notifyOnSave = () => {
        clearTimeout(timeoutId);
        setShowIsSaved(true);
        timeoutId = setTimeout(() => {
            setShowIsSaved(false);
        }, 1000)
    }

    useEffect(() => {
        if (editMode) {
            titleInputRef?.current?.focus();
        }
    }, [editMode])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') setEditMode(false);
    }

    const handleOnBlur = () => {
        setEditMode(false);
        saveData();
    }

    const saveData = () => {
        if (initialValue.current !== content) {
            initialValue.current = content;
            console.log('save title: ', content);
            notifyOnSave();
        } else {
            console.log('title was not changed')
        }
    }

    return (
        <div className="mb-4 min-h-10">
            {editMode ? (
                <input
                    value={content}
                    ref={titleInputRef}
                    className="text-2xl border-solid border-stone-200 border-2 min-w-[400px] block"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.currentTarget.value)}
                    onBlur={handleOnBlur}
                    onKeyDown={handleKeyDown} />
            ) : (
                <div className="flex items-start">
                    <h2 className="h2 cursor-pointer group hover:text-inherit flex items-baseline mb-0!" onClick={() => setEditMode(true)}>
                        <span className="text-gray-400 pr-2 group-hover:text-gray-500">
                            <Edit3 size={16}/>
                        </span>
                        {`${content} (${itemsCount})`}
                        {showIsSaved && (
                            <span className="ml-2 self-end p-1 rounded text-xs text-white p2 border border-green-200 bg-green-400">Saved</span>
                        )}
                    </h2>
                </div>
            )}
        </div>
    )
}
