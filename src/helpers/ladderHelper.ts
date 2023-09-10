
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