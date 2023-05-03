import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getSession, signOut, useSession } from "next-auth/react"
import RegisterForm from '@/components/auth/register/registerForm'
import ProtectRoute from '@/components/protect/Protect'
import useSWR from 'swr'
import axios from 'axios'
import { setUser } from '@/hooks/user'
import Groups from '@/components/groups/groups'



const inter = Inter({ subsets: ['latin'] })

export default function Home({ userId }) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, (url) => axios.get(url).then(res => res.data))

  if (isLoading) return <h1>Loading...</h1>

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post('/api/group', { name: 'test', description: "A group for gentlemen who want to have a good time..." });
    console.log(res.data);

  }

  return (
    <ProtectRoute>
      <main className={styles}>
        {userId ? <button onClick={signOut}>Log Out</button> : <a href="/login">Log In</a>}
        <br></br>
        <button onClick={handleSubmit}>Testing</button>
        <h2>{data.user.username}</h2>
        <RegisterForm />
        <Groups groups={data.user.groups}/>
      </main>
    </ProtectRoute>
  )

}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = null;

  if (session) {
    userId = session.user.id;
  }
  
  return {
    props: {
      userId
    }
  }
}