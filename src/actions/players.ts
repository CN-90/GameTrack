import axios from "axios";
import prisma from "../../prisma/prisma";

export async function createPlayer(playerName: string, ladderId: number) {
    if (!playerName) return { error: "Player name is required." };
    try {
        let data = await axios.post(`/api/player`, { name: playerName, ladderId });
        console.log(data);

    } catch (error) {

    }
}

export async function deletePlayer(playerId: number) {
    try {
        let data = await axios.delete(`/api/player/${playerId}`);
        console.log(data);

    } catch (error) {

    }
}