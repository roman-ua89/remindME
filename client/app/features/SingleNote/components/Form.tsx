'use client';

import React, { useCallback, useRef } from 'react';
import { ActionButton, BlueButton } from '@/app/shared/UI/Buttons';
import { ChangeEvent, FormEvent, startTransition, useActionState, useEffect } from 'react';
import { createSingleNote, updateSingleNote } from '@/app/features/SingleNote/actions';
import { getSingleNoteById } from '@/app/shared/actions';
import { ErrorMsg } from '@/app/shared/UI/ErrorMsg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTerm, setExplanation, resetSingleNoteFields } from '@/store/features/singleNote/singleNoteSlice';

type Props = {
    id?: string;
};

// if 'id' is defined
// then we are in edit mode
export const Form = ({ id }: Props) => {
    const dispatch = useAppDispatch();

    const term = useAppSelector((state) => state.singleType.term);
    const explanation = useAppSelector((state) => state.singleType.explanation);

    const initialValues = useRef({
        term: '',
        explanation: '',
    });

    const isDirty = useCallback(() => {
        return initialValues.current.term !== term || initialValues.current.explanation !== explanation;
    }, [term, explanation])

    const [state, createSingleNoteAction] = useActionState(createSingleNote, { message: '' });
    const [stateToEdit, getNoteById] = useActionState(getSingleNoteById, undefined);
    const [stateUpdated, updateSingleNoteAction] = useActionState(updateSingleNote, { message: '' });
    const { message } = state;

    useEffect(() => {
        if (id) {
            startTransition(() => {
                getNoteById(id);
            });
        }

        return () => {
            dispatch(resetSingleNoteFields());
        };
    }, []);

    useEffect(() => {
        if (stateToEdit && !term && !explanation) {
            dispatch(setTerm(stateToEdit.term));
            dispatch(setExplanation(stateToEdit.explanation));

            initialValues.current.term = stateToEdit.term;
            initialValues.current.explanation = stateToEdit.explanation;
        }
    }, [stateToEdit]);

    useEffect(() => {
        if (stateUpdated.term && stateUpdated.explanation) {
            dispatch(setTerm(stateUpdated.term));
            dispatch(setExplanation(stateUpdated.explanation));

            initialValues.current.term = stateUpdated.term;
            initialValues.current.explanation = stateUpdated.explanation;
        }
    }, [stateUpdated]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            const formData = new FormData();
            formData.append('term', term);
            formData.append('explanation', explanation);
            if (id) {
                formData.append('id', id);
                updateSingleNoteAction(formData);
            } else {
                createSingleNoteAction(formData);
            }
        });
    };

    const onTermInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setTerm(e.target.value));
    }

    const onExplanationInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setExplanation(e.target.value));
    }

    const revertFormHandler = () => {
        dispatch(setTerm(initialValues.current.term));
        dispatch(setExplanation(initialValues.current.explanation));
    }

    return (
        <>
            {message && <ErrorMsg msg={message} />}
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between gap-10">
                    <div className="grow">
                        <div>
                            <h2>Terminology</h2>
                            <input
                                name="term"
                                onInput={onTermInputChange}
                                value={term}
                                className="border-solid border-stone-200 border-2 h-8 w-[100%] block p-2"
                            />
                        </div>
                    </div>
                    <div className="grow">
                        <h2>Explanation</h2>
                        <textarea
                            name="explanation"
                            value={explanation}
                            onInput={onExplanationInputChange}
                            className="border-stone-200 border-solid block border-2 resize-none w-[100%] p-2 min-h-30"
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <BlueButton disabled={(!explanation || !term) || !isDirty()} label="Save" />
                    {isDirty() ? (<ActionButton label={id ? 'Revert' : 'Reset'} action={revertFormHandler} />) : null}
                </div>
            </form>
        </>
    );
};
