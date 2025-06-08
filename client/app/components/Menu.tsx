import Link from "next/link";

export const Menu = () => {

    return (
        <ul className="flex justify-center gap-5">
            <li className="block p-2">
                <Link href="/" className="hover:text-green-800">Home</Link>
            </li>
            <li className="block p-2">
                <Link href="/add" className="hover:text-green-800">Add note</Link>
            </li>
            <li className="block p-2">
                <Link href="/settings" className="hover:text-green-800">Settings</Link>
            </li>
            <li className="block p-2">
                <Link href="/about" className="hover:text-green-800">About</Link>
            </li>
        </ul>
    )
}
