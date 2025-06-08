"use client";

import {BlueButton} from "@/app/shared/UI/Buttons";
import {ChangeEvent, FormEvent, startTransition, useActionState, useState} from "react";
import {addSingleNote} from "@/app/features/AddSingleNote/actions";


export const Form = () => {
    const [term, setTerm] = useState('');
    const [explanation, setExplanation] = useState('');
    const [state, action] = useActionState(addSingleNote, {
        message: ''
    })

    const { message } = state;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            const formData = new FormData();
            formData.append('term', term);
            formData.append('explanation', explanation);
            action(formData)
        })
    }

    return (
        <>
            {message && (<div className="border border-red-800 bg-red-100 p-2 rounded mb-5">Something went wrong</div>)}
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between gap-10">
                    <div className="grow">
                        <div>
                            <h2>Terminology</h2>
                            <input
                                name="term"
                                onInput={(e: ChangeEvent<HTMLInputElement>) => setTerm(e.target.value)}
                                value={term}
                                className="border-solid border-stone-200 border-2 h-8 w-[100%] block p-2" />
                        </div>
                    </div>
                    <div className="grow">
                        <h2>Explanation</h2>
                        <textarea
                            name="explanation"
                            value={explanation}
                            onInput={(e: ChangeEvent<HTMLTextAreaElement>) => setExplanation(e.target.value)}
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
