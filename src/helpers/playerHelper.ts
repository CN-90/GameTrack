import prisma from "../../prisma/prisma";

export async function getPlayer(playerId){
    return await prisma.player.findUnique({
        where: {
            id: parseInt(playerId)
        },
        include: {
            matches: true
        }
    })

}