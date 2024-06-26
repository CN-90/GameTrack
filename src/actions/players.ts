import axios from "axios";

export async function createPlayer(playerName: string, ladderId: number) {
    if (!playerName) return { error: "Player name is required." };
    try {
        let data = await axios.post(`/api/player`, { name: playerName, ladderId });
        console.log(data);

    } catch (error) {

    }
}

export async function validatePlayerName(playerName: string, players: any) {
    if (!playerName) return { error: "Player name is required." };
    if (players.length >= 2) return { error: "You can only have 5 players." };
    if (players.find((player: any) => player.name.toLowerCase() === playerName.toLowerCase())) return { error: "Player already exists." };

}


export async function deletePlayer(playerId: number) {
    try {
        let data = await axios.delete(`/api/player/${playerId}`);
        console.log(data);

    } catch (error) {

    }
}