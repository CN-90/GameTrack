import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getSession, signOut, useSession } from "next-auth/react"
import ProtectRoute from '@/components/protect/Protect'
import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'



const inter = Inter({ subsets: ['latin'] })

export default function Home({ userId }) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, (url) => axios.get(url).then(res => res.data))
  if (isLoading) return <h1>Loading...</h1>

  
  const createTable = async (e) => {
    e.preventDefault();

    let res = await axios.post(`/api/ladder`, { title: "Magic The Gathering", userId: userId });
    console.log(res);
}


  console.log(data.user)
  return (
    <ProtectRoute>
      <div className={styles}>
        <h1>This is the homepage...</h1>
        {userId ? <button onClick={signOut}>Log Out</button> : <a href="/login">Log In</a>}
        <br></br>
        <h2>{data.user.username}</h2>
        <div>
          <h2>Create A Ladder</h2>
          <input type="text" />
          <button onClick={createTable} className="bg-blue-500 hover:bg-blue-700 p-2">Create Ladder</button>

        </div>
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