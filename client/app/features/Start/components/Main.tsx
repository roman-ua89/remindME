'use client';

import { getList } from "@/app/features/Start/actions";
import { useActionState, startTransition, useEffect } from "react";


export const Main = () => {
    const [formState, action, isPending] = useActionState(getList, undefined);

    useEffect(() => {
        startTransition(() => {
            action();
        })
    }, []);


    if (isPending) {
        return (<div>Pending...</div>)
    }

    return (
        <ul>
            {formState?.singleNotes?.map(item => {
                const { id, term, explanation } = item;
                return (
                    <dl key={id}>
                        <dt>{term}</dt>
                        <dd>{explanation}</dd>
                    </dl>
                )
            })}
        </ul>
    )
}
