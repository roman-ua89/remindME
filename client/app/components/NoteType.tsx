"use client";

import {BlueButton} from "@/app/shared/UI/Buttons";
import {createActionTypes} from "@/app/shared/types/types";
import {redirect} from "next/navigation";

export const NoteType = () => {

    const createAction = (type: createActionTypes) => {
        if (type === 'single_note') {
            redirect('/single/add/')
        } else if (type === 'list_note') {
            redirect('/list/add/')
        }
    }

    return (
        <ul className="flex gap-5">
            <li>
                <BlueButton action={() => createAction('single_note')} label="Single note" />
            </li>
            <li>
                <BlueButton action={() => createAction('list_note')} label="List note" />
            </li>
        </ul>
    )
}
