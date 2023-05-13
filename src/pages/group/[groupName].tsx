import { getToken } from "next-auth/jwt"
import { useRef } from "react";
import prisma from '../../../prisma/prisma';
import axios from "axios";


function GroupPage({ group, userID }) {
    const username = useRef('');

    if (!group.length) {
        return <h1>Group not found</h1>
    }
    const { name, description, admin, members, id } = group[0];

    // Allows Admin to invite a user to group.
    const sendGroupInvite = async (username) => {
        let res = await axios.post(`/api/group/invitation/${username}`, { username: username.current.value, groupId: id, adminId: userID });
        console.log(res);
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
                {/* {members.map((member) => {
                    if(member){}
                }} */}
            </div>

            <div>
                <h3>Invite a friend</h3>
                <input type="text" ref={username} />
                <button onClick={() => sendGroupInvite(username)}>Invite</button>
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

