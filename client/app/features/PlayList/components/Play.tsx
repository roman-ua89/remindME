'use client';

import {ActionButton, GreenButton} from "@/app/shared/UI/Buttons";
import {PlayProgressBar} from "@/app/shared/UI/PlayProgressBar";
import {useActionState, useEffect, useTransition, useState} from "react";
import {getListNoteById} from "@/app/shared/actions";
import {ListNoteItem} from "@/app/features/ListNote/types";

type Props = {
    id: string;
}

export const Play = ({id}: Props) => {
    const [listNoteState, listNoteAction] = useActionState(getListNoteById, undefined);
    const [isPending, startTransition] = useTransition();
    const [listNotes, setListNotes] = useState<ListNoteItem[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [unblurredItems, setUnblurredItems] = useState<number[]>([]);
    const [canGoNext, setCanGoNext] = useState(false);

    useEffect(() => {
        startTransition(() => {
            listNoteAction(id);
        })
    }, []);

    useEffect(() => {
        if (listNoteState && !listNotes.length) {
            const parsed = JSON.parse(listNoteState.serializedObject);
            setListNotes(parsed)
        }
    }, [listNoteState]);

    const prevAction = () => {
        setCurrentStep(currentStep - 1);
    }

    const nextAction = () => {
        setCurrentStep(prevValue => {
            if (prevValue + 1 === listNotes.length - 1) {
                setCanGoNext(true);
            }
            return prevValue + 1;
        });
    }

    const unblurById = (id?: number) => {
        if (id && !unblurredItems.includes(id)) {
            setUnblurredItems(prev => [...prev, id]);
        }
    }

    if (isPending && !listNotes.length) {
        return (<div>is loading ...</div>)
    }

    const isBlurred = (id?: number): string => {
        if (id && unblurredItems.includes(id)) {
            return '';
        }
        return 'blur-xs cursor-pointer';
    }

    return (
        <>
            <h1 className="h1">{listNoteState?.title}</h1>
            <div className="border-5 border-gray-100 rounded-2xl p-4 flex justify-between gap-4 mb-5 items-center">
                <ActionButton label="Prev" disabled={!currentStep} action={prevAction} />
                <dl className="flex justify-between gap-4 grow">
                    <dt className="bg-gray-50 p-4 w-60">{listNotes[currentStep]?.left}</dt>
                    <dd className={`bg-gray-50 p-4 grow ${isBlurred(listNotes[currentStep]?.id)}`} onClick={() => unblurById(listNotes[currentStep]?.id)}>{listNotes[currentStep]?.right}</dd>
                </dl>
                <ActionButton label="Next" action={nextAction} disabled={currentStep === listNotes.length - 1}/>
            </div>
            <div className="mb-5">
                <PlayProgressBar percentage={Math.ceil((currentStep / (listNotes.length - 1)) * 100)} />
            </div>
            {canGoNext && (
                <div>
                    <GreenButton label="Aknowledge and go next" />
                </div>
            )}
        </>
    )
}
