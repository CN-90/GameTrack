import axios from "axios";
import prisma from "../../prisma/prisma";

export async function createPlayer(playerName: string, ladderId: number) {
    try {
        let data = await axios.post(`/api/player`, { name: playerName, ladderId });
        console.log(data);

    } catch (error) {

    }
}