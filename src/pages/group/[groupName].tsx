import { getToken } from "next-auth/jwt"
import prisma from '../../../prisma/prisma';


function GroupPage({ group, admins }) {
    if (!group.length) {
        return <h1>Group not found</h1>
    }
    const { name, description, admin, members } = group[0];
    console.log(members)

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

    let admins = []
    for(let i = 0; i < group[0].admin.length; i++) {
        admins.push(group[0].admin[i].userId);
    }
    

    return {
        props: {
            group: JSON.parse(JSON.stringify(group)),
            admins
        }
    }
}
export default GroupPage;

