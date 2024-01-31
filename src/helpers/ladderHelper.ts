import prisma from "../../prisma/prisma";

export async function getLadderById(id: string) {
    const ladder = await prisma.ladder.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    return ladder;
}