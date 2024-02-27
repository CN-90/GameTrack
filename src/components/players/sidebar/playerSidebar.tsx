import axios from "axios";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function PlayerSidebar({ players }) {
    const newPlayerName = useRef("");
    const [playerError, setPlayerError] = useState("");
    const [deletePlayerModal, setDeletePlayerModal] = useState(false);

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

    const deletePlayer = async (e, playerId: string) => {
        // console.log(e.target.offsetTop);
        if (!deletePlayerModal) {
            setDeletePlayerModal(true);
            return;
        }
        
        try {
            let data = await axios.delete(`/api/player/${playerId}`);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <aside className="bg-37 w-1/5 fixed h-full right-0">
            { deletePlayerModal ? (<div className="w-full absolute bg-23 text-white right-20 p-5 rounded-lg z-10">
                <Image src="/images/trash.svg" alt="trash" width={50} height={50} />

                <p className="text-white text-lg">Are you sure you want to delete this player? ALL matches across ALL games where this player participated will also be deleted.</p>
                <div className="pt-5">
                    <button onClick={() => setDeletePlayerMessage(false)} className="bg-green-500 hover:bg-green-700 mr-2 w-1/3 text-white p-2">DELETE</button>
                    <button onClick={() => setDeletePlayerMessage(true)} className="bg-red-500 hover:bg-red-700  w-1/3 text-white p-2">No</button>
                    <div className="pt-4">
                        <input type="checkbox" id="deleteWarning" name="deleteWarning" value="Bike" />
                        <label className="text-white pl-2" for="deleteWarning">Don't Show Message Again.</label><br></br>

                    </div>

                </div>
            </div>) : null}
            <h1 className="text-white text-4xl uppercase px-5 pt-5">Players</h1>
            <form className="p-5">
                <fieldset>
                    <label className="text-white text-lg uppercase font-semibold" htmlFor="">New Player</label><br />
                    <div className="flex">
                        <input placeholder="PLAYER NAME" className="bg-white p-2 flex-auto" ref={newPlayerName} type="text" /><br />
                        <button className="text-white p-2 bg-zinc-800" onClick={(e) => createPlayer(e, newPlayerName.current.value)}>Create Player</button><br />
                    </div>
                </fieldset>
                {playerError && <p className="text-red-300">{playerError}</p>}
            </form>

            <ul className="pt-5">
                {players.map((player) => (
                    <li className="player text-white text-lg flex pl-2 rounded-lg mb-1 relative m-auto" key={player.id}>
                        <div className="player-img self-center h-14 rounded-full w-20 bg-neutral-700 " />
                        <span className="pl-4 flex min-h-[56px] justify-between items-center w-full">
                            <span>
                                <h1 className="text-white text-2xl leading-none capitalize">{player.name.length > 15 ? player.name.substring(0, 15) + "..." : player.name}</h1>
                                <h2 className="text-zinc-500 leading-none">0 Wins 0 Losses</h2>
                            </span>
                            <div onClick={(e) => deletePlayer(e, player.id)} className="trash-slide h-full flex justify-center items-center align-cente cursor-pointer">
                                <FontAwesomeIcon icon={faTrash} className="text-4xl" />
                            </div>
                        </span>

                    </li>
                ))}
            </ul>
        </aside>

    )
}


export default PlayerSidebar;