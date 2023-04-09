import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession } from "next-auth/react"
import Router from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //       Router.push('/login')
  //   },
  // })

  return (
    <main className={styles}>
    <h1>Hello there</h1>
    </main>
  )
}
