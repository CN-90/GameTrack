import prisma from '../../../../prisma/prisma';
import { getGameByTitle } from '@/helpers/gameHelper';
import type { NextApiRequest, NextApiResponse } from 'next'



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
            let data = await createTable(req, res);
            return res.status(200).json({ message: "Table has been created.", data });

        default:
            return res.status(405).end();

    }
}


async function createTable(req: NextApiRequest, res: NextApiResponse) {
    const { name, groupId, game } = req.body;
    console.log(game, groupId)

    let existingGame = await getGameByTitle(game)
    // if game doesn't already exist in database, create it.
    if (!existingGame) {
        existingGame = await prisma.game.create({
            data: {
                title: game
            }
        })
    }
    
    console.log(existingGame)

    const table = await prisma.table.create({
        data: {
            name: game,
            group: {
                connect: {
                    id: parseInt(groupId)
                }
            },
            game: {
                connect: {
                    id: parseInt(existingGame.id)
                }
            }
        }
    })
    return table;
}