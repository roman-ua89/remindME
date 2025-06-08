import { useParams } from "react-router";

export default function ViewSingleNote() {
    const { id } = useParams();

    return (
        <h1>View single note {id}</h1>
    )
}
