import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react"


export default function Navbar() {
    // const { data: session, status } = useSession();
    const router = useRouter()
    if (router.pathname === "/login" || router.pathname === "/signup") {
        return null
    };



    return (
        <nav className="min-h-100 bg-21">
            <div className="flex align-center justify-between w-11/12 m-auto">
            <h1 className="text-4xl text-white py-5 h-100">
                <a href="/">ENIGMATICSPOON</a>
            </h1>
            <button onClick={signOut} className="text-xl text-white font-semibold uppercase">Sign Out</button>

            </div>
        </nav>
    )
}