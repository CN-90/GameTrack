import prisma from '../../../../prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'



type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let data;
    switch (req.method) {
        case 'GET':
            break;

        case 'POST':
             data = await createLadder(req, res);
            return res.status(200).json({ message: "Ladder has been created.", data });

        case 'DELTE':
             break;

        default:
            return res.status(405).end();

    }
}


async function createLadder(req: NextApiRequest, res: NextApiResponse) {
    const { userId, title, players } = req.body;

    const ladder = await prisma.ladder.create({
        data: {
            name: title,
            user: {
                connect: {
                    id: parseInt(userId)
                }
            },
            players: {
                connect: players.map((player: any) => {
                    return {
                        id: player.id,
                    }
                })
            },
            records: {
                create: players.map((player: any) => {
                    return {
                        playerId: player.id,
                        playerName: player.name,
                    }
                })
            }

           
            
        }
    })
 
    return ladder;
}

