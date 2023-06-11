import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';



type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            break;

        case 'POST':
            let data = await createGame(req, res);
            return res.status(200).json({ message: "Game has been created.", data });

        default:
            return res.status(405).end();

    }
}


async function createGame(req: NextApiRequest, res: NextApiResponse) {
    const { name, groupId, game } = req.body;
    console.log(game, groupId)

    const table = await prisma.game.create({
        data: {
            name: game,
            group: {
                connect: {
                    id: parseInt(groupId)
                }
            }
        }
    })
    return table;
}