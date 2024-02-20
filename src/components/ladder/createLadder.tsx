import axios from "axios";
import { useRef, useState } from "react";

function createLadder({ userId, players }) {
    const ladderName = useRef("");

    const createTable = async (e) => {
        e.preventDefault();
        let res = await axios.post(`/api/ladder`, { title: ladderName.current.value, players, userId });
    }

    return (
        <div class="pt-10">
            <input className="w-1/4 p-2 bg-zinc-400 text-white placeholder-gray-300 placeholder-bold focus:outline-none" ref={ladderName} type="text" placeholder="Create Ladder" />
            <button onClick={createTable} className="bg-blue-500 font-bold uppercase hover:bg-blue-700 p-2">Create Ladder</button>
        </div>
    )

}

export default createLadder;