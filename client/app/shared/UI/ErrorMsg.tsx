
export const ErrorMsg = ({msg}: { msg?:string }) => {

    return (
        <div>
            {msg && (<div className="border border-red-800 bg-red-100 p-2 rounded mb-5">{msg}</div>)}
        </div>

    )
}
