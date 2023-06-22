import { deleteGroup } from "@/actions/group";
import Link from 'next/link';


function Groups({ userGroups }) {
    if(userGroups.length === 0) return (<h1>You haven't created any groups yet.</h1>)

    async function onDeleteHandler(groupId) {
        let res = await deleteGroup(groupId);
        console.log(res);
    }

    return (
        <div>
            {userGroups.map(group => {
                return (
                    <div key={group.id}>
                        <Link href={`/group/${group.name}`}><h3>{group.name}</h3></Link>
                        <p>{group.description}</p>
                        <button onClick={() => onDeleteHandler(group.id)}>Delete Group</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Groups;