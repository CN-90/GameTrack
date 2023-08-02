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

    const deleteTable = async () => {
        let deletedTable = await axios.delete(`/api/ladder/${ladderId}`, { ladderId });
    }

    const deletePlayer = async (playerId) => {
        let deletedPlayer = await axios.delete(`/api/player/${playerId}`);
    }

    const createPlayer = async (playerName: string, ladderId: number) => {
        if (!playerName) {
            setPlayerError("Please enter a player name");
            return;
        }
        let filteredPlayers = ladder.players.filter((player) => player.name === playerName);
        if (filteredPlayers.length) {
            setPlayerError("Player already exists");
            return;
        }

        try {
            let data = await axios.post(`/api/player`, { name: playerName, ladderId });
            console.log(data);

        } catch (error) {

        }
    }

    const createMatch = async (player1Id: number, player2Id: number, winnerId: number) => {
        let data = await axios.post(`/api/match`, { player1Id, player2Id, winnerId });
        console.log(data);
    }

    return (
        <div>
            <h1>{ladder.name}</h1>
            <label htmlFor="">New Player</label><br />
            <input ref={newPlayerName} type="text" /><br />
            <button onClick={() => createPlayer(newPlayerName.current.value, ladderId)}>Create Player</button><br />
            {playerError && <p className="text-red-300">{playerError}</p>}

            <h1 className="pt-5">Players</h1>
            {ladder.players.map((player) => <h1 onClick={() => deletePlayer(player.id)} key={player.id}>{player.name}</h1>)}
            <div style={{height: '200px'}}></div>
            <button onClick={() => createMatch(1,2,2)} className="pt-5">Create Match</button>
            <div style={{height: '200px'}}></div>
            <button onClick={deleteTable} className="pt-5">Delete Table</button>
        </div>
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
            players: true
        }

    })

    return {
        props: {
            userID: userID,
            ladder
        }
    }
}