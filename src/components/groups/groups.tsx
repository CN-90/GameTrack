import { deleteGroup } from "@/actions/group";

function Groups({ groups }) {
    if(groups.length === 0) return (<h1>You haven't joined any groups yet.</h1>)

    async function onDeleteHandler(groupId) {
        let res = await deleteGroup(groupId);
        console.log(res);
    }
    return (
        <div>
            {groups.map(group => {
                return (
                    <div key={group.id}>
                        <h3>{group.name}</h3>
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