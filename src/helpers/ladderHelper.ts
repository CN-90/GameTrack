
export async function removeMatchesFromLadder(ladderId: string) {
    try {
        let ladder = await prisma.ladder.findUnique({
            where: {
                id: parseInt(ladderId)
            },
            include: {
                matches: {
                    include: {
                        players: true
                    }
                }
            }
        });

        return ladder;

    } catch (error) {

    }
}


export async function addWinToRecord(playerId: number) {
    try {
        let player = await prisma.player.findUnique({
            where: {
                id: playerId
            }
        });

        let updatedPlayer = await prisma.player.update({
            where: {
                id: playerId
            },
            data: {
                wins: player.wins + 1
            }
        });

        return updatedPlayer;

    } catch (error) {

    }
}   