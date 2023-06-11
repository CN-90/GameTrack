import { getToken } from "next-auth/jwt"
import { useRef, useState } from "react";
import prisma from '../../../prisma/prisma';
import axios from "axios";


function GroupPage({ group, userID }) {
    const username = useRef('');
    const [game, setGame] = useState('');

    if (!group.length) {
        return <h1>Group not found</h1>
    }
    const { name, description, admin, members, id } = group[0];

    // Allows Admin to invite a user to group.
    const sendGroupInvite = async (username) => {
        let res = await axios.post(`/api/invitation`, { username: username.current.value, groupId: id, adminId: userID });
        console.log(res);
    }

    // Remove memver from group
    const removeMemberFromGroup = async (groupId: number, userId: number) => {
        let res = await axios.delete(`/api/group/${groupId}/member/${userId}`);
        console.log(res);
    }

    // Create a table for a game
    const createTable = async (e) => {
        e.preventDefault();
        let res = await axios.post(`/api/table`, { groupId: id, game});
        console.log(res);
    }

    const handleChange = (e) => {
        setGame(e.target.value);
    }


    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <div>
                <h2>Admins</h2>
                {admin.map((admin) => <h1 key={admin.id}>{admin.user.username}</h1>)}
            </div>

            <div>
                <h2>Members:</h2>
               {members.map((member) => <h1 key={member.id}>{member.username}</h1>)}
            </div>

            <div>
                <h3>Invite a friend</h3>
                <input type="text" ref={username} />
                <button onClick={() => sendGroupInvite(username)}>Invite</button>
            </div>
            <div className="mt-5">
                <h3 onClick={() => removeMemberFromGroup(id, userID)}>Leave Group</h3>
            </div>

            <div style={{"padding":"100px 0px"}}>
                <h2 className='pb-5'>Create Table for Game</h2>
                <form onSubmit={createTable} action="">
                    <label htmlFor="">Game</label>
                    <input onChange={handleChange} className="mb-5" type="text" name="game" value={game}  /><br />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Table</button>
                </form>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    let token = await getToken({ req: context.req });
    const { userID, email } = token;

    const group = await prisma.group.findMany({
        where: {
            name: {
                equals: context.params.groupName,
                mode: 'insensitive', // Default value: default
            }

        },
        include: {
            members: {
                select: {
                    username: true,
                    image: true,
                    id: true
                }
            },
            admin: {
                include: {
                    user: {
                        select: {
                            username: true,
                            image: true
                        }
                    }

                }
            }
        },
    })


    return {
        props: {
            group: JSON.parse(JSON.stringify(group)),
            userID: userID,
        }
    }
}
export default GroupPage;

