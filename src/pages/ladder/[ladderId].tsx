import { createPlayer } from "@/actions/players";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import prisma from "../../../prisma/prisma";

function LadderPage({ userID, ladder }) {
    const router = useRouter();
    const { ladderId } = router.query;
    const newPlayerName = useRef("");
    const [playerError, setPlayerError] = useState("");

    if (!ladder) {
        return <h1>Ladder not found</h1>
    }

    const deleteLadder = async () => {
        let deletedTable = await axios.delete(`/api/ladder/${ladderId}`);
        console.log(deletedTable);
    }

    const createMatch = async (playerOne: number, playerTwo: number, winnerId: number, loserId: number) => {
        let data = await axios.post(`/api/match`, { playerOne, playerTwo, winnerId, loserId, ladderId });
        console.log(data);
    }

    const deleteMatch = async (matchId: number) => {
        let data = await axios.delete(`/api/match/${matchId}`);
        console.log(data);
    }


    console.log(ladder);
    return (
        <section className="w-11/12 m-auto pt-10">
            <div>
                <h1 className="text-8xl font-bold">{ladder.name}</h1>
                <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">0 Players</h3>
                <h3 className="font-bold uppercase text-3xl leading-none text-neutral-600">0 Matches Played</h3>
            </div>
            {/* <label htmlFor="">New Player</label><br />
            <input ref={newPlayerName} type="text" /><br />
            <button onClick={() => createPlayer(newPlayerName.current.value, ladderId)}>Create Player</button><br />
            {playerError && <p className="text-red-300">{playerError}</p>} */}

            <h1 className="pt-5">Players</h1>
            {ladder.players.map((player) => <h1 key={player.id}>{player.name}</h1>)}
            {/* <button onClick={() => createMatch(18, 16, 16, 18)} className="pt-5">Create Match</button> */}
            <button onClick={deleteLadder} className="pt-5">Delete Ladder</button>

            <h1>Matches</h1>
            {ladder.matches.map((match) => <h1 onClick={() => deleteMatch(match.id)} key={match.id}>{match.id}</h1>)}

            

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
            players: true,
            matches: true
        }

    })

    return {
        props: {
            userID: userID,
            ladder
        }
    }
}