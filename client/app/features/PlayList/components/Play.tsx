'use client';

import {ActionButton} from "@/app/shared/UI/Buttons";
import {PlayProgressBar} from "@/app/shared/UI/PlayProgressBar";
import {useActionState, useEffect, useTransition, useState, MouseEvent} from "react";
import {getListNoteById} from "@/app/shared/actions";
import {ListNoteItem} from "@/app/features/AddListNote/types";

type Props = {
    id: string;
}

export const Play = ({id}: Props) => {
    const [listNoteState, listNoteAction] = useActionState(getListNoteById, undefined);
    const [isPending, startTransition] = useTransition();
    const [listNotes, setListNotes] = useState<ListNoteItem[]>([]);
    const [currentStep, setCurrentStep] = useState(0);

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

    console.log('listNotes', listNotes)

    const prevAction = () => {
        setCurrentStep(currentStep - 1);
    }

    const nextAction = () => {
        setCurrentStep(currentStep + 1);
    }

    const unblur = (e: MouseEvent<HTMLDivElement>) => {
        console.log('e', e);
        const el = e.target as HTMLElement;
        if (el.classList.contains('blur-xs')) {
            el.classList.remove('blur-xs', 'cursor-pointer');
        }
    }

    if (isPending && !listNotes.length) {
        return (<div>is loading ...</div>)
    }

    return (
        <>
            <h1 className="h1">{listNoteState?.title}</h1>
            <div className="border-5 border-gray-100 rounded-2xl p-4 flex justify-between gap-4 mb-5 items-center">
                <ActionButton label="Prev" disabled={!currentStep} action={prevAction} />
                <dl className="flex justify-between gap-4 grow">
                    <dt className="bg-gray-50 p-4 w-60">{listNotes[currentStep]?.left}</dt>
                    <dd className="bg-gray-50 p-4 grow blur-xs cursor-pointer" onClick={unblur}>{listNotes[currentStep]?.right}</dd>
                </dl>
                <ActionButton label="Next" action={nextAction} disabled={currentStep === listNotes.length - 1}/>
            </div>
            <div>
                <PlayProgressBar percentage={Math.ceil((currentStep / (listNotes.length - 1)) * 100)} />
            </div>
        </>
    )
}
