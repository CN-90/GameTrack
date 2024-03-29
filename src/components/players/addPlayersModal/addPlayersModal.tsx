import { Player } from "@/interfaces";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function AddPlayersModal({ user, ladder }: any) {
    const [playersToAdd, setPlayersToAdd] = useState<any>([])
    const [error, setPlayerErorr] = useState("");
    const router = useRouter();

    const addPlayerToLadder = async (playerId: Number) => {
        if (!playersToAdd.length) {
            setPlayerErorr("Please select player(s) to add");
            return;
        }
        try {
            let addedPlayers = await axios.post(`/api/ladder/${ladder.id}/player/${playerId}`, { players: playersToAdd, ladderId: ladder.id });
            router.replace(`/ladder/${ladder.id}`, undefined, { scroll: false })
        } catch (error) {
            setPlayerErorr("Whoops... Something went wrong, please try again");

        }

    }

    const selectPlayersToAdd = (newPlayer: { id: string }) => {
        if (playersToAdd.find((player:Player) => player.id === newPlayer.id)) {
            setPlayersToAdd((prev: any) => prev.filter((p:any) => p.id !== newPlayer.id));
        } else {
            setPlayersToAdd((prev: any) => [...prev, newPlayer]);
        }
    }

    const closeModal = () => {
        router.push(`/ladder/${ladder.id}`, undefined, { scroll: false });
    }

    // filter out what players are already in the ladder
    const playersAvailableToAdd = user.players.filter((player: Player) => ladder.players.find((ladderPlayer: Player) => player.id === ladderPlayer.id) ? null : player);

    return (
        <aside className="absolute w-full bg-23 rounded-xl p-5 z-10 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-1/2 2xl:top-1/2 ">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-white uppercase lg:text-4xl pb-4">Add Player(s) to Ladder</h1>
                {error && <p className="text-red-500">{error}</p>}
                {/* <p onClick={() => closeModal()} className="text-gray-300">Close Modal</p> */}
            </div>
            <div>
                <ul className="pb-5">
                    {playersAvailableToAdd.length > 0 ? playersAvailableToAdd.map((player: Player) => <PlayerItem key={player.id} player={player} selectPlayersToAdd={selectPlayersToAdd} />) : <h1 className="text-white">No players available to add</h1>}
                </ul>
            </div>
            <div className="flex gap-2">
                <button onClick={() => addPlayerToLadder(ladder.id)} className="bg-green-500  hover:bg-green-700 rounded-lg  font-bold uppercase hover:bg-blue-700 p-2">Add Players</button>
                <button onClick={() => closeModal()} className="bg-red-500 rounded-lg text-white font-bold uppercase hover:bg-red-700 p-2">Cancel</button>
            </div>
        </aside>
    )
}


function PlayerItem({ player, selectPlayersToAdd }: any) {
    const [isSelected, setIsSelected] = useState(false);

    const onClickHandler = (player: Player) => {
        setIsSelected(!isSelected);
        selectPlayersToAdd(player);
    }

    return (
        <li className={`${isSelected ? "bg-green-500 " : "bg-29 "} py-4 hover:bg-blue-500 cursor-pointer w-full h-16text-white font-semibold text-2xl text-lg flex pl-2 rounded-lg mb-1 relative bg-black items-center`} onClick={() => onClickHandler(player)}>
            <h1 className="cursor-pointer text-white text-2xl">{player.name}</h1>
        </li>
    )

}

export default AddPlayersModal;