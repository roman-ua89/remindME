'use client'

import React from 'react'
import {Header} from "@/app/components/Header";
import {CircleProgress} from "@/app/components/UI/Circle-progress";
import {BlueButton} from "@/app/shared/UI/Buttons";
import { redirect } from "next/navigation";

export default function Home() {

    const handleStart = () => {
        redirect('/start/')
    }

    return (
        <div className="">
            <Header />
            <div className="pt-70 flex justify-center gap-8 mb-10">
                <CircleProgress />
                <CircleProgress />
                <CircleProgress />
            </div>
            <div className="flex justify-center">
                <BlueButton label="Start" action={handleStart} />
            </div>
        </div>
    )
}
