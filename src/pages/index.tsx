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

  const acceptInvitation = async (groupId: String, invitationId: String) => {
    try {

      await axios.post(`/api/group/${groupId}/member/${userId}`,
        {
          groupId: 'The Gentlemens Leagues',
          userId: userId
        });
      await axios.delete(`/api/invitation/${invitationId}`);

    } catch (error) {
      console.log(error);
    }
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
          return <p onClick={e => acceptInvitation(invite.group.id, invite.id)}>{`You have been invited to ${invite.group.name}`}</p>
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