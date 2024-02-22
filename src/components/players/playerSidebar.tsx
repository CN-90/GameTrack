import axios from "axios";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PlayerSidebar({ players }) {
    const newPlayerName = useRef("");
    const [playerError, setPlayerError] = useState("");

    const createPlayer = async (e, playerName: string) => {
        e.preventDefault();
        if (!playerName) {
            setPlayerError("Please enter a player name");
            return;
        } try {
            let data = await axios.post(`/api/player`, { name: playerName });
            console.log(data);
        } catch (error) {

        }
    }

    const deletePlayer = async (playerId: string) => {
        try {
            let data = await axios.delete(`/api/player/${playerId}`);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <aside className="bg-37 w-1/5 fixed h-full right-0">
            <h1 className="text-white text-4xl uppercase px-5 pt-5">Players</h1>
            <form className="p-5">
                <label className="text-white text-lg uppercase font-semibold" htmlFor="">New Player</label><br />
                <div className="flex">
                    <input className="bg-white" ref={newPlayerName} type="text" /><br />
                    <button className="text-white p-2 bg-zinc-800" onClick={(e) => createPlayer(e, newPlayerName.current.value)}>Create Player</button><br />

                </div>
            {playerError && <p className="text-red-300">{playerError}</p>}
            </form>
            <ul className="pt-1">
                {players.map((player) => (
                    <li className="player text-white text-lg flex pb-5 relative w-full" key={player.id}>
                        <div className="player-img h-14 rounded-full w-14 bg-neutral-700 absolute" />
                        <span className="pl-10 flex min-h-[56px] justify-between w-full">
                            <span>
                                <h1 className="text-white text-2xl leading-none capitalize">{player.name.length > 15 ? player.name.substring(0,15) + "..." : player.name}</h1>
                                <h2 className="text-zinc-500 leading-none">0 Wins 0 Losses</h2>
                            </span>
                            <div onClick={() => deletePlayer(player.id)} className="trash-slide h-full flex justify-center items-center bg-zinc-300 align-cente cursor-pointer">
                                <FontAwesomeIcon icon={faTrash} className="text-white text-4xl" />
                            </div>
                        </span>

                    </li>
                ))}
            </ul>
        </aside>

    )
}


export default PlayerSidebar;