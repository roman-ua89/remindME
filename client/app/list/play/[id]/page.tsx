import {Header} from "@/app/components/Header";
import {ActionButton} from "@/app/shared/UI/Buttons";
import {PlayProgressBar} from "@/app/shared/UI/PlayProgressBar";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Play(props: PageProps) {
    const {id} = await props.params;

    return (
        <>
            <Header />
            <h1 className="h1">Play List {id}</h1>
            <div className="border-5 border-gray-100 rounded-2xl p-4 flex justify-between gap-4 mb-5 items-center">
                <ActionButton label="Prev" />
                <dl className="flex justify-between gap-4 grow">
                    <dt className="bg-gray-50 p-4 w-60">some term</dt>
                    <dd className="bg-gray-50 p-4 grow">term explanation term explanation term explanation term explanation term explanation </dd>
                </dl>
                <ActionButton label="Next" />
            </div>
            <div>
                <PlayProgressBar percentage={30} />
            </div>
        </>

    )
}
