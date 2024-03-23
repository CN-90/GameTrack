export interface User {
    id: string
    email: string
    name: string
    image: string
    players: Player[]
    ladders: Ladder[]

}

export interface Record {
    id: string;
    playerName: string;
    playerId: string;
    wins: [],
    losses: [],
    player: {
        id: string
        name: string
    }
}

export interface Player {
    id: string
    name: string
    playerLosses: any[]
    playerWins: any[]
    userId: string
}


export interface Ladder {
    id: string
    name: string
    players: Player[]
    records: Record[]
    userId: string
}

export interface Match {
    id: string
    winner: Record
    loser: Record

}

