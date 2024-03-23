import { useState } from "react";

import axios from "axios";
import Link from "next/link";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from 'next/navigation'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import AddPlayersModal from "@/components/players/addPlayersModal/addPlayersModal";
import { getLadderById } from "../api/ladder/[ladderid]";
import { getUserById } from "../api/user/[uid]";
import AddMatchModal from "@/components/match/createMatchModal/addMatchModal";
import { getSession } from "next-auth/react";
import { Match, Record } from "@/interfaces";


function LadderPage({ ladder, user }: any) {
    const router = useRouter();
    const { ladderId } = router.query;
    const [selectedPlayer, setSelectedPlayer] = useState({ playerName: "", playerId: "" });

    const searchParams = useSearchParams();
    const pathname = usePathname()

    if (!ladder) {
        return <h1 className="text-4xl center">Ladder not found</h1>
    }

    const deleteLadder = async () => {
        let deletedTable = await axios.delete(`/api/ladder/${ladderId}`);
    }


    const deleteMatch = async (matchId: string) => {
        let data = await axios.delete(`/api/match/${matchId}`);
    }

    const deletePlayerFromLadder = async () => {
        let deletedPlayer = await axios.delete(`/api/ladder/${ladderId}/player/${selectedPlayer.playerId}`);
        console.log(deletedPlayer);
        // if(deletedPlayer) {
        // }
        setSelectedPlayer({ playerName: "", playerId: "" });
        router.replace(pathname, undefined, { scroll: false });
    }

    const openPlayerModal = (record: any) => {
        setSelectedPlayer({ playerName: record.playerName, playerId: record.playerId });
    }

    const closeModal = () => {
        setSelectedPlayer({ playerName: "", playerId: "" });
        router.replace(pathname, undefined, { scroll: false });
    }

    return (
        <section className="relative w-full m-auto pt-10">
            {searchParams.get("players") ? <AddPlayersModal user={user} ladder={ladder} /> : null}
            {searchParams.get("matches") ? <AddMatchModal user={user} ladder={ladder} /> : null}
            {searchParams.get("deleteGame") ? <DeleteConfirmModal message={`Are you sure you want to delete ${ladder.name}? All matches within this game will also be deleted.`} action={deleteLadder} closeModal={closeModal} /> : null}
            {selectedPlayer.playerId ? <DeleteConfirmModal message={`Are you sure you want to remove player ${selectedPlayer.playerName}?`} action={deletePlayerFromLadder} closeModal={closeModal} /> : null}

            <div>
                <div className="pb-8 2xl:flex w-11/12 mx-auto 2xl:justify-between">
                    <div className=" gap-2 justify-between pt-6">
                        <div>
                            <h1 className="text-6xl 2xl:text-7xl pb-2 lh-0_8 font-bold">{ladder.name}</h1>
                        </div>
                        <div className="relative pb-6">
                            <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">{ladder.records.length} players</h3>
                            <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">{ladder.matches.length} Matches Played</h3>

                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row 2xl:flex-col 2xl:w-1/4 gap-2 pb-4">
                        <Link href={`${pathname}/?players=true`} scroll={false} className="text-center py-4  bg-zinc-400 font-bold uppercase rounded-lg" replace>
                            {/* <FontAwesomeIcon icon={faUser} className="text-2xl pr-2" /> */}
                            Add Players
                        </Link>
                        <Link href={`${pathname}/?matches=true`} scroll={false} className="min-w-fit py-4 bg-zinc-400 text-center font-bold uppercase rounded-lg" replace>Create Match</Link>
                        <Link href={`${pathname}/?deleteGame=true`} scroll={false} className="min-w-fit py-4 bg-zinc-400 text-center font-bold uppercase rounded-lg " replace>Delete GAME</Link>
                    </div>

                </div>

                <ol className="flex flex-col bg-23 w-full pt-8 pb-16 gap-2  lg:mx-auto 2xl:pl-20">
                    {ladder.records.length === 0 ? <h1 className="text-4xl text-white font-bold">No players have been added to this game.</h1> : <h1 className="text-white pb-4 text-4xl w-11/12 m-auto 2xl:w-full 2xl:mx-0">Players</h1>}
                    {ladder.records.map((record: Record) => <li className="player flex w-full mx-auto bg-29 py-1 px-2 justify-between gap-2 md:rounded-lg md:w-11/12 2xl:w-1/2 2xl:mx-0" key={record.player.id}>
                        <div className="flex items-center gap-2">
                            <div>
                                <div className="w-14 h-14 rounded-full bg-zinc-500 relative 2xl:right-6"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl w-full font-bold break-all text-zinc-200">{record.player.name}</h2>
                                <div className="flex gap-2 text-xl">
                                    <h3 className="text-xl leading-4  text-zinc-400" >{record.wins.length} Wins</h3>
                                    <h3 className="text-xl leading-4  text-zinc-400">{record.losses.length} Losses</h3>

                                </div>
                            </div>
                        </div>
                        <div onClick={() => openPlayerModal(record)} className="trash-slide h-full flex justify-center items-center align-cente cursor-pointer">
                            <FontAwesomeIcon icon={faTrash} className="text-white text-4xl" />
                        </div>
                    </li>)}
                </ol>
            </div>

            <div className="pt-8 w-11/12 mx-auto">
                <h1 className="uppercase text-4xl font-bold pb-4">Recent Matches</h1>
                <ul className=" w-full 2xl:w-1/2 gap-2 rounded-md flex flex-col">
                    {ladder.matches.length > 0 ? ladder.matches.map((match: Match) =>
                        <li className="uppercase font-bold bg-23 px-5 py-3 rounded-lg lg:flex" onClick={() => deleteMatch(match.id)} key={match.id}>
                                <div className="flex flex-wrap items-center gap-4">
                                    <h2 className="text-lime-500 rounded-sm">{match.winner.playerName}</h2>
                                    <span className="flex text-white items-center">vs</span>
                                    <h2 className="text-red-500  rounded-sm">{match.loser.playerName}</h2>

                                </div>
                                <div className="ml-auto">
                                    <p className="text-white cursor-pointer">Delete Match</p>
                                </div>
                        </li>) : <h1 className="text-2xl font-semibold pb-12">No matches have been played yet</h1>}

                </ul>


            </div>

        </section >
    )
}


// modal used to confirm deletion of player, match or ladder
function DeleteConfirmModal({ message, action, closeModal }: any) {

    const onClickHandler = () => {
        action();
    }

    return (
        <aside className="w-3/4 fixed top-100 text-center top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-23 text-white right-20 p-5 rounded-lg z-10  xl:w-1/3 2xl:w-1/4">
            <h1 className="text-white">{message}</h1>
            <div className="flex gap-2 pt-8">
                <button onClick={onClickHandler} className=" w-1/2 bg-green-500  hover:bg-green-700 rounded-lg font-bold uppercase hover:bg-blue-700 p-2">Delete</button>
                <button onClick={closeModal} className="w-1/2 bg-red-500 rounded-lg text-white font-bold uppercase hover:bg-red-700 p-2">Cancel</button>
            </div>
        </aside>
    )
}

export default LadderPage;


export async function getServerSideProps(context: any) {

    const session:any = await getSession(context);
    let userId = null;

    if (session) {
        userId = session.user.id;
    } else {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    let token:any = await getToken({ req: context.req });
    const { userID } = token;


    const ladder = await getLadderById(context.query.ladderId, userID);
    const user = await getUserById(userID);

    return {
        props: {
            ladder,
            user: user


        }
    }
}