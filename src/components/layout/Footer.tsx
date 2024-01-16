import { useRouter } from "next/router"

export default function Footer() {
    const router = useRouter()
    if (router.pathname === "/login" || router.pathname === "/signup") {
        return null
    };
    return (
        <footer>
            <p>© 2023</p>
        </footer>
    )
}