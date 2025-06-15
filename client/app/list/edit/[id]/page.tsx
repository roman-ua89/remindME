import {Header} from "@/app/components/Header";
import {Form} from "../../../features/ListNote";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditListPage(props: PageProps) {
    const { id } = await props.params;

    return (
        <>
            <Header />
            <Form id={id} />
        </>
    )
}
