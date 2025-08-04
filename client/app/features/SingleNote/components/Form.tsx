'use client';

import React, { useCallback, useRef } from 'react';
import { ActionButton, BlueButton } from '@/app/shared/UI/Buttons';
import { ChangeEvent, FormEvent, startTransition, useActionState, useEffect } from 'react';
import { createSingleNote, updateSingleNote } from '@/app/features/SingleNote/actions';
import { getSingleNoteById } from '@/app/shared/actions';
import { ErrorMsg } from '@/app/shared/UI/ErrorMsg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTerm, setExplanation, resetSingleNoteFields } from '@/store/features/singleNote/singleNoteSlice';
import { SymbolCounter } from '@/app/components/SymbolCounter';
import { DEFAULT_SINGLE_ITEM, TEXT_AREA_LIMIT, TEXT_INPUT_LIMIT } from '@/app/shared/constants';
import { TagSelector } from '@/app/features/TagSelector';

type Props = {
    id?: number;
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
    }, [term, explanation]);

    const [{ errorMessage: createErrorMessage }, createSingleNoteAction] = useActionState(createSingleNote, { errorMessage: '' });
    const [stateToEdit, getNoteById] = useActionState(getSingleNoteById, undefined);
    const [{ errorMessage: updateErrorMessage, updateSingleNote: updatedData }, updateSingleNoteAction] = useActionState(updateSingleNote, {
        updateSingleNote: DEFAULT_SINGLE_ITEM,
        errorMessage: ''
    });
    const message = updateErrorMessage || createErrorMessage || '';

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
        const { term, explanation } = updatedData;
        if (term && explanation) {
            dispatch(setTerm(term));
            dispatch(setExplanation(explanation));

            initialValues.current.term = term;
            initialValues.current.explanation = explanation;
        }
    }, [updatedData]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            if (id) {
                updateSingleNoteAction({ id, term, explanation });
            } else {
                createSingleNoteAction({ term, explanation });
            }
        });
    };

    const onTermInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setTerm(e.target.value));
    };

    const onExplanationInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setExplanation(e.target.value));
    };

    const revertFormHandler = () => {
        dispatch(setTerm(initialValues.current.term));
        dispatch(setExplanation(initialValues.current.explanation));
    };

    return (
        <>
            {message && <ErrorMsg msg={message} />}
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between gap-10">
                    <div className="grow">
                        <div>
                            <h3 id="term-label" className="h3 flex">
                                Terminology <SymbolCounter ariaLabel="Term symbol counter" strLength={term.length} max={TEXT_INPUT_LIMIT} />
                            </h3>
                            <input
                                aria-labelledby="term-label"
                                name="term"
                                onChange={onTermInputChange}
                                value={term}
                                className="input-style w-[100%]"
                                disabled={term.length >= TEXT_INPUT_LIMIT}
                            />
                        </div>
                    </div>
                    <div className="grow">
                        <h3 id="explanation-label" className="h3 flex">
                            Explanation <SymbolCounter ariaLabel="Explanation symbol counter" strLength={explanation.length} max={TEXT_AREA_LIMIT} />
                        </h3>
                        <textarea
                            aria-labelledby="explanation-label"
                            name="explanation"
                            value={explanation}
                            onChange={onExplanationInputChange}
                            className="text-area-style w-[100%]"
                            disabled={explanation.length >= TEXT_AREA_LIMIT}
                        />
                    </div>
                </div>
                <TagSelector />
                <div className="flex gap-4">
                    <BlueButton disabled={!explanation || !term || !isDirty()} label="Save" />
                    {isDirty() ? <ActionButton label={id ? 'Revert' : 'Reset'} action={revertFormHandler} /> : null}
                </div>
            </form>
        </>
    );
};
