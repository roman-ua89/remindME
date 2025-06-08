import React, {ChangeEvent} from "react";
import {RedButton} from "@/app/shared/UI/Buttons";
import {Side} from "@/app/features/AddListNote/hooks";
import {ListNoteItem} from "@/app/features/AddListNote/types";

type Props = {
    updateInputValue: ({ value, id, side }: { value: string, id: number, side: Side }) => void;
    removeRow: (id: ListNoteItem["id"]) => void;
    state: ListNoteItem[];
}

export const List = ({ updateInputValue, removeRow, state }: Props) => {

    return (
        <ul>
            {state.map((item, index) => {
                const {left, right, id} = item;

                return (
                    <li className={`flex styles.multiple-note-line gap-5 mb-5`} key={id}>
                        <div>{index + 1})</div>
                        <div>
                            <input
                                type="text"
                                onInput={(e: ChangeEvent<HTMLInputElement>) => updateInputValue({ value: e.target.value, id, side: 'left' })}
                                value={left}
                                className="border-solid border-stone-200 border-2 h-8 w-[100%] block p-2" />
                        </div>
                        <div>
                            <input
                                type="text"
                                onInput={(e: ChangeEvent<HTMLInputElement>) => updateInputValue({ value: e.target.value, id, side: 'right' })}
                                value={right}
                                className="border-solid border-stone-200 border-2 h-8 w-[100%] block p-2" />
                        </div>
                        {state.length > 1 ? (
                            <RedButton label="Delete" action={() => removeRow(id)} />
                        ) : null}

                    </li>
                )
            })}
        </ul>
    )
}
