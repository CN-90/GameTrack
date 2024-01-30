import { createPlayer } from "@/actions/players";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import prisma from "../../../prisma/prisma";
import { getUserById } from "@/helpers/userHelper";

function LadderPage({ ladder, user }) {
    console.log(user);
    console.log(ladder);
    const router = useRouter();
    const { ladderId } = router.query;

    const [winner, setWinner] = useState({ id: "", player: { name: "" } });
    const [playerOne, setplayerOne] = useState({ id: "", player: { name: "" } });
    const [playerTwo, setplayerTwo] = useState({ id: "", player: { name: "" } });

    if (!ladder) {
        return <h1>Ladder not found</h1>
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

    const selectPlayer = (setPlayerFn: Function, playerId) => {
        setPlayerFn(playerId);
    }


    const addPlayerToLadder = async (playerId: Number) => {
        let addedPlayer = await axios.post(`/api/ladder/${ladderId}/player/${playerId}`);
    }


    return (
        <section className="w-11/12 m-auto pt-10 flex">
            <div className="w-1/2">


                <div>
                    <h1 className="text-8xl font-bold">{ladder.name}</h1>
                    <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">{ladder.records.length} players</h3>
                    <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">{ladder.matches.length} Matches Played</h3>
                </div>

                <div className="flex flex-col gap-3 pt-10">
                    {ladder.records.map((record) => <div className="flex gap-2" key={record.player.id}>
                        <div>
                            <div className="w-14 h-14 fully-rounded bg-zinc-500"></div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold leading-none">{record.player.name}</h1>
                            <div className="flex gap-2 text-2xl leading-none">
                                <h3 className="text-2xl leading-4 text-zinc-400" >{record.wins.length} Wins</h3>
                                <h3 className="text-2xl leading-4 text-zinc-400">{record.losses.length} Losses</h3>

                            </div>
                        </div>
                    </div>)}
                </div>
                {/* <button onClick={() => createMatch(18, 16, 16, 18)} className="pt-5">Create Match</button> */}
                <button onClick={deleteLadder} className="pt-5">Delete Ladder</button>
            </div>

            <div className="p-10">
                <h1 className="uppercase text-4xl font-bold">Recent Matches</h1>
                {ladder.matches.map((match) => <h1 className="uppercase font-bold   " onClick={() => deleteMatch(match.id)} key={match.id}>{match.winner.playerName} vs {match.loser.playerName}</h1>)}
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
                <button onClick={createMatch} >Create Match</button><br></br>

                <button onClick={addPlayerToLadder}>test</button>
            </div>

        </section>
    )
}


export default LadderPage;



export async function getServerSideProps(context) {
    let token = await getToken({ req: context.req });
    const { userID, email } = token;

    const ladder = await prisma.ladder.findUnique({
        where: {
            id: parseInt(context.params.ladderId)
        },
        include: {
            matches: { include: { winner: true, loser: true, } },
            records: { include: { wins: true, losses: true, player: true }, orderBy: { wins: { _count: 'desc' } } }
        }

    })

    const user = await getUserById(userID);

    return {
        props: {
            ladder,
            user: user
            
            
        }
    }
}