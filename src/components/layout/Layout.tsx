import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSession } from "next-auth/react"


export default function Layout({ children }) {

    return (
        <main>
            <Navbar />
                {children}
            <Footer />

        </main>
    )
}



