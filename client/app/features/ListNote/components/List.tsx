'use client';

import React, {ChangeEvent} from "react";
import {RedButton} from "@/app/shared/UI/Buttons";
import {ListNoteItem} from "@/app/features/ListNote/types";
import {useAppDispatch} from "@/store/hooks";
import {deleteRow, updateLeft, updateRight} from "@/store/features/listNote/listNoteSlice";

type Props = {
    list: ListNoteItem[];
}

export const List = ({ list }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <ul>
            {list.map((item, index) => {
                const {left, right, id} = item;

                return (
                    <li className={`flex styles.multiple-note-line gap-5 mb-5 items-center`} key={id}>
                        <div>{index + 1})</div>
                        <div>
                            <input
                                type="text"
                                onInput={(e: ChangeEvent<HTMLInputElement>) => dispatch(updateLeft({ value: e.target.value, id }))}
                                value={left}
                                className="input-style w-[100%] min-w-60" />
                        </div>
                        <div>
                            <input
                                type="text"
                                onInput={(e: ChangeEvent<HTMLInputElement>) => dispatch(updateRight({ value: e.target.value, id }))}
                                value={right}
                                className="input-style w-[100%] min-w-60" />
                        </div>
                        {list.length > 1 ? (
                            <RedButton label="Delete" action={() => dispatch(deleteRow({ id }))} />
                        ) : null}

                    </li>
                )
            })}
        </ul>
    )
}
