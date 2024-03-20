import axios from "axios";
import { useRef, useState } from "react";

function CreateLadder({ userId, players }) {
    const ladderName = useRef("");

    const createTable = async (e) => {
        e.preventDefault();
        let res = await axios.post(`/api/ladder`, { title: ladderName.current.value, players, userId });
    }

    return (
        <form className="pt-10 text-right pb-8 flex">
            <fieldset className="w-full">
                <label className="hidden" htmlFor="createGame">Game Name</label>
                <input id="createGame" name="gameName" className="w-full p-2 bg-zinc-400 text-white placeholder-gray-300 placeholder-bold focus:outline-none" ref={ladderName} type="text" placeholder="GAME TO TRACK" />
            </fieldset>

            <button onClick={createTable} className="bg-blue-500 min-w-fit font-bold uppercase hover:bg-blue-700 p-2">Add Game</button>
        </form>
    )

}

export default CreateLadder;