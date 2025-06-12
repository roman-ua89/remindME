
export default function EditListPage({params}: {params: {id: string}}) {
    const { id } = params;
    console.log('id', id)

    return (
        <>
            <h1>Edit list view {id}</h1>
        </>
    )
}
