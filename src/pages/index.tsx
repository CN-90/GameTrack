import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getSession, signOut, useSession } from "next-auth/react"
import ProtectRoute from '@/components/protect/Protect'
import useSWR from 'swr'
import axios from 'axios'
import Groups from '@/components/groups/Groups'



const inter = Inter({ subsets: ['latin'] })

export default function Home({ userId }) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, (url) => axios.get(url).then(res => res.data))
  if (isLoading) return <h1>Loading...</h1>

  const handleSubmit = async (e: Event) => {

    e.preventDefault();

    let res = await axios.post('/api/group',
      {
        name: 'The Gentlemens Leagues',
        description: "A group for gentlemen who want to have a good time..."
      });
  }

  const acceptInvitation = async (e: Event) => { 
    console.log("This is running my dawg...")
    let res = await axios.post(`/api/group/The Gentlemens Leagues/member/${userId}`,
      {
        groupId: 'The Gentlemens Leagues',
        userId: userId
      });
      console.log(res);

  }



  return (
    <ProtectRoute>
      <div className={styles}>
        <h1>This is the homepage...</h1>
        {userId ? <button onClick={signOut}>Log Out</button> : <a href="/login">Log In</a>}
        <br></br>
        <button onClick={handleSubmit}>Create Group</button>
        <h2>{data.user.username}</h2>
        <Groups userGroups={data.user.groups} />
        <br></br>
        <br></br>
        <h3>Inbox</h3>
        {data.user.invitations.length ? data.user.invitations.map(invite => {
          return <p onClick={acceptInvitation}>{invite.id}</p>
        }) : <p>Your inbox is empty</p>}

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