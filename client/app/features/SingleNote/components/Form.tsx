"use client";

import {BlueButton} from "@/app/shared/UI/Buttons";
import {ChangeEvent, FormEvent, startTransition, useActionState, useEffect} from "react";
import {createSingleNote, updateSingleNote} from "@/app/features/SingleNote/actions";
import { getSingleNoteById } from "@/app/shared/actions";
import {ErrorMsg} from "@/app/shared/UI/ErrorMsg";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setTerm, setExplanation, resetSingleNoteFields} from "@/store/features/singleNote/singleNoteSlice";

type Props = {
    id?: string;
}

// if 'id' is defined
// then we are in edit mode
export const Form = ({id}: Props) => {
    const dispatch = useAppDispatch();

    const term = useAppSelector(state => state.singleType.term);
    const explanation = useAppSelector(state => state.singleType.explanation);

    const [state, createSingleNoteAction] = useActionState(createSingleNote, { message: '' });
    const [stateToEdit, getNoteById] = useActionState(getSingleNoteById, undefined);
    const { message } = state;

    useEffect(() => {
        if (id) {
            startTransition(() => {
                getNoteById(id);
            })
        }

        return () => {
            dispatch(resetSingleNoteFields());
        }
    }, []);

    useEffect(() => {
        if (stateToEdit && !term && !explanation) {
            dispatch(setTerm(stateToEdit.term));
            dispatch(setExplanation(stateToEdit.explanation));
        }

    }, [stateToEdit]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            const formData = new FormData();
            formData.append('term', term);
            formData.append('explanation', explanation);
            if (id) {
                formData.append('id', id);
                updateSingleNote(formData);
            } else {
                createSingleNoteAction(formData);
            }
        })
    }

    return (
        <>
            {message && (<ErrorMsg msg={message} /> )}
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between gap-10">
                    <div className="grow">
                        <div>
                            <h2>Terminology</h2>
                            <input
                                name="term"
                                onInput={(e: ChangeEvent<HTMLInputElement>) => dispatch(setTerm(e.target.value))}
                                value={term}
                                className="border-solid border-stone-200 border-2 h-8 w-[100%] block p-2" />
                        </div>
                    </div>
                    <div className="grow">
                        <h2>Explanation</h2>
                        <textarea
                            name="explanation"
                            value={explanation}
                            onInput={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(setExplanation(e.target.value))}
                            className="border-stone-200 border-solid block border-2 resize-none w-[100%] p-2 min-h-30" />
                    </div>
                </div>
                <div>
                    <BlueButton
                        disabled={!explanation || !term}
                        label="Save" />
                </div>
            </form>
        </>

    )
}
