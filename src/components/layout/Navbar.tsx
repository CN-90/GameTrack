import { useSession } from "next-auth/react"
import styles from './Navbar.module.css'

export default function Navbar(){
    // const { data: session, status } = useSession();

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