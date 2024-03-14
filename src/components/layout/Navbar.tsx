import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react"


export default function Navbar() {
    const { data: session, status } = useSession()




    return (
        <header className="min-h-100 bg-21">
            <div className="flex align-center justify-between w-11/12 m-auto">
            <h1 className="2xl:text-6xl text-2xl text-white py-5 h-100">
                <a href="/">GAMETRACK</a>
            </h1>
            {
                session ? <button onClick={signOut} className="text-xl text-white font-semibold uppercase">Sign Out</button> : null
            }
            

            </div>
        </header>
    )
}