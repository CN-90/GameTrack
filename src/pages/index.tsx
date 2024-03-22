import { useRef } from 'react'
import { Inter } from 'next/font/google'
import { getSession, signOut } from "next-auth/react"
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'
import ProtectRoute from '@/components/protect/Protect'
import CreateLadder from '@/components/ladder/createLadder'
import PlayerSidebar from '@/components/players/sidebar/playerSidebar'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ userId }) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, (url) => axios.get(url).then(res => res.data))

  if (isLoading) return <h1>Loading...</h1>;

  return (
      <section className="pt-6  flex flex-col w-full m-auto 2xl:flex-row 2xl:w-full 2xl:p-0 sm:w-11/12">
        <div className='min-h-full 2xl:w-full p-4  2xl:p-10'>
          <div className="h-200 bg-zinc-900 relative rounded-lg ">
            <h1 className="text-6xl bottom-0 text-white font-bold absolute sm:text-7xl md:text-8xl">YOUR GAMES</h1>
          </div>
          <CreateLadder userId={userId} players={data.user.players} />

          <div className="pb-10">
            <ul className="p-2">
              {data.user.ladders.length > 0 ? data.user.ladders.map((ladder) => (
                <Link key={ladder.id} href={`/ladder/${ladder.id}`}><li className="text-3xl font-semibold">{ladder.name}</li></Link>
              )): <h1 className="text-3xl uppercase font-semibold">No Games Found</h1>}
            </ul>
          </div>
        </div>
        <PlayerSidebar players={data.user.players} />

      </section>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  let userId = null;
  let user = null;
  
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