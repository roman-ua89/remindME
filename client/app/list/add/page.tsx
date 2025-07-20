import React from 'react';
import {Header} from "@/app/components/Header";
import {Form} from "../../features/ListNote";

export default function List() {

    return (
        <>
            <Header />
            <h2 className="h2">List creating</h2>
            <Form />
        </>
    )
}
