import { useRef } from 'react'
import { Inter } from 'next/font/google'
import { getSession, signOut } from "next-auth/react"
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'
import ProtectRoute from '@/components/protect/Protect'
import CreateLadder from '@/components/ladder/createLadder'
import PlayerSidebar from '@/components/players/playerSidebar'



const inter = Inter({ subsets: ['latin'] })

export default function Home({ userId }) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, (url) => axios.get(url).then(res => res.data))
  const newLadderName = useRef("");

  if (isLoading) return <h1>Loading...</h1>;


  return (
    <ProtectRoute>
      <section className="flex">
        <div className='m-auto w-11/12 pt-10'>
          <div className="h-200 bg-zinc-900 w-3/4 relative rounded-lg ">
            <h1 className="text-8xl text-white font-bold absolute t-150">YOUR GAMES</h1>
          </div>
          <CreateLadder userId={userId} players={data.user.players} />
          {/* <h2>Username: {data.user.username}</h2> */}

          <div>
            <ul className="p-5">
              {data.user.ladders.map((ladder) => (
                <Link key={ladder.id} href={`/ladder/${ladder.id}`}><li className="text-3xl font-semibold">{ladder.name}</li></Link>
              ))}
            </ul>
          </div>
        </div>
        <PlayerSidebar players={data.user.players} />

      </section>
    </ProtectRoute>
  )
}

export async function getServerSideProps(context: any) {
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