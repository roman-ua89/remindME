import {ChangeEvent, useEffect, useRef, useState} from "react";
import {ListNoteItem} from "@/app/features/AddListNote/types";

export type Side = 'left' | 'right' | 'title';

interface UpdateProps {
    value: ListNoteItem["left"];
    id: ListNoteItem["id"];
    side: Side;
}

const returnLatestId = (list: ListNoteItem[]): number => {
    const copy = structuredClone(list);
    return copy.sort((a, b) => b.id - a.id)[0].id;
}

export const useSideUpdate = (defaultState: ListNoteItem[]) => {
    const [state, setState] = useState<ListNoteItem[]>(defaultState);
    const [isDirty, setIsDirty] = useState(false);

    if (state.length === 0) {
        setState([{
            id: 1,
            left: '',
            right: ''
        }])
    }

    const updateInputValue = ({ value, id, side }: UpdateProps) => {
        if (side === 'left') {
            setState(prevState => {
                return prevState.map(item => {
                    if (item.id === id) {
                        return { ...item, left: value }
                    } else {
                        return item;
                    }
                })
            })
        } else if (side === 'right') {
            setState(prevState => {
                return prevState.map(item => {
                    if (item.id === id) {
                        return { ...item, right: value }
                    } else {
                        return item;
                    }
                })
            })
        }
        setIsDirty(true);
    }

    const addNewRow = () => {
        setState(prevState => {
            let nextId = 0;
            if (prevState.length) {
                nextId = returnLatestId(prevState);
            }
            return [...prevState, { id: nextId + 1, left: '', right: '' }]

        });
        setIsDirty(true);
    }

    const removeRow = (id: ListNoteItem["id"]) => {
        setState(prevState => {
            return prevState.filter(item => item.id !== id);
        })
        setIsDirty(true);
    }

    return { state, updateInputValue, addNewRow, removeRow, isDirty };
}
