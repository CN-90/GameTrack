import { getSession } from "next-auth/react"
import Link from 'next/link'
import CreateLadder from '@/components/ladder/createLadder'
import PlayerSidebar from '@/components/players/sidebar/playerSidebar'
import { getUserById } from './api/user/[uid]'
import { Ladder, User } from '@/interfaces'


interface Props {
  user: User
}

export default function Home({ user }: Props) {

  return (
      <section className="pt-6  flex flex-col w-full m-auto 2xl:flex-row 2xl:w-full 2xl:p-0 sm:w-11/12">
        <div className='min-h-full 2xl:w-full p-4  2xl:p-10'>
          <div className="h-200 bg-zinc-900 relative rounded-lg ">
            <h1 className="text-6xl bottom-0 text-white font-bold absolute sm:text-7xl md:text-8xl">YOUR GAMES</h1>
          </div>
          <CreateLadder userId={user.id} players={user.players} />

          <div className="pb-10">
            <ul className="p-2">
              {user.ladders.length > 0 ? user.ladders.map((ladder: Ladder) => (
                <Link key={ladder.id} href={`/ladder/${ladder.id}`}><li className="text-3xl font-semibold">{ladder.name}</li></Link>
              )): <h1 className="text-3xl uppercase font-semibold">No Games Found</h1>}
            </ul>
          </div>
        </div>
        <PlayerSidebar players={user.players} />

      </section>
  )
}

export async function getServerSideProps(context: any) {
  const session:any = await getSession(context);
  let userId = null;
  let user = null;
  
  if (session) {
    userId = session.user.id;
    user = await getUserById(userId);
    
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
      user
    }
  }
}