import { useState } from "react";

import axios from "axios";
import Link from "next/link";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from 'next/navigation'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

import AddPlayersModal from "@/components/players/addPlayersModal/addPlayersModal";
import { getLadderById } from "../api/ladder/[ladderid]";
import { getUserById } from "../api/user/[uid]";
import AddMatchModal from "@/components/match/createMatchModal/addMatchModal";
import ProtectRoute from "@/components/protect/Protect";


function LadderPage({ ladder, user }) {
    const router = useRouter();
    const { ladderId } = router.query;

    const searchParams = useSearchParams();
    const pathname = usePathname()




    if (!ladder) {
        return <h1 className="text-4xl center">Ladder not found</h1>
    }

    const deleteLadder = async () => {
        let deletedTable = await axios.delete(`/api/ladder/${ladderId}`);
        console.log(deletedTable);
    }


    const deleteMatch = async (matchId: Number) => {
        let data = await axios.delete(`/api/match/${matchId}`);
    }

    const deletePlayerFromLadder = async (record, ladder) => {
        let deletedPlayer = await axios.delete(`/api/ladder/${ladderId}/player/${record.playerId}`);
    }


    return (
            <section className="relative w-11/12 m-auto pt-10">
                {searchParams.get("players") ? <AddPlayersModal user={user} ladder={ladder} /> : null}
                {searchParams.get("matches") ? <AddMatchModal user={user} ladder={ladder} /> : null}

                <div>
                    <div className="pb-4">
                        <div className=" gap-2 justify-between pt-6">
                            <div>
                                <h1 className="text-7xl font-bold leading-none">{ladder.name}</h1>
                            </div>
                            <div className="relative pb-4">
                                <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">{ladder.records.length} players</h3>
                                <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">{ladder.matches.length} Matches Played</h3>

                            </div>

                        </div>

                        <div className="flex flex-col gap-2">
                            <Link href={`${pathname}/?players=true`} className="md:w-1/4 text-center py-4  bg-zinc-400 font-bold uppercase rounded-lg">
                                {/* <FontAwesomeIcon icon={faUser} className="text-2xl pr-2" /> */}
                                Add Players
                            </Link>
                            <Link href={`${pathname}/?matches=true`} className="md:w-1/4 py-4 bg-zinc-400 text-center font-bold uppercase rounded-lg">Create Match</Link>
                        </div>

                    </div>

                    <ol className="flex flex-col w-full 2xl:w-3/4 py-4">
                        {ladder.records.length === 0 && <h1 className="text-4xl font-bold">No players in ladder</h1>}
                        {ladder.records.map((record) => <li className="flex rounded-lg py-1 justify-between gap-2" key={record.player.id}>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="w-14 h-14 rounded-full bg-zinc-500"></div>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold leading-none">{record.player.name}</h2>
                                    <div className="flex gap-2 text-xl leading-none">
                                        <h3 className="text-xl leading-4 font-semibold text-zinc-500" >{record.wins.length} Wins</h3>
                                        <h3 className="text-xl leading-4 font-semibold text-zinc-500">{record.losses.length} Losses</h3>

                                    </div>
                                </div>
                            </div>
                            <div onClick={() => deletePlayerFromLadder(record, ladder)} className="h-full flex justify-center items-center bg-zinc-300 align-center cursor-pointer">
                                {/* <FontAwesomeIcon icon={faTrash} className="text-white text-4xl" /> */}
                            </div>
                        </li>)}
                    </ol>
                </div>

                <div className="pt-5">
                    <h1 className="uppercase text-4xl font-bold pb-2">Recent Matches</h1>
                    {ladder.matches.map((match) => <h1 className="uppercase font-bold" onClick={() => deleteMatch(match.id)} key={match.id}>{match.winner.playerName} vs {match.loser.playerName}</h1>)}

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