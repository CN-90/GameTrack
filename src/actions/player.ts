import { Player } from "@/interfaces";
import axios from "axios";


function validatePlayerName(playerName: string, players: any, maxPlayers: number) {
    if (!playerName) return { error: "Player name is required." };
    if (players.length >= maxPlayers) return { error: "You can only have 5 players." };
    if (players.find((player: any) => player.name.toLowerCase() === playerName.toLowerCase())) return { error: "Player already exists." };
}

// Validates the player name and creates and returns new player if validation is okay.
export async function createPlayer (playerName: string, players:Player[], setPlayerError: Function) {
    const validation = validatePlayerName(playerName, players, 5);
   
    if(validation && validation.error) {
        setPlayerError(validation.error);
        return;
    }

    try {
        let res = await axios.post(`/api/player`, { name: playerName });
        return res.data.player;


    } catch (error) {
        return { error: `Whoops, it seems there was an error creating the player ${playerName}. Please try again` };
    }
}

// Deletes player and returns deleted players ID.
export async function deletePlayer(player: Player) {
    try {
        let res = await axios.delete(`/api/player/${player.id}`);
        if(res.data.deletedPlayer.meta){
            return { error: `Whoops, it seems there was an error deleting player ${player.name}. Please try again later.` };
        }

        return res.data.deletedPlayer;

    } catch (error) {
        return { error: `Whoops, it seems there was an error deleting player ${player.name}. Please try again later.` };
    }
}