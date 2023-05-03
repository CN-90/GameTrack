function Groups({ groups }) {
    console.log(groups);
    return (
        <div>
            {groups.map(group => {
                return (
                    <div key={group.id}>
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Groups;