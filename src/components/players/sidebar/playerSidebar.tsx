import axios from "axios";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PlayerSidebar({ players }) {
    const newPlayerName = useRef("");
    const [totalPlayers, setTotalPlayers] = useState(players);
    const [playerError, setPlayerError] = useState("");
    const [deletePlayerModal, setDeletePlayerModal] = useState({ player: { name: "", id: "" }, modalOpen: false });

    const createPlayer = async (e: any, playerName: string) => {
        e.preventDefault();
        if (!playerName) {
            setPlayerError("Please enter a player name");
            return;
        }

        if(totalPlayers.length >= 2) {
            setPlayerError("You can only have 2 players");
            return;
        }

        try {
            let res = await axios.post(`/api/player`, { name: playerName });
            addPlayer(res.data.player);
        } catch (error) {

        }
    }

    const deletePlayer = async () => {
        try {
            let res = await axios.delete(`/api/player/${deletePlayerModal.player.id}`);
            console.log(res);
            removePlayer(res.data.deletedPlayer.id);
        } catch (error) {
            console.log(error);
        }
        togglePlayerModal(false);
    }

    const addPlayer = (newPlayer) => {
        setTotalPlayers(prev => [...prev, newPlayer]);
    }

    const removePlayer = (playerId) => {
        setTotalPlayers(prev => prev.filter(player => player.id !== playerId));
    }


    const togglePlayerModal = (player) => {
        if (!player) {
            setDeletePlayerModal({ player: {}, modalOpen: false });
            return;
        };
        setDeletePlayerModal({ player, modalOpen: true });
    }



   

 
    return (
        <aside className="bg-29 top-100 right-0 m-w-fit min-h-screen sm:rounded-lg 2xl:w-1/4 2xl:rounded-none">
            {deletePlayerModal.modalOpen ? (<div  className="w-3/4 fixed top-100 text-center top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-23 text-white right-20 p-5 rounded-lg z-10  xl:w-1/3 2xl:w-1/4">
                {/* <Image src="/images/trash.svg" alt="trash" width={50} height={50} /> */}

                <p className="text-white text-lg">Are you sure you want to delete player {deletePlayerModal.player.name}? ALL matches across ALL games including this player will also be deleted.</p>
                <div className="pt-5">
                    <button onClick={() => deletePlayer()} className="bg-green-500 hover:bg-green-700 font-bold mr-2 w-1/3 text-white p-2">DELETE</button>
                    <button onClick={() => togglePlayerModal(false)} className="bg-red-500 hover:bg-red-700 font-bold w-1/3 text-white p-2">NO</button>

                </div>
            </div>) : null}
            <h1 className="text-white text-4xl uppercase px-5 pt-5">Players</h1>
            <form className="p-5">
                <fieldset>
                    <label className="text-white text-lg uppercase font-semibold" htmlFor="">New Player</label><br />
                    <div className="flex">
                        <input placeholder="PLAYER NAME" className="bg-white p-2 flex-auto font-semibold" ref={newPlayerName} type="text" /><br />
                        <button className="font-bold uppercase p-2 bg-blue-500" onClick={(e) => createPlayer(e, newPlayerName.current.value)}>Create</button><br />
                    </div>
                </fieldset>
                {playerError && <p className="text-red-300">{playerError}</p>}
            </form>

            <ul className="p-3">
                {totalPlayers.sort(player => player.playerWins - player.playerLosses).map((player) => (
                    <li className="player bg-23 text-white text-lg flex pl-2 rounded-lg mb-1 relative m-auto" key={player.id}>
                        <div className="player-img self-center h-14 rounded-full w-20 bg-neutral-700 " />
                        <span className="flex min-h-[56px] pl-2 justify-between items-center w-full">
                            <span>
                                <h1 className="hide-text text-white text-xl leading-none capitalize">{player.name}</h1>
                                <h2 className="text-zinc-500 text-md leading-none">{player.playerWins.length} Wins {player.playerLosses.length} Losses</h2>
                            </span>
                            <div onClick={() => togglePlayerModal(player)} className="trash-slide h-full flex justify-center items-center align-cente cursor-pointer">
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