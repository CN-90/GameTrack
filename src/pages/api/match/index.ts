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
            let match = await createMatch(req);
            return res.status(200).json(match);

        default:
            return res.status(405).end();

    }
}


export async function createMatch(req: NextApiRequest) {
    let { winner, loser, ladderId } = req.body;

    let match = await prisma.match.create({
        data: {
            ladder: {
                connect: { id: parseInt(ladderId) }
            },
            players: {
                connect: [
                    { id: winner.playerId },
                    { id: loser.playerId }
                ]
            },
            winner: {
                connect: { id: winner.recordId },
            },
            loser: {
                connect: { id: loser.recordId }
            },
            winningPlayer: {
                connect: { id: winner.playerId }
            },
            losingPlayer: {
                connect: { id: loser.playerId }
            }
        }
    });
    return match;
}