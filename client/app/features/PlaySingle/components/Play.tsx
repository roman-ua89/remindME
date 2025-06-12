'use client';

import {BlueButton, GreenButton, RedButton} from "@/app/shared/UI/Buttons";
import {redirect} from "next/navigation";
import {startTransition, useActionState, useEffect, useRef, MouseEvent} from "react";
import {getSingleNoteById} from "@/app/shared/actions";

export const Play = ({id}: {id:string}) => {
    const [singleNoteState, singleNoteAction] = useActionState(getSingleNoteById, undefined);
    const explanationRef = useRef<HTMLDivElement>(null);

    const closeHandler = () => {
        redirect('/');
    }

    const unblur = (e: MouseEvent<HTMLDivElement>) => {
        console.log('e', e);
        const el = e.target as HTMLElement;
        if (el.classList.contains('blur-xs')) {
            el.classList.remove('blur-xs', 'cursor-pointer');
        }
    }

    const editHandler = (id: string) => {
        redirect(`/single/edit/${id}`);
    }

    useEffect(() => {
        if (id) {
            startTransition(() => {
                singleNoteAction(id);
            })
        }
    }, []);

    return (
        <div>
            <div className="flex justify-end mb-5 gap-4">
                <BlueButton label="Edit" action={() => editHandler(id)} />
                <RedButton label="close" action={closeHandler} />
            </div>
            <div className="border-5 border-gray-100 rounded-2xl p-4 flex justify-between gap-4 mb-5">
                <div className="bg-gray-50 p-4 w-60">{singleNoteState?.term}</div>
                <div className="bg-gray-50 p-4 grow blur-xs cursor-pointer" onClick={unblur} ref={explanationRef}>{singleNoteState?.explanation}</div>
            </div>
            <div className="flex justify-between">
                <GreenButton label="Aknowledged" />
                <GreenButton label="Aknowledge and go next" />
            </div>
        </div>
    )
}
