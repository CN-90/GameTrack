import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function AddPlayersModal({ user, ladder }) {
    const [playersToAdd, setPlayersToAdd] = useState([]);
    const [error, setPlayerErorr] = useState("");
    const router = useRouter();

    const addPlayerToLadder = async (playerId: Number) => {
        if (!playersToAdd.length) {
            setPlayerErorr("Please select player(s) to add");
            return;
        }
        let addedPlayers = await axios.post(`/api/ladder/${ladder.id}/player/${playerId}`, { players: playersToAdd, ladderId: ladder.id });
    }

    const selectPlayersToAdd = (player) => {
        if (playersToAdd.find(newPlayer => newPlayer.id === player.id)) {
            setPlayersToAdd(prev => prev.filter(p => p.id !== player.id));
        } else {
            setPlayersToAdd(prev => [...prev, player]);
        }
    }

    const closeModal = () => {
        router.push(`/ladder/${ladder.id}`);
    }


    return (
        <div className="absolute w-full bg-23 rounded-xl p-5 z-10 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-1/2 ">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-white uppercase lg:text-4xl ">Add Player(s) to Ladder</h1>
                {/* <p onClick={() => closeModal()} className="text-gray-300">Close Modal</p> */}
            </div>
            <div className="p-5">
                <ul className="pb-5">
                    {user.players.filter(player => ladder.players.find(ladderPlayer => player.id === ladderPlayer.id) ? null : player).map(player => <PlayerItem key={player.id} player={player} selectPlayersToAdd={selectPlayersToAdd} />)}

                </ul>
            </div>
            <div className="flex gap-2">
                <button onClick={() => addPlayerToLadder(ladder.id)} className="bg-blue-500 text-white font-bold uppercase hover:bg-blue-700 p-2">Add Players</button>
                <button onClick={() => closeModal()} className="bg-red-500 text-white font-bold uppercase hover:bg-red-700 p-2">Cancel</button>
            </div>
        </div>
    )
}


function PlayerItem({player, selectPlayersToAdd}){
    const [isSelected, setIsSelected] = useState(false);

    const onClickHandler = (player) => {
        setIsSelected(!isSelected);
        selectPlayersToAdd(player);
    }

    return (
        <li className="text-4xl font-bold" onClick={() => onClickHandler(player)}>
            <h1 className={`${isSelected ? "green" : "text-gray-300"} cursor-pointer`}>{player.name}</h1>
        </li>
    )

}

export default AddPlayersModal;