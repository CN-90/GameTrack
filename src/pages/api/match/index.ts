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
    console.log(req.body);
    let match = await prisma.match.create({
        data: {
            ladder: {
                connect: { id: parseInt(req.body.ladderId)}
            },
            players: {
                connect: [
                    { id: req.body.playerOne.id },
                    { id: req.body.playerTwo.id }
                ]
            },
            winner: {
                connect: { id: req.body.winnerId },
            },
            loser: {
                connect: { id: req.body.loserId }
            }
        }
    });
    return match;
}