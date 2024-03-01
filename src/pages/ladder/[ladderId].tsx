import { useState } from "react";

import axios from "axios";
import Link from "next/link";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from 'next/navigation'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

import AddPlayersModal from "@/components/players/addPlayersModal/addPlayers";
import { getLadderById } from "../api/ladder/[ladderid]";
import { getUserById } from "../api/user/[uid]";


function LadderPage({ ladder, user }) {

    const router = useRouter();
    const { ladderId } = router.query;

    const [winner, setWinner] = useState({ id: "", player: { name: "" } });
    const [playerOne, setplayerOne] = useState({ id: "", player: { name: "" } });
    const [playerTwo, setplayerTwo] = useState({ id: "", player: { name: "" } });
    const [playersToAdd, setPlayersToAdd] = useState([]);

    const [players, setPlayers] = useState(user.players);
    const searchParams = useSearchParams();
    const pathname = usePathname()



    if (!ladder) {
        return <h1 className="text-4xl center">Ladder not found</h1>
    }

    const deleteLadder = async () => {
        let deletedTable = await axios.delete(`/api/ladder/${ladderId}`);
        console.log(deletedTable);
    }

    const createMatch = async () => {
        let loserId = playerOne.id === winner.id ? playerTwo.id : playerOne.id;
        let createdMatch = await axios.post(`/api/match`, { playerOne: playerOne.player, playerTwo: playerTwo.player, winnerId: winner.id, ladderId, loserId });
        console.log(createdMatch);
    }

    const deleteMatch = async (matchId: Number) => {
        let data = await axios.delete(`/api/match/${matchId}`);
    }

    const selectPlayer = (setPlayerFn: Function, playerId: Number) => {
        setPlayerFn(playerId);
    }


    const addPlayerToLadder = async (playerId: Number) => {
        if (!playersToAdd.length) return;
        let addedPlayers = await axios.post(`/api/ladder/${ladderId}/player/${playerId}`, { players: playersToAdd, ladderId });
        // console.log(playersToAdd)
    }

    const deletePlayerFromLadder = async (record, ladder) => {
        let deletedPlayer = await axios.delete(`/api/ladder/${ladderId}/player/${record.playerId}`);
    }

    const selectPlayersToAdd = (player) => {
        if (playersToAdd.find(newPlayer => newPlayer.id === player.id)) {
            setPlayersToAdd(prev => prev.filter(p => p.id !== player.id));
        } else {
            setPlayersToAdd(prev => [...prev, player]);
        }
    }


    return (
        <section className="w-full m-auto pt-10">
            {searchParams.get("players") ? <AddPlayersModal user={user} ladder={ladder} /> : null}
            <div>
                <div>
                    <div className="flex gap-2 justify-between">
                        <div>
                            <h1 className="text-8xl font-bold leading-none">{ladder.name}</h1>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link href={`${pathname}/?players=true`} className="p-5 px-10 bg-zinc-400 font-bold uppercase rounded-lg">
                                <FontAwesomeIcon icon={faUser} className="text-2xl pr-2" />
                                Add Players
                            </Link>
                            <button className="p-2 bg-zinc-400 font-bold uppercase rounded-lg">Create Match</button>
                        </div>
                    </div>
                    <div className="relative bottom-5">
                        <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">{ladder.records.length} players</h3>
                        <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">{ladder.matches.length} Matches Played</h3>

                    </div>
                </div>

                <ol className="flex flex-col gap-3 pt-10 px-5 w-1/2">
                    {ladder.records.length === 0 && <h1 className="text-4xl font-bold">No players in ladder</h1>}
                    {ladder.records.map((record) => <li className="flex justify-between gap-2" key={record.player.id}>
                        <div className="flex items-center gap-2">
                            <div>
                                <div className="w-14 h-14 rounded-full bg-zinc-500"></div>
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold leading-none">{record.player.name}</h2>
                                <div className="flex gap-2 text-2xl leading-none">
                                    <h3 className="text-2xl leading-4 text-zinc-400" >{record.wins.length} Wins</h3>
                                    <h3 className="text-2xl leading-4 text-zinc-400">{record.losses.length} Losses</h3>

                                </div>
                            </div>
                        </div>
                        <div onClick={() => deletePlayerFromLadder(record, ladder)} className="h-full flex justify-center items-center bg-zinc-300 align-center cursor-pointer">
                            <FontAwesomeIcon icon={faTrash} className="text-white text-4xl" />
                        </div>
                    </li>)}
                </ol>
                {/* <button onClick={() => createMatch(18, 16, 16, 18)} className="pt-5">Create Match</button> */}
            </div>

            <div className="pt-5">
                <h1 className="uppercase text-4xl font-bold pb-2">Recent Matches</h1>
                {ladder.matches.map((match) => <h1 className="uppercase font-bold" onClick={() => deleteMatch(match.id)} key={match.id}>{match.winner.playerName} vs {match.loser.playerName}</h1>)}
                <div className="pt-10 flex gap-20">
                    <div>
                        <div className="border-4">
                            <h1>{playerOne.id}</h1>
                        </div>
                        <h1 className="uppercase text-4xl text-bold">Select Player One</h1>

                        {ladder.records.map(record => {
                            if (record.id === playerOne.id || record.id === playerTwo.id) return;
                            return <h1 onClick={() => selectPlayer(setplayerOne, record)} className="text-2xl" key={record.id}>{record.player.name}</h1>
                        })}
                    </div>
                    <div>
                        <div className="border-4">
                            <h1>{playerTwo.id}</h1>
                        </div>
                        <h1 className="uppercase text-4xl text-bold">Select Player Two</h1>
                        {ladder.records.map(record => {
                            if (record.id === playerOne.id || record.id === playerTwo.id) return;
                            return <h1 onClick={() => selectPlayer(setplayerTwo, record)} className="text-2xl" key={record.id}>{record.player.name}</h1>
                        })}
                    </div>
                </div>
                {playerOne && playerTwo && <div>
                    <h1>Select Winner</h1>
                    <h1 onClick={() => setWinner(playerOne)}>{playerOne.player.name}</h1>
                    <h1 onClick={() => setWinner(playerTwo)}>{playerTwo.player.name}</h1>
                    <span>Winner is {winner.player.name}</span>
                </div>}
                <button onClick={createMatch}>Create Match</button><br></br>
            </div>

            <button onClick={deleteLadder} className="pt-5">Delete Ladder</button>
        </section >
    )
}


export default LadderPage;



export async function getServerSideProps(context) {
    let token = await getToken({ req: context.req });
    const { userID, email } = token;

    const ladder = await getLadderById(context.query.ladderId, userID);
    const user = await getUserById(userID);

    return {
        props: {
            ladder,
            user: user


        }
    }
}