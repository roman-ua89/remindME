import {Header} from "@/app/components/Header";
import { Play } from "@/app/features/PlayList";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PlayListPage(props: PageProps) {
    const {id} = await props.params;

    return (
        <>
            <Header />
            <Play id={id} />
        </>

    )
}
