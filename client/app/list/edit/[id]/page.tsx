import {Header} from "@/app/components/Header";
import {Form} from "@/app/features/AddListNote";

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
            <h1>Edit list view {id}</h1>
            <Form id={id} />
        </>
    )
}
