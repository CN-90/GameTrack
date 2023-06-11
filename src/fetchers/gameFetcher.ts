import prisma from "../../prisma/prisma";


export async function getGameByTitle(title: string){
    const game = await prisma.game.findUnique({
        where: {
            title
        }
    })
    return game;
}