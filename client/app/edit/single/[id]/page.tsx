import {Header} from "@/app/components/Header";
import {Form} from "@/app/features/AddSingleNote";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditSinglePage(props: PageProps) {
    const { id } = await props.params;

    return (
        <>
            <Header />
            <h1 className="h1">Edit single item with id: {id}</h1>
            <Form id={id} />
        </>
    )
}
