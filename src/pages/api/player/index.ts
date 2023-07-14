import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';


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
            data = await createPlayer(req, res);
            return res.status(200).json(data);

        case 'DELETE':

        default:

    }
}


async function createPlayer(req: NextApiRequest, res: NextApiResponse) {
    const { name, ladderId } = req.body;

    const player = await prisma.player.create({
        data: {
            name: name,
            ladderId: parseInt(ladderId) 
        },

    })

    return player;
}

