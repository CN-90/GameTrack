import axios from "axios";
import { useRef, useState } from "react";

function PlayerSidebar({ players }) {
    const newPlayerName = useRef("");
    const [playerError, setPlayerError] = useState("");

    const createPlayer = async (playerName: string) => {
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
            <h1 className="text-white text-4xl uppercase p-5">Players</h1>
            <form>
                <label className="text-white text-lg uppercase font-semibold" htmlFor="">New Player</label><br />
                <input className="bg-white" ref={newPlayerName} type="text" /><br />
                <button onClick={() => createPlayer(newPlayerName.current.value)}>Create Player</button><br />
            </form>
            {playerError && <p className="text-red-300">{playerError}</p>}
            <ul className="pt-1">
                {players.map((player) => (
                    <li className="text-white text-lg flex flex-col pb-5 relative" key={player.id}>
                        <div className=" player-img h-14 rounded-full w-14 bg-neutral-700 absolute" />
                        <span className="pl-10 flex flex-col min-h-[56px]">
                            <h1 onClick={() => deletePlayer(player.id)} className="text-white text-2xl leading-none capitalize">{player.name}</h1>
                            <h2 className="text-zinc-500 leading-none">0 Wins 0 Losses</h2>
                        </span>

                    </li>
                ))}
            </ul>
        </aside>

    )
}


export default PlayerSidebar;