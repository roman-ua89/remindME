'use client';

import {BlueButton, GreenButton, RedButton} from "@/app/shared/UI/Buttons";
import {redirect} from "next/navigation";

export const Play = ({id}: {id:string}) => {

    const closeHandler = () => {
        redirect('/');
    }

    const editHandler = (id: string) => {
        redirect(`/single/edit/${id}`);
    }

    return (
        <div>
            <div className="flex justify-end mb-5 gap-4">
                <BlueButton label="Edit" action={() => editHandler(id)} />
                <RedButton label="close" action={closeHandler} />
            </div>
            <div className="border-5 border-gray-100 rounded-2xl p-4 flex justify-between gap-4 mb-5">
                <div className="bg-gray-50 p-4 w-2/3">Some term</div>
                <div className="bg-gray-50 p-4">Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text </div>
            </div>
            <div className="flex justify-between">
                <GreenButton label="Aknowledged" />
                <GreenButton label="Aknowledge and go next" />
            </div>
        </div>
    )
}
