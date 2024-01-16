import { useSession } from "next-auth/react"
import styles from './Navbar.module.css'
import { useRouter } from "next/router";

export default function Navbar() {
    // const { data: session, status } = useSession();
    const router = useRouter()
    if (router.pathname === "/login" || router.pathname === "/signup") {
        return null
    };



    return (
        <nav className={styles.navbar}>
            <h1 className={styles.brand}>
                ENIGMATICSPOON
            </h1>
            <ul className={styles.navlinks}>
            </ul>
        </nav>
    )
}