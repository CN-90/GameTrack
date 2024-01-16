import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getSession, signOut, useSession } from "next-auth/react"
import ProtectRoute from '@/components/protect/Protect'
import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import { useRef } from 'react'
import CreateLadder from '@/components/ladder/createLadder'



const inter = Inter({ subsets: ['latin'] })

export default function Home({ userId }) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, (url) => axios.get(url).then(res => res.data))
  const newLadderName = useRef("");
  
  
  if (isLoading) return <h1>Loading...</h1>;



  return (
    <ProtectRoute>
      <div className={styles}>
        <h1>This is the homepage...</h1>
        {userId ? <button onClick={signOut}>Log Out</button> : <a href="/login">Log In</a>}
        <br></br>
        <h2>Username: {data.user.username}</h2>



        <CreateLadder userId={userId} />
        <div>
          <h2 className="text-7xl">Game Tables</h2>
          <li>
            {data.user.ladders.map((ladder) => (
              <Link href={`/ladder/${ladder.id}`}><li>{ladder.name}</li></Link>
            ))}
          </li>
        </div>

      </div>
    </ProtectRoute>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = null;

  if (session) {
    userId = session.user.id;
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId
    }
  }
}