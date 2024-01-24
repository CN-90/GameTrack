import axios from "axios";
import { useRef, useState } from "react";

function createLadder({userId, players}){
    const ladderName = useRef("");
    
    const createTable = async (e) => {
        e.preventDefault();
        let res = await axios.post(`/api/ladder`, { title: ladderName.current.value, players, userId });
    }

    return(
        <div>
        <h2>Create A Ladder</h2>
        <input ref={ladderName} type="text" />
        <button onClick={createTable} className="bg-blue-500 hover:bg-blue-700 p-2">Create Ladder</button>
      </div>
    )

}

export default createLadder;