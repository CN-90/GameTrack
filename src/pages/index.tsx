import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getSession, signOut, useSession } from "next-auth/react"
import Router from 'next/router'
import RegisterForm from '@/components/auth/register/registerForm'


const inter = Inter({ subsets: ['latin'] })

export default function Home({loggedIn}) {
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //       Router.push('/login')
  //   },
  // })

  return (
    <main className={styles}>
    {loggedIn ? <button onClick={signOut}>Log Out</button> : <button>Log In</button>}
    <h1>Hello there</h1>
    <RegisterForm/>
    </main>
  )

}


export async function getServerSideProps(context){
  const session = await getSession(context);
  let loggedIn = false;
  if(session){
    loggedIn = true
  }
  return {
    props: {
      loggedIn
    }
  }
}